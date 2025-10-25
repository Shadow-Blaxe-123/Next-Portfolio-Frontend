import ProjectCard from "@/components/modules/projects/Card";
import { ParticlesBackground } from "@/components/modules/projects/Particles";
import { Project } from "@/interface";
import fetchData from "@/lib/fetchHelper";

async function page() {
  const data = await fetchData<Project[]>(
    "https://next-portfolio-backend-zeta.vercel.app/api/v1/projects/get-all",
    ["projects"],
    "projects"
  );

  return (
    <div className="text-center relative min-h-screen">
      <ParticlesBackground />
      <div className="z-50">
        <h1 className="my-10 text-6xl font-semibold text-primary">
          My Projects
        </h1>
        <div>
          <ProjectCard data={data as Project[]} />
        </div>
      </div>
    </div>
  );
}
export default page;
