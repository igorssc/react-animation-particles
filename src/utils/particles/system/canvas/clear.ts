import { canvasPropsEl } from "./element";

export const canvasClear = () => {
  canvasPropsEl.ctx?.clearRect(0, 0, canvasPropsEl.w, canvasPropsEl.h);
};
