import { system } from "..";
import { particlesCreate } from "../particles/create";
import { particlesDraw } from "../particles/draw";
import { particlesEmpty } from "../particles/empty";
import { densityAutoParticles } from "../vendors/densityAutoParticles";
import { canvasPropsEl } from "./element";

export const canvasSize = () => {
  canvasPropsEl.el && (canvasPropsEl.el.width = canvasPropsEl.w);
  canvasPropsEl.el && (canvasPropsEl.el.height = canvasPropsEl.h);

  if (
    typeof window !== "undefined" &&
    system.configParticlesFinal &&
    system.configParticlesFinal.interactivity.events.resize
  ) {
    window.addEventListener("resize", function () {
      canvasPropsEl.w = canvasPropsEl.el?.offsetWidth || 1;
      canvasPropsEl.h =
        system.heightBackground || canvasPropsEl.el?.offsetHeight || 1;

      /* resize canvas */
      if (system.retina) {
        canvasPropsEl.w *= canvasPropsEl?.pxratio || 1;
        canvasPropsEl.h *= canvasPropsEl?.pxratio || 1;
      }

      canvasPropsEl.el && (canvasPropsEl.el.width = canvasPropsEl.w);
      canvasPropsEl.el && (canvasPropsEl.el.height = canvasPropsEl.h);

      /* repaint canvas on anim disabled */
      if (!system.configParticlesFinal.particles.move.enable) {
        particlesEmpty();
        particlesCreate();
        particlesDraw();
        densityAutoParticles();
      }

      /* density particles enabled */
      densityAutoParticles();
    });
  }
};
