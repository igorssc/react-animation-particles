import { system } from "../..";
import { Particle } from "../Particle";

export const attractParticles = (p1: Particle, p2: Particle) => {
  /* condensed particles */
  let dx = p1.x - p2.x,
    dy = p1.y - p2.y,
    dist = Math.sqrt(dx * dx + dy * dy);

  if (dist <= system.configParticlesFinal.particles.line_linked.distance) {
    let ax =
        dx /
        (system.configParticlesFinal.particles.move.attract.rotateX * 1000),
      ay =
        dy /
        (system.configParticlesFinal.particles.move.attract.rotateY * 1000);

    p1.vx -= ax;
    p1.vy -= ay;

    p2.vx += ax;
    p2.vy += ay;
  }
};
