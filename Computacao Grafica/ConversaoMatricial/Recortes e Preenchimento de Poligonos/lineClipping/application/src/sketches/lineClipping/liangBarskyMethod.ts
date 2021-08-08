import p5Types from 'p5';

interface LinePointType {
  x: number;
  y: number;
  clippingCode: number;
}

interface LineType {
  initialPoint: LinePointType;
  endPoint: LinePointType;
}

export const liangBarskyMethod = (p5: p5Types, lines: LineType[]) => {
  console.log(lines);
}