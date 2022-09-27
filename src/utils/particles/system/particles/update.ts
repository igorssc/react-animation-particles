import { system } from "..";
import { canvasPropsEl } from "../canvas/element";
import { attractParticles } from "./interaction/attract";
import { bounceParticles } from "./interaction/bounce";
import { linkParticles } from "./interaction/link";
import { bubbleParticle } from "./mode/bubble";
import { grabParticle } from "./mode/grab";
import { repulseParticle } from "./mode/repulse";

export const particlesUpdate = () => {
  for (let i = 0; i < system.particles.length; i++) {
    /* the particle */
    let p = system.particles[i];

    /* move the particle */
    if (system.configParticlesFinal.particles.move.enable) {
      let ms = system.configParticlesFinal.particles.move.speed / 2;

      p.x += p.vx * ms;
      p.y += p.vy * ms;
    }

    /* change opacity status */
    if (system.configParticlesFinal.particles.opacity.anim.enable) {
      if (p.opacity_status === true) {
        if (p.opacity >= system.configParticlesFinal.particles.opacity.value)
          p.opacity_status = false;
        p.opacity += p.vo;
      } else {
        if (
          p.opacity <=
          system.configParticlesFinal.particles.opacity.anim.opacity_min
        )
          p.opacity_status = true;
        p.opacity -= p.vo;
      }
      if (p.opacity < 0) p.opacity = 0;
    }

    /* change size */
    if (system.configParticlesFinal.particles.size.anim.enable) {
      if (p.size_status === true) {
        if (p.radius >= system.configParticlesFinal.particles.size.value)
          p.size_status = false;
        p.radius += p.vs;
      } else {
        if (
          p.radius <= system.configParticlesFinal.particles.size.anim.size_min
        )
          p.size_status = true;
        p.radius -= p.vs;
      }
      if (p.radius < 0) p.radius = 0;
    }

    let new_pos: {
      x_left: number;
      x_right: number;
      y_top: number;
      y_bottom: number;
    };

    /* change particle position if it is out of canvas */
    if (system.configParticlesFinal.particles.move.out_mode === "bounce") {
      new_pos = {
        x_left: p.radius,
        x_right: canvasPropsEl.w,
        y_top: p.radius,
        y_bottom: canvasPropsEl.h,
      };
    } else {
      new_pos = {
        x_left: -p.radius,
        x_right: canvasPropsEl.w + p.radius,
        y_top: -p.radius,
        y_bottom: canvasPropsEl.h + p.radius,
      };
    }

    if (p.x - p.radius > canvasPropsEl.w) {
      p.x = new_pos.x_left;
      p.y = Math.random() * canvasPropsEl.h;
    } else if (p.x + p.radius < 0) {
      p.x = new_pos.x_right;
      p.y = Math.random() * canvasPropsEl.h;
    }
    if (p.y - p.radius > canvasPropsEl.h) {
      p.y = new_pos.y_top;
      p.x = Math.random() * canvasPropsEl.w;
    } else if (p.y + p.radius < 0) {
      p.y = new_pos.y_bottom;
      p.x = Math.random() * canvasPropsEl.w;
    }

    /* out of canvas modes */
    switch (system.configParticlesFinal.particles.move.out_mode) {
      case "bounce":
        if (p.x + p.radius > canvasPropsEl.w) p.vx = -p.vx;
        else if (p.x - p.radius < 0) p.vx = -p.vx;
        if (p.y + p.radius > canvasPropsEl.h) p.vy = -p.vy;
        else if (p.y - p.radius < 0) p.vy = -p.vy;
        break;
    }

    /* events */
    const cases = (c: string) => {
      switch (c) {
        case "grab":
          grabParticle(p);
          break;
        case "bubble":
          bubbleParticle(p);
          break;
        case "repulse":
          repulseParticle(p);
          break;
      }
    };

    if (
      system.configParticlesFinal.interactivity.events.onhover.mode instanceof
      Array
    ) {
      system.configParticlesFinal.interactivity.events.onhover.mode.forEach(
        (mode) => cases(mode)
      );
    } else {
      cases(system.configParticlesFinal.interactivity.events.onhover.mode);
    }

    /* interaction auto between particles */
    if (
      system.configParticlesFinal.particles.line_linked.enable ||
      system.configParticlesFinal.particles.move.attract.enable
    ) {
      for (let j = i + 1; j < system.particles.length; j++) {
        let p2 = system.particles[j];

        /* link particles */
        if (system.configParticlesFinal.particles.line_linked.enable) {
          linkParticles(p, p2);
        }

        /* attract particles */
        if (system.configParticlesFinal.particles.move.attract.enable) {
          attractParticles(p, p2);
        }

        /* bounce particles */
        if (system.configParticlesFinal.particles.move.bounce) {
          bounceParticles(p, p2);
        }
      }
    }
  }
};
