"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, X } from "lucide-react";

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
import type Quill from "quill";
import Image from "next/image";
import { toast } from "sonner";
import { blogSchema } from "@/schema";

type BlogFormValues = z.infer<typeof blogSchema>;

export default function BlogCreateForm() {
  const [submitting, setSubmitting] = useState(false);
  const [quillLoaded, setQuillLoaded] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const quillRef = useRef<HTMLDivElement | null>(null);
  const editorInstance = useRef<Quill | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      isFeatured: false,
    },
  });

  // Initialize Quill
  useEffect(() => {
    async function initQuill() {
      if (typeof window === "undefined") return;
      const Quill = (await import("quill")).default;
      editorInstance.current = new Quill(quillRef.current!, {
        theme: "snow",
        placeholder: "Write your blog content here...",
      });

      editorInstance.current.on("text-change", () => {
        form.setValue("content", editorInstance.current!.root.innerHTML);
      });

      setQuillLoaded(true);
    }
    initQuill();
  }, [form]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
      } else {
        alert("Please upload an image file");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith("image/")) {
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
      } else {
        alert("Please upload an image file");
      }
    }
  };

  const removeImage = () => {
    setSelectedFile(null);
    setPreviewUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  async function onSubmit(values: BlogFormValues) {
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append(
        "data",
        JSON.stringify({
          title: values.title,
          description: values.description,
          content: values.content,
          isFeatured: values.isFeatured,
        })
      );
      if (selectedFile) formData.append("file", selectedFile);

      console.log(...formData);

      const res = await fetch(
        "https://next-portfolio-backend-zeta.vercel.app/api/v1/blogs/create",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );
      const r = await res.json();
      console.log(r);
      if (r.success === true) {
        toast.success("Blog created successfully.");
      } else {
        toast.error("Failed to create blog.");
      }

      form.reset();
      setPreviewUrl("");
      setSelectedFile(null);
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

            {/* Content */}
            <div>
              <FormLabel>Content</FormLabel>
              <div className="border rounded-md min-h-[500px]">
                <div ref={quillRef} className="h-full" />
              </div>
              {!form.getValues("content") && quillLoaded && (
                <p className="text-sm text-red-500 mt-1">
                  Content cannot be empty
                </p>
              )}
            </div>

            {/* Thumbnail Upload */}
            <FormItem>
              <FormLabel>Thumbnail Image</FormLabel>
              <FormControl>
                <div>
                  {previewUrl ? (
                    <div className="relative border rounded-md p-4">
                      <Image
                        width={300}
                        height={200}
                        src={previewUrl}
                        alt="Thumbnail preview"
                        className="w-full h-48 object-cover rounded-md"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-6 right-6"
                        onClick={removeImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div
                      className={`border-2 border-dashed rounded-md p-8 text-center cursor-pointer transition-colors ${
                        dragActive
                          ? "border-primary bg-primary/5"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="h-10 w-10 text-gray-400" />
                        <div className="text-sm text-gray-600">
                          <span className="font-semibold text-primary">
                            Click to upload
                          </span>{" "}
                          or drag and drop
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </FormControl>
            </FormItem>

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
