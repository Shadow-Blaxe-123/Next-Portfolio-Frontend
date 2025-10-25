import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Blog } from "@/interface";
import { ExternalLinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Server Component
async function BlogCard({ data }: { data: Blog[] }) {
  return (
    <div className="grid md:grid-cols-3 gap-10 mx-auto">
      {data.map((blog) => (
        <Card className="w-full max-w-lg mx-auto" key={blog.id}>
          <CardHeader>
            <CardTitle>{blog.title}</CardTitle>
            <CardAction>
              <Link href={`/blogs/${blog.id}`}>
                <ExternalLinkIcon />
              </Link>
            </CardAction>

            {/* Thumbnail */}
            {blog.thumbnailUrl && (
              <div className="relative w-full h-48">
                <Image
                  src={blog.thumbnailUrl}
                  alt={blog.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover rounded-t-md"
                  priority
                />
              </div>
            )}
          </CardHeader>

          <CardContent>
            <p>{blog.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default BlogCard;
