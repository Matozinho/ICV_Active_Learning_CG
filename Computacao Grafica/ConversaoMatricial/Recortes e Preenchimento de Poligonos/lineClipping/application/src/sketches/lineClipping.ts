import p5Types from 'p5';
import { addExecutionTime } from './utils';

interface PointType {
  x: number;
  y: number;
}

interface LineType {
  initialPoint: PointType;
  endPoint: PointType;
}

export const lineClipping = (p5: p5Types, method: string, lines: LineType[]) => {
  const start = Date.now();

  lines.forEach((line: any) => console.log(line));

  const end = Date.now();
  addExecutionTime(start, end);
}