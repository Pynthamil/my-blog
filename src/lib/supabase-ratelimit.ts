import { supabase } from "./supabase";

/**
 * A simple token-bucket rate limiter implemented over Supabase.
 * Replaces @upstash/ratelimit to avoid external Redis dependencies.
 */
export class SupabaseRatelimit {
  private prefix: string;
  private maxTokens: number;
  private windowSeconds: number;

  constructor(options: { 
    prefix: string; 
    maxTokens: number; 
    windowSeconds: number 
  }) {
    this.prefix = options.prefix;
    this.maxTokens = options.maxTokens;
    this.windowSeconds = options.windowSeconds;
  }

  /**
   * Main limit function to check and decrement tokens for a specific identifier.
   */
  async limit(identifier: string): Promise<{ success: boolean; remaining: number }> {
    const key = `${this.prefix}:${identifier}`;
    const now = new Date().toISOString();

    try {
      // 1. Fetch current state
      const { data, error: fetchError } = await supabase
        .from("rate_limits")
        .select("*")
        .eq("key", key)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") { // Skip "not found" error
        console.error("[Ratelimit] Fetch Error:", fetchError);
        return { success: true, remaining: 1 }; // Fail open for the user
      }

      let tokens = data?.tokens ?? this.maxTokens;
      let lastRefill = data?.last_refill ? new Date(data.last_refill) : new Date();

      // 2. Refill tokens if enough time has passed
      const timePassedSeconds = (new Date().getTime() - lastRefill.getTime()) / 1000;
      const tokensToAdd = Math.floor(timePassedSeconds * (this.maxTokens / this.windowSeconds));

      if (tokensToAdd > 0) {
        tokens = Math.min(this.maxTokens, tokens + tokensToAdd);
        lastRefill = new Date();
      }

      // 3. Check for available tokens
      if (tokens > 0) {
        tokens -= 1;
        
        // 4. Update the bucket with UPSERT
        const { error: upsertError } = await supabase
          .from("rate_limits")
          .upsert({ 
            key, 
            tokens, 
            max_tokens: this.maxTokens, 
            last_refill: lastRefill.toISOString() 
          }, { onConflict: "key" });

        if (upsertError) {
          console.error("[Ratelimit] Upsert Error:", upsertError);
          return { success: true, remaining: 1 }; // Fail open
        }

        return { success: true, remaining: tokens };
      }

      return { success: false, remaining: 0 };
    } catch (err) {
      console.error("[Ratelimit] Unexpected Error:", err);
      return { success: true, remaining: 1 }; // Fail open
    }
  }

  /**
   * Shorthand to create sliding windows (mimics @upstash/ratelimit API)
   */
  static slidingWindow(count: number, window: string): { maxTokens: number; windowSeconds: number } {
    const [val, unit] = window.split(" ");
    const multiplier = unit.startsWith("s") ? 1 : unit.startsWith("m") ? 60 : unit.startsWith("h") ? 3600 : unit.startsWith("d") ? 86400 : 1;
    return {
      maxTokens: count,
      windowSeconds: parseInt(val) * multiplier
    };
  }
}

/**
 * Pre-configured instances
 */
export const viewsRatelimit = new SupabaseRatelimit({
  prefix: "rl_views",
  maxTokens: 1,
  windowSeconds: 30 * 60, // 30 minutes
});

export const likesRatelimit = new SupabaseRatelimit({
  prefix: "rl_likes",
  maxTokens: 10,
  windowSeconds: 60 * 60, // 1 hour
});

export const newsletterRatelimit = new SupabaseRatelimit({
  prefix: "rl_newsletter",
  maxTokens: 3,
  windowSeconds: 60 * 60, // 1 hour
});

export const commentsRatelimit = new SupabaseRatelimit({
  prefix: "rl_comments",
  maxTokens: 5,
  windowSeconds: 60 * 60, // 1 hour
});

export const apiRatelimit = new SupabaseRatelimit({
  prefix: "rl_api",
  maxTokens: 100,
  windowSeconds: 60 * 60, // 1 hour (100 requests per hour per IP)
});
