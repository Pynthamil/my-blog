"use client";

import { useEffect, useState, useTransition } from "react";
import { getComments, type Comment } from "@/app/actions/comments";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";
import { motion, AnimatePresence } from "framer-motion";

export default function CommentList({ slug }: { slug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, startTransition] = useTransition();

  const fetchComments = async () => {
    setIsLoading(true);
    const data = await getComments(slug);
    setComments(data);
    setIsLoading(false);
  };

  const refreshComments = async () => {
    startTransition(async () => {
      const data = await getComments(slug);
      setComments(data);
    });
  };

  useEffect(() => {
    fetchComments();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <div className="w-8 h-8 border-2 border-[#A78BFA]/30 border-t-[#A78BFA] rounded-full animate-spin" />
        <p className="text-xs text-[var(--text-secondary)] font-medium">Loading comments...</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-12">
      {/* Top Comment Form */}
      <div className="relative">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1.5 h-6 bg-gradient-to-b from-[#A78BFA] to-[#C084FC] rounded-full" />
          <h3 className="font-syne text-xl font-bold text-[var(--text-primary)]">Leave a comment</h3>
        </div>
        <CommentForm slug={slug} onSuccess={refreshComments} />
      </div>

      {/* Comments list */}
      <div className="space-y-4 relative">
        <div className="flex items-center justify-between mb-8">
           <div className="flex items-center gap-2">
            <h3 className="font-syne text-xl font-bold text-[var(--text-primary)]">
              {comments.length === 0 ? "No comments yet" : `${comments.length} ${comments.length === 1 ? "Comment" : "Comments"}`}
            </h3>
            {isRefreshing && (
              <div className="w-3 h-3 border border-[#A78BFA]/30 border-t-[#A78BFA] rounded-full animate-spin" />
            )}
          </div>
        </div>

        <AnimatePresence mode="popLayout">
          {comments.length > 0 ? (
            <div className="divide-y divide-[var(--border-glow)]/30 space-y-6">
              {comments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  slug={slug}
                  onSuccess={refreshComments}
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-12 text-center"
            >
              <p className="text-sm text-[var(--text-secondary)]">Be the first to share your thoughts!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
