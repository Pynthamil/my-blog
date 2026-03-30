import React from "react";
import NyanLoader from "@/components/NyanLoader";

export default function Loading() {
  return (
    <div suppressHydrationWarning>
      <main className="flex-1 flex flex-col items-center justify-center min-h-screen bg-[var(--bg-primary)]">
        <NyanLoader fullScreen={true} />
      </main>
    </div>
  );
}
