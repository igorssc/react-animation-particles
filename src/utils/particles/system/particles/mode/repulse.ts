import { system } from "../..";
import { clamp } from "../../../utils/clamp";
import { isInArray } from "../../../utils/isInArray";
import { canvasPropsEl } from "../../canvas/element";
import { Particle } from "../Particle";

export const repulseParticle = (p: Particle) => {
  if (
    system.configParticlesFinal.interactivity.events.onhover.enable &&
    (system.configParticlesFinal.interactivity.events.onhover.mode ===
      "repulse" ||
      (system.configParticlesFinal.interactivity.events.onhover.mode instanceof
        Array &&
        isInArray(
          "repulse",
          system.configParticlesFinal.interactivity.events.onhover.mode
        ))) &&
    system.interactivityStatus === "mousemove"
  ) {
    let dx_mouse = p.x - (system.interactivity_mouse_pos_x as number),
      dy_mouse = p.y - (system.interactivity_mouse_pos_y as number),
      dist_mouse = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse);

    let normVec = { x: dx_mouse / dist_mouse, y: dy_mouse / dist_mouse },
      repulseRadius =
        system.configParticlesFinal.interactivity.modes.repulse.distance,
      velocity = 100,
      repulseFactor = clamp(
        (1 / repulseRadius) *
          (-1 * Math.pow(dist_mouse / repulseRadius, 2) + 1) *
          repulseRadius *
          velocity,
        0,
        50
      );

    let pos = {
      x: p.x + normVec.x * repulseFactor,
      y: p.y + normVec.y * repulseFactor,
    };

    if (system.configParticlesFinal.particles.move.out_mode === "bounce") {
      if (pos.x - p.radius > 0 && pos.x + p.radius < canvasPropsEl.w)
        p.x = pos.x;
      if (pos.y - p.radius > 0 && pos.y + p.radius < canvasPropsEl.h)
        p.y = pos.y;
    } else {
      p.x = pos.x;
      p.y = pos.y;
    }
  } else if (
    system.configParticlesFinal.interactivity.events.onclick.enable &&
    (system.configParticlesFinal.interactivity.events.onclick.mode ===
      "repulse" ||
      (system.configParticlesFinal.interactivity.events.onclick.mode instanceof
        Array &&
        isInArray(
          "repulse",
          system.configParticlesFinal.interactivity.events.onclick.mode
        )))
  ) {
    if (!system.repulse_finish) {
      system.repulse_count++;
      if (system.repulse_count === system.particles.length) {
        system.repulse_finish = true;
      }
    }

    if (system.repulse_clicking) {
      let repulseRadius = Math.pow(
        system.configParticlesFinal.interactivity.modes.repulse.distance / 6,
        3
      );

      let dx = system.interactivity_mouse_click_pos_x - p.x,
        dy = system.interactivity_mouse_click_pos_y - p.y,
        d = dx * dx + dy * dy;

      let force = (-repulseRadius / d) * 1;

      const process = () => {
        let f = Math.atan2(dy, dx);
        p.vx = force * Math.cos(f);
        p.vy = force * Math.sin(f);

        if (system.configParticlesFinal.particles.move.out_mode === "bounce") {
          let pos = {
            x: p.x + p.vx,
            y: p.y + p.vy,
          };
          if (pos.x + p.radius > canvasPropsEl.w) p.vx = -p.vx;
          else if (pos.x - p.radius < 0) p.vx = -p.vx;
          if (pos.y + p.radius > canvasPropsEl.h) p.vy = -p.vy;
          else if (pos.y - p.radius < 0) p.vy = -p.vy;
        }
      };

      // default
      if (d <= repulseRadius) {
        process();
      }
    } else {
      if (system.repulse_clicking === false) {
        p.vx = p.vx_i;
        p.vy = p.vy_i;
      }
    }
  }
};
