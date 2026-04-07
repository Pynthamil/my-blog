-- 1. Extend the comments table with author_ip for rate limiting
CREATE TABLE IF NOT EXISTS public.comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL,
    content TEXT NOT NULL,
    author_name TEXT NOT NULL,
    author_email TEXT NOT NULL,
    author_ip TEXT, -- Added for IP-based rate limiting
    parent_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    is_moderated BOOLEAN DEFAULT FALSE
);

-- Indexing for performance
CREATE INDEX IF NOT EXISTS comments_slug_idx ON public.comments (slug);
CREATE INDEX IF NOT EXISTS comments_parent_id_idx ON public.comments (parent_id);
CREATE INDEX IF NOT EXISTS comments_author_ip_idx ON public.comments (author_ip);

-- 2. Create a generic rate_limits table for all activities (Views, Likes, Newsletter, etc.)
CREATE TABLE IF NOT EXISTS public.rate_limits (
    key TEXT PRIMARY KEY, -- Combined identifier like 'comments:ip-address' or 'views:slug:ip'
    tokens INTEGER NOT NULL DEFAULT 5,
    max_tokens INTEGER NOT NULL DEFAULT 5,
    last_refill TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS for security
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Select policies
CREATE POLICY "Allow public read access to comments" ON public.comments FOR SELECT USING (TRUE);
-- Select/Update policies for rate_limits usually handled via Service Role in Server Actions
-- but we enable generic service role access.
CREATE POLICY "Service role access to rate_limits" ON public.rate_limits FOR ALL USING (TRUE);

-- Insert policy for comments
CREATE POLICY "Allow insert via service role" ON public.comments FOR INSERT WITH CHECK (TRUE);
