"use client";

import { useEffect, useState } from "react";
import { Blog } from "@/interface";
import { Skeleton } from "@/components/ui/skeleton";
import BlogManageCard from "@/components/modules/Blogs/ManageBlogCard";
import fetchData from "@/lib/fetchHelper";

export default function ManageBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchBlogs() {
    try {
      const data = await fetchData<Blog[]>(
        "https://next-portfolio-backend-zeta.vercel.app/api/v1/blogs/get-all",
        ["blogs"],
        "blogs"
      );
      if (!data) {
        return (
          <div className="min-h-screen flex items-center justify-center text-gray-400">
            <p>Failed to load projects.</p>
          </div>
        );
      }
      setBlogs(data || []);
    } catch (err) {
      console.error("Failed to load blogs:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading)
    return (
      <div className="grid md:grid-cols-3 gap-10">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-80 w-full rounded-lg" />
        ))}
      </div>
    );

  return (
    <div className="p-8 text-center">
      <h1 className="text-4xl font-semibold text-primary mb-10">
        Manage Blogs
      </h1>
      <div className="grid md:grid-cols-3 gap-10">
        {blogs.map((blog) => (
          <BlogManageCard
            key={blog.id}
            blog={blog}
            onBlogUpdated={fetchBlogs}
          />
        ))}
      </div>
    </div>
  );
}
