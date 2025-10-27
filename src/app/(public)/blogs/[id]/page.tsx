import { Blog } from "@/interface";
import fetchData from "@/lib/fetchHelper";
import Image from "next/image";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = await params;

  const blog = await fetchData<Blog>(
    `https://next-portfolio-backend-zeta.vercel.app/api/v1/blogs/get/${id}`,
    ["blogs"],
    "blog"
  );

  if (!blog) {
    return {
      title: "Blog Not Found",
      description: "This blog could not be loaded.",
    };
  }

  return {
    title: blog.title,
    description: blog.description,
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const blog = await fetchData<Blog>(
    `https://next-portfolio-backend-zeta.vercel.app/api/v1/blogs/get/${id}`,
    ["blogs"],
    "blog"
  );

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        <p>Failed to load blog.</p>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-16">
      {/* Thumbnail */}
      {blog.thumbnailUrl && (
        <div className="relative w-full h-72 md:h-96 mb-8 rounded-xl overflow-hidden shadow-lg">
          <Image
            src={blog.thumbnailUrl}
            alt={blog.title}
            fill
            sizes="(max-width:768px) 100vw, 75vw"
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Title + Description */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">{blog.title}</h1>
      </div>

      {/* Content */}
      <article className="prose prose-invert max-w-none">
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </article>
    </main>
  );
}
