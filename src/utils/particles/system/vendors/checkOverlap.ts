import { system } from "..";
import { canvasPropsEl } from "../canvas/element";

export const checkOverlap = (
  p1: {
    radius: number;
    x: number;
    y: number;
  },
  position?: {
    radius?: number;
    x: number;
    y: number;
  }
) => {
  for (let i = 0; i < system.particles.length; i++) {
    let p2 = system.particles[i];

    let dx = p1.x - p2.x,
      dy = p1.y - p2.y,
      dist = Math.sqrt(dx * dx + dy * dy);

    if (dist <= p1.radius + p2.radius) {
      p1.x = position ? position.x : Math.random() * canvasPropsEl.w;
      p1.y = position ? position.y : Math.random() * canvasPropsEl.h;
      checkOverlap(p1);
    }
  }
};
