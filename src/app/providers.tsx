'use client';

import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { ReactNode, useEffect } from 'react';

if (typeof window !== 'undefined') {
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

  if (posthogKey && posthogHost) {
    posthog.init(posthogKey, {
      api_host: '/ingest',
      ui_host: 'https://us.i.posthog.com',
      person_profiles: 'always', 
      capture_pageview: false, 
      capture_pageleave: true,
      session_recording: {
        maskAllInputs: true,
        maskTextSelector: '.sensitive',
      },
    });
  }
}

export function PHProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Optional: Additional client-side logic
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
