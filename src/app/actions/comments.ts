"use server";

import { supabase } from "@/lib/supabase";
import { commentsRatelimit } from "@/lib/supabase-ratelimit";
import { headers } from "next/headers";
import { z } from "zod";

const commentSchema = z.object({
  slug: z.string().min(1),
  content: z.string().min(2, "Comment is too short").max(1000, "Comment is too long"),
  author_name: z.string().min(2, "Name is too short").max(50, "Name is too long"),
  author_email: z.string().email("Please enter a valid email address."),
  parent_id: z.string().uuid().optional().nullable(),
});

export type Comment = {
  id: string;
  slug: string;
  content: string;
  author_name: string;
  author_email: string;
  author_ip?: string;
  parent_id: string | null;
  created_at: string;
  replies?: Comment[];
};

/**
 * Fetch all comments for a given slug and structure them into a tree for threading.
 */
export async function getComments(slug: string): Promise<Comment[]> {
  try {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("slug", slug)
      .order("created_at", { ascending: true });

    if (error) throw error;
    if (!data) return [];

    // Structure flat list into a tree
    const commentMap = new Map<string, Comment>();
    const rootComments: Comment[] = [];

    data.forEach((comment) => {
      commentMap.set(comment.id, { ...comment, replies: [] });
    });

    data.forEach((comment) => {
      const node = commentMap.get(comment.id)!;
      if (comment.parent_id && commentMap.has(comment.parent_id)) {
        const parent = commentMap.get(comment.parent_id)!;
        parent.replies!.push(node);
      } else {
        rootComments.push(node);
      }
    });

    return rootComments;
  } catch (error) {
    console.error("[getComments] Error:", error);
    return [];
  }
}

/**
 * Add a new comment.
 */
export async function addComment(formData: FormData) {
  const rawData = {
    slug: formData.get("slug") as string,
    content: formData.get("content") as string,
    author_name: formData.get("author_name") as string,
    author_email: formData.get("author_email") as string,
    parent_id: formData.get("parent_id") as string || null,
  };

  // 1. Validation
  const validation = commentSchema.safeParse(rawData);
  if (!validation.success) {
    return { error: validation.error.issues[0].message };
  }

  // 2. Rate Limiting via Supabase
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") || "127.0.0.1";
  const { success } = await commentsRatelimit.limit(ip);

  if (!success) {
    return { error: "Too many comments. Please wait a while before posting again." };
  }

  try {
    // 3. Insertion with author_ip for tracking
    const { error } = await supabase
      .from("comments")
      .insert([{
        ...validation.data,
        author_ip: ip
      }]);

    if (error) throw error;

    return { success: true };
  } catch (error: any) {
    console.error("[addComment] Error:", error);
    return { error: "Failed to post comment. Please try again." };
  }
}
