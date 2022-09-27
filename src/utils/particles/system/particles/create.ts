import { system } from "..";
import { particle } from "./";

export const particlesCreate = () => {
  for (let i = 0; i < system.configParticlesFinal.particles.number.value; i++) {
    system.particles.push(
      particle(system.configParticlesFinal.particles.color)
    );
  }
};
