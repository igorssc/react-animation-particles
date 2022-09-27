import { particleDraw } from "./draw";

export type colorsProps = {
  rgb?: {
    r: number;
    g: number;
    b: number;
    h: never;
    s: never;
    l: never;
  };
  hsl?: {
    h: number;
    s: number;
    l: number;
    r: never;
    g: never;
    b: never;
  };
};

export class Particle {
  constructor(
    color: colorsProps,
    opacity: number,
    opacity_status: boolean,
    size_status: boolean | undefined,
    vo: number,
    vs: number,
    radius: number,
    shape: "circle" | "edge" | "triangle" | "polygon" | "star" | "image",
    vx: number,
    vx_i: number,
    vy: number,
    vy_i: number,
    x: number,
    y: number,
    img: {
      src: string;
      ratio: number;
      loaded?: boolean;
      obj?: HTMLImageElement;
    } | null,
    opacity_bubble?: number,
    radius_bubble?: number
  ) {
    this.color = color;
    this.opacity = opacity;
    this.opacity_status = opacity_status;
    this.size_status = size_status;
    this.vo = vo;
    this.vs = vs;
    this.radius = radius;
    this.shape = shape;
    this.vx = vx;
    this.vx_i = vx_i;
    this.vy = vy;
    this.vy_i = vy_i;
    this.x = x;
    this.y = y;
    this.img = img;
    this.draw = () => particleDraw(this);
    this.opacity_bubble = opacity_bubble;
    this.radius_bubble = radius_bubble;
  }
  color;
  opacity;
  opacity_status;
  size_status;
  vo;
  vs;
  radius;
  shape;
  vx;
  vx_i;
  vy;
  vy_i;
  x;
  y;
  img;
  draw;
  opacity_bubble;
  radius_bubble;
}
