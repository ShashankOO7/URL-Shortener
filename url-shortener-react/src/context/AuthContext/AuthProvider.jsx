import { useState } from "react";
import { AuthContext } from "./AuthContext";
const getStoredUsername = () => {
    try {
        const storedUsername = localStorage.getItem("USERNAME");
        if (!storedUsername || storedUsername === "undefined" || storedUsername === "null") {
            return null;
        }
        return JSON.parse(storedUsername);
    } catch {
        localStorage.removeItem("USERNAME");
        return null;
    }
};
export const AuthProvider = ({ children }) => {
    const getToken = () => {
        try {
            const storedToken = localStorage.getItem("JWT_TOKEN");
            // Check if token exists and is not "undefined" string
            if (!storedToken || storedToken === "undefined" || storedToken === "null") {
                return null;
            }
            // Try to parse JSON, return null if parsing fails
            return JSON.parse(storedToken);
        } catch {
            // If parsing fails, clear invalid token and return null
            //console.warn("Invalid token in localStorage, clearing it:");
            localStorage.removeItem("JWT_TOKEN");
            return null;
        }
    };
    const [token, setToken] = useState(getToken());
    const [username, setUsername] = useState(getStoredUsername());
    const sendData = {
        token,
        setToken,
        username,
        setUsername,
    };
    return <AuthContext.Provider value={sendData}>{children}</AuthContext.Provider>
};
