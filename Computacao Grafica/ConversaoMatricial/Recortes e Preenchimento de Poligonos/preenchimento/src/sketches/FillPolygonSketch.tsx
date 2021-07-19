import Sketch from "react-p5";
import p5Types from "p5";

import { usePolygonContext } from "../hooks/usePolygonContext";
import { useCanvasContext } from "../hooks/useCanvasContext";

interface FillPolygonSketchType {
  canvasParentRef: string;
  canvasWidth: number;
  canvasHeight: number;
}

interface PointType {
  x: number;
  y: number;
}

export default function FillPolygonSketch({
  canvasParentRef,
  canvasWidth,
  canvasHeight,
}: FillPolygonSketchType) {

  const {
    polygon,
    polygonBorderColor,
    polygonFillColor,
    colorsWasChanged,
    setColorsWasChanged,
  } = usePolygonContext();

  const {
    clearCanvas,
    rightButtonClicked,
    setClearCanvas,
    setRightButtonClicked,
  } = useCanvasContext();

  let canvas;

  const closePolygon = (p5: p5Types) => {
    const firstVertice = polygon.vertices[0];
    const lastVertice = polygon.vertices[polygon.vertices.length - 1];

    p5.line(firstVertice.x, firstVertice.y, lastVertice.x, lastVertice.y);

    polygon.close(p5);
  };

  const setVertice = (p5: p5Types, currentVertice: PointType) => {
    const verticesLength = polygon.vertices.length;

    polygon.vertices.push(currentVertice);

    p5.stroke(polygon.borderColor);
    p5.fill(polygon.borderColor);
    p5.circle(currentVertice.x, currentVertice.y, 2); // Draw the vertice

    // Verify if has more then 1 vertice to draw the edge
    if (verticesLength) {
      const lastVertice = polygon.vertices[verticesLength - 1];

      polygon.scanLine(currentVertice, lastVertice); // Define all the X points in the edge to fill polygon after
      p5.line(lastVertice.x, lastVertice.y, currentVertice.x, currentVertice.y);
    }
  };

  const redirect = (p5: p5Types) => {
    if (polygon.vertices.length > 2)
      closePolygon(p5);
    else alert("O Polígono deve ter no mínimo três lados!");
  }

  // Verify if space or enter waas clicked to close polygon
  const keyPressed = (p5: p5Types) => {
    if ((p5.keyCode === 32 || p5.keyCode === 13) && polygon.isOpen)
      redirect(p5);
  };

  const setup = (p5: p5Types) => {
    canvas = p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
    p5.strokeWeight(2.5);

    // Capture all click in cavas to set the vertices
    canvas.mouseClicked(() => {
      if (polygon.isOpen) {
        const x = Math.trunc(p5.mouseX);
        const y = Math.trunc(p5.mouseY);

        setVertice(p5, { x: x, y: y });
      }
    });
  };

  const draw = (p5: p5Types) => {
    // Verify if flag to close polygon with right button has changed
    if (rightButtonClicked) {
      setRightButtonClicked(false);
      if (polygon.isOpen)
        redirect(p5);
    }

    // Verify if flag to change colors has changed
    if (colorsWasChanged) {
      setColorsWasChanged(false);
      polygon.setColors(p5, polygonBorderColor, polygonFillColor);
    }

    // Verify all every time if clearCanvas is true (if button "Limpar" was pressed)
    if (clearCanvas) {
      p5.clear();
      polygon.reset();

      setClearCanvas(false);
    }
  };

  return (
    <Sketch
      setup={setup}
      draw={draw}
      keyPressed={keyPressed}
    />
  );
}

