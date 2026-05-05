import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { PostMeta } from "@/types/writing";

const CONTENT_DIR = path.join(process.cwd(), "content/writing");

export type { PostMeta };

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    const { data } = matter(raw);
    return {
      slug,
      title: String(data.title),
      date: String(data.date),
      description: data.description ? String(data.description) : undefined,
    };
  });
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getPostBySlug(
  slug: string,
): { meta: PostMeta; content: string } | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return {
    meta: {
      slug,
      title: String(data.title),
      date: String(data.date),
      description: data.description ? String(data.description) : undefined,
    },
    content,
  };
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}
