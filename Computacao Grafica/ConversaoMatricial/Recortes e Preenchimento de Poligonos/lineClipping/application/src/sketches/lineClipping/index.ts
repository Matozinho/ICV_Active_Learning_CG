import p5Types from 'p5';
import { cohenSutherlandMethod } from './cohenSutherlandMethod';
// import { liangBarskyMethod } from './liangBarskyMethod';

interface LinePointType {
  x: number;
  y: number;
  clippingCode: number;
}

interface PointType {
  x: number;
  y: number;
}

interface LineType {
  initialPoint: LinePointType;
  endPoint: LinePointType;
}

interface RectType {
  minPoint: PointType;
  maxPoint: PointType;
}

export const lineClipping = (p5: p5Types, method: string, lines: LineType[], rect: RectType) => {
  const start = Date.now();

  if (method === 'cohenSutherland'){
    const clippedLines = cohenSutherlandMethod(lines, rect);
    clippedLines.forEach((line) => {
      p5.stroke('red');
      p5.line(line.initialPoint.x, line.initialPoint.y, line.endPoint.x, line.endPoint.y,)
    })
  }
  
  else if (method === 'liangBarsky'){
    alert('Funcionalidade em Desenvolvimento');
  }

  const end = Date.now();
  p5.stroke('black');
  addExecutionTime(start, end);
}

const addExecutionTime = (startTime: number, finalTime: number) => {
  const seconds = `${Math.trunc((finalTime - startTime) / 1000)}`;
  const miliSeconds = `${Math.trunc((finalTime - startTime)%1000)}`; 
  
  const text = `${seconds.padStart(2, '0')}:${miliSeconds.padStart(3, '0')}`

  document.getElementById('executionTime')!.innerHTML = text; 
}