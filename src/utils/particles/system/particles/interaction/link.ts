import { system } from "../..";
import { canvasPropsEl } from "../../canvas/element";
import { Particle } from "../Particle";

export const linkParticles = (p1: Particle, p2: Particle) => {
  let dx = p1.x - p2.x,
    dy = p1.y - p2.y,
    dist = Math.sqrt(dx * dx + dy * dy);

  /* draw a line between p1 and p2 if the distance between them is under the config distance */
  if (dist <= system.configParticlesFinal.particles.line_linked.distance) {
    let opacity_line =
      system.configParticlesFinal.particles.line_linked.opacity -
      dist /
        (1 / system.configParticlesFinal.particles.line_linked.opacity) /
        system.configParticlesFinal.particles.line_linked.distance;

    if (opacity_line > 0) {
      /* style */
      let color_line = system.color_rgb_line as {
        r: number;
        g: number;
        b: number;
      };
      canvasPropsEl.ctx &&
        (canvasPropsEl.ctx.strokeStyle =
          "rgba(" +
          color_line.r +
          "," +
          color_line.g +
          "," +
          color_line.b +
          "," +
          opacity_line +
          ")");
      canvasPropsEl.ctx &&
        (canvasPropsEl.ctx.lineWidth =
          system.configParticlesFinal.particles.line_linked.width);
      //canvasPropsEl.ctx.lineCap = 'round'; /* performance issue */

      /* path */
      canvasPropsEl.ctx?.beginPath();
      canvasPropsEl.ctx?.moveTo(p1.x, p1.y);
      canvasPropsEl.ctx?.lineTo(p2.x, p2.y);
      canvasPropsEl.ctx?.stroke();
      canvasPropsEl.ctx?.closePath();
    }
  }
};
