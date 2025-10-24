import ProjectCard from "@/components/modules/projects/Card";
import { ParticlesBackground } from "@/components/modules/projects/Particles";

function page() {
  return (
    <div className="text-center relative min-h-screen">
      <ParticlesBackground />
      <div className="z-50">
        <h1 className="mt-5 text-6xl font-semibold text-primary">
          My Projects
        </h1>
        <div>
          <ProjectCard />
        </div>
      </div>
    </div>
  );
}
export default page;
