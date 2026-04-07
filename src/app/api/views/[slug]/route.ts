import { supabase } from "@/lib/supabase";
import { viewsRatelimit } from "@/lib/supabase-ratelimit";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { data, error } = await supabase
      .from("post_views")
      .select("count")
      .eq("slug", slug)
      .single();

    if (error && error.code !== "PGRST116") { // PGRST116 is "no rows returned"
      throw error;
    }

    return NextResponse.json({ count: data?.count || 0 });
  } catch (error) {
    console.error("Error fetching views from Supabase:", error);
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // 0. Rate limiting via Supabase
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || "127.0.0.1";
    const { success } = await viewsRatelimit.limit(`${ip}_${slug}`);

    if (!success) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    // 1. Atomic increment via Supabase RPC
    const { data: updatedCount, error } = await supabase
      .rpc("increment_post_views", { post_slug: slug });

    if (error) throw error;

    return NextResponse.json({ count: updatedCount });
  } catch (error) {
    console.error("Error updating views in Supabase:", error);
    return NextResponse.json({ error: "Failed to update views" }, { status: 500 });
  }
}
