"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import "quill/dist/quill.snow.css";
import type Quill from "quill";
import { Project } from "@/interface";
import { projectSchema } from "@/schema";

type ProjectFormValues = z.infer<typeof projectSchema>;

interface ProjectUpdateModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
  onProjectUpdated: () => void;
}

export default function ProjectUpdateModal({
  project,
  isOpen,
  onClose,
  onProjectUpdated,
}: ProjectUpdateModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const [quillLoaded, setQuillLoaded] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>(
    project.thumbnailUrl || ""
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const quillRef = useRef<HTMLDivElement | null>(null);
  const editorInstance = useRef<Quill | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: project.title,
      description: project.description,
      content: project.content || "",
      isFeatured: project.isFeatured || false,
      githubUrl: project.githubUrl || "",
      liveUrl: project.liveUrl || "",
    },
  });

  // Initialize Quill when modal opens
  useEffect(() => {
    if (!isOpen) return;

    async function initQuill() {
      if (typeof window === "undefined") return;
      if (editorInstance.current) {
        // Quill already initialized, just set content
        editorInstance.current.root.innerHTML = project.content || "";
        return;
      }

      const Quill = (await import("quill")).default;
      if (quillRef.current) {
        editorInstance.current = new Quill(quillRef.current, {
          theme: "snow",
          placeholder: "Write your project details here...",
        });

        // Set initial content
        editorInstance.current.root.innerHTML = project.content || "";

        editorInstance.current.on("text-change", () => {
          if (editorInstance.current) {
            form.setValue("content", editorInstance.current.root.innerHTML);
          }
        });

        setQuillLoaded(true);
      }
    }

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      initQuill();
    }, 100);

    return () => clearTimeout(timer);
  }, [isOpen, project.content, form]);

  // Reset preview when project changes
  useEffect(() => {
    setPreviewUrl(project.thumbnailUrl || "");
    setSelectedFile(null);
  }, [project]);

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
        toast.error("Please upload an image file");
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
        toast.error("Please upload an image file");
      }
    }
  };

  const removeImage = () => {
    setSelectedFile(null);
    setPreviewUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  async function onSubmit(values: ProjectFormValues) {
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
          githubUrl: values.githubUrl,
          liveUrl: values.liveUrl,
        })
      );

      // Only append file if a new one was selected
      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      const res = await fetch(
        `https://next-portfolio-backend-zeta.vercel.app/api/v1/projects/update/${project.id}`,
        {
          method: "PATCH",
          body: formData,
          credentials: "include",
        }
      );

      const r = await res.json();

      if (r.success === true) {
        toast.success("Project updated successfully.");
        await fetch("/api/revalidate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tag: "projects" }),
        });

        onProjectUpdated();
        onClose();
      } else {
        toast.error("Failed to update project.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update project.");
    } finally {
      setSubmitting(false);
    }
  }

  const handleClose = () => {
    form.reset();
    setSelectedFile(null);
    setPreviewUrl(project.thumbnailUrl || "");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Project</DialogTitle>
        </DialogHeader>

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
                    <Input placeholder="Enter project title..." {...field} />
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
                      placeholder="Brief description of your project..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Content */}
            <div>
              <FormLabel>Detailed Content</FormLabel>
              <div className="border rounded-md min-h-[400px]">
                <div ref={quillRef} className="h-[400px]" />
              </div>
              {!form.getValues("content") && quillLoaded && (
                <p className="text-sm text-red-500 mt-1">
                  Content cannot be empty
                </p>
              )}
            </div>

            {/* GitHub URL */}
            <FormField
              control={form.control}
              name="githubUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://github.com/..."
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Live URL */}
            <FormField
              control={form.control}
              name="liveUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Live URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://your-live-demo.com"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Thumbnail Upload */}
            <FormItem>
              <FormLabel>Thumbnail Image</FormLabel>
              <FormControl>
                <div>
                  {previewUrl ? (
                    <div className="relative border rounded-md p-4">
                      <Image
                        loading="lazy"
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
                      {selectedFile && (
                        <p className="text-sm text-gray-600 mt-2">
                          New file selected: {selectedFile.name}
                        </p>
                      )}
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

            <div className="flex gap-3 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? "Updating..." : "Update Project"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
