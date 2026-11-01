package com.url.shortener;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
@SpringBootApplication
@EnableScheduling
public class UrlShortnerSpringBootApplication {
    public static void main(String[] args) {
        SpringApplication.run(UrlShortnerSpringBootApplication.class, args);
    }
}
