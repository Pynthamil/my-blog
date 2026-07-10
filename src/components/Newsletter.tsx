"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { subscribeToNewsletter } from "@/app/actions/newsletter";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("You're in ✨");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setErrorMessage("");
    
    // Call the Server Action
    const formData = new FormData();
    formData.append("email", email);
    
    const result = await subscribeToNewsletter(formData);

    if (result.success) {
      setStatus("success");
      if (result.message) {
        setSuccessMessage(result.message);
      }
      setEmail("");
    } else {
      setStatus("error");
      setErrorMessage(result.error || "Failed to subscribe.");
    }
  };

  return (
    <section className="w-full flex justify-center px-4 py-12" aria-labelledby="newsletter-heading">
      <div className="w-full max-w-[1100px]">
        <div className="glow-border-strong rounded-3xl bg-[var(--section-bg)] backdrop-blur-md px-6 md:px-10 py-8 md:py-10">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center text-center py-4"
                role="status"
              >
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-4 border border-purple-500/30">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h2 id="newsletter-heading" className="font-syne text-2xl font-bold text-foreground mb-2 underline decoration-purple-500/30">
                  {successMessage}
                </h2>
                <p className="text-muted max-w-sm">Keep an eye on your inbox for new logs!</p>
                <button 
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-xs font-bold text-gray-500 hover:text-purple-400 transition-colors uppercase tracking-widest"
                >
                  Back to form
                </button>
              </motion.div>
            ) : <motion.div
                key="form"
                className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12 w-full"
              >
                {/* Left side: Icon + Text */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 flex-1">
                  {/* Icon */}
                  <div className="shrink-0">
                    <img 
                      src="/images/sideSmiley.svg" 
                      alt="Smiley" 
                      className="w-20 h-20 md:w-28 md:h-28 object-contain"
                    />
                  </div>
                  
                  {/* Text Container */}
                  <div className="flex flex-col max-w-md">
                    <h2 id="newsletter-heading" className="font-syne text-2xl md:text-[28px] font-extrabold text-foreground mb-2">
                      Stay in the loop
                    </h2>
                    <p className="text-sm text-muted font-medium mb-3">
                      Be the first to get updates on my latest posts, thoughts, and new projects.
                    </p>
                    <p className="text-[10px] text-muted/60 leading-tight max-w-sm">
                      By signing up, you're agreeing to receive emails from me. No spam, ever.
                    </p>
                  </div>
                </div>

                {/* Right side: Form */}
                <div className="flex flex-col gap-2 w-full lg:w-auto shrink-0 mt-4 lg:mt-0">
                  <form 
                    onSubmit={handleSubscribe}
                    className="flex flex-col sm:flex-row items-center gap-3 w-full"
                  >
                    <div className="relative w-full sm:w-64">
                      <label htmlFor="newsletter-email" className="sr-only">Email Address</label>
                      <input
                        id="newsletter-email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email address"
                        aria-label="Email Address"
                        disabled={status === "loading"}
                        aria-invalid={status === "error"}
                        aria-describedby={status === "error" ? "newsletter-error" : undefined}
                        className={`bg-[var(--bg-primary)] border text-sm text-foreground rounded-full px-5 py-3 w-full focus:outline-none transition-all placeholder:text-muted/60 disabled:opacity-50 ${
                          status === "error" ? "border-red-500/50 ring-1 ring-red-500/10" : "border-[var(--border-subtle)] focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/10"
                        }`}
                      />
                    </div>
                    <button 
                      type="submit"
                      disabled={status === "loading"}
                      className="bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black text-sm font-bold px-7 py-3 rounded-full transition-colors cursor-pointer disabled:grayscale disabled:opacity-50 relative min-w-[120px] w-full sm:w-auto"
                    >
                      {status === "loading" ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          <span>Wait</span>
                        </div>
                      ) : (
                        "Subscribe"
                      )}
                    </button>
                  </form>
                  {status === "error" && (
                    <p id="newsletter-error" className="text-[10px] md:text-xs text-red-500/90 font-medium animate-pulse sm:ml-4 mt-1" role="alert">
                      {errorMessage}
                    </p>
                  )}
                </div>
              </motion.div>}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
