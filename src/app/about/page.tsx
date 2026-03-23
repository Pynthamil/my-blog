export default function AboutPage() {
  return (
    <main className="min-h-screen pt-32 pb-16 flex flex-col items-center">
      <div className="w-full max-w-[720px] px-4">
        <h1 className="font-syne text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-violet-300 to-white bg-clip-text text-transparent mb-8">
          About
        </h1>
        
        <div className="rounded-3xl glow-border-strong bg-[#111115]/60 backdrop-blur-md p-8 md:p-10">
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 leading-relaxed mb-6 text-[15px]">
              Hey there! I'm a developer building things in public and sharing my journey along the way.
              This blog is where I document my wins, my spectacular failures, and all the random technical 
              rabbit holes I fall into.
            </p>
            <p className="text-gray-300 leading-relaxed mb-8 text-[15px]">
              Everything here is powered by Next.js and Hashnode's Headless CMS. 
              I prefer dark mode, clean code, and pushing straight to main.
            </p>
            <p className="text-purple-400 italic text-sm">
              // More about me coming soon... let's grind together!
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
