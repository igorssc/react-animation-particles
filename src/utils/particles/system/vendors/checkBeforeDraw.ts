import { system } from "..";
import { cancelRequestAnimFrame } from "../../utils/requestAnimFrame";
import { draw } from "./draw";
import { init } from "./init";

export const checkBeforeDraw = () => {
  // if shape is image
  if (system.configParticlesFinal.particles.shape.type === "image") {
    if (system.img_type === "svg" && system.source_svg === undefined) {
      // checkAnimFrame = requestAnimFrame(check);
    } else {
      //console.log('images loaded! cancel check');

      cancelRequestAnimFrame(system.checkAnimFrame);
      if (!system.img_error) {
        init();
        draw();
      }
    }
  } else {
    init();
    draw();
  }
};
