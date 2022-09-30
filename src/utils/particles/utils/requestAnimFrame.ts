export const requestAnimFrame =
  window?.requestAnimationFrame ||
  function (callback: Function) {
    window?.setTimeout(callback, 1000 / 60);
  };

export const cancelRequestAnimFrame =
  window?.cancelAnimationFrame || clearTimeout;
