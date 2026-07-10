"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full mt-auto bg-[var(--bg-secondary)] text-foreground">
      <div className="max-w-[1200px] mx-auto py-12 px-8 flex flex-col md:flex-row items-start justify-between gap-12 border-t border-foreground/10">
        
        {/* Left side: Logo & Copyright */}
        <div className="flex flex-col gap-6">
          <Link href="/" className="group flex items-center gap-3 transition-all hover:scale-[1.02] w-fit">
            <div className="relative w-12 h-12 shrink-0 drop-shadow-[0_0_8px_rgba(99,103,255,0.3)]">
              <Image 
                src="/images/TerminalIcon.svg" 
                alt="pyndu logs icon" 
                fill 
                className="object-contain"
              />
            </div>
            <span className="font-syne font-bold text-3xl md:text-4xl tracking-tight text-[var(--text-primary)] group-hover:text-purple-400 transition-colors">
              pyndulogs<span className="text-[var(--text-secondary)] group-hover:text-foreground transition-colors">()</span>
            </span>
          </Link>
          <p className="text-muted text-xs">
            © {new Date().getFullYear()} pyndu. All Rights Reserved.
          </p>
        </div>

        {/* Right side: Links */}
        <div className="flex flex-row flex-wrap gap-12 md:gap-16 lg:gap-24">
          
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold mb-1">Connect</h4>
            <a href="#" className="text-xs text-muted hover:text-foreground hover:text-purple-400 transition-colors">Send a Message</a>
            <a href="https://github.com/pyndu" target="_blank" rel="noopener noreferrer" className="text-xs text-muted hover:text-foreground hover:text-purple-400 transition-colors">GitHub</a>
            <a href="#" className="text-xs text-muted hover:text-foreground hover:text-purple-400 transition-colors">LinkedIn</a>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold mb-1">Navigation</h4>
            <a href="/" className="text-xs text-muted hover:text-foreground hover:text-purple-400 transition-colors">Home</a>
            <a href="#" className="text-xs text-muted hover:text-foreground hover:text-purple-400 transition-colors">Blog</a>
            <a href="#" className="text-xs text-muted hover:text-foreground hover:text-purple-400 transition-colors">Projects</a>
            <a href="#" className="text-xs text-muted hover:text-foreground hover:text-purple-400 transition-colors">About</a>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold mb-1">Resources</h4>
            <a href="#" className="text-xs text-muted hover:text-foreground hover:text-purple-400 transition-colors">Archive</a>
            <a href="#" className="text-xs text-muted hover:text-foreground hover:text-purple-400 transition-colors">Tags</a>
            <a href="#" className="text-xs text-muted hover:text-foreground hover:text-purple-400 transition-colors">RSS Feed</a>
            <a href="#" className="text-xs text-muted hover:text-foreground hover:text-purple-400 transition-colors">Search</a>
          </div>

        </div>
      </div>
    </footer>
  );
}
