"use client";

import React from "react";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export default function AnimatedGradientText({
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
