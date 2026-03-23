"use client";

import { useState, useEffect } from "react";

export default function ShareButtons({ title }: { title: string }) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const handleCopy = () => {
    if (!url) return;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const strTitle = encodeURIComponent(title);
  const strUrl = encodeURIComponent(url);

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-syne font-bold text-gray-500 uppercase tracking-widest mr-2">
        Share
      </span>
      
      {/* Twitter / X */}
      <a 
        href={`https://twitter.com/intent/tweet?text=${strTitle}&url=${strUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-full bg-[#1a1a24] border border-purple-500/20 hover:border-purple-500/50 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]"
        aria-label="Share on X (Twitter)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
          <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"/>
        </svg>
      </a>

      {/* LinkedIn */}
      <a 
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${strUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-full bg-[#1a1a24] border border-purple-500/20 hover:border-purple-500/50 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]"
        aria-label="Share on LinkedIn"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
          <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
        </svg>
      </a>

      {/* Copy Link */}
      <button 
        onClick={handleCopy}
        className="w-10 h-10 rounded-full bg-[#1a1a24] border border-purple-500/20 hover:border-purple-500/50 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]"
        aria-label="Copy link"
      >
        {copied ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
          </svg>
        )}
      </button>
    </div>
  );
}
