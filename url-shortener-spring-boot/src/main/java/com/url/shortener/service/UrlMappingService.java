package com.url.shortener.service;
import com.url.shortener.DTO.ClickEventDTO;
import com.url.shortener.DTO.PaginatedResponse;
import com.url.shortener.DTO.UrlMappingDTO;
import com.url.shortener.models.ClickEvent;
import com.url.shortener.models.UrlMapping;
import com.url.shortener.models.User;
import com.url.shortener.exception.ResourceNotFoundException;
import com.url.shortener.repository.ClickEventRepository;
import com.url.shortener.repository.UrlMappingRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;
@Service
public class UrlMappingService {
    private final UrlMappingRepository urlMappingRepository;
    private final ClickEventRepository clickEventRepository;
    public UrlMappingService(UrlMappingRepository urlMappingRepository, ClickEventRepository clickEventRepository) {
        this.urlMappingRepository = urlMappingRepository;
        this.clickEventRepository = clickEventRepository;
    }
    public UrlMappingDTO createShortUrl(String originalUrl, User user) {
        String shortUrl = generateShortUrl();
        UrlMapping urlMapping = new UrlMapping();
        urlMapping.setOriginalUrl(originalUrl);
        urlMapping.setShortUrl(shortUrl);
        urlMapping.setUser(user);
        urlMapping.setCreatedDate(LocalDateTime.now());
        UrlMapping savedUrlMapping = urlMappingRepository.save(urlMapping);
        return convertToDto(savedUrlMapping);
    }
    private UrlMappingDTO convertToDto(UrlMapping urlMapping){
        UrlMappingDTO urlMappingDTO = new UrlMappingDTO();
        urlMappingDTO.setId(urlMapping.getId());
        urlMappingDTO.setOriginalUrl(urlMapping.getOriginalUrl());
        urlMappingDTO.setShortUrl(urlMapping.getShortUrl());
        urlMappingDTO.setClickCount(urlMapping.getClickCount());
        urlMappingDTO.setCreatedDate(urlMapping.getCreatedDate());
        urlMappingDTO.setUsername(urlMapping.getUser().getUsername());
        return urlMappingDTO;
    }
    private String generateShortUrl() {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        Random random = new Random();
        StringBuilder shortUrl = new StringBuilder(8);
        for(int i=0; i<8; i++)
        {
            shortUrl.append(characters.charAt(random.nextInt(characters.length())));
        }
        return shortUrl.toString();
    }
    @Transactional
    public void deleteShortenUrl(Long id, User user) {
        List<UrlMapping> userURLs = urlMappingRepository.findByUser(user);
        if (userURLs != null) {
            UrlMapping urlToDelete = userURLs.stream()
                    .filter(url -> url.getId().equals(id))
                    .findFirst()
                    .orElseThrow(() -> new ResourceNotFoundException("URL not found with id: " + id));
            if (urlToDelete != null) {
                clickEventRepository.deleteByUrlMappingId(urlToDelete.getId());
                urlMappingRepository.delete(urlToDelete);
            }
        }
    }
    public UrlMappingDTO editShortUrl(Long id, String originalUrl, User user) {
        List<UrlMapping> userURLs = urlMappingRepository.findByUser(user);
        UrlMapping urlToUpdate = userURLs.stream()
                .filter(url -> url.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("URL not found with id: " + id));
        urlToUpdate.setOriginalUrl(originalUrl);
        UrlMapping savedUrl = urlMappingRepository.save(urlToUpdate);
        return convertToDto(savedUrl);
    }
    public List<UrlMappingDTO> getUrlsByUser(User user) {
        return urlMappingRepository.findByUser(user).stream()
                .map(this::convertToDto)
                .toList();
    }
    public PaginatedResponse<UrlMappingDTO> getUrlsByUser(User user, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdDate"));
        Page<UrlMapping> urlPage = urlMappingRepository.findByUser(user, pageable);
        List<UrlMappingDTO> dtos = urlPage.getContent().stream()
                .map(this::convertToDto)
                .toList();
        return new PaginatedResponse<>(
                dtos,
                urlPage.getNumber(),
                urlPage.getSize(),
                urlPage.getTotalElements(),
                urlPage.getTotalPages()
        );
    }
    public List<ClickEventDTO> getClickEventsByDate(String shortUrl, LocalDateTime start, LocalDateTime end, User user) {
        UrlMapping urlMapping = urlMappingRepository.findByShortUrl(shortUrl);
        // Check if URL mapping exists and belongs to the user
        if (urlMapping != null && urlMapping.getUser().getId().equals(user.getId())) {
            return clickEventRepository.findByUrlMappingAndClickDateBetween(urlMapping, start, end).stream()
                    .collect(Collectors.groupingBy(click -> click.getClickDate().toLocalDate(), Collectors.counting()))
                    .entrySet().stream()
                    .map(entry -> {
                        ClickEventDTO clickEventDTO = new ClickEventDTO();
                        clickEventDTO.setClickDate(entry.getKey());
                        clickEventDTO.setCount(entry.getValue());
                        return clickEventDTO;
                    })
                    .collect(Collectors.toList());
        }
        return null;
    }
    public Map<LocalDate, Long> getTotalClicksByUserAndDate(User user, LocalDate start, LocalDate end) {
        List<UrlMapping> urlMappings = urlMappingRepository.findByUser(user);
        System.out.println(start.atStartOfDay());
        List<ClickEvent> clickEvents = clickEventRepository.findByUrlMappingInAndClickDateBetween(urlMappings, start.atStartOfDay(), end.plusDays(1).atStartOfDay());
        return clickEvents.stream()
                .collect(Collectors.groupingBy(click -> click.getClickDate().toLocalDate(), Collectors.counting()));
    }
    public UrlMapping getOriginalUrl(String shortUrl) {
        UrlMapping urlMapping = urlMappingRepository.findByShortUrl(shortUrl);
        if (urlMapping != null) {
            urlMapping.setClickCount(urlMapping.getClickCount() + 1);
            urlMappingRepository.save(urlMapping);
            // Record Click Event
            ClickEvent clickEvent = new ClickEvent();
            clickEvent.setClickDate(LocalDateTime.now());
            clickEvent.setUrlMapping(urlMapping);
            clickEventRepository.save(clickEvent);
        }
        return urlMapping;
    }
}
