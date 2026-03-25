"use client";
import { useLayoutEffect } from "react";
import hljs from "highlight.js";

// Import the gorgeous Atom One Dark theme (like VS Code!)
import "highlight.js/styles/atom-one-dark.css";

export default function SyntaxHighlighter() {
  useLayoutEffect(() => {
    // Highlight as soon as the post HTML is committed to the DOM.
    // This reduces the "some blocks update a moment later" feeling after navigation.
    const codeBlocks = document.querySelectorAll("pre code");

    codeBlocks.forEach((block) => {
      // 1. Highlight the code
      hljs.highlightElement(block as HTMLElement);

      // 2. Add Copy Button if it doesn't exist
      const pre = block.parentElement;
      if (pre && pre.tagName === "PRE" && !pre.querySelector(".copy-button")) {
        // Ensure container is relative for absolute positioning
        pre.style.position = "relative";

        const button = document.createElement("button");
        button.className =
          "copy-button absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-lg bg-black/40 backdrop-blur-md border border-white/10 hover:bg-black/60 hover:border-white/20 transition-all group z-10 cursor-pointer";
        button.setAttribute("aria-label", "Copy code");

        // Default Copy Icon (Lucide-style)
        const copyIcon = `
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="group-hover:stroke-white transition-colors">
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
          </svg>
        `;

        // Success Checkmark Icon
        const checkIcon = `
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        `;

        button.innerHTML = copyIcon;

        button.onclick = async () => {
          const text = block.textContent || "";
          try {
            await navigator.clipboard.writeText(text);

            // Success State
            button.innerHTML = checkIcon;
            button.classList.add("bg-purple-500/10", "border-purple-500/30");

            setTimeout(() => {
              button.innerHTML = copyIcon;
              button.classList.remove("bg-purple-500/10", "border-purple-500/30");
            }, 2000);
          } catch (err) {
            console.error("Failed to copy!", err);
          }
        };

        pre.appendChild(button);
      }
    });
  }, []);

  return null;
}
