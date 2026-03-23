import EmptyState from "@/components/EmptyState";

export default function TagsPage() {
  return (
    <main className="min-h-screen pt-32 pb-16 flex flex-col items-center">
      <div className="w-full max-w-[900px] px-4">
        <h1 className="font-syne text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-violet-300 to-white bg-clip-text text-transparent mb-4 text-center">
          Tags
        </h1>
        <p className="text-gray-400 mb-10 text-center">
          {"//"} browse posts by category.
        </p>
        
        <div className="rounded-3xl glow-border-strong bg-[#111115]/60 backdrop-blur-md p-6 md:p-8">
          <EmptyState
            title="nothing here yet"
            description="this category is waiting for its moment"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m20.59 13.41-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                <line x1="7" y1="7" x2="7.01" y2="7"/>
              </svg>
            }
          />
        </div>
      </div>
    </main>
  );
}
