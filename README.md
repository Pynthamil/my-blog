# 🚀 pyndu logs | Developer Blog & Build Showcase

A high-performance, aesthetically-driven developer blog built for documenting the journey of building software in public.

## 🛠 Tech Stack
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Database/Interactions**: [Supabase](https://supabase.com/) (Views, Likes, Threaded Comments)
- **CMS**: [Hashnode](https://hashnode.com/) (Headless GraphQL API)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Analytics**: [PostHog](https://posthog.com/)
- **Email**: [Resend](https://resend.com/)

## ✨ Key Features
- **Headful Blog Service**: Dynamic rendering of posts from Hashnode.
- **Custom Interaction Layer**: Likes and View counting tracked natively in Supabase.
- **Threaded Commenting System**: Fully functional, recursive comment threads.
- **Advanced Rate Limiting**: Token-bucket implementation over Supabase for API protection.
- **Glassmorphism UI**: Modern, sleek design with Framer Motion animations.

## 🏗 Setup & Development
1. Clone the repo
2. Install dependencies: `npm install`
3. Configure environment variables in `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `HASHNODE_TOKEN`
   - `RESEND_API_KEY`
4. Run development server: `npm run dev`
