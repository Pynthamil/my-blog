-- Create subscribers table
CREATE TABLE IF NOT EXISTS subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (anyone can subscribe)
CREATE POLICY "Allow anonymous inserts to subscribers" ON subscribers
    FOR INSERT 
    TO public
    WITH CHECK (true);

-- Deny reads from anonymous users to protect subscriber privacy
-- (Only service_role or authenticated admins can view the subscribers)
