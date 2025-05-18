import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'English AI',
    short_name: 'english-ai',
    description: 'A Progressive Web App built with Next.js',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    dir: 'auto',
    lang: 'en-GB',
    icons: [
      {
        src: '/icons/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/icons/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ],
    screenshots: [
      {
        src: 'images/image1.png',
        sizes: '2540x1802',
        type: 'image/png',
        form_factor: 'wide',
        label: 'English AI'
      },
      {
        src: 'images/mob-image.png',
        sizes: '1006x1788',
        type: 'image/png',
        form_factor: 'narrow',
        label: 'English AI'
      }
    ]
  };
}
