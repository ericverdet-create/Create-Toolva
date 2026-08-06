import { MetadataRoute } from 'next';
import { toolRegistry } from '@/lib/tools/registry';
import { blogPosts } from '@/lib/blog/registry';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://create-toolva.vercel.app';

  const toolUrls = toolRegistry.map(tool => ({
    url: `${base}/herramientas/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const blogUrls = blogPosts.map(post => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.updatedDate ?? post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${base}/herramientas`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${base}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    ...blogUrls,
    ...toolUrls,
  ];
}
