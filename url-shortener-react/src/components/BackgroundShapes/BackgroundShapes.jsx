// src/components/BackgroundShapes.jsx
import React from "react";
import "./BackgroundShapes.css"; // custom animation styles
export default function BackgroundShapes() {
  return (
    <div className="hidden md:block absolute inset-0 z-0 overflow-hidden">
      
      {/* Shape 1 */}
      <div className="bg-shape shadow-xl/30 w-59 h-59 absolute bottom-[35%] left-[7%] animate-rotate-reverse"></div>
      {/* Shape 2 */}
      <div className="bg-shape shadow-xl/30 w-48 h-48 absolute top-[12%] right-[12%] animate-rotate-slow"></div>
      {/* Shape 3 */}
      <div className="bg-shape shadow-xl/30 w-32 h-32 absolute bottom-[5%] right-[20%] animate-rotate-reverse"></div>
    </div>
  );
}
