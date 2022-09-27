import { system } from "..";
import {
  cancelRequestAnimFrame,
  requestAnimFrame,
} from "../../utils/requestAnimFrame";
import { particlesDraw } from "../particles/draw";

export const draw = () => {
  if (system.configParticlesFinal.particles.shape.type === "image") {
    if (system.img_type === "svg") {
      if (
        system.count_svg >= system.configParticlesFinal.particles.number.value
      ) {
        particlesDraw();
        if (!system.configParticlesFinal.particles.move.enable)
          cancelRequestAnimFrame(system.drawAnimFrame);
        else system.drawAnimFrame = requestAnimFrame(draw);
      } else {
        //console.log('still loading...');
        if (!system.img_error) system.drawAnimFrame = requestAnimFrame(draw);
      }
    } else {
      if (system.img_obj !== undefined) {
        particlesDraw();
        if (!system.configParticlesFinal.particles.move.enable)
          cancelRequestAnimFrame(system.drawAnimFrame);
        else system.drawAnimFrame = requestAnimFrame(draw);
      } else {
        if (!system.img_error) system.drawAnimFrame = requestAnimFrame(draw);
      }
    }
  } else {
    particlesDraw();
    if (!system.configParticlesFinal.particles.move.enable)
      cancelRequestAnimFrame(system.drawAnimFrame);
    else system.drawAnimFrame = requestAnimFrame(draw);
  }
};
