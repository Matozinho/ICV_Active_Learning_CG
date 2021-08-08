import p5Types from 'p5';
import { cohenSutherlandMethod } from './cohenSutherlandMethod';
import { liangBarskyMethod } from './liangBarskyMethod';

interface LinePointType {
  x: number;
  y: number;
  clippingCode: number;
}

interface LineType {
  initialPoint: LinePointType;
  endPoint: LinePointType;
}

export const lineClipping = (p5: p5Types, method: string, lines: LineType[]) => {
  const start = Date.now();

  if (method === 'cohenSutherland')
    cohenSutherlandMethod(p5, lines);
  
  else if (method === 'liangBarsky')
    liangBarskyMethod(p5, lines);

  const end = Date.now();
  addExecutionTime(start, end);
}

const addExecutionTime = (startTime: number, finalTime: number) => {
  const seconds = `${Math.trunc((finalTime - startTime) / 1000)}`;
  const miliSeconds = `${Math.trunc((finalTime - startTime)%1000)}`; 
  
  const text = `${seconds.padStart(2, '0')}:${miliSeconds.padStart(3, '0')}`

  document.getElementById('executionTime')!.innerHTML = text; 
}