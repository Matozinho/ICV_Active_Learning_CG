import Sketch from "react-p5";
import p5Types from 'p5';

import { Polygon } from '../classes/Polygon';

interface FillPolygonSketchType {
  canvasParentRef: string;
  canvasWidth: number;
  canvasHeight: number;
}

export default function FillPolygonSketch({ canvasParentRef, canvasWidth, canvasHeight }: FillPolygonSketchType) {
  let canvas;
  let polygon = new Polygon();

  const keyPressed = (p5: p5Types) => {
    if (p5.keyCode === 32 || p5.keyCode === 13) {
      const firstVertice = polygon.vertices[0];
      const lastVertice = polygon.vertices[polygon.vertices.length - 1];

      p5.line(firstVertice.x, firstVertice.y, lastVertice.x, lastVertice.y);
    }

  }

  const setup = (p5: p5Types) => {
    canvas = p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);

    canvas.mouseClicked(() => {
      const verticesLength = polygon.vertices.length;
      const currentVertice = { x: p5.mouseX, y: p5.mouseY };

      polygon.vertices.push(currentVertice);

      p5.fill(polygon.borderColor);
      p5.circle(currentVertice.x, currentVertice.y, 2);

      if (verticesLength) {
        const lastVertice = polygon.vertices[verticesLength - 1];
        p5.line(lastVertice.x, lastVertice.y, currentVertice.x, currentVertice.y);
      }
    });
  };



  return <Sketch setup={setup} keyPressed={keyPressed} />
}