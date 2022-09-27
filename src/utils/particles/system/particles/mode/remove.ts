import { system } from "../..";
import { particlesDraw } from "../draw";

export const removeParticles = (nb: number) => {
  system.particles.splice(0, nb);
  if (!system.configParticlesFinal.particles.move.enable) {
    particlesDraw();
  }
};
