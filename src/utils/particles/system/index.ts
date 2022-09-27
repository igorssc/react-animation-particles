import { configDefaultParticles, configParticlesProps } from "../config";
import { isInArray } from "../utils/isInArray";
import { canvasProps, canvasPropsEl, setCanvasPropsEl } from "./canvas/element";
import { System } from "./System";
import { checkBeforeDraw } from "./vendors/checkBeforeDraw";
import { eventsListeners } from "./vendors/eventsListeners";
import { loadImg } from "./vendors/loadImg";

export const system = new System();

export const systemParticles = (
  tag_id: string,
  params: configParticlesProps
) => {
  const el: HTMLCanvasElement | null = document.querySelector(
    "#" + tag_id + " > .particles-js-canvas-el"
  );

  setCanvasPropsEl({
    el: el,
    w: el?.offsetWidth || 0,
    h: el?.offsetHeight || 0,
  });

  system.heightBackground = document.getElementById(tag_id)?.offsetHeight || 0;

  system.configParticlesFinal = params || configDefaultParticles;

  const obj = {
    size_value: system.configParticlesFinal.particles.size.value,
    size_anim_speed: system.configParticlesFinal.particles.size.anim.speed,
    move_speed: system.configParticlesFinal.particles.move.speed,
    line_linked_distance:
      system.configParticlesFinal.particles.line_linked.distance,
    line_linked_width: system.configParticlesFinal.particles.line_linked.width,
    mode_grab_distance:
      system.configParticlesFinal.interactivity.modes.grab.distance,
    mode_bubble_distance:
      system.configParticlesFinal.interactivity.modes.bubble.distance,
    mode_bubble_size:
      system.configParticlesFinal.interactivity.modes.bubble.size,
    mode_repulse_distance:
      system.configParticlesFinal.interactivity.modes.repulse.distance,
  };

  (canvasPropsEl as canvasProps).w =
    (canvasPropsEl.el?.offsetWidth || 0) * (canvasPropsEl.pxratio || 1);

  canvasPropsEl.h =
    (system.heightBackground || canvasPropsEl.el?.offsetHeight || 0) *
    (canvasPropsEl.pxratio || 1);

  system.configParticlesFinal.particles.size.value =
    (obj.size_value || 0) * (canvasPropsEl.pxratio || 1);
  system.configParticlesFinal.particles.size.anim.speed =
    (obj.size_anim_speed || 0) * (canvasPropsEl.pxratio || 1);
  system.configParticlesFinal.particles.move.speed =
    (obj.move_speed || 0) * (canvasPropsEl.pxratio || 1);
  system.configParticlesFinal.particles.line_linked.distance =
    (obj.line_linked_distance || 0) * (canvasPropsEl.pxratio || 1);
  system.configParticlesFinal.interactivity.modes.grab.distance =
    (obj.mode_grab_distance || 0) * (canvasPropsEl.pxratio || 1);
  system.configParticlesFinal.interactivity.modes.bubble.distance =
    (obj.mode_bubble_distance || 0) * (canvasPropsEl.pxratio || 1);
  system.configParticlesFinal.particles.line_linked.width =
    (obj.line_linked_width || 0) * (canvasPropsEl.pxratio || 1);
  system.configParticlesFinal.interactivity.modes.bubble.size =
    (obj.mode_bubble_size || 0) * (canvasPropsEl.pxratio || 1);
  system.configParticlesFinal.interactivity.modes.repulse.distance =
    (obj.mode_repulse_distance || 0) * (canvasPropsEl.pxratio || 1);

  const start = () => {
    if (
      system.configParticlesFinal.particles.shape.type === "image" ||
      (system.configParticlesFinal.particles.shape.type instanceof Array &&
        isInArray("image", system.configParticlesFinal.particles.shape.type))
    ) {
      system.img_type =
        system.configParticlesFinal.particles.shape.image?.src.substr(
          system.configParticlesFinal.particles.shape.image.src.length - 3
        ) || undefined;

      loadImg(system.img_type);
    } else {
      checkBeforeDraw();
    }
  };

  /* ---------- start ------------ */

  eventsListeners();

  start();
};
