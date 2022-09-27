import { particle } from "..";
import { system } from "../..";
import { canvasPropsEl } from "../../canvas/element";
import { particlesDraw } from "../draw";

export const pushParticles = (
  nb: number,
  pos?: { pos_x: number; pos_y: number }
) => {
  system.pushing = true;

  for (let i = 0; i < nb; i++) {
    system.particles.push(
      particle(system.configParticlesFinal.particles.color, {
        x: pos ? pos.pos_x : Math.random() * canvasPropsEl.w,
        y: pos ? pos.pos_y : Math.random() * canvasPropsEl.h,
      })
    );
    if (i === nb - 1) {
      if (!system.configParticlesFinal.particles.move.enable) {
        particlesDraw();
      }
      system.pushing = false;
    }
  }
};
