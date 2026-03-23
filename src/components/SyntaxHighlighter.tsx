"use client";

import { useEffect } from "react";
import hljs from "highlight.js";

// Import the gorgeous Atom One Dark theme (like VS Code!)
import "highlight.js/styles/atom-one-dark.css";

export default function SyntaxHighlighter() {
  useEffect(() => {
    // Give the DOM a tiny fraction of a second to render the dangerouslySetInnerHTML
    // before attempting to highlight everything
    const timeout = setTimeout(() => {
      document.querySelectorAll("pre code").forEach((block) => {
        hljs.highlightElement(block as HTMLElement);
      });
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  return null;
}
