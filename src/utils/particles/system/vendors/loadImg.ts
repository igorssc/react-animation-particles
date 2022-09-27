import { system } from "..";
import { checkBeforeDraw } from "./checkBeforeDraw";

export const loadImg = (type?: string) => {
  system.img_error = undefined;

  if (system.configParticlesFinal.particles.shape.image?.src !== "") {
    if (type === "svg") {
      let xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        system.configParticlesFinal.particles.shape.image?.src as string
      );
      xhr.onreadystatechange = function (data: any) {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            system.source_svg = data.currentTarget.response;
            checkBeforeDraw();
          } else {
            console.log("Error pJS - Image not found");
            system.img_error = true;
          }
        }
      };
      xhr.send();
    } else {
      let img = new Image();
      img.addEventListener("load", function () {
        system.img_obj = img;
        checkBeforeDraw();
      });
      img.src = system.configParticlesFinal.particles.shape.image
        ?.src as string;
    }
  } else {
    console.log("Error pJS - No image.src");
    system.img_error = true;
  }
};
