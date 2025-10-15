import AboutSection from "@/components/modules/Home/AboutSection";
import HeroSection from "@/components/modules/Home/HeroSection";

export default function Home() {
  return (
    <div className="grid grid-cols-1">
      <section id="hero">
        <HeroSection />
      </section>
      <section id="about">
        <AboutSection />
      </section>
    </div>
  );
}
