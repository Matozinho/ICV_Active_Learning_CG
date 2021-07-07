import Sketch from "react-p5";
import p5Types from 'p5';

import { usePolygonContext } from "../hooks/usePolygonContext";
import { useCanvasContext } from "../hooks/useCanvasContext";

interface FillPolygonSketchType {
  canvasParentRef: string;
  canvasWidth: number;
  canvasHeight: number;
}

interface PointType {
  x: number,
  y: number,
}

export default function FillPolygonSketch({ canvasParentRef, canvasWidth, canvasHeight }: FillPolygonSketchType) {
  const { polygon } = usePolygonContext();
  const { clearCanvas, setClearCanvas } = useCanvasContext();

  let canvas;

  // TODO: Remove it after debug
  const defineEdge = (p5: p5Types, p1: PointType, p2: PointType) => {
    p5.fill("#ff0000");
    p5.stroke("#ff0000");

    let edgePoints = []

    if (p2.y < p1.y)
      [p1, p2] = [p2, p1];

    let deltaX = (p2.x - p1.x) / (p2.y - p1.y);

    if (deltaX > 1 || deltaX < -1) {
      if (p1.x > p2.x)
        [p1, p2] = [p2, p1];

      deltaX = (p2.y - p1.y) / (p2.x - p1.x);

      let currentY = p1.y;

      for (let i = p1.x; i < p2.x; i++) {
        currentY += deltaX;
        let currentPoint = { x: i, y: currentY }
        edgePoints.push(currentPoint);
        p5.circle(currentPoint.x, currentPoint.y, 1);
      }
    } else {
      let currentX = p1.x;

      for (let i = p1.y; i < p2.y; i++) {
        currentX += deltaX;
        let currentPoint = { x: currentX, y: i }
        edgePoints.push(currentPoint);
        p5.circle(currentPoint.x, currentPoint.y, 1);
      }
    }
  }

  const keyPressed = (p5: p5Types) => {
    if ((p5.keyCode === 32 || p5.keyCode === 13) && polygon.isOpen) {
      const firstVertice = polygon.vertices[0];
      const lastVertice = polygon.vertices[polygon.vertices.length - 1];
      polygon.isOpen = false;

      p5.line(firstVertice.x, firstVertice.y, lastVertice.x, lastVertice.y);
      polygon.defineEdge(firstVertice, lastVertice);
      defineEdge(p5, firstVertice, lastVertice);
      console.log(polygon);
    }
  }

  const setup = (p5: p5Types) => {
    canvas = p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);

    canvas.mouseClicked(() => {
      if (polygon.isOpen) {
        const verticesLength = polygon.vertices.length;
        const currentVertice = { x: p5.mouseX, y: p5.mouseY };

        polygon.vertices.push(currentVertice);

        p5.stroke(polygon.borderColor);
        p5.fill(polygon.borderColor);
        p5.circle(currentVertice.x, currentVertice.y, 2);

        if (verticesLength) {
          p5.stroke(polygon.borderColor);
          const lastVertice = polygon.vertices[verticesLength - 1];
          p5.line(lastVertice.x, lastVertice.y, currentVertice.x, currentVertice.y);

          polygon.defineEdge(lastVertice, currentVertice);
          defineEdge(p5, lastVertice, currentVertice);
        }
      }
    });
  };

  const draw = (p5: p5Types) => {
    if (clearCanvas) {
      p5.clear();
      polygon.reset();

      setClearCanvas(false);
    }
  }

  return <Sketch setup={setup} draw={draw} keyPressed={keyPressed} />
}