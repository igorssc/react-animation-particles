import { system } from "..";
import { canvasPropsEl } from "../canvas/element";
import { pushParticles } from "../particles/mode/push";
import { removeParticles } from "../particles/mode/remove";

export const eventsListeners = () => {
  /* events target element */
  if (system.configParticlesFinal.interactivity.detect_on === "window") {
    system.el = window;
  } else {
    system.el = canvasPropsEl.el;
  }

  /* detect mouse pos - on hover / click event */
  if (
    system.configParticlesFinal.interactivity.events.onhover.enable ||
    system.configParticlesFinal.interactivity.events.onclick.enable
  ) {
    /* el on mousemove */
    system.el.addEventListener("mousemove", function (e: any) {
      let pos_x, pos_y;
      if (system.el === window) {
        pos_x = e.clientX;
        pos_y = e.clientY;
      } else {
        pos_x = e.offsetX || e.clientX;
        pos_y = e.offsetY || e.clientY;
      }

      system.interactivity_mouse_pos_x = pos_x;
      system.interactivity_mouse_pos_y = pos_y;

      if (system.retina) {
        (system.interactivity_mouse_pos_x as number) *=
          canvasPropsEl.pxratio || 1;
        (system.interactivity_mouse_pos_y as number) *=
          canvasPropsEl.pxratio || 1;
      }

      system.interactivityStatus = "mousemove";
    });

    /* el on onmouseleave */
    system.el.addEventListener("mouseleave", function (e: any) {
      system.interactivity_mouse_pos_x = null;
      system.interactivity_mouse_pos_y = null;
      system.interactivityStatus = "mouseleave";
    });
  }

  /* on click event */
  if (system.configParticlesFinal.interactivity.events.onclick.enable) {
    system.el.addEventListener("click", function () {
      system.interactivity_mouse_click_pos_x =
        system.interactivity_mouse_pos_x as number;

      system.interactivity_mouse_click_pos_y =
        system.interactivity_mouse_pos_y as number;

      system.click_time = new Date().getTime();

      if (system.configParticlesFinal.interactivity.events.onclick.enable) {
        const cases = (c: string) => {
          switch (c) {
            case "push":
              if (system.configParticlesFinal.particles.move.enable) {
                pushParticles(
                  system.configParticlesFinal.interactivity.modes.push
                    .particles_nb,
                  {
                    pos_x: system.interactivity_mouse_pos_x as number,
                    pos_y: system.interactivity_mouse_pos_y as number,
                  }
                );
              } else {
                if (
                  system.configParticlesFinal.interactivity.modes.push
                    .particles_nb === 1
                ) {
                  pushParticles(
                    system.configParticlesFinal.interactivity.modes.push
                      .particles_nb,
                    {
                      pos_x: system.interactivity_mouse_pos_x as number,
                      pos_y: system.interactivity_mouse_pos_y as number,
                    }
                  );
                } else if (
                  system.configParticlesFinal.interactivity.modes.push
                    .particles_nb > 1
                ) {
                  pushParticles(
                    system.configParticlesFinal.interactivity.modes.push
                      .particles_nb
                  );
                }
              }
              break;

            case "remove":
              removeParticles(
                system.configParticlesFinal.interactivity.modes.remove
                  .particles_nb
              );
              break;

            case "bubble":
              system.bubble_clicking = true;
              break;

            case "repulse":
              system.repulse_clicking = true;
              system.repulse_count = 0;
              system.repulse_finish = false;
              setTimeout(function () {
                system.repulse_clicking = false;
              }, system.configParticlesFinal.interactivity.modes.repulse
                .duration * 1000);
              break;
          }
        };

        if (
          system.configParticlesFinal.interactivity.events.onclick
            .mode instanceof Array
        ) {
          system.configParticlesFinal.interactivity.events.onclick.mode.forEach(
            (mode) => cases(mode)
          );
        } else {
          cases(system.configParticlesFinal.interactivity.events.onclick.mode);
        }
      }
    });
  }
};
