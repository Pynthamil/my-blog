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
        className="h-full bg-[#6367FF] shadow-[0_0_15px_rgba(99,103,255,0.9)] transition-all duration-100 ease-out flex justify-end items-center"
        style={{ width: `${width}%` }}
      >
      </div>
    </div>
  );
}
