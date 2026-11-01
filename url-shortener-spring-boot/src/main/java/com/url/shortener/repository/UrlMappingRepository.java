package com.url.shortener.repository;
import com.url.shortener.models.UrlMapping;
import com.url.shortener.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;
@Repository
public interface UrlMappingRepository extends JpaRepository<UrlMapping, Long> {
    UrlMapping findByShortUrl(String shortUrl);
    List<UrlMapping> findByUser(User user);
    Page<UrlMapping> findByUser(User user, Pageable pageable);
    List<UrlMapping> findByCreatedDateBefore(LocalDateTime date);
}
