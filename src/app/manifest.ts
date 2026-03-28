import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'pyndu logs | Developer Blog',
    short_name: 'pyndulogs',
    description: 'Experiments, notes, and builds in code, design, and curiosity.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f0f11',
    theme_color: '#0f0f11',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/images/TerminalIcon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
