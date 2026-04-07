"use client";

import { useState } from "react";
import type { Comment } from "@/app/actions/comments";
import CommentForm from "./CommentForm";
import { motion, AnimatePresence } from "framer-motion";

interface CommentItemProps {
  comment: Comment;
  slug: string;
  onSuccess: () => void;
  depth?: number;
}

export default function CommentItem({ comment, slug, onSuccess, depth = 0 }: CommentItemProps) {
  const [isReplying, setIsReplying] = useState(false);
  const maxDepth = 3;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getAvatarFallback = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={`relative group ${depth > 0 ? "ml-4 md:ml-10 mt-6" : "mt-8"}`}
    >
      {/* Thread line for nested comments */}
      {depth > 0 && (
        <div className="absolute -left-6 md:-left-10 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#A78BFA]/30 via-[#A78BFA]/10 to-transparent rounded-full" />
      )}

      <div className="flex gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#A78BFA] to-[#C084FC] p-[1px] shadow-lg shadow-[#A78BFA]/10">
            <div className="w-full h-full rounded-full bg-[var(--bg-secondary)] flex items-center justify-center text-[#A78BFA] font-syne font-bold text-lg">
              {getAvatarFallback(comment.author_name)}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h4 className="text-sm md:text-base font-syne font-bold text-[var(--text-primary)]">
              {comment.author_name}
            </h4>
            <span className="text-[10px] md:text-xs text-[var(--text-secondary)] font-medium">
              {formatDate(comment.created_at)}
            </span>
          </div>

          <p className="text-sm md:text-[15px] leading-relaxed text-[var(--text-primary)]/80">
            {comment.content}
          </p>

          {/* Action Footer */}
          <div className="flex items-center gap-4 pt-1">
            <button
              onClick={() => setIsReplying(!isReplying)}
              className="text-xs font-bold text-[#A78BFA] hover:text-[#C084FC] transition-colors p-1 -ml-1 rounded-md"
            >
              {isReplying ? "Cancel Reply" : "Reply"}
            </button>
          </div>

          {/* Reply Form */}
          <AnimatePresence>
            {isReplying && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-2">
                  <CommentForm
                    slug={slug}
                    parentId={comment.id}
                    onSuccess={() => {
                      setIsReplying(false);
                      onSuccess();
                    }}
                    onCancel={() => setIsReplying(false)}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="space-y-2">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              slug={slug}
              onSuccess={onSuccess}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
