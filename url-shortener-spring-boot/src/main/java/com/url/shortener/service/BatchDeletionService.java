package com.url.shortener.service;
import com.url.shortener.models.ClickEvent;
import com.url.shortener.models.UrlMapping;
import com.url.shortener.repository.ClickEventRepository;
import com.url.shortener.repository.UrlMappingRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
/**
 * Batch service to delete old URL mappings and their corresponding click events.
 * This service runs on the 28th day of each month at 12:00 AM IST.
 * It deletes records where created_date is older than 1 year.
 */
@Service
public class BatchDeletionService {
    private static final Logger logger = LoggerFactory.getLogger(BatchDeletionService.class);
    @Autowired
    private UrlMappingRepository urlMappingRepository;
    @Autowired
    private ClickEventRepository clickEventRepository;
    /**
     * Scheduled task that runs on the 28th day of each month at 12:00 AM IST.
     * Cron expression: "0 0 0 28 * ?" - runs at 00:00:00 on the 28th day of every month
     * Zone: "Asia/Kolkata" - Indian Standard Time (IST)
     */
    @Scheduled(cron = "0 0 0 28 * ?", zone = "Asia/Kolkata")
    @Transactional
    public void deleteOldUrlMappings() {
        logger.info("Starting batch deletion of old URL mappings and click events...");
        
        try {
            // Calculate the cutoff date (1 year ago from current date)
            LocalDateTime oneYearAgo = LocalDateTime.now(ZoneId.of("Asia/Kolkata")).minusYears(1);
            logger.info("Deleting records older than: {}", oneYearAgo);
            
            // Find all URL mappings created before the cutoff date
            List<UrlMapping> oldUrlMappings = urlMappingRepository.findByCreatedDateBefore(oneYearAgo);
            
            if (oldUrlMappings.isEmpty()) {
                logger.info("No old URL mappings found to delete.");
                return;
            }
            
            logger.info("Found {} URL mapping(s) to delete", oldUrlMappings.size());
            
            int deletedClickEvents = 0;
            int deletedUrlMappings = 0;
            
            // Delete click events first (to avoid foreign key constraint violations)
            for (UrlMapping urlMapping : oldUrlMappings) {
                Long urlMappingId = urlMapping.getId();
                
                // Delete all click events associated with this URL mapping
                List<ClickEvent> clickEvents = clickEventRepository.findByUrlMapping(urlMapping);
                if (!clickEvents.isEmpty()) {
                    clickEventRepository.deleteByUrlMappingId(urlMappingId);
                    deletedClickEvents += clickEvents.size();
                    logger.debug("Deleted {} click event(s) for URL mapping ID: {}", clickEvents.size(), urlMappingId);
                }
                
                // Delete the URL mapping
                urlMappingRepository.delete(urlMapping);
                deletedUrlMappings++;
                logger.debug("Deleted URL mapping ID: {}", urlMappingId);
            }
            
            logger.info("Batch deletion completed successfully. Deleted {} URL mapping(s) and {} click event(s).", 
                    deletedUrlMappings, deletedClickEvents);
                    
        } catch (Exception e) {
            logger.error("Error occurred during batch deletion of old URL mappings", e);
            throw e; // Re-throw to trigger transaction rollback
        }
    }
}
