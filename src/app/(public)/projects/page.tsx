import ProjectCard from "@/components/modules/projects/Card";
import { ParticlesBackground } from "@/components/modules/projects/Particles";
import { Project } from "@/interface";

async function page() {
  let data: Project[] = [];

  try {
    const res = await fetch(
      "https://next-portfolio-backend-zeta.vercel.app/api/v1/projects/get-all",
      {
        next: { tags: ["projects"] }, // ISR tag
      }
    );

    if (!res.ok) throw new Error("Failed to fetch projects");

    const json = await res.json();
    // console.log(json.data);
    data = json.data.projects as Project[];
  } catch (err) {
    console.error(err);
  }
  return (
    <div className="text-center relative min-h-screen">
      <ParticlesBackground />
      <div className="z-50">
        <h1 className="my-10 text-6xl font-semibold text-primary">
          My Projects
        </h1>
        <div>
          <ProjectCard data={data} />
        </div>
      </div>
    </div>
  );
}
export default page;
