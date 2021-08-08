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

interface ContextLineType {
  initialPoint: PointType;
  endPoint: PointType;
}

export const resetCurrentLine = (currentLine: LineType) => {
  const reseterPoint = { x: -1, y: -1 };

  currentLine.isLastVertice = false;
  currentLine.initialPoint = reseterPoint;
  currentLine.endPoint = reseterPoint;
}

export const setCurrentLine = (currentLine: LineType, currentVertice: PointType, lines: ContextLineType[]) => {
  if (currentLine.initialPoint.x === -1)
    currentLine.initialPoint = currentVertice;
  else {
    currentLine.endPoint = currentVertice;
    currentLine.isLastVertice = true;
  }

  if (currentLine.isLastVertice) {
    lines.push(new Line(currentLine.initialPoint, currentLine.endPoint))
  }
}

export const addExecutionTime = (startTime: number, finalTime: number) => {
  const seconds = `${Math.trunc((finalTime - startTime) / 1000)}`;
  const miliSeconds = `${Math.trunc((finalTime - startTime)%1000)}`; 
  
  const text = `${seconds.padStart(2, '0')}:${miliSeconds.padStart(3, '0')}`

  document.getElementById('executionTime')!.innerHTML = text; 
}