import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    title: "Development",
    href: "/categories/development",
    bgClass: "bg-[#38bdf8]",
    illustration: (
      <div className="absolute inset-0">
        <Image 
          src="/images/dev.svg"
          alt="Development Illustration"
          fill
          className="object-cover"
        />
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
      <div className="absolute inset-0">
        <Image 
          src="/images/insights.svg"
          alt="Insights Illustration"
          fill
          className="object-cover"
        />
      </div>
    )
  },
  {
    title: "Other",
    href: "/categories/other",
    bgClass: "bg-[#4c1d95]",
    illustration: (
      <div className="absolute inset-0">
        <Image 
          src="/images/others.svg"
          alt="Other Illustration"
          fill
          className="object-cover"
        />
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
