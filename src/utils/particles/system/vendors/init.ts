import { system } from "..";
import { hexToRgb } from "../../utils/hexToRgb";
import { retinaInit } from "../../utils/retina";
import { canvasInit } from "../canvas/init";
import { canvasPaint } from "../canvas/paint";
import { canvasSize } from "../canvas/size";
import { particlesCreate } from "../particles/create";
import { densityAutoParticles } from "./densityAutoParticles";

export const init = () => {
  /* init canvas + particles */
  retinaInit();
  canvasInit();
  canvasSize();
  canvasPaint();
  particlesCreate();
  densityAutoParticles();

  /* particles.line_linked - convert hex colors to rgb */
  system.color_rgb_line = hexToRgb(
    system.configParticlesFinal.particles.line_linked.color
  );
};
