"use client";

import { useState } from "react";
import Image from "next/image";
import { Blog } from "@/interface";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import BlogUpdateModal from "./BlogUpdateModal";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";

export default function BlogManageCard({
  blog,
  onBlogUpdated,
}: {
  blog: Blog;
  onBlogUpdated: () => void;
}) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  async function handleDelete() {
    try {
      const res = await fetch(
        `https://next-portfolio-backend-zeta.vercel.app/api/v1/blogs/delete/${blog.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!res.ok) {
        toast.error("Failed to delete blog");
      }

      toast.success("Blog deleted successfully");
      await fetch("/api/revalidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tag: "blogs" }),
      });
      onBlogUpdated();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete blog");
    }
  }

  return (
    <>
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>{blog.title}</CardTitle>
        </CardHeader>

        {blog.thumbnailUrl && (
          <div className="relative w-full h-48">
            <Image
              src={blog.thumbnailUrl}
              alt={blog.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover rounded-md"
            />
          </div>
        )}

        <CardContent>
          <p>{blog.description}</p>
        </CardContent>

        <CardFooter className="grid grid-cols-2 gap-9">
          <Button variant="outline" onClick={() => setIsEditOpen(true)}>
            Edit
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to delete this blog?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>

      <BlogUpdateModal
        blog={blog}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onBlogUpdated={onBlogUpdated}
      />
    </>
  );
}
