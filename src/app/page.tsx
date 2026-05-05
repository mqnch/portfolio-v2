import HomeClient from "./home-client";
import { getAllPosts } from "@/lib/writing";

export default function Page() {
  const posts = getAllPosts();
  return <HomeClient writingPosts={posts} />;
}
