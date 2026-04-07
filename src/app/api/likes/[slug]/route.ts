import { supabase } from "@/lib/supabase";
import { likesRatelimit } from "@/lib/ratelimit";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { data, error } = await supabase
      .from("post_likes")
      .select("count")
      .eq("slug", slug)
      .single();

    if (error && error.code !== "PGRST116") { // PGRST116 is "no rows returned"
      throw error;
    }

    return NextResponse.json({ count: data?.count || 0 });
  } catch (error) {
    console.error("Error fetching likes from Supabase:", error);
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { increment } = await request.json();

    // 0. Rate limiting by IP
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || "127.0.0.1";
    const { success } = await likesRatelimit.limit(`${ip}_${slug}`);

    if (!success) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    // 1. Atomic update via Supabase RPC
    const { data: updatedCount, error } = await supabase
      .rpc("update_post_likes", { 
        post_slug: slug,
        is_increment: increment 
      });

    if (error) throw error;

    return NextResponse.json({ count: updatedCount });
  } catch (error) {
    console.error("Error updating likes in Supabase:", error);
    return NextResponse.json({ error: "Failed to update likes" }, { status: 500 });
  }
}
