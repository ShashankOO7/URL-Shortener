import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { CgWebsite } from "react-icons/cg";
export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-700 py-6 px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-4">
        {/* Social Links */}
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/ShashankOO7"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="mailto:shashankchaurasia7@hotmail.com"
            aria-label="Email"
          >
            <MdEmail size={24} />
          </a>
          <a
            href="https://linkedin.com/in/shashank-chaurasia-oo7"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://shashankoo7.github.io/PortFolio/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Portfolio"
          >
            <CgWebsite size={24} />
          </a>
        </div>
        {/* Copyright */}
        <div className="text-center text-sm">
          <p>Copyright © 2025 - All right reserved</p>
          <p className="font-medium">Shashank Chaurasia</p>
        </div>
      </div>
    </footer>
  );
}
