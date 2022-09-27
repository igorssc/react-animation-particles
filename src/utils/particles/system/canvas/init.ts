import { canvasPropsEl } from "./element";

export const canvasInit = () => {
  canvasPropsEl.ctx = canvasPropsEl.el?.getContext("2d");
};
