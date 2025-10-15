import { DiMongodb } from "react-icons/di";
import { FaGitAlt, FaNodeJs, FaPython, FaReact } from "react-icons/fa";
import { LiaJava } from "react-icons/lia";
import {
  SiNextdotjs,
  SiPostgresql,
  SiPrisma,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

function AboutSection() {
  const skills = [
    {
      name: "Next.js",
      icon: <SiNextdotjs className="text-gray-900 dark:text-white" />,
    },
    { name: "React", icon: <FaReact className="text-sky-500" /> },
    { name: "TypeScript", icon: <SiTypescript className="text-blue-600" /> },
    { name: "Node.js", icon: <FaNodeJs className="text-green-600" /> },
    {
      name: "Express.js",
      icon: <FaNodeJs className="text-gray-700 dark:text-gray-300" />,
    },
    { name: "Prisma", icon: <SiPrisma className="text-indigo-500" /> },
    { name: "PostgreSQL", icon: <SiPostgresql className="text-sky-700" /> },
    { name: "MongoDB", icon: <DiMongodb className="text-green-600" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-500" /> },
    { name: "Git", icon: <FaGitAlt className="text-orange-600" /> },
    { name: "Python", icon: <FaPython className="text-blue-500" /> },
    { name: "Java", icon: <LiaJava className="text-blue-300" /> },
  ];
  return (
    <section className="max-w-5xl mx-auto p-4">
      <h2 className="text-6xl font-bold mb-6 text-center text-primary">
        About Me
      </h2>
      <div className=" items-center">
        <div>
          {/* <img src="/profile.jpg" alt="Shamun Ahmed" className="rounded-2xl shadow-lg w-full" /> */}
        </div>
        <div>
          <p className="text-lg text-foreground mb-4">
            👋 Hey, I’m Shamyun Ahmed I’m an aspiring Full-Stack Developer with
            a passion for building fast, clean, and user-focused web
            experiences. I love solving problems through code — whether it’s
            crafting interactive UIs with Next.js, designing robust backends
            with Express & Prisma, or optimizing database queries in PostgreSQL.
            Currently, I’m exploring advanced fullstack development, machine
            learning, and system design — aiming to become a versatile engineer
            who can build across web, mobile, and AI-powered systems.
          </p>
          <div className="text-lg text-foreground mb-4">
            <h3 className="text-3xl font-semibold text-primary">
              🚀 My Goals:
            </h3>
            <p>
              I aim to build software that not only works well but feels right —
              intuitive, efficient, and elegant. I’m currently focused on
              improving my fullstack and database skills, and I’m planning to
              pursue a Computer Science or Engineering degree abroad. In the
              long term, I want to combine my skills in AI, Web, and Robotics to
              create intelligent systems that make people’s lives easier. 🧭
              Beyond Code When I’m not programming, you’ll find me reading
              mythology-inspired fiction, exploring new ideas in economics and
              physics, or diving into tech projects that challenge how I think.
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-3xl font-semibold text-primary mb-6 text-center">
            🎯 My Skills
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="flex flex-col items-center justify-center p-4 bg-muted/30 dark:bg-muted/50 
                           rounded-2xl shadow-md hover:shadow-lg hover:scale-115 transition-all duration-300"
              >
                <div className="text-4xl mb-2">{skill.icon}</div>
                <p className="text-foreground font-medium">{skill.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default AboutSection;
