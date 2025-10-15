function AboutSection() {
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
        <div className="text-lg text-foreground mb-4">
          <h3 className="text-3xl font-semibold text-primary">🎯 My Skills:</h3>
        </div>
      </div>
    </section>
  );
}
export default AboutSection;
