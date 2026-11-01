# Use a Java 23 JDK image to build the Spring Boot app
FROM maven:3.9-eclipse-temurin-23 AS build
WORKDIR /app
COPY pom.xml ./
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

# Use a Java 23 runtime image to run the application
FROM eclipse-temurin:23-jre

# Set the working directory
WORKDIR /app

# Copy the built JAR file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose port 8080
EXPOSE 8080

# Specify the command to run the application
ENTRYPOINT ["java", "-jar", "/app/app.jar"]

# Deployment commands
# docker build -t url-shortener-spring-boot .
# docker tag url-shortener-spring-boot shashanko07/url-shortener-spring-boot:latest
# docker push shashanko07/url-shortener-spring-boot:latest