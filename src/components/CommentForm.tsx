"use client";

import { useTransition, useState, useEffect } from "react";
import { addComment } from "@/app/actions/comments";
import { motion, AnimatePresence } from "framer-motion";

interface CommentFormProps {
  slug: string;
  parentId?: string | null;
  onSuccess: () => void;
  onCancel?: () => void;
}

export default function CommentForm({ slug, parentId = null, onSuccess, onCancel }: CommentFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
        onSuccess();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, onSuccess]);

  async function action(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await addComment(formData);
      if (result?.error) {
        setError(result.error);
      } else {
        setSuccess(true);
      }
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full mt-4"
    >
      <form action={action} className="space-y-4">
        <input type="hidden" name="slug" value={slug} />
        {parentId && <input type="hidden" name="parent_id" value={parentId} />}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative group">
            <input
              type="text"
              name="author_name"
              required
              placeholder="Your name"
              className="w-full bg-[var(--bg-primary)]/50 backdrop-blur-sm border border-[var(--border-glow)] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#A78BFA]/50 transition-all text-sm"
              disabled={isPending}
            />
          </div>
          <div className="relative group">
            <input
              type="email"
              name="author_email"
              required
              placeholder="Your email (required)"
              className="w-full bg-[var(--bg-primary)]/50 backdrop-blur-sm border border-[var(--border-glow)] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#A78BFA]/50 transition-all text-sm"
              disabled={isPending}
            />
          </div>
        </div>

        <div className="relative group">
          <textarea
            name="content"
            required
            placeholder={parentId ? "Write a reply..." : "Write a comment..."}
            rows={4}
            className="w-full bg-[var(--bg-primary)]/50 backdrop-blur-sm border border-[var(--border-glow)] rounded-2xl px-4 py-4 outline-none focus:ring-2 focus:ring-[#A78BFA]/50 transition-all text-sm resize-none"
            disabled={isPending}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex-1 mr-4">
            <AnimatePresence mode="wait">
              {error && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="text-xs text-red-400 font-medium"
                >
                  {error}
                </motion.p>
              )}
              {success && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="text-xs text-green-400 font-medium"
                >
                  Comment posted successfully! 🎉
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          
          <div className="flex gap-2">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-2.5 rounded-xl text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-all"
                disabled={isPending}
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={isPending}
              className="relative px-8 py-2.5 rounded-xl bg-gradient-to-r from-[#A78BFA] to-[#C084FC] text-white text-sm font-bold shadow-lg shadow-[#A78BFA]/20 hover:shadow-[#A78BFA]/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden"
            >
              <span className={isPending ? "opacity-0" : "opacity-100"}>
                {parentId ? "Post Reply" : "Post Comment"}
              </span>
              {isPending && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                </div>
              )}
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
}
