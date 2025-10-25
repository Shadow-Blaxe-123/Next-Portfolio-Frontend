import { Card } from "@/components/ui/card";
import { Blog } from "@/interface";
import fetchData from "@/lib/fetchHelper";
import { FileText, Folder } from "lucide-react";

interface DashboardStatsCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
}

export function DashboardStatsCard({
  title,
  count,
  icon,
}: DashboardStatsCardProps) {
  return (
    <Card className="flex items-center p-4 space-x-6">
      {/* Icon */}
      <div className="bg-primary/10 text-primary p-4 rounded-lg flex items-center justify-center">
        {icon}
      </div>

      {/* Text */}
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-500">{title}</span>
        <span className="text-2xl font-bold">{count}</span>
      </div>
    </Card>
  );
}

// Usage example on dashboard home page
export default async function DashboardHomePage() {
  const blogData = await fetchData<Blog[]>(
    "https://next-portfolio-backend-zeta.vercel.app/api/v1/blogs/get-all",
    ["blogs"],
    "blogs"
  );

  const projectData = await fetchData<Blog[]>(
    "https://next-portfolio-backend-zeta.vercel.app/api/v1/projects/get-all",
    ["projects"],
    "projects"
  );
  if (!blogData && !projectData) {
  }
  const blogsCount = blogData?.length as number;
  const projectsCount = projectData?.length as number;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
      <DashboardStatsCard
        title="Blogs"
        count={blogsCount}
        icon={<FileText size={24} />}
      />
      <DashboardStatsCard
        title="Projects"
        count={projectsCount}
        icon={<Folder size={24} />}
      />
    </div>
  );
}
