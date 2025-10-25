"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFireflyPreset } from "@tsparticles/preset-firefly";

export const FireflyBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(loadFireflyPreset).then(() => setInit(true));
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      options={{
        preset: "firefly",
        detectRetina: true,
        particles: {
          number: {
            value: 150, // Increase this number for more fireflies
            density: {
              enable: true,
            },
          },
        },
      }}
    />
  );
};
