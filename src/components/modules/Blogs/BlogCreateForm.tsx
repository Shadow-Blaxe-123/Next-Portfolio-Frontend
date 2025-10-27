"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import "quill/dist/quill.snow.css";
import Quill from "quill";

const blogSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),
  content: z.string().min(1, "Content cannot be empty."),
  isFeatured: z.boolean(),
  thumbnailUrl: z.union([z.url(), z.literal(""), z.null()]).optional(),
});

type BlogFormValues = z.infer<typeof blogSchema>;

export default function BlogCreateForm() {
  const [submitting, setSubmitting] = useState(false);
  const [quillLoaded, setQuillLoaded] = useState(false);
  const quillRef = useRef<HTMLDivElement | null>(null);
  const editorInstance = useRef<Quill | null>(null);

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      isFeatured: false,
      thumbnailUrl: "",
    },
  });

  // Initialize Quill only in the browser
  useEffect(() => {
    async function initQuill() {
      if (typeof window === "undefined") return;
      const Quill = (await import("quill")).default;
      editorInstance.current = new Quill(quillRef.current!, {
        theme: "snow",
        placeholder: "Write your blog content here...",
      });

      // Sync Quill content with form state
      if (editorInstance.current !== null) {
        editorInstance.current.on("text-change", () => {
          form.setValue("content", editorInstance.current!.root.innerHTML);
        });
      }

      setQuillLoaded(true);
    }

    initQuill();
  }, [form]);

  async function onSubmit(values: BlogFormValues) {
    setSubmitting(true);
    try {
      console.log("Submitting blog:", values);

      // Example API call
      // await fetch("/api/blogs", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(values),
      // });

      alert("Blog created successfully!");
      form.reset();
      if (editorInstance.current) editorInstance.current.root.innerHTML = "";
    } catch (error) {
      console.error(error);
      alert("Failed to create blog.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Create a New Blog</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter blog title..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Brief summary of your post..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Content (Quill.js) */}
            <div>
              <FormLabel>Content</FormLabel>
              <div className="border rounded-md min-h-[500px]">
                <div ref={quillRef} className="h-[500px]" />
              </div>
              {!form.getValues("content") && quillLoaded && (
                <p className="text-sm text-red-500 mt-1">
                  Content cannot be empty
                </p>
              )}
            </div>

            {/* Thumbnail URL */}
            {/* Thumbnail URL */}
            <FormField
              control={form.control}
              name="thumbnailUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thumbnail URL</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Featured Switch */}
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between border rounded-md p-3">
                  <div>
                    <FormLabel>Featured</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" disabled={submitting}>
              {submitting ? "Submitting..." : "Create Blog"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
