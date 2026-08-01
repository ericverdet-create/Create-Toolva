import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://create-toolva.vercel.app/sitemap.xml',
    host: 'https://create-toolva.vercel.app',
  };
}
