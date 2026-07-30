import { MetadataRoute } from 'next';
import { toolRegistry } from '@/lib/tools/registry';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://toolva.com';

  const toolUrls = toolRegistry.map(tool => ({
    url: `${base}/herramientas/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${base}/herramientas`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...toolUrls,
  ];
}
