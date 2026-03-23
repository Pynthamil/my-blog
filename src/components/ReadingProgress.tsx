"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (docHeight > 0) {
        const scrolled = (scrollY / docHeight) * 100;
        setWidth(scrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger once on mount to handle initial state if user hits refresh mid-page
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[100] bg-transparent pointer-events-none">
      <div 
        className="h-full bg-gradient-to-r from-violet-600 via-purple-400 to-white shadow-[0_0_12px_rgba(168,85,247,0.9)] transition-all duration-100 ease-out flex justify-end items-center"
        style={{ width: `${width}%` }}
      >
        {/* Glowing comet head at the front of the progress bar */}
        <div className="h-[3px] w-12 bg-white blur-[2px] opacity-100 rounded-full mix-blend-screen" />
      </div>
    </div>
  );
}
