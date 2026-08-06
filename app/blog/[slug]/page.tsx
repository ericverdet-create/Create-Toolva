import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { blogPosts, getPostBySlug } from '@/lib/blog/registry';
import { toolRegistry } from '@/lib/tools/registry';

export async function generateStaticParams() {
  return blogPosts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `https://create-toolva.vercel.app/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.updatedDate ?? post.date,
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const { default: ArticleContent } = await import(`@/lib/blog/articles/${post.slug}`);

  const relatedTools = post.relatedTools
    .map(slug => toolRegistry.find(t => t.slug === slug))
    .filter(Boolean);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updatedDate ?? post.date,
    author: { '@type': 'Organization', name: 'Toolva', url: 'https://create-toolva.vercel.app' },
    publisher: { '@type': 'Organization', name: 'Toolva', url: 'https://create-toolva.vercel.app' },
    inLanguage: 'es',
    url: `https://create-toolva.vercel.app/blog/${post.slug}`,
    keywords: post.tags.join(', '),
  };

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <Link href="/" className="hover:text-indigo-600">Toolva</Link>
        <span>›</span>
        <Link href="/blog" className="hover:text-indigo-600">Blog</Link>
        <span>›</span>
        <span className="text-gray-700 dark:text-gray-300 truncate">{post.category}</span>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
            {post.category}
          </span>
          <span className="text-xs text-gray-400">{post.readingTime} min de lectura</span>
          <span className="text-xs text-gray-400">·</span>
          <time className="text-xs text-gray-400" dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
          </time>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white leading-snug mb-4">
          {post.title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          {post.description}
        </p>
      </header>

      {/* Article body */}
      <article className="prose prose-gray dark:prose-invert max-w-none
        prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
        prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed
        prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline
        prose-strong:text-gray-900 dark:prose-strong:text-white
        prose-li:text-gray-700 dark:prose-li:text-gray-300
        prose-table:text-sm">
        <ArticleContent />
      </article>

      {/* Related tools */}
      {relatedTools.length > 0 && (
        <section className="mt-12 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            🧮 Herramientas relacionadas
          </h2>
          <div className="grid gap-3">
            {relatedTools.map(tool => tool && (
              <Link key={tool.slug} href={`/herramientas/${tool.slug}`}
                className="flex items-center gap-3 bg-white dark:bg-gray-900 rounded-xl px-4 py-3 hover:shadow-md hover:border-indigo-400 border border-gray-200 dark:border-gray-700 transition-all group">
                <span className="text-2xl">{tool.icon}</span>
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                    {tool.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                    {tool.description}
                  </div>
                </div>
                <span className="ml-auto text-indigo-500 text-sm">→</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Back to blog */}
      <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <Link href="/blog" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
          ← Volver al blog
        </Link>
      </div>
    </main>
  );
}
