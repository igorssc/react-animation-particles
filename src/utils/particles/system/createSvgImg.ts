import { system } from ".";
import { colorsProps } from "./particles/Particle";

export const createSvgImg = (
  color: colorsProps,
  opacity: number,
  img: {
    src: string;
    ratio: number;
    loaded?: boolean;
    obj?: any;
  }
) => {
  /* set color to svg element */
  const svgXml = system.source_svg,
    rgbHex = /#([0-9A-F]{3,6})/gi,
    coloredSvgXml = svgXml.replace(rgbHex, function () {
      let color_value: string;

      if (color.rgb) {
        color_value =
          "rgba(" +
          color.rgb.r +
          "," +
          color.rgb.g +
          "," +
          color.rgb.b +
          "," +
          opacity +
          ")";
      } else {
        color_value =
          "hsla(" +
          color.hsl?.h +
          "," +
          color.hsl?.s +
          "%," +
          color.hsl?.l +
          "%," +
          opacity +
          ")";
      }
      return color_value;
    });

  /* prepare to create img with colored svg */
  let svg = new Blob([coloredSvgXml], {
      type: "image/svg+xml;charset=utf-8",
    }),
    DOMURL = window.URL || window.webkitURL || window,
    url = DOMURL.createObjectURL(svg);

  /* create particle img obj */
  let finalImg = new Image();
  finalImg.addEventListener("load", function () {
    img && (img.obj = finalImg);
    img && (img.loaded = true);
    DOMURL.revokeObjectURL(url);
    system.count_svg++;
  });
  img.src = url;
};
