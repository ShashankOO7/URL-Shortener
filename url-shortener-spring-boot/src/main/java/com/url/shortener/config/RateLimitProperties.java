package com.url.shortener.config;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
@Component
@ConfigurationProperties(prefix = "rate-limit")
public class RateLimitProperties {
    private EndpointLimit shorten = new EndpointLimit(10, 1);
    private EndpointLimit redirect = new EndpointLimit(60, 1);
    private EndpointLimit login = new EndpointLimit(5, 1);
    private EndpointLimit register = new EndpointLimit(3, 1);
    public EndpointLimit getShorten() { return shorten; }
    public void setShorten(EndpointLimit shorten) { this.shorten = shorten; }
    public EndpointLimit getRedirect() { return redirect; }
    public void setRedirect(EndpointLimit redirect) { this.redirect = redirect; }
    public EndpointLimit getLogin() { return login; }
    public void setLogin(EndpointLimit login) { this.login = login; }
    public EndpointLimit getRegister() { return register; }
    public void setRegister(EndpointLimit register) { this.register = register; }
    public static class EndpointLimit {
        private int requests;
        private int minutes;
        public EndpointLimit() {}
        public EndpointLimit(int requests, int minutes) {
            this.requests = requests;
            this.minutes = minutes;
        }
        public int getRequests() { return requests; }
        public void setRequests(int requests) { this.requests = requests; }
        public int getMinutes() { return minutes; }
        public void setMinutes(int minutes) { this.minutes = minutes; }
    }
}
