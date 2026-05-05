'use client';

import type { PostMeta } from '@/types/writing';

const dateFmt = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

type WritingPostListProps = {
  posts: PostMeta[];
  onSelect: (slug: string) => void;
};

export default function WritingPostList({
  posts,
  onSelect,
}: WritingPostListProps) {
  return (
    <section className="w-full space-y-6">
      <div className="border-t border-gray-900 pt-1" />
      <ul className="space-y-5">
        {posts.map((post) => (
          <li key={post.slug}>
            <button
              type="button"
              onClick={() => onSelect(post.slug)}
              className="group flex w-full items-baseline justify-between gap-4 text-left text-sm"
            >
              <span className="border-b border-gray-700 pb-0.5 font-mono text-gray-200 underline-offset-4 transition-colors group-hover:border-gray-500 group-hover:text-white">
                {post.title}
              </span>
              <time
                dateTime={post.date}
                className="shrink-0 text-xs font-mono text-gray-500 tabular-nums"
              >
                {dateFmt.format(new Date(post.date + 'T12:00:00'))}
              </time>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
