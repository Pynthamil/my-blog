'use client';

import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { ReactNode, useEffect } from 'react';

if (typeof window !== 'undefined') {
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

  if (posthogKey && posthogHost) {
    posthog.init(posthogKey, {
      api_host: posthogHost,
      person_profiles: 'identified_only', // or 'always' if you want to track everyone uniquely
      capture_pageview: false, // We'll handle this manually for App Router
      capture_pageleave: true,
    });
  }
}

export function PHProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Optional: Additional client-side logic
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
