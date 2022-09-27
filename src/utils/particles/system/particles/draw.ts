import { system } from "..";
import { canvasPropsEl } from "../canvas/element";
import { drawShape } from "../vendors/drawShape";
import { Particle } from "./Particle";
import { particlesUpdate } from "./update";

export const particlesDraw = () => {
  /* clear canvas */
  canvasPropsEl.ctx?.clearRect(0, 0, canvasPropsEl.w, canvasPropsEl.h);

  /* update each particles param */
  particlesUpdate();

  /* draw each particle */
  for (let i = 0; i < system.particles.length; i++) {
    let p = system.particles[i];

    p.draw();
  }
};

export const particleDraw = (p: Particle) => {
  if (p.radius_bubble) {
    p.radius = p.radius_bubble;
  }

  if (p.opacity_bubble) {
    p.opacity = p.opacity_bubble;
  }

  let color_value: string;

  if (p.color.rgb) {
    color_value =
      "rgba(" +
      p.color.rgb.r +
      "," +
      p.color.rgb.g +
      "," +
      p.color.rgb.b +
      "," +
      p.opacity +
      ")";
  } else {
    color_value =
      "hsla(" +
      p.color.hsl?.h +
      "," +
      p.color.hsl?.s +
      "%," +
      p.color.hsl?.l +
      "%," +
      p.opacity +
      ")";
  }

  canvasPropsEl.ctx && (canvasPropsEl.ctx.fillStyle = color_value);
  canvasPropsEl.ctx?.beginPath();

  // eslint-disable-next-line default-case
  switch (p.shape) {
    case "circle":
      canvasPropsEl.ctx?.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
      break;

    case "edge":
      canvasPropsEl.ctx?.rect(
        p.x - p.radius,
        p.y - p.radius,
        p.radius * 2,
        p.radius * 2
      );
      break;

    case "triangle":
      drawShape(
        canvasPropsEl.ctx as CanvasRenderingContext2D,
        p.x - p.radius,
        p.y + p.radius / 1.66,
        p.radius * 2,
        3,
        2
      );
      break;

    case "polygon":
      drawShape(
        canvasPropsEl.ctx as CanvasRenderingContext2D,
        p.x -
          p.radius /
            (system.configParticlesFinal.particles.shape.polygon.nb_sides /
              3.5), // startX
        p.y - p.radius / (2.66 / 3.5), // startY
        (p.radius * 2.66) /
          (system.configParticlesFinal.particles.shape.polygon.nb_sides / 3), // sideLength
        system.configParticlesFinal.particles.shape.polygon.nb_sides, // sideCountNumerator
        1 // sideCountDenominator
      );
      break;

    case "star":
      drawShape(
        canvasPropsEl.ctx as CanvasRenderingContext2D,
        p.x -
          (p.radius * 2) /
            (system.configParticlesFinal.particles.shape.polygon.nb_sides / 4), // startX
        p.y - p.radius / ((2 * 2.66) / 3.5), // startY
        (p.radius * 2 * 2.66) /
          (system.configParticlesFinal.particles.shape.polygon.nb_sides / 3), // sideLength
        system.configParticlesFinal.particles.shape.polygon.nb_sides, // sideCountNumerator
        2 // sideCountDenominator
      );
      break;

    case "image":
      let img_obj: HTMLImageElement | undefined = undefined;

      if (system.img_type === "svg") {
        img_obj = (p.img as { obj: HTMLImageElement }).obj;
      } else {
        img_obj = system.img_obj;
      }

      const drawImage = () => {
        canvasPropsEl.ctx?.drawImage(
          img_obj as HTMLImageElement,
          p.x - p.radius,
          p.y - p.radius,
          p.radius * 2,
          (p.radius * 2) / (p.img as { ratio: number }).ratio
        );
      };

      if (img_obj) {
        drawImage();
      }

      break;
  }

  canvasPropsEl.ctx?.closePath();

  if (system.configParticlesFinal.particles.shape.stroke.width > 0) {
    canvasPropsEl.ctx &&
      (canvasPropsEl.ctx.strokeStyle =
        system.configParticlesFinal.particles.shape.stroke.color);

    canvasPropsEl.ctx &&
      (canvasPropsEl.ctx.lineWidth =
        system.configParticlesFinal.particles.shape.stroke.width);

    canvasPropsEl.ctx?.stroke();
  }

  canvasPropsEl.ctx?.fill();
};
