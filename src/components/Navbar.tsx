"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Posts", href: "/posts" },
    { name: "Tags", href: "/tags" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 w-full flex justify-center px-4 pointer-events-none"
      style={{ paddingTop: "calc(1.5rem + env(safe-area-inset-top))" }}
    >
      <div className="relative w-full max-w-[1100px] border border-[var(--navbar-border)] rounded-[12px] px-4 sm:px-6 py-3 flex items-center justify-between gap-3 pointer-events-auto bg-[var(--navbar-bg)] backdrop-blur-[20px] shadow-[var(--card-shadow)] ring-1 ring-[#A78BFA]/5">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2.5 transition-all hover:scale-[1.02]">
          <div className="relative w-8 h-8 md:w-9 md:h-9 shrink-0 drop-shadow-[0_0_8px_rgba(167,139,250,0.3)]">
            <Image 
              src="/images/TerminalIcon.svg" 
              alt="pyndu logs icon" 
              fill 
              className="object-contain"
            />
          </div>
          <span className="font-syne font-bold text-[18px] md:text-[20px] tracking-tight text-[var(--text-primary)] group-hover:text-[#A78BFA] transition-colors">
            pyndulogs<span className="text-[var(--text-secondary)] group-hover:text-foreground transition-colors">()</span>
          </span>
        </Link>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          {/* Desktop nav items */}
          <div className="hidden md:flex items-center gap-4 sm:gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-[13px] sm:text-sm transition-all py-1 ${
                    isActive
                      ? "text-[var(--text-primary)] font-semibold drop-shadow-[0_0_8px_rgba(167,139,250,0.4)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#C4B5FD] to-[#A78BFA] rounded-full shadow-[0_0_10px_rgba(167,139,250,0.5)]" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Search Icon */}
          <Link
            href="/search"
            className={`transition-all inline-block hover:scale-110 active:scale-95 ${
              pathname === "/search"
                ? "text-[#A78BFA] drop-shadow-[0_0_10px_rgba(167,139,250,0.5)]"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
            aria-label="Search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </Link>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* GitHub Icon */}
          <a
            href="https://github.com/Pynthamil"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-all hover:scale-110 active:scale-95 border border-[var(--navbar-border)] shadow-sm"
            aria-label="GitHub"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors active:scale-95 border border-[var(--navbar-border)]"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((v) => !v)}
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile dropdown */}
        {isMenuOpen && (
          <div className="absolute left-0 right-0 top-full mt-3 md:hidden z-10 rounded-[12px] border border-[var(--navbar-border)] bg-[var(--navbar-bg)] backdrop-blur-[20px] shadow-[var(--card-shadow)] p-2">
            <div className="flex flex-col">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-4 py-3 rounded-[10px] text-[14px] font-medium transition-all ${
                      isActive
                        ? "text-[var(--text-primary)] bg-[#A78BFA]/10 border border-[#A78BFA]/20"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
