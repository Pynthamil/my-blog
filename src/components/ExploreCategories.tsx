import Link from "next/link";

const categories = [
  {
    title: "Development",
    href: "/categories/development",
    bgClass: "bg-[#38bdf8]",
    illustration: (
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        {/* Geometric representation of a 'Browser Window' or similar */}
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center relative translate-y-4 -translate-x-4">
           {/* Eyes */}
           <div className="absolute top-6 left-5 w-3 h-1.5 border-b-2 border-black rounded-full" />
           <div className="absolute top-6 right-8 w-3 h-1.5 border-b-2 border-black rounded-full" />
           {/* Pink bubble */}
           <div className="absolute top-8 -right-4 w-10 h-10 bg-pink-300 rounded-full opacity-90" />
        </div>
        {/* Floating shapes */}
        <div className="absolute top-4 right-4 w-12 h-12 bg-yellow-400 rotate-45 transform skew-x-12" />
        <div className="absolute bottom-4 right-8 w-16 h-16 bg-blue-600 rounded-full" />
      </div>
    )
  },
  {
    title: "Design",
    href: "/categories/design",
    bgClass: "bg-[#f97316]",
    illustration: (
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        {/* Big orange circle */}
        <div className="w-48 h-48 bg-[#ea580c] rounded-full translate-y-12 relative flex justify-center">
           {/* Smiley */}
           <svg className="absolute top-10 w-24 h-12 text-black/80" viewBox="0 0 100 50" fill="none">
              <path d="M 20 20 Q 30 30 40 20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M 60 20 Q 70 30 80 20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M 10 35 Q 50 60 90 35" stroke="currentColor" strokeWidth="5" strokeLinecap="round" fill="none" />
           </svg>
        </div>
      </div>
    )
  },
  {
    title: "Insights",
    href: "/categories/insights",
    bgClass: "bg-[#38bdf8]",
    illustration: (
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        {/* Yellow Balloon */}
        <div className="w-32 h-32 bg-[#fbbf24] rounded-full relative -translate-y-4">
           {/* Balloon string */}
           <div className="absolute -bottom-16 left-1/2 w-1 h-16 bg-white rounded-full -translate-x-1/2" />
           {/* Reflection */}
           <div className="absolute top-4 left-4 w-8 h-3 bg-white/60 rounded-full rotate-[-30deg]" />
           {/* Smiley */}
           <svg className="absolute top-12 left-1/2 -translate-x-1/2 w-12 h-6 text-[#b45309]" viewBox="0 0 100 50" fill="none">
              <path d="M 20 20 Q 30 25 40 20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M 60 20 Q 70 25 80 20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M 30 35 Q 50 45 70 35" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
           </svg>
        </div>
      </div>
    )
  },
  {
    title: "Other",
    href: "/categories/other",
    bgClass: "bg-[#4c1d95]",
    illustration: (
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        {/* Dark purple setting with a small sleepy sphere */}
        <div className="w-20 h-20 bg-[#c4b5fd] rounded-full relative translate-y-8 translate-x-4 shadow-[-20px_-10px_0px_#2e1065_inset]">
           {/* Sleepy face */}
           <svg className="absolute top-6 left-4 w-10 h-6 text-[#4c1d95]" viewBox="0 0 100 50" fill="none">
              <path d="M 20 25 Q 30 15 40 25" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M 60 25 Q 70 15 80 25" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M 35 35 Q 50 40 65 35" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
           </svg>
        </div>
      </div>
    )
  }
];

export default function ExploreCategories() {
  return (
    <section className="w-full flex justify-center px-4 pt-16 pb-12 relative z-20 bg-[var(--bg-primary)]">
      <div className="w-full max-w-[1200px]">
        {/* Section Header */}
        <h2 className="font-syne text-[26px] md:text-[32px] font-extrabold mb-8 tracking-tight text-[var(--text-primary)]">
          Explore articles by category
        </h2>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.title} 
              href={category.href}
              className="flex flex-col gap-4 group"
            >
              <div className={`w-full aspect-square rounded-[24px] ${category.bgClass} relative overflow-hidden transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_10px_40px_rgba(0,0,0,0.2)]`}>
                {category.illustration}
              </div>
              <h3 className="font-bold text-[18px] text-[var(--text-primary)]">
                {category.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
