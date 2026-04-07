"use client";

import React from "react";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

/**
 * A simple component for gradient text. 
 * The animation has been removed to keep it static as requested.
 */
export default function GradientText({
  children,
  className = "",
  as: Component = "span",
}: GradientTextProps) {
  return (
    <Component
      className={`gradient-text-base ${className}`}
    >
      {children}
    </Component>
  );
}
