package com.url.shortener.models; // Defines the package location for this class
import jakarta.persistence.*; // Imports JPA annotations for ORM mapping
import lombok.Data; // Lombok annotation to auto-generate getters, setters, toString, equals, and hashCode
@Entity // Marks this class as a JPA entity mapped to a database table
@Data // Lombok annotation to generate boilerplate code (getters, setters, etc.)
@Table(name = "users") // Maps this entity to the "users" table in the database
public class User {
    @Id // Specifies the primary key field
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment strategy for id generation in DB
    private Long id; // Unique identifier for each user
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }
    private String email; // Stores user's email address
    private String username; // Stores user's username
    private String password; // Stores user's password (should be stored encrypted in production)
    private String role = "ROLE_USER"; // Stores user's role with a default value of ROLE_USER
}
