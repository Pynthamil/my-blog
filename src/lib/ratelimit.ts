import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";

/**
 * Global rate-limiter instance for views.
 * Limit: 1 request per 30 minutes per IP.
 */
export const viewsRatelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(1, "30 m"),
  analytics: true,
  prefix: "rl_views",
});

/**
 * Global rate-limiter instance for likes.
 * Limit: 10 requests per hour per IP.
 */
export const likesRatelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(10, "1 h"),
  analytics: true,
  prefix: "rl_likes",
});

/**
 * Global rate-limiter instance for newsletter subscriptions.
 * Limit: 3 requests per hour per IP.
 */
export const newsletterRatelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(3, "1 h"),
  analytics: true,
  prefix: "rl_newsletter",
});

/**
 * Global rate-limiter instance for comments.
 * Limit: 5 requests per hour per IP.
 */
export const commentsRatelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(5, "1 h"),
  analytics: true,
  prefix: "rl_comments",
});

/**
 * Baseline rate-limiter for all other API routes.
 * Limit: 50 requests per 10 seconds per IP (Burst protection).
 */
export const apiRatelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(50, "10 s"),
  analytics: true,
  prefix: "rl_api",
});
