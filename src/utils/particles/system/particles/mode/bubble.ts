import { system } from "../..";
import { isInArray } from "../../../utils/isInArray";
import { Particle } from "../Particle";

export const bubbleParticle = (p: Particle) => {
  /* on hover event */
  if (
    system.configParticlesFinal.interactivity.events.onhover.enable &&
    (system.configParticlesFinal.interactivity.events.onhover.mode ===
      "bubble" ||
      (system.configParticlesFinal.interactivity.events.onhover.mode instanceof
        Array &&
        isInArray(
          "bubble",
          system.configParticlesFinal.interactivity.events.onhover.mode
        )))
  ) {
    let dx_mouse = p.x - (system.interactivity_mouse_pos_x as number),
      dy_mouse = p.y - (system.interactivity_mouse_pos_y as number),
      dist_mouse = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse),
      ratio =
        1 -
        dist_mouse /
          system.configParticlesFinal.interactivity.modes.bubble.distance;

    const init = () => {
      p.opacity_bubble = p.opacity;
      p.radius_bubble = p.radius;
    };

    /* mousemove - check ratio */
    if (
      dist_mouse <=
      system.configParticlesFinal.interactivity.modes.bubble.distance
    ) {
      if (ratio >= 0 && system.interactivityStatus === "mousemove") {
        /* size */
        if (
          system.configParticlesFinal.interactivity.modes.bubble.size !==
          system.configParticlesFinal.particles.size.value
        ) {
          if (
            system.configParticlesFinal.interactivity.modes.bubble.size >
            system.configParticlesFinal.particles.size.value
          ) {
            let size =
              p.radius +
              system.configParticlesFinal.interactivity.modes.bubble.size *
                ratio;
            if (size >= 0) {
              p.radius_bubble = size;
            }
          } else {
            let dif =
                p.radius -
                system.configParticlesFinal.interactivity.modes.bubble.size,
              size = p.radius - dif * ratio;
            if (size > 0) {
              p.radius_bubble = size;
            } else {
              p.radius_bubble = 0;
            }
          }
        }

        /* opacity */
        if (
          system.configParticlesFinal.interactivity.modes.bubble.opacity !==
          system.configParticlesFinal.particles.opacity.value
        ) {
          if (
            system.configParticlesFinal.interactivity.modes.bubble.opacity >
            system.configParticlesFinal.particles.opacity.value
          ) {
            let opacity =
              system.configParticlesFinal.interactivity.modes.bubble.opacity *
              ratio;
            if (
              opacity > p.opacity &&
              opacity <=
                system.configParticlesFinal.interactivity.modes.bubble.opacity
            ) {
              p.opacity_bubble = opacity;
            }
          } else {
            let opacity =
              p.opacity -
              (system.configParticlesFinal.particles.opacity.value -
                system.configParticlesFinal.interactivity.modes.bubble
                  .opacity) *
                ratio;
            if (
              opacity < p.opacity &&
              opacity >=
                system.configParticlesFinal.interactivity.modes.bubble.opacity
            ) {
              p.opacity_bubble = opacity;
            }
          }
        }
      }
    } else {
      init();
    }

    /* mouseleave */
    if (system.interactivityStatus === "mouseleave") {
      init();
    }
  } else if (
    /* on click event */
    system.configParticlesFinal.interactivity.events.onclick.enable &&
    (system.configParticlesFinal.interactivity.events.onclick.mode ===
      "bubble" ||
      (system.configParticlesFinal.interactivity.events.onclick.mode instanceof
        Array &&
        isInArray(
          "bubble",
          system.configParticlesFinal.interactivity.events.onclick.mode
        )))
  ) {
    if (system.bubble_clicking) {
      system.dx_mouse = p.x - system.interactivity_mouse_click_pos_x;
      system.dy_mouse = p.y - system.interactivity_mouse_click_pos_y;
      system.dist_mouse = Math.sqrt(
        system.dx_mouse * system.dx_mouse + system.dy_mouse * system.dy_mouse
      );

      system.time_spent = (new Date().getTime() - system.click_time) / 1000;

      if (
        system.time_spent >
        system.configParticlesFinal.interactivity.modes.bubble.duration
      ) {
        system.bubble_duration_end = true;
      }

      if (
        system.time_spent >
        system.configParticlesFinal.interactivity.modes.bubble.duration * 2
      ) {
        system.bubble_clicking = false;
        system.bubble_duration_end = false;
      }
    }

    const process = (
      bubble_param: number,
      particles_param: number,
      p_obj_bubble: number,
      p_obj: number,
      id: string
    ) => {
      if (bubble_param !== particles_param) {
        if (!system.bubble_duration_end) {
          if (
            system.dist_mouse <=
            system.configParticlesFinal.interactivity.modes.bubble.distance
          ) {
            let objProcess;

            if (p_obj_bubble !== undefined) objProcess = p_obj_bubble;
            else objProcess = p_obj;
            if (objProcess !== bubble_param) {
              let value =
                p_obj -
                (system.time_spent * (p_obj - bubble_param)) /
                  system.configParticlesFinal.interactivity.modes.bubble
                    .duration;
              if (id === "size") p.radius_bubble = value;
              if (id === "opacity") p.opacity_bubble = value;
            }
          } else {
            if (id === "size") p.radius_bubble = undefined;
            if (id === "opacity") p.opacity_bubble = undefined;
          }
        } else {
          if (p_obj_bubble !== undefined) {
            let value_tmp =
                p_obj -
                (system.time_spent * (p_obj - bubble_param)) /
                  system.configParticlesFinal.interactivity.modes.bubble
                    .duration,
              dif = bubble_param - value_tmp;
            let value = bubble_param + dif;
            if (id === "size") p.radius_bubble = value;
            if (id === "opacity") p.opacity_bubble = value;
          }
        }
      }
    };

    if (system.bubble_clicking) {
      /* size */
      process(
        system.configParticlesFinal.interactivity.modes.bubble.size,
        system.configParticlesFinal.particles.size.value,
        p.radius_bubble as number,
        p.radius,
        "size"
      );
      /* opacity */
      process(
        system.configParticlesFinal.interactivity.modes.bubble.opacity,
        system.configParticlesFinal.particles.opacity.value,
        p.opacity_bubble as number,
        p.opacity,
        "opacity"
      );
    }
  }
};
