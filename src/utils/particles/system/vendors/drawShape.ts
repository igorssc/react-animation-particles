export const drawShape = (
  c: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  sideLength: number,
  sideCountNumerator: number,
  sideCountDenominator: number
) => {
  let sideCount = sideCountNumerator * sideCountDenominator;
  let decimalSides = sideCountNumerator / sideCountDenominator;
  let interiorAngleDegrees = (180 * (decimalSides - 2)) / decimalSides;
  let interiorAngle = Math.PI - (Math.PI * interiorAngleDegrees) / 180; // convert to radians
  c.save();
  c.beginPath();
  c.translate(startX, startY);
  c.moveTo(0, 0);
  for (let i = 0; i < sideCount; i++) {
    c.lineTo(sideLength, 0);
    c.translate(sideLength, 0);
    c.rotate(interiorAngle);
  }
  //c.stroke();
  c.fill();
  c.restore();
};
