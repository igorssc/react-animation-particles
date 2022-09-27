import { canvasPropsEl } from "./element";

export const canvasPaint = () => {
  canvasPropsEl.ctx?.fillRect(0, 0, canvasPropsEl.w, canvasPropsEl.h);
};
