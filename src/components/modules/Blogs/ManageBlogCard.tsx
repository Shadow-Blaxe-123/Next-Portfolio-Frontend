"use client";

import { useState } from "react";
import Image from "next/image";
import { Blog } from "@/interface";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function BlogManageCard({
  blog,
  onBlogUpdated,
}: {
  blog: Blog;
  onBlogUpdated: () => void;
}) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editedBlog, setEditedBlog] = useState(blog);
  const [loading, setLoading] = useState(false);

  async function handleUpdate() {
    setLoading(true);
    try {
      const res = await fetch(
        `https://next-portfolio-backend-zeta.vercel.app/api/v1/blogs/update/${blog.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editedBlog),
        }
      );

      if (!res.ok) throw new Error("Failed to update blog");

      toast.success("Blog updated successfully");
      setIsEditOpen(false);
      onBlogUpdated();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update blog");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    try {
      const res = await fetch(
        `https://next-portfolio-backend-zeta.vercel.app/api/v1/blogs/delete/${blog.id}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error("Failed to delete blog");

      toast.success("Blog deleted successfully");
      onBlogUpdated();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete blog");
    }
  }

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>{blog.title}</CardTitle>
      </CardHeader>

      {blog.thumbnailUrl && (
        <div className="relative w-full h-48">
          <Image
            src={blog.thumbnailUrl}
            alt={blog.title}
            fill
            className="object-cover rounded-md"
          />
        </div>
      )}

      <CardContent className="space-y-4 mt-4">
        <p className="text-sm text-gray-600 line-clamp-3">{blog.description}</p>

        <div className="flex justify-between">
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
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>

      {/* Update Modal */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Blog</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              value={editedBlog.title}
              onChange={(e) =>
                setEditedBlog({ ...editedBlog, title: e.target.value })
              }
              placeholder="Title"
            />
            <Textarea
              value={editedBlog.description}
              onChange={(e) =>
                setEditedBlog({ ...editedBlog, description: e.target.value })
              }
              placeholder="Description"
              className="min-h-[120px]"
            />
            <Input
              value={editedBlog.thumbnailUrl || ""}
              onChange={(e) =>
                setEditedBlog({ ...editedBlog, thumbnailUrl: e.target.value })
              }
              placeholder="Thumbnail URL"
            />
          </div>

          <DialogFooter>
            <Button onClick={handleUpdate} disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
