"use client";

import { useEffect } from "react";
import mediumZoom from "medium-zoom";

export default function ImageZoom() {
  useEffect(() => {
    // Initialize medium-zoom on all images within the blog content
    const zoom = mediumZoom(".prose-blog img", {
      margin: 40,
      background: "#0f0f11",
      scrollOffset: 0,
    });

    return () => {
      zoom.detach();
    };
  }, []);

  return null;
}
