"use client";

import { useState } from "react";
import Image from "next/image";
import { Project } from "@/interface";
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
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import ProjectUpdateModal from "./PorjectUpdateModal";

export default function ProjectManageCard({
  project,
  onProjectUpdated,
}: {
  project: Project;
  onProjectUpdated: () => void;
}) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  async function handleDelete() {
    try {
      const res = await fetch(
        `https://next-portfolio-backend-zeta.vercel.app/api/v1/projects/delete/${project.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!res.ok) {
        toast.error("Failed to delete project");
      }

      toast.success("Project deleted successfully");
      await fetch("/api/revalidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tag: "projects" }),
      });
      onProjectUpdated();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete project");
    }
  }

  return (
    <>
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>{project.title}</CardTitle>
        </CardHeader>

        {project.thumbnailUrl && (
          <div className="relative w-full h-48">
            <Image
              src={project.thumbnailUrl}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover rounded-md"
            />
          </div>
        )}

        <CardContent>
          <p>{project.description}</p>
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
                  Are you sure you want to delete this project?
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

      <ProjectUpdateModal
        project={project}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onProjectUpdated={onProjectUpdated}
      />
    </>
  );
}
