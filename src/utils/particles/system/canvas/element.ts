export type canvasProps = {
  el: HTMLCanvasElement | null;
  w: number;
  h: number;
  pxratio?: number;
  ctx?: CanvasRenderingContext2D | null | undefined;
};

export let canvasPropsEl: canvasProps;

export const setCanvasPropsEl = (el: canvasProps) => {
  canvasPropsEl = el;
};
