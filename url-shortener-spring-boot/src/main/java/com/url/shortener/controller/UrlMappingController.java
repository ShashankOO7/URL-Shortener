package com.url.shortener.controller;
import com.url.shortener.DTO.ApiResponse;
import com.url.shortener.DTO.ClickEventDTO;
import com.url.shortener.DTO.PaginatedResponse;
import com.url.shortener.DTO.UrlMappingDTO;
import com.url.shortener.models.User;
import com.url.shortener.service.UrlMappingService;
import com.url.shortener.service.UserService;
import com.url.shortener.util.ResponseBuilder;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
@RestController
@RequestMapping("/api/urls")
public class UrlMappingController {
    private final UrlMappingService urlMappingService; // This is called to map url
    private final UserService userService; //This is called to map url with user
    public UrlMappingController(UrlMappingService urlMappingService, UserService userService) {
        this.urlMappingService = urlMappingService;
        this.userService = userService;
    }
    @PostMapping("/shorten")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ApiResponse<UrlMappingDTO>> createShortUrl(
            @RequestBody Map<String, String> body,
            Principal principal,
            HttpServletRequest request)
    {
        String originalUrl = body.get("originalUrl");
        User user = userService.findByUsername(principal.getName());
        // CALL url Mapping SERVICE
        UrlMappingDTO response = urlMappingService.createShortUrl(originalUrl, user);
        return ResponseBuilder.created(request, response);
    }
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ApiResponse<String>> deleteShortUrl(
            @PathVariable Long id,
            Principal principal,
            HttpServletRequest request)
    {
        User user = userService.findByUsername(principal.getName());
        urlMappingService.deleteShortenUrl(id, user);
        return ResponseBuilder.success(request, "URL Deleted Successfully!");
    }
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ApiResponse<UrlMappingDTO>> editShortUrl(
            @PathVariable Long id,
            @RequestBody Map<String, String> body,
            Principal principal,
            HttpServletRequest request)
    {
        User user = userService.findByUsername(principal.getName());
        String originalUrl = body.get("originalUrl");
        UrlMappingDTO response = urlMappingService.editShortUrl(id, originalUrl, user);
        return ResponseBuilder.success(request, response);
    }
    @GetMapping("/myurls")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ApiResponse<PaginatedResponse<UrlMappingDTO>>> getUserUrls(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            Principal principal,
            HttpServletRequest request)
    {
        User user = userService.findByUsername(principal.getName());
        PaginatedResponse<UrlMappingDTO> urls = urlMappingService.getUrlsByUser(user, page, size);
        return ResponseBuilder.success(request, urls);
    }
    @GetMapping("/analytics/{shortUrl}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ApiResponse<List<ClickEventDTO>>> getUrlAnalytics(
            @PathVariable String shortUrl,
            @RequestParam("startDate") String startDate,
            @RequestParam("endDate") String endDate,
            Principal principal,
            HttpServletRequest request)
    {
        User user = userService.findByUsername(principal.getName());
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        LocalDateTime start = LocalDateTime.parse(startDate, formatter);
        LocalDateTime end = LocalDateTime.parse(endDate, formatter);
        List<ClickEventDTO> clickEventDTOS = urlMappingService.getClickEventsByDate(shortUrl, start, end, user);
        return ResponseBuilder.success(request, clickEventDTOS);
    }
    @GetMapping("/totalClicks")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ApiResponse<Map<LocalDate, Long>>> getTotalClicksByDate(
            Principal principal,
            @RequestParam("startDate") String startDate,
            @RequestParam("endDate") String endDate,
            HttpServletRequest request){
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE;
        User user = userService.findByUsername(principal.getName());
        LocalDate start = LocalDate.parse(startDate, formatter);
        LocalDate end = LocalDate.parse(endDate, formatter);
        Map<LocalDate, Long> totalClicks = urlMappingService.getTotalClicksByUserAndDate(user, start, end);
        return ResponseBuilder.success(request, totalClicks);
    }
}
