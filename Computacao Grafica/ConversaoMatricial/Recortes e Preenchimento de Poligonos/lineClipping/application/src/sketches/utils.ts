import { Line } from "../classes/line";
import p5Types from "p5";

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
};

export const setCurrentLine = (
  currentLine: LineType,
  currentVertice: PointType,
  lines: ContextLineType[],
  rect: RectType,
) => {
  if (currentLine.initialPoint.x === -1)
    currentLine.initialPoint = currentVertice;
  else {
    currentLine.endPoint = currentVertice;
    currentLine.isLastVertice = true;
  }

  if (currentLine.isLastVertice) {
    lines.push(new Line(currentLine.initialPoint, currentLine.endPoint, rect));
  }
};

export const drawMinRect = (
  p5: p5Types,
  initialPoint: PointType = { x: 225, y: 125 },
  width: number = 450,
  height: number = 250,
) => {
  p5.clear();
  p5.strokeWeight(1);
  p5.rect(initialPoint.x, initialPoint.y, width, height);
  p5.strokeWeight(2);
};

export const generateRandomLines = (
  linesNumber: number,
  lines: ContextLineType[],
  canvasWidth: number,
  canvasHeight: number,
  rect: RectType,
  p5: p5Types,
) => {
  let p1: PointType, p2: PointType;

  while (linesNumber) {
    p1 = {
      x: Math.round(Math.random() * canvasWidth),
      y: Math.round(Math.random() * canvasHeight),
    };

    p2 = {
      x: Math.round(Math.random() * canvasWidth),
      y: Math.round(Math.random() * canvasHeight),
    };

    lines.push(new Line(p1, p2, rect));

    p5.line(p1.x, p1.y, p2.x, p2.y);

    linesNumber--;
  }
};

