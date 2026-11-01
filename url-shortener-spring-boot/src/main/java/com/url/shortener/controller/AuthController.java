package com.url.shortener.controller;
import com.url.shortener.DTO.ApiResponse;
import com.url.shortener.DTO.LoginRequest;
import com.url.shortener.DTO.RegisterRequest;
import com.url.shortener.models.User;
import com.url.shortener.security.jwt.JwtAuthenticationResponse;
import com.url.shortener.service.UserService;
import com.url.shortener.util.ResponseBuilder;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserService userService;
    public AuthController(UserService userService) {
        this.userService = userService;
    }
    @PostMapping("/public/login")
    public ResponseEntity<ApiResponse<JwtAuthenticationResponse>> loginUser(
            @RequestBody LoginRequest loginRequest,
            HttpServletRequest request)
    {
        JwtAuthenticationResponse jwtResponse = userService.authenticateUser(loginRequest);
        return ResponseBuilder.success(request, jwtResponse);
    }
    @PostMapping("/public/register")
    public ResponseEntity<ApiResponse<String>> registerUser(
            @RequestBody RegisterRequest registerRequest,
            HttpServletRequest request)
    {
        User user = new User();
        // Check if username already exists
        if (userService.existsByUsername(registerRequest.getUsername())) {
            return ResponseBuilder.error(400, request.getMethod(), request.getRequestURI(), "Username already exists", null);
        }
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(registerRequest.getPassword());
        user.setRole("ROLE_USER");
        userService.registerUser(user);
        return ResponseBuilder.created(request, "User Registered Successfully", null);
    }
}
