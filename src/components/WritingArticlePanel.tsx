'use client';

import { useEffect, useState } from 'react';
import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote';
import { mdxComponents } from '@/components/mdx-article';

const dateFmt = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

type WritingArticlePanelProps = {
  slug: string;
  title: string;
  date: string;
};

export default function WritingArticlePanel({
  slug,
  title,
  date,
}: WritingArticlePanelProps) {
  const [source, setSource] = useState<MDXRemoteSerializeResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setSource(null);
    setError(null);

    fetch(`/api/writing/${encodeURIComponent(slug)}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load');
        return res.json() as Promise<MDXRemoteSerializeResult>;
      })
      .then((data) => {
        if (!cancelled) setSource(data);
      })
      .catch(() => {
        if (!cancelled) setError('Could not load article.');
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return (
    <article className="w-full space-y-6 text-white">
      <header className="space-y-2 border-b border-gray-900 pb-6">
        <h1 className="font-mono text-lg font-medium tracking-tight text-gray-100 md:text-xl">
          {title}
        </h1>
        <time
          dateTime={date}
          className="block text-xs font-mono text-gray-500 tabular-nums"
        >
          {dateFmt.format(new Date(date + 'T12:00:00'))}
        </time>
      </header>
      <div className="pb-8 font-mono text-sm text-gray-400">
        {error && <p className="text-red-400/90">{error}</p>}
        {!error && !source && (
          <p className="text-gray-600">Loading…</p>
        )}
        {source && <MDXRemote {...source} components={mdxComponents} />}
      </div>
    </article>
  );
}
