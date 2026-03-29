"use client";

import React from "react";

const NyanLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <img 
        src="/nyan-cat.gif" 
        alt="Nyan Cat" 
        className="w-[120px] h-auto"
      />
      <span className="font-mono text-gray-500 text-sm tracking-widest uppercase animate-pulse">
        loading...
      </span>
    </div>
  );
};

export default NyanLoader;
