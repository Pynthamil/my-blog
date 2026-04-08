"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global Error Caught:", error);
  }, [error]);

  return (
    <main className="flex-1 flex flex-col items-center justify-center min-h-[70vh] px-4 relative overflow-hidden">
      {/* Background ambient glows - matching the blog's aesthetic */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-purple-600/5 blur-[100px] rounded-full pointer-events-none -z-10" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center z-10"
      >
        <div className="mb-8 relative inline-block">
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-24 h-24 bg-gradient-to-br from-red-500/20 to-purple-500/20 rounded-3xl border border-red-500/30 flex items-center justify-center mx-auto shadow-2xl shadow-red-500/10 backdrop-blur-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-red-400"
            >
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
            </svg>
          </motion.div>
        </div>

        <h1 className="font-syne text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
          Oops! Logic Error
        </h1>
        <p className="text-gray-400 max-w-md mx-auto mb-10 text-lg leading-relaxed">
          The application encountered an unexpected glitch. This usually happens when an external API drifts offline or a function returns something weird.
        </p>

        {process.env.NODE_ENV === "development" && (
          <div className="mb-10 p-4 rounded-xl bg-red-500/5 border border-red-500/10 text-left max-w-xl mx-auto overflow-auto max-h-40 scrollbar-thin">
            <p className="text-red-400 font-mono text-xs break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-gray-600 font-mono text-[10px] mt-1 italic">
                Digest: {error.digest}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95"
          >
            Try Again
          </button>
          
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all group"
          >
            Return Home
          </Link>
        </div>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-red-500 rounded-full animate-pulse" />
        <div className="absolute top-3/4 right-1/3 w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDuration: '3s' }} />
        <div className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-white rounded-full opacity-50" />
      </div>
    </main>
  );
}
