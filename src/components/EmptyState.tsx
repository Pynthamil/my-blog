import React from "react";

export interface EmptyStateProps {
  title: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  icon?: React.ReactNode;
  className?: string;
}

export default function EmptyState({
  title,
  description,
  buttonText,
  buttonLink,
  icon,
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-4 text-center w-full ${className}`}>
      {icon && (
        <div className="w-16 h-16 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center mb-6 border border-[var(--purple-500)]/20 text-[var(--purple-500)] shadow-[0_0_15px_rgba(168,85,247,0.15)] glow-border-strong">
          {icon}
        </div>
      )}
      <h3 className="font-syne text-[22px] md:text-2xl font-bold bg-gradient-to-r from-[var(--purple-400)] to-[var(--text-primary)] bg-clip-text text-transparent mb-3 lowercase tracking-tight">
        {title}
      </h3>
      {description && (
        <p className="text-[var(--text-secondary)] text-[15px] mb-8 max-w-sm lowercase leading-relaxed">
          {description}
        </p>
      )}
      {buttonText && buttonLink && (
        <a
          href={buttonLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-purple text-white text-[11px] font-bold px-6 py-3 rounded-lg uppercase tracking-[0.1em] transition-all hover:-translate-y-0.5"
        >
          {buttonText}
        </a>
      )}
      {buttonText && !buttonLink && (
        <button className="btn-purple text-white text-[11px] font-bold px-6 py-3 rounded-lg uppercase tracking-[0.1em] transition-all hover:-translate-y-0.5">
          {buttonText}
        </button>
      )}
    </div>
  );
}
