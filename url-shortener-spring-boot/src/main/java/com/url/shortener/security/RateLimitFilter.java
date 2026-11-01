package com.url.shortener.security;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.url.shortener.config.RateLimitProperties;
import com.url.shortener.security.jwt.JwtUtils;
import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.ConsumptionProbe;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.time.Duration;
import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
public class RateLimitFilter extends OncePerRequestFilter {
    private final RateLimitProperties rateLimitProperties;
    private final JwtUtils jwtUtils;
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final ConcurrentHashMap<String, Bucket> buckets = new ConcurrentHashMap<>();
    public RateLimitFilter(RateLimitProperties rateLimitProperties, JwtUtils jwtUtils) {
        this.rateLimitProperties = rateLimitProperties;
        this.jwtUtils = jwtUtils;
    }
    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain)
            throws ServletException, IOException {
        String path = request.getRequestURI();
        String method = request.getMethod();
        // Determine which rate limit applies
        RateLimitProperties.EndpointLimit limit = resolveLimit(path, method);
        // If no rate limit configured for this path, pass through
        if (limit == null) {
            filterChain.doFilter(request, response);
            return;
        }
        // Build a unique bucket key: endpoint-group + identifier (user or IP)
        String bucketKey = resolveBucketKey(path, method, request);
        Bucket bucket = buckets.computeIfAbsent(bucketKey,
                k -> createBucket(limit));
        ConsumptionProbe probe = bucket.tryConsumeAndReturnRemaining(1);
        if (probe.isConsumed()) {
            response.setHeader("X-RateLimit-Remaining",
                    String.valueOf(probe.getRemainingTokens()));
            filterChain.doFilter(request, response);
        } else {
            long retryAfterSeconds = probe.getNanosToWaitForRefill() / 1_000_000_000;
            response.setStatus(429);
            response.setHeader("Retry-After", String.valueOf(retryAfterSeconds));
            response.setHeader("X-RateLimit-Remaining", "0");
            response.setContentType("application/json");
            Map<String, Object> status = new LinkedHashMap<>();
            status.put("statusCode", 429);
            status.put("status", "ERROR");
            status.put("method", method);
            status.put("path", path);
            status.put("timestamp", Instant.now().toString());
            Map<String, Object> body = new LinkedHashMap<>();
            body.put("apiStatus", status);
            body.put("body", "Too many requests. Please try again after " + retryAfterSeconds + " seconds.");
            body.put("data", null);
            response.getWriter().write(objectMapper.writeValueAsString(body));
        }
    }
    private RateLimitProperties.EndpointLimit resolveLimit(String path, String method) {
        if ("POST".equalsIgnoreCase(method) && path.equals("/api/urls/shorten")) {
            return rateLimitProperties.getShorten();
        }
        if ("POST".equalsIgnoreCase(method) && path.equals("/api/auth/public/login")) {
            return rateLimitProperties.getLogin();
        }
        if ("POST".equalsIgnoreCase(method) && path.equals("/api/auth/public/register")) {
            return rateLimitProperties.getRegister();
        }
        // Redirect: any GET that is not /api/* and not a static resource
        if ("GET".equalsIgnoreCase(method)
                && !path.startsWith("/api/")
                && !path.equals("/")
                && !path.contains(".")) {
            return rateLimitProperties.getRedirect();
        }
        return null;
    }
    private String resolveBucketKey(String path, String method, HttpServletRequest request) {
        String endpointGroup;
        if (path.equals("/api/urls/shorten")) {
            endpointGroup = "shorten";
        } else if (path.equals("/api/auth/public/login")) {
            endpointGroup = "login";
        } else if (path.equals("/api/auth/public/register")) {
            endpointGroup = "register";
        } else {
            endpointGroup = "redirect";
        }
        String identifier;
        // For authenticated endpoints, try to extract username from JWT
        if (endpointGroup.equals("shorten")) {
            identifier = extractUsernameFromToken(request);
            if (identifier == null) {
                identifier = resolveClientIp(request);
            }
        } else {
            identifier = resolveClientIp(request);
        }
        return endpointGroup + ":" + identifier;
    }
    private String extractUsernameFromToken(HttpServletRequest request) {
        try {
            String token = jwtUtils.getJwtFromHeader(request);
            if (token != null) {
                return jwtUtils.getUserNameFromJwtToken(token);
            }
        } catch (Exception ignored) {
            // Token invalid or expired ? fall back to IP
        }
        return null;
    }
    private String resolveClientIp(HttpServletRequest request) {
        String forwarded = request.getHeader("X-Forwarded-For");
        if (forwarded != null && !forwarded.isEmpty()) {
            return forwarded.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
    private Bucket createBucket(RateLimitProperties.EndpointLimit limit) {
        return Bucket.builder()
                .addLimit(Bandwidth.builder()
                        .capacity(limit.getRequests())
                        .refillGreedy(limit.getRequests(), Duration.ofMinutes(limit.getMinutes()))
                        .build())
                .build();
    }
}
