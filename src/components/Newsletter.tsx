"use client";

import { useState } from "react";
import Image from "next/image";
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
    <section className="w-full relative mt-32">
      {/* Convex curve that matches the section background */}
      <div className="absolute top-[-10vw] left-0 w-full h-[10vw] overflow-hidden pointer-events-none z-10">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,120 Q600,0 1200,120 Z" className="fill-[var(--bg-secondary)]" />
        </svg>
      </div>

      <div className="bg-[var(--bg-secondary)] w-full pt-16 pb-24 md:pt-24 md:pb-24 px-6 flex flex-col items-center justify-center relative z-0">
        
        {/* Main Header Container with Floating Badges */}
        <div className="relative w-full max-w-4xl flex flex-col items-center justify-center text-center">
          
          <div className="relative w-72 h-72 sm:w-96 sm:h-96 mb-6 opacity-90 drop-shadow-[0_0_12px_rgba(99,103,255,0.2)]">
            <Image 
              src="/images/macbook.svg"
              alt="Macbook"
              fill
              className="object-contain"
            />
          </div>

          <h2 className="font-playfair text-foreground text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight relative z-10 max-w-2xl">
            watch me figure <br className="hidden sm:block" />
            <span className="italic font-medium text-[1.15em] text-foreground lowercase">it all</span> out.
          </h2>


        </div>

        {/* Subtext and Form */}
        <div className="mt-8 md:mt-12 max-w-[420px] w-full flex flex-col items-center text-center relative z-10">
          <p className="text-muted text-[15px] md:text-base font-medium mb-8 leading-relaxed">
            Nothing great is ever built alone, so why not make the next big thing together?
          </p>
          
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center py-4 w-full"
              >
                <div className="w-12 h-12 bg-foreground/5 rounded-full flex items-center justify-center mb-4 border border-foreground/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-foreground" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-playfair text-3xl text-foreground italic font-medium">{successMessage}</h3>
                <p className="text-muted text-sm mt-3">I&apos;ll be in touch soon.</p>
                <button 
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-xs text-muted hover:text-foreground transition-colors uppercase tracking-widest border border-transparent hover:border-foreground/30 px-4 py-2 rounded-full"
                >
                  Back
                </button>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubscribe}
                className="w-full flex flex-col gap-3"
              >
                <div className="relative w-full">
                  <label htmlFor="newsletter-email" className="sr-only">Email Address</label>
                  <input
                    id="newsletter-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    disabled={status === "loading"}
                    className="bg-transparent border border-foreground/20 text-foreground rounded-full px-6 py-3.5 w-full focus:outline-none focus:border-foreground/50 transition-colors placeholder:text-muted/60 text-center shadow-inner"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-foreground text-[var(--bg-secondary)] font-semibold rounded-full px-6 py-3.5 w-full hover:scale-[1.02] transition-all active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  {status === "loading" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[var(--bg-secondary)]/30 border-t-[var(--bg-secondary)] rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    "Subscribe"
                  )}
                </button>
                {status === "error" && (
                  <p className="text-sm text-red-400 mt-2 font-medium">{errorMessage}</p>
                )}
              </motion.form>
            )}
          </AnimatePresence>
          

        </div>
      </div>
    </section>
  );
}
