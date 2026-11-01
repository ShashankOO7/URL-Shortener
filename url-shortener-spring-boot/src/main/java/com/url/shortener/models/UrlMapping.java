package com.url.shortener.models; // Defines the package location for this class
import jakarta.persistence.*; // Imports JPA annotations
//import lombok.Data; // Lombok annotation to auto-generate getters, setters, etc.
import java.time.LocalDateTime; // Imports Java LocalDateTime for date-time fields
import java.util.List; // Imports List interface for click events relation
@Entity // Marks this class as a JPA entity mapped to a database table
//@Data // Lombok annotation to generate boilerplate code (getters, setters, etc.)
@Table(name = "url_mapping") // Maps this entity to the "url_mapping" table in the database
public class UrlMapping {
    @Id // Specifies the primary key field
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment strategy for id generation in DB
    private Long id; // Unique identifier for each URL mapping
    private int clickCount = 0; // Stores the number of times the short URL was clicked, default 0
    private String originalUrl; // Stores the original long URL
    private String shortUrl; // Stores the generated short URL
    private LocalDateTime createdDate; // Stores the timestamp when this URL mapping was created
    @ManyToOne // Defines many-to-one relationship: many URL mappings can belong to one user
    @JoinColumn(name = "user_id") // Foreign key column in url_mapping table referring to user's id
    private User user; // The user who created this URL mapping
    @OneToMany(mappedBy = "urlMapping") // Defines one-to-many relationship with ClickEvent entity
    private List<ClickEvent> clickEvents; // List of click events associated with this URL mapping
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public int getClickCount() {
        return clickCount;
    }
    public void setClickCount(int clickCount) {
        this.clickCount = clickCount;
    }
    public String getOriginalUrl() {
        return originalUrl;
    }
    public void setOriginalUrl(String originalUrl) {
        this.originalUrl = originalUrl;
    }
    public String getShortUrl() {
        return shortUrl;
    }
    public void setShortUrl(String shortUrl) {
        this.shortUrl = shortUrl;
    }
    public LocalDateTime getCreatedDate() {
        return createdDate;
    }
    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
    public List<ClickEvent> getClickEvents() {
        return clickEvents;
    }
    public void setClickEvents(List<ClickEvent> clickEvents) {
        this.clickEvents = clickEvents;
    }
}
