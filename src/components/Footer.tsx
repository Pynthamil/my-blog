"use client";

export default function Footer() {
  return (
    <footer className="w-full mt-auto">
      <div className="footer-gradient py-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <p className="text-[13px] sm:text-sm text-white font-medium">
          Made with love 💜 by pyndu
        </p>
        <p className="text-[13px] sm:text-sm text-white/90 font-medium italic">
          &ldquo;Small progress is still progress.&rdquo;
        </p>
      </div>
    </footer>
  );
}
