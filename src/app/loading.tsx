import React from "react";
import NyanLoader from "@/components/NyanLoader";

export default function Loading() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center min-h-screen bg-[#0f0f11]">
      <NyanLoader />
    </main>
  );
}
