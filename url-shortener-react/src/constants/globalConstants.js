export const globalConstants = {
    APP_TITLE: "Linkly",
    baseUrl: import.meta.env.VITE_BACKEND_URL || "http://localhost:8080",
    apiBaseUrl: `${import.meta.env.VITE_BACKEND_URL || "http://localhost:8080"}/api`,
    footer: {
        text: "to enjoy Unlimited History",
    },
    theme: {
        light: "light",
        dark: "dark",
        lightLabel: "Light",
        darkLabel: "Dark"
    },
    inputField: {
        email: {
            label: "Email",
            id: "email",
            type: "email",
            placeholder: "Enter your email",
            required: true,
            message: "*Email is required",
        },
        password: {
            label: "Password",
            id: "password",
            type: "password",
            placeholder: "Enter your password",
            required: true,
            message: "*Password is required",
            min: 5,
        },
        userName: {
            label: "Username",
            id: "username",
            type: "text",
            placeholder: "Enter your username",
            required: true,
            message: "*Username is required",
            min: 3,
        },
        confirmPassword: {
            label: "Confirm Password",
            id: "confirmPassword",
            type: "password",
            placeholder: "Confirm your password",
            required: true,
            message: "*Confirm Password is required",
            min: 5,
        },
    },
}
