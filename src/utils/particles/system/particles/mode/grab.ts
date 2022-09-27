import { system } from "../..";
import { canvasPropsEl } from "../../canvas/element";
import { Particle } from "../Particle";

export const grabParticle = (p: Particle) => {
  if (
    system.configParticlesFinal.interactivity.events.onhover.enable &&
    system.interactivityStatus === "mousemove"
  ) {
    let dx_mouse = p.x - (system.interactivity_mouse_pos_x as number),
      dy_mouse = p.y - (system.interactivity_mouse_pos_y as number),
      dist_mouse = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse);

    /* draw a line between the cursor and the particle if the distance between them is under the config distance */
    if (
      dist_mouse <=
      system.configParticlesFinal.interactivity.modes.grab.distance
    ) {
      let opacity_line =
        system.configParticlesFinal.interactivity.modes.grab.line_linked
          .opacity -
        dist_mouse /
          (1 /
            system.configParticlesFinal.interactivity.modes.grab.line_linked
              .opacity) /
          system.configParticlesFinal.interactivity.modes.grab.distance;

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
        canvasPropsEl.ctx?.moveTo(p.x, p.y);
        canvasPropsEl.ctx?.lineTo(
          system.interactivity_mouse_pos_x as number,
          system.interactivity_mouse_pos_y as number
        );
        canvasPropsEl.ctx?.stroke();
        canvasPropsEl.ctx?.closePath();
      }
    }
  }
};
