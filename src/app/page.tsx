import HomeClient from "./home-client";
import { getAllPosts, getPostBySlug } from "@/lib/writing";
import { serializeWritingMdx } from "@/lib/mdx-writing-serialize";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";

export default async function Page() {
  const posts = getAllPosts();
  const entries = await Promise.all(
    posts.map(async (p) => {
      const full = getPostBySlug(p.slug);
      if (!full) return [p.slug, null] as const;
      const serialized = await serializeWritingMdx(full.content);
      return [p.slug, serialized] as const;
    }),
  );
  const writingSerializedBySlug = Object.fromEntries(
    entries.filter((e): e is [string, MDXRemoteSerializeResult] => e[1] !== null),
  ) as Record<string, MDXRemoteSerializeResult>;

  return (
    <HomeClient
      writingPosts={posts}
      writingSerializedBySlug={writingSerializedBySlug}
    />
  );
}
