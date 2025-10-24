import { ParticlesBackground } from "@/components/Particles";

function page() {
  return (
    <div className="text-center relative min-h-screen">
      <ParticlesBackground />
      <h1 className="mt-5 text-6xl font-semibold text-primary">My Projects</h1>
    </div>
  );
}
export default page;
