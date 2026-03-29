import { supabase } from "@/lib/supabase";
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

    // 1. Get current count
    const { data } = await supabase
      .from("post_views")
      .select("count")
      .eq("slug", slug)
      .single();

    const currentCount = data?.count || 0;
    const newCount = currentCount + 1;

    // 2. Upsert the new count
    const { data: updatedData, error } = await supabase
      .from("post_views")
      .upsert({ slug, count: newCount }, { onConflict: "slug" })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ count: updatedData.count });
  } catch (error) {
    console.error("Error updating views in Supabase:", error);
    return NextResponse.json({ error: "Failed to update views" }, { status: 500 });
  }
}
