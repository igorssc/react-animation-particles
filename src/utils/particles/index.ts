import { configParticlesProps } from "./config";
import { system, systemParticles } from "./system";
import { canvasPropsEl } from "./system/canvas/element";

let pJSDom: Array<void> = [];

export const load = (
  tag_id: string,
  config_json?: configParticlesProps,
  callback?: () => void
) => {
  if (typeof window === "undefined") return;
  /* pJS elements */
  const pJS_tag = document.getElementById(tag_id);

  const pJS_canvas_class = "particles-js-canvas-el";

  const exist_canvas = pJS_tag?.getElementsByClassName(pJS_canvas_class);

  /* remove canvas if exists into the pJS target tag */
  if (exist_canvas?.length) {
    while (exist_canvas.length > 0) {
      pJS_tag?.removeChild(exist_canvas[0]);
    }
  }

  /* create canvas element */
  const canvas_el = document.createElement("canvas");
  canvas_el.className = pJS_canvas_class;
  canvas_el.style.zIndex = "10";
  canvas_el.style.width = "100%";
  canvas_el.style.position = "absolute";

  /* append canvas */
  const canvas = document.getElementById(tag_id)?.prepend(canvas_el);

  /* launch particle.js */
  if (canvas !== null) {
    pJSDom.push(systemParticles(tag_id, config_json));
  }

  if (callback) callback();
};

export const destroy = () => {
  cancelAnimationFrame(system.drawAnimFrame);
  canvasPropsEl.el?.remove();
  pJSDom = [];
};
