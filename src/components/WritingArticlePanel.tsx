'use client';

import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote';
import { mdxComponents } from '@/components/mdx-article';

const dateFmt = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

type WritingArticlePanelProps = {
  title: string;
  date: string;
  serialized: MDXRemoteSerializeResult;
};

export default function WritingArticlePanel({
  title,
  date,
  serialized,
}: WritingArticlePanelProps) {
  return (
    <article className="w-full space-y-6 text-white">
      <div className="border-t border-gray-900 pt-1" aria-hidden />
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
        <MDXRemote {...serialized} components={mdxComponents} />
      </div>
    </article>
  );
}
