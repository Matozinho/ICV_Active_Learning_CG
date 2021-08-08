import { Line } from '../classes/line';

interface PointType {
  x: number;
  y: number;
}

interface LineType {
  initialPoint: PointType;
  endPoint: PointType;
  isLastVertice: boolean;
}

interface LinePointType {
  x: number;
  y: number;
  clippingCode: number;
}

interface ContextLineType {
  initialPoint: LinePointType;
  endPoint: LinePointType;
}

interface RectType {
  minPoint: PointType;
  maxPoint: PointType;
}

export const resetCurrentLine = (currentLine: LineType) => {
  const reseterPoint = { x: -1, y: -1, clippingCode: -1 };

  currentLine.isLastVertice = false;
  currentLine.initialPoint = reseterPoint;
  currentLine.endPoint = reseterPoint;
}

export const setCurrentLine = (currentLine: LineType, currentVertice: PointType, lines: ContextLineType[], rect: RectType) => {
  if (currentLine.initialPoint.x === -1)
    currentLine.initialPoint = currentVertice;
  else {
    currentLine.endPoint = currentVertice;
    currentLine.isLastVertice = true;
  }

  if (currentLine.isLastVertice) {
    lines.push(new Line(currentLine.initialPoint, currentLine.endPoint, rect));
  }
}

export const addExecutionTime = (startTime: number, finalTime: number) => {
  const seconds = `${Math.trunc((finalTime - startTime) / 1000)}`;
  const miliSeconds = `${Math.trunc((finalTime - startTime)%1000)}`; 
  
  const text = `${seconds.padStart(2, '0')}:${miliSeconds.padStart(3, '0')}`

  document.getElementById('executionTime')!.innerHTML = text; 
}