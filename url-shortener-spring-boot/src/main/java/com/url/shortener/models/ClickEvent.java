package com.url.shortener.models; // Defines the package location for this class
import jakarta.persistence.*; // Imports JPA annotations
//import lombok.Data; // Lombok annotation to auto-generate getters, setters, etc.
import java.time.LocalDateTime; // Imports Java LocalDateTime for date-time fields
@Entity // Marks this class as a JPA entity mapped to a database table
//@Data // Lombok annotation to generate boilerplate code (getters, setters, etc.)
@Table(name = "click_event") // Maps this entity to the "click_event" table in the database
public class ClickEvent {
    @Id // Specifies the primary key field
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment strategy for id generation in DB
    private Long id; // Unique identifier for each click event
    private LocalDateTime clickDate; // Stores the timestamp when the click event occurred
    @ManyToOne // Defines many-to-one relationship: many click events can belong to one URL mapping
    @JoinColumn(name = "url_mapping_id") // Foreign key column in click_event table referring to url_mapping's id
    private UrlMapping urlMapping; // The URL mapping that this click event is associated with
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public LocalDateTime getClickDate() {
        return clickDate;
    }
    public void setClickDate(LocalDateTime clickDate) {
        this.clickDate = clickDate;
    }
    public UrlMapping getUrlMapping() {
        return urlMapping;
    }
    public void setUrlMapping(UrlMapping urlMapping) {
        this.urlMapping = urlMapping;
    }
}
