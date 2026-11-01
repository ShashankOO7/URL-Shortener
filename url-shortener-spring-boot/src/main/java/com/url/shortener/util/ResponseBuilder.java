package com.url.shortener.util;
import com.url.shortener.DTO.ApiResponse;
import com.url.shortener.DTO.ApiStatus;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.time.Instant;
/**
 * Utility class to build standardized API responses.
 */
public class ResponseBuilder {
    
    /**
     * Builds a successful response with data.
     * 
     * @param <T> The type of data
     * @param method HTTP method (GET, POST, PUT, DELETE, etc.)
     * @param path Request path
     * @param data The data to include in the response
     * @return ResponseEntity with ApiResponse structure
     */
    public static <T> ResponseEntity<ApiResponse<T>> success(String method, String path, T data) {
        return success(method, path, null, data);
    }
    
    /**
     * Builds a successful response with body and data.
     * Body is only included if the HTTP method is POST or PUT.
     * 
     * @param <T> The type of data
     * @param method HTTP method (GET, POST, PUT, DELETE, etc.)
     * @param path Request path
     * @param body The body object (can be null)
     * @param data The data to include in the response
     * @return ResponseEntity with ApiResponse structure
     */
    public static <T> ResponseEntity<ApiResponse<T>> success(String method, String path, Object body, T data) {
        ApiStatus apiStatus = createApiStatus(HttpStatus.OK.value(), "SUCCESS", method, path);
        // Only include body for POST or PUT requests
        Object responseBody = shouldIncludeBody(method) ? body : null;
        ApiResponse<T> response = new ApiResponse<>(apiStatus, responseBody, data);
        return ResponseEntity.ok(response);
    }
    
    /**
     * Builds a response with custom status code.
     * Body is only included if the HTTP method is POST or PUT.
     * 
     * @param <T> The type of data
     * @param statusCode HTTP status code
     * @param status Status string (e.g., "SUCCESS", "ERROR", "CREATED")
     * @param method HTTP method
     * @param path Request path
     * @param body The body object (can be null)
     * @param data The data to include in the response
     * @return ResponseEntity with ApiResponse structure
     */
    public static <T> ResponseEntity<ApiResponse<T>> build(int statusCode, String status, String method, String path, Object body, T data) {
        ApiStatus apiStatus = createApiStatus(statusCode, status, method, path);
        // Only include body for POST or PUT requests
        Object responseBody = shouldIncludeBody(method) ? body : null;
        ApiResponse<T> response = new ApiResponse<>(apiStatus, responseBody, data);
        return ResponseEntity.status(statusCode).body(response);
    }
    
    /**
     * Builds a created response (201).
     * 
     * @param <T> The type of data
     * @param method HTTP method
     * @param path Request path
     * @param data The data to include in the response
     * @return ResponseEntity with ApiResponse structure
     */
    public static <T> ResponseEntity<ApiResponse<T>> created(String method, String path, T data) {
        return created(method, path, null, data);
    }
    
    /**
     * Builds a created response (201) with body and data.
     * Body is only included if the HTTP method is POST or PUT.
     * 
     * @param <T> The type of data
     * @param method HTTP method
     * @param path Request path
     * @param body The body object (can be null)
     * @param data The data to include in the response
     * @return ResponseEntity with ApiResponse structure
     */
    public static <T> ResponseEntity<ApiResponse<T>> created(String method, String path, Object body, T data) {
        ApiStatus apiStatus = createApiStatus(HttpStatus.CREATED.value(), "CREATED", method, path);
        // Only include body for POST or PUT requests
        Object responseBody = shouldIncludeBody(method) ? body : null;
        ApiResponse<T> response = new ApiResponse<>(apiStatus, responseBody, data);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    
    /**
     * Builds an error response.
     * Body is only included if the HTTP method is POST or PUT.
     * 
     * @param <T> The type of data
     * @param statusCode HTTP status code
     * @param method HTTP method
     * @param path Request path
     * @param body The body object (usually error message or details)
     * @param data The data to include in the response (can be null)
     * @return ResponseEntity with ApiResponse structure
     */
    public static <T> ResponseEntity<ApiResponse<T>> error(int statusCode, String method, String path, Object body, T data) {
        ApiStatus apiStatus = createApiStatus(statusCode, "ERROR", method, path);
        // Only include body for POST or PUT requests
        Object responseBody = shouldIncludeBody(method) ? body : null;
        ApiResponse<T> response = new ApiResponse<>(apiStatus, responseBody, data);
        return ResponseEntity.status(statusCode).body(response);
    }
    
    /**
     * Builds a successful response using HttpServletRequest to extract method and path.
     * 
     * @param <T> The type of data
     * @param request HttpServletRequest to extract method and path
     * @param data The data to include in the response
     * @return ResponseEntity with ApiResponse structure
     */
    public static <T> ResponseEntity<ApiResponse<T>> success(HttpServletRequest request, T data) {
        return success(request.getMethod(), request.getRequestURI(), null, data);
    }
    
    /**
     * Builds a successful response with body using HttpServletRequest to extract method and path.
     * 
     * @param <T> The type of data
     * @param request HttpServletRequest to extract method and path
     * @param body The body object (can be null)
     * @param data The data to include in the response
     * @return ResponseEntity with ApiResponse structure
     */
    public static <T> ResponseEntity<ApiResponse<T>> success(HttpServletRequest request, Object body, T data) {
        return success(request.getMethod(), request.getRequestURI(), body, data);
    }
    
    /**
     * Builds a created response using HttpServletRequest to extract method and path.
     * 
     * @param <T> The type of data
     * @param request HttpServletRequest to extract method and path
     * @param data The data to include in the response
     * @return ResponseEntity with ApiResponse structure
     */
    public static <T> ResponseEntity<ApiResponse<T>> created(HttpServletRequest request, T data) {
        return created(request.getMethod(), request.getRequestURI(), null, data);
    }
    
    /**
     * Builds a created response with body using HttpServletRequest to extract method and path.
     * 
     * @param <T> The type of data
     * @param request HttpServletRequest to extract method and path
     * @param body The body object (can be null)
     * @param data The data to include in the response
     * @return ResponseEntity with ApiResponse structure
     */
    public static <T> ResponseEntity<ApiResponse<T>> created(HttpServletRequest request, Object body, T data) {
        return created(request.getMethod(), request.getRequestURI(), body, data);
    }
    
    /**
     * Checks if the body should be included in the response based on HTTP method.
     * Body is only included for POST and PUT requests.
     * 
     * @param method HTTP method
     * @return true if body should be included, false otherwise
     */
    private static boolean shouldIncludeBody(String method) {
        return "POST".equalsIgnoreCase(method) || "PUT".equalsIgnoreCase(method);
    }
    
    /**
     * Creates an ApiStatus object with the current timestamp.
     * 
     * @param statusCode HTTP status code
     * @param status Status string
     * @param method HTTP method
     * @param path Request path
     * @return ApiStatus object
     */
    private static ApiStatus createApiStatus(int statusCode, String status, String method, String path) {
        String timestamp = Instant.now().toString(); // ISO-8601 format
        return new ApiStatus(statusCode, status, method, path, timestamp);
    }
}
