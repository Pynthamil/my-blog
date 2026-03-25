"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Posts", href: "/posts" },
    { name: "Tags", href: "/tags" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full flex justify-center pt-6 px-4 pointer-events-none">
      <div className="w-full max-w-[1100px] border border-white/10 rounded-[12px] px-6 py-3 flex items-center justify-between pointer-events-auto bg-black/40 backdrop-blur-[20px] shadow-[0_8px_32px_0_rgba(0,0,0,0.8),inset_0_0_0_1px_rgba(255,255,255,0.05)] ring-1 ring-purple-500/10">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2.5 transition-all hover:scale-[1.02]">
          <div className="relative w-8 h-8 md:w-9 md:h-9 shrink-0 drop-shadow-[0_0_8px_rgba(168,85,247,0.3)]">
            <Image 
              src="/images/TerminalIcon.svg" 
              alt="pyndu logs icon" 
              fill 
              className="object-contain"
            />
          </div>
          <span className="font-syne font-bold text-[18px] md:text-[20px] tracking-tight text-white group-hover:text-purple-300 transition-colors">
            pyndulogs<span className="text-gray-400 group-hover:text-white transition-colors">()</span>
          </span>
        </Link>

        {/* Nav Items */}
        <div className="flex items-center gap-4 sm:gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-[13px] sm:text-sm transition-all py-1 ${
                  isActive
                    ? "text-white font-semibold drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-fuchsia-500 to-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                )}
              </Link>
            );
          })}

          {/* Search Icon */}
          <Link
            href="/search"
            className={`transition-all inline-block hover:scale-110 active:scale-95 ${
              pathname === "/search" 
                ? "text-fuchsia-400 drop-shadow-[0_0_10px_rgba(192,38,211,0.5)]" 
                : "text-gray-400 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
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

          {/* GitHub Icon */}
          <a
            href="https://github.com/Pynthamil"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-black hover:bg-gray-200 transition-all hover:scale-105 active:scale-95"
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
        </div>
      </div>
    </nav>
  );
}
