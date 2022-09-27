import { Particle } from "../Particle";

export const bounceParticles = (p1: Particle, p2: Particle) => {
  let dx = p1.x - p2.x,
    dy = p1.y - p2.y,
    dist = Math.sqrt(dx * dx + dy * dy),
    dist_p = p1.radius + p2.radius;

  if (dist <= dist_p) {
    p1.vx = -p1.vx;
    p1.vy = -p1.vy;

    p2.vx = -p2.vx;
    p2.vy = -p2.vy;
  }
};
