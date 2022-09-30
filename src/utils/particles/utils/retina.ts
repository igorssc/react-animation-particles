import { system } from "../system";
import { canvasPropsEl } from "../system/canvas/element";

export const retinaInit = () => {
  if (
    typeof window !== "undefined" &&
    system.configParticlesFinal.retina_detect &&
    window.devicePixelRatio > 1
  ) {
    canvasPropsEl.pxratio = window.devicePixelRatio;
    system.retina = true;
  } else {
    canvasPropsEl.pxratio = 1;
    system.retina = false;
  }
};
