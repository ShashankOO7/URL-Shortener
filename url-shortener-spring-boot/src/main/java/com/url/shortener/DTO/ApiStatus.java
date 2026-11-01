package com.url.shortener.DTO;
import com.fasterxml.jackson.annotation.JsonProperty;
/**
 * Represents the API status information in the response.
 */
public class ApiStatus {
    
    @JsonProperty("statusCode")
    private int statusCode;
    
    @JsonProperty("status")
    private String status;
    
    @JsonProperty("method")
    private String method;
    
    @JsonProperty("path")
    private String path;
    
    @JsonProperty("timestamp")
    private String timestamp;
    public ApiStatus() {
    }
    public ApiStatus(int statusCode, String status, String method, String path, String timestamp) {
        this.statusCode = statusCode;
        this.status = status;
        this.method = method;
        this.path = path;
        this.timestamp = timestamp;
    }
    public int getStatusCode() {
        return statusCode;
    }
    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public String getMethod() {
        return method;
    }
    public void setMethod(String method) {
        this.method = method;
    }
    public String getPath() {
        return path;
    }
    public void setPath(String path) {
        this.path = path;
    }
    public String getTimestamp() {
        return timestamp;
    }
    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }
}
