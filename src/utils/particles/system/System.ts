import { configParticlesProps } from "../config";
import { Particle } from "./particles/Particle";

export class System {
  constructor() {
    this.particles = [];
  }

  el: any;
  drawAnimFrame!: number;
  retina = false;
  heightBackground!: number;
  configParticlesFinal!: configParticlesProps;
  img_type: string | undefined;
  img_error: boolean | undefined;
  count_svg!: number;
  pushing = false;
  img_obj: HTMLImageElement | undefined;
  source_svg: any;
  color_rgb_line!: { r: number; g: number; b: number } | null;
  checkAnimFrame!: number;
  interactivityStatus!: "mousemove" | "mouseleave";
  interactivity_mouse_pos_x!: number | null;
  interactivity_mouse_click_pos_x!: number;
  interactivity_mouse_pos_y!: number | null;
  interactivity_mouse_click_pos_y!: number;
  bubble_clicking!: boolean;
  repulse_clicking!: boolean;
  repulse_count!: number;
  repulse_finish!: boolean;
  bubble_duration_end!: boolean;
  dx_mouse!: number;
  dy_mouse!: number;
  dist_mouse!: number;
  time_spent!: number;
  click_time!: number;
  particles: Particle[];
}
