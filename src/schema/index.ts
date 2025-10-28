import z from "zod";

export const projectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),
  content: z.string().min(1, "Content cannot be empty."),
  isFeatured: z.boolean(),
  githubUrl: z.url("Must be a valid URL.").or(z.literal("")),
  liveUrl: z.url("Must be a valid URL.").or(z.literal("")),
});

export const blogSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),
  content: z.string().min(1, "Content cannot be empty."),
  isFeatured: z.boolean(),
});
