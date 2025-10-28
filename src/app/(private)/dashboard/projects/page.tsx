"use client";

import { useEffect, useState } from "react";
import { Project } from "@/interface";
import { Skeleton } from "@/components/ui/skeleton";
import fetchData from "@/lib/fetchHelper";
import ProjectManageCard from "@/components/modules/projects/ProjectManageCard";

export default function ManageBlogsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchProjects() {
    try {
      const data = await fetchData<Project[]>(
        "https://next-portfolio-backend-zeta.vercel.app/api/v1/projects/get-all",
        ["projects"],
        "projects"
      );
      if (!data) {
        return (
          <div className="min-h-screen flex items-center justify-center text-gray-400">
            <p>Failed to load projects.</p>
          </div>
        );
      }
      setProjects(data || []);
    } catch (err) {
      console.error("Failed to load projects:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProjects();
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
        Manage Projects
      </h1>
      <div className="grid md:grid-cols-3 gap-10">
        {projects.map((project) => (
          <ProjectManageCard
            key={project.id}
            project={project}
            onProjectUpdated={fetchProjects}
          />
        ))}
      </div>
    </div>
  );
}
