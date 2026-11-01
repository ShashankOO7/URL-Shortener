package com.url.shortener.DTO;
import com.fasterxml.jackson.annotation.JsonProperty;
/**
 * Standard API response wrapper that contains apiStatus, body, and data.
 * 
 * @param <T> The type of data in the response
 */
public class ApiResponse<T> {
    
    @JsonProperty("apiStatus")
    private ApiStatus apiStatus;
    
    @JsonProperty("body")
    private Object body;
    
    @JsonProperty("data")
    private T data;
    public ApiResponse() {
    }
    public ApiResponse(ApiStatus apiStatus, Object body, T data) {
        this.apiStatus = apiStatus;
        this.body = body;
        this.data = data;
    }
    public ApiStatus getApiStatus() {
        return apiStatus;
    }
    public void setApiStatus(ApiStatus apiStatus) {
        this.apiStatus = apiStatus;
    }
    public Object getBody() {
        return body;
    }
    public void setBody(Object body) {
        this.body = body;
    }
    public T getData() {
        return data;
    }
    public void setData(T data) {
        this.data = data;
    }
}
