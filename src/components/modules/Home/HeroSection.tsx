import StarryBackground from "@/components/StarryBackground";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine } from "lucide-react";
import Link from "next/link";

function HeroSection() {
  return (
    <div>
      <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-80px)]  text-center px-4">
        <StarryBackground />
        {/* Heading with fade-in */}
        <h1 className="text-5xl font-extrabold mb-6 text-white">
          Hey there, I’m <span className="text-primary">Shamyun Ahmed</span>
        </h1>

        {/* Subtext with fade-in */}
        <p className="text-lg mb-8 text-gray-200 space-y-4 max-w-3xl">
          <span>
            I’m a{" "}
            <span className="text-primary font-semibold">
              full-stack developer
            </span>{" "}
            passionate about turning ideas into{" "}
            <span className="text-orange-200 font-medium">beautiful</span>,{" "}
            <span className="text-orange-200 font-medium">scalable</span>, and{" "}
            <span className="text-orange-200 font-medium">impactful</span>{" "}
            applications.
          </span>
          <span>
            My journey started with the{" "}
            <span className="text-orange-300 font-semibold">MERN stack</span>,
            and I’m expanding into{" "}
            <span className="text-orange-300 font-semibold">
              new technologies and domains
            </span>{" "}
            to stay future-ready.
          </span>
          <span>
            I’m seeking{" "}
            <span className="text-orange-300 font-semibold">
              remote opportunities
            </span>{" "}
            where I can build, learn, and grow alongside innovative teams.
          </span>
        </p>

        <div className="flex justify-center mt-8">
          {/* View Resume */}
          <Link
            href="/resume.pdf" // place your PDF inside "public" folder
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="px-8 py-3 text-lg bg-orange-500 hover:bg-orange-600 text-black flex items-center gap-2">
              View Resume <ArrowDownToLine />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default HeroSection;
