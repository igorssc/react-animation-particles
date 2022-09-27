import { system } from "..";
import { canvasPropsEl } from "../canvas/element";
import { pushParticles } from "../particles/mode/push";
import { removeParticles } from "../particles/mode/remove";

export const densityAutoParticles = () => {
  if (system.configParticlesFinal.particles.number.density.enable) {
    /* calc area */
    let area = (canvasPropsEl.w * canvasPropsEl.h) / 1000;
    if (system.retina) {
      area = area / ((canvasPropsEl.pxratio || 1) * 2);
    }

    /* calc number of particles based on density area */
    let nb_particles =
      (area * system.configParticlesFinal.particles.number.value) /
      system.configParticlesFinal.particles.number.density.value_area;

    /* add or remove X particles */
    let missing_particles = system.particles.length - nb_particles;

    if (missing_particles < 0) pushParticles(Math.abs(missing_particles));
    else removeParticles(missing_particles);
  }
};
