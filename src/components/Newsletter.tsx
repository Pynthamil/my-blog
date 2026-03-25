"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { subscribeToNewsletter } from "@/app/actions/newsletter";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

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
      setEmail("");
    } else {
      setStatus("error");
      setErrorMessage(result.error || "Failed to subscribe.");
    }
  };

  return (
    <section className="w-full flex justify-center px-4 py-12">
      <div className="w-full max-w-[1100px]">
        <div className="glow-border-strong rounded-3xl bg-[#111115]/60 backdrop-blur-md px-6 md:px-10 py-8 md:py-10">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center text-center py-4"
              >
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-4 border border-purple-500/30">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h2 className="font-syne text-2xl font-bold text-white mb-2 underline decoration-purple-500/30">You&apos;re in! 🎉</h2>
                <p className="text-gray-400 max-w-sm">Thanks for joining the grind. Keep an eye on your inbox for new logs!</p>
                <button 
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-xs font-bold text-gray-500 hover:text-purple-400 transition-colors uppercase tracking-widest"
                >
                  Back to form
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                {/* Text */}
                <div className="flex-shrink-0">
                  <h2 className="font-syne text-2xl md:text-3xl font-extrabold text-white mb-1.5">
                    Stay in the loop.
                  </h2>
                  <p className="text-sm text-gray-400 font-medium">
                    {"//"}<span className="text-gray-500 ml-1">New post every week. Let&apos;s grind together!!!</span>
                  </p>
                </div>

                {/* Form */}
                <div className="flex flex-col gap-2 w-full md:w-auto">
                  <form 
                    onSubmit={handleSubscribe}
                    className="flex items-center gap-3 w-full md:w-auto"
                  >
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      aria-label="Email Address"
                      disabled={status === "loading"}
                      className={`bg-[#0f0f11] border text-sm text-gray-300 rounded-lg px-4 py-2.5 w-full md:w-64 focus:outline-none transition-all placeholder:text-gray-600 disabled:opacity-50 ${
                        status === "error" ? "border-red-500/50 ring-1 ring-red-500/10" : "border-gray-800 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/10"
                      }`}
                    />
                    <button 
                      type="submit"
                      disabled={status === "loading"}
                      className="btn-purple text-white text-xs font-bold px-6 py-2.5 rounded-lg uppercase tracking-wider whitespace-nowrap cursor-pointer disabled:grayscale disabled:opacity-50 relative min-w-[120px]"
                    >
                      {status === "loading" ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Sending...</span>
                        </div>
                      ) : (
                        "Subscribe"
                      )}
                    </button>
                  </form>
                  {status === "error" && (
                    <p className="text-[10px] md:text-xs text-red-400/90 font-medium animate-pulse ml-1">
                      {errorMessage}
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
