import React from "react";
import HeroSection from "../../components/HeroSection/HeroSection";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";
import BackgroundShapes from "../../components/BackgroundShapes/BackgroundShapes";
import Login from "../Login/LoginPage";
import Register from "../Register/RegisterPage";
import { authConstants } from "../../constants/authConstants";
export default function LandingPage({ page }) {
  return (
    <>
      <BackgroundShapes />
      {/* Conditionally render based on route */}
      {page === authConstants.loginConstants.LOGIN ? (
        <Login />
      ) : page === authConstants.registerConstants.REGISTER ? (
        <Register />
      ) : (
        <HeroSection />
      )}
      <ThemeToggle />
    </>
  );
}
