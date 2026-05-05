'use client';

import type { ComponentPropsWithoutRef } from 'react';
import { scrollElementIntoScrollContainer } from '@/lib/scroll-to-hash';

const linkClass =
  'font-mono text-gray-300 underline decoration-gray-600 underline-offset-4 hover:text-white hover:decoration-gray-400';

export function MdxHashLink({
  className,
  href,
  onClick,
  ...rest
}: ComponentPropsWithoutRef<'a'>) {
  const mergedClass = [linkClass, className].filter(Boolean).join(' ');

  if (
    typeof href === 'string' &&
    href.startsWith('#') &&
    href.length > 1
  ) {
    const id = decodeURIComponent(href.slice(1));

    return (
      <a
        {...rest}
        href={href}
        className={mergedClass}
        onClick={(e) => {
          e.preventDefault();
          scrollElementIntoScrollContainer(id);
          onClick?.(e);
          try {
            window.history.replaceState(null, '', `#${encodeURIComponent(id)}`);
          } catch {
            /* ignore */
          }
        }}
      />
    );
  }

  return (
    <a
      {...rest}
      href={href}
      className={mergedClass}
      onClick={onClick}
    />
  );
}
