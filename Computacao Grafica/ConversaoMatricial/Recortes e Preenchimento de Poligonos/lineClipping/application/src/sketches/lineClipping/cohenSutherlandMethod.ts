import p5Types from 'p5';
import { drawMinRect } from '../utils';

interface LinePointType {
  x: number;
  y: number;
  clippingCode: number;
}

interface LineType {
  initialPoint: LinePointType;
  endPoint: LinePointType;
}

export const cohenSutherlandMethod = (p5: p5Types, lines: LineType[]) => {
  drawMinRect(p5);

  console.log(lines);
  
  p5.stroke('red');
  lines.forEach((line) => {
    console.log('AND: ',line.initialPoint.clippingCode & line.endPoint.clippingCode);
    console.log('OR: ',line.initialPoint.clippingCode | line.endPoint.clippingCode);
    p5.line(line.initialPoint.x, line.initialPoint.y, line.endPoint.x, line.endPoint.y);
  });
  p5.stroke('black');
}