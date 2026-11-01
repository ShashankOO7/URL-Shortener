import React from "react";
import LinkInput from "../LinkInput/LinkInput";
import { Link } from "react-router-dom";
import { authConstants } from "../../constants/authConstants";
import { globalConstants } from "../../constants/globalConstants";
import "./index.css";
import { landingPageConstants } from "../../constants/landingPageConstants";
import { useAuthContext } from "../../hooks/useAuthContext";
export default function HeroSection() {
  const { token } = useAuthContext();
  return (
    <section className="h-screen flex flex-col justify-evenly items-center relative text-center px-4 z-10 mt-20">
      <div className="flex flex-col items-center text-secondary dark:text-secondary-dark">
      <h2 className="h-25 w-88 md:w-full text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 via-blue-500 to-teal-500 bg-clip-text text-transparent animate-gradient">
        {landingPageConstants.Header}
      </h2>
      <p className="h-20 w-full text-lg font-extralight max-w-2xl">
        {landingPageConstants.content}
      </p>
      <div className="h-30 py-8 w-9/10">
        <LinkInput />
      </div>
      </div>
      {!token ? (
        <div className="flex flex-col items-center">
          <p className="mt-4 text-gray-500 text-md">
          <Link to="/register" className="text-blue-500 cursor-pointer underline">
            {authConstants.REGISTER_NOW}
          </Link>{" "}
          {globalConstants.footer.text}
        </p>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <p className="mt-4 text-gray-500 text-md">
          View {" "}
          <Link to="/dashboard" className="text-blue-500 cursor-pointer underline">
            History
          </Link>{" "}
          to see all your shortened URLs
        </p>
        </div>
      )}
    </section>
  );
}
