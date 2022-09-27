import { system } from "..";
import { hexToRgb } from "../../utils/hexToRgb";
import { canvasPropsEl } from "../canvas/element";
import { createSvgImg } from "../createSvgImg";
import { checkOverlap } from "../vendors/checkOverlap";
import { colorsProps, Particle } from "./Particle";

export const particle = (
  color: {
    value:
      | string
      | "random"
      | { r: number; g: number; b: number; h: never; s: never; l: never }
      | { h: number; s: number; l: number; r: never; g: never; b: never }
      | string[];
  },
  position?: { x: number; y: number; radius?: number }
) => {
  /* size */
  const radius =
    (system.configParticlesFinal.particles.size.random ? Math.random() : 1) *
    system.configParticlesFinal.particles.size.value;

  let size_status: boolean | undefined = undefined;
  let vs: number = 0;
  if (system.configParticlesFinal.particles.size.anim.enable) {
    size_status = false;
    vs = system.configParticlesFinal.particles.size.anim.speed / 100;

    if (!system.configParticlesFinal.particles.size.anim.sync) {
      vs = vs * Math.random();
    }
  }

  /* position */
  let x = position ? position.x : Math.random() * canvasPropsEl.w;
  let y = position ? position.y : Math.random() * canvasPropsEl.h;

  /* check position  - into the canvas */
  if (x > canvasPropsEl.w - radius * 2) x = x - radius;
  else if (x < radius * 2) x = x + radius;
  if (y > canvasPropsEl.h - radius * 2) y = y - radius;
  else if (y < radius * 2) y = y + radius;

  /* check position - avoid overlap */
  if (system.configParticlesFinal.particles.move.bounce) {
    checkOverlap({ x, y, radius }, position);
  }

  /* color */
  let finalColor: colorsProps = {};

  if (typeof color.value === "object") {
    if (color.value instanceof Array) {
      const color_selected =
        color.value[
          Math.floor(
            Math.random() *
              (
                system.configParticlesFinal.particles.color
                  .value as Array<string>
              ).length
          )
        ];
      Object.assign(finalColor, { rgb: hexToRgb(color_selected) });
    } else {
      if (color.value.r && color.value.g && color.value.b) {
        Object.assign(finalColor, {
          rgb: {
            r: color.value.r,
            g: color.value.g,
            b: color.value.b,
          },
        });
      }
      if (color.value.h && color.value.s && color.value.l) {
        Object.assign(finalColor, {
          hsl: {
            h: color.value.h,
            s: color.value.s,
            l: color.value.l,
          },
        });
      }
    }
  } else if (color.value === "random") {
    Object.assign(finalColor, {
      rgb: {
        r: Math.floor(Math.random() * (255 - 0 + 1)) + 0,
        g: Math.floor(Math.random() * (255 - 0 + 1)) + 0,
        b: Math.floor(Math.random() * (255 - 0 + 1)) + 0,
      },
    });
  } else if (typeof color.value === "string") {
    Object.assign(finalColor, { rgb: hexToRgb(color.value) });
  }

  /* opacity */
  const finalOpacity =
    (system.configParticlesFinal.particles.opacity.random ? Math.random() : 1) *
    system.configParticlesFinal.particles.opacity.value;

  let opacity_status = true;

  let vo = 0;
  if (system.configParticlesFinal.particles.opacity.anim.enable) {
    opacity_status = false;
    vo = system.configParticlesFinal.particles.opacity.anim.speed / 100;
    if (!system.configParticlesFinal.particles.opacity.anim.sync) {
      vo = vo * Math.random();
    }
  }

  /* animation - velocity for speed */
  let velbase: { x: number; y: number };

  switch (system.configParticlesFinal.particles.move.direction) {
    case "top":
      velbase = { x: 0, y: -1 };
      break;
    case "top-right":
      velbase = { x: 0.5, y: -0.5 };
      break;
    case "right":
      velbase = { x: 1, y: -0 };
      break;
    case "bottom-right":
      velbase = { x: 0.5, y: 0.5 };
      break;
    case "bottom":
      velbase = { x: 0, y: 1 };
      break;
    case "bottom-left":
      velbase = { x: -0.5, y: 1 };
      break;
    case "left":
      velbase = { x: -1, y: 0 };
      break;
    case "top-left":
      velbase = { x: -0.5, y: -0.5 };
      break;
    default:
      velbase = { x: 0, y: 0 };
      break;
  }

  let vx: number;
  let vy: number;

  if (system.configParticlesFinal.particles.move.straight) {
    vx = velbase.x;
    vy = velbase.y;
    if (system.configParticlesFinal.particles.move.random) {
      vx = vx * Math.random();
      vy = vy * Math.random();
    }
  } else {
    vx = velbase.x + Math.random() - 0.5;
    vy = velbase.y + Math.random() - 0.5;
  }

  let vx_i = vx;
  let vy_i = vy;

  /* if shape is image */

  let shape: "circle" | "image" | "polygon" | "edge" | "triangle" | "star" =
    "circle";
  const shape_type = system.configParticlesFinal.particles.shape.type;

  if (typeof shape_type === "object") {
    if (shape_type instanceof Array) {
      const shape_selected =
        shape_type[Math.floor(Math.random() * shape_type.length)];

      shape = shape_selected;
    }
  } else {
    shape = shape_type;
  }

  let img: {
    src: string;
    ratio: number;
    loaded?: boolean;
    obj?: any;
  } | null = null;

  if (shape === "image") {
    let sh = system.configParticlesFinal.particles.shape;
    img = {
      src: sh.image?.src || "",
      ratio: (sh.image?.width || 0) / (sh.image?.height || 0),
    };
    if (!img.ratio) img.ratio = 1;

    if (system.img_type === "svg" && system.source_svg) {
      createSvgImg(finalColor, finalOpacity, img);
      if (system.pushing) {
        img.loaded = false;
      }
    }
  }

  return new Particle(
    finalColor,
    finalOpacity,
    opacity_status,
    size_status,
    vo,
    vs,
    radius,
    shape,
    vx,
    vx_i,
    vy,
    vy_i,
    x,
    y,
    img
  );
};
