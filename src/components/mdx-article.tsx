import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import type { ComponentPropsWithoutRef } from "react";
import { MdxHashLink } from "@/components/mdx-hash-link";

function MdxImg({
  src,
  alt,
  width,
  height,
}: ComponentPropsWithoutRef<"img">) {
  if (!src || typeof src !== "string") return null;
  const w = typeof width === "number" ? width : 1200;
  const h = typeof height === "number" ? height : 675;
  return (
    <span className="my-6 block w-full font-mono">
      <Image
        src={src}
        alt={alt ?? ""}
        width={w}
        height={h}
        className="h-auto w-full max-h-[min(480px,70vh)] rounded-md object-cover"
        sizes="(max-width: 768px) 100vw, 672px"
      />
    </span>
  );
}

export const mdxComponents: MDXComponents = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="mt-10 mb-3 font-mono text-base font-medium tracking-tight text-gray-200 first:mt-0"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mt-8 mb-2 font-mono text-sm font-medium text-gray-300" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="mb-4 font-mono text-sm leading-relaxed text-gray-400" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="mb-4 list-disc space-y-1 pl-5 font-mono text-sm text-gray-400" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="mb-4 list-decimal space-y-1 pl-5 font-mono text-sm text-gray-400" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="font-mono leading-relaxed marker:text-gray-600" {...props} />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => <MdxHashLink {...props} />,
  img: MdxImg,
  hr: () => <hr className="my-10 border-gray-900" />,
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="border-l border-gray-700 pl-4 font-mono text-sm italic text-gray-500"
      {...props}
    />
  ),
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="my-6 overflow-x-auto font-mono">
      <table className="w-full border-collapse text-left text-sm text-gray-400" {...props} />
    </div>
  ),
  thead: (props: ComponentPropsWithoutRef<"thead">) => (
    <thead className="border-b border-gray-800 font-mono text-xs uppercase tracking-wider text-gray-500" {...props} />
  ),
  tbody: (props: ComponentPropsWithoutRef<"tbody">) => <tbody {...props} />,
  tr: (props: ComponentPropsWithoutRef<"tr">) => (
    <tr className="border-b border-gray-900" {...props} />
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th className="px-3 py-2 font-mono font-medium" {...props} />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td className="px-3 py-2 font-mono" {...props} />
  ),
};
