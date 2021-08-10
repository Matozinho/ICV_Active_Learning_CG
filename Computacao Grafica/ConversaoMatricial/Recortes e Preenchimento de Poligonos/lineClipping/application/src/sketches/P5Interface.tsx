import { useContext } from "react";
import Sketch from "react-p5";
import p5Types from "p5";

import { DrawContext } from "../contexts/DrawContextProvider";

import {
  drawMinRect,
  generateRandomLines,
  resetCurrentLine,
  setCurrentLine,
} from "./utils";
import { lineClipping } from "./lineClipping/index";

interface FillPolygonSketchType {
  canvasParentRef: string;
  canvasWidth: number;
  canvasHeight: number;
}

interface PointType {
  x: number;
  y: number;
}

interface CurrentLineType {
  initialPoint: PointType;
  endPoint: PointType;
  isLastVertice: boolean;
}

export const P5Interface = ({
  canvasParentRef,
  canvasWidth,
  canvasHeight,
}: FillPolygonSketchType) => {
  let { lines } = useContext(DrawContext);
  let currentLine: CurrentLineType = {
    initialPoint: { x: -1, y: -1 },
    endPoint: { x: -1, y: -1 },
    isLastVertice: false,
  };
  const minRectInit = { x: canvasWidth * (1 / 4), y: canvasHeight * (1 / 4) };
  const minRectFinal = { x: canvasWidth * (3 / 4), y: canvasHeight * (3 / 4) };

  const setVertice = (p5: p5Types, currentVertice: PointType) => {
    p5.circle(currentVertice.x, currentVertice.y, 2);

    setCurrentLine(currentLine, currentVertice, lines, {
      minPoint: minRectInit,
      maxPoint: minRectFinal,
    });

    if (currentLine.isLastVertice) {
      p5.line(
        currentLine.initialPoint.x,
        currentLine.initialPoint.y,
        currentLine.endPoint.x,
        currentLine.endPoint.y,
      );

      resetCurrentLine(currentLine);
    }
  };

  const setup = (p5: p5Types) => {
    const canvas = p5
      .createCanvas(canvasWidth, canvasHeight)
      .parent(canvasParentRef);
    const executeClipping = p5
      .createButton("Recortar")
      .parent("clippingButton");
    const clearCanvasButton = p5.createButton("Limpar").parent("clearButton");
    const select = p5.createSelect().parent("optionsDropDown");
    select.html(
      "<option value='cohenSutherland'>Cohen-Sutherland</option><option value='liangBarsky'>Liang & Barsky</option>",
    );
    select.style(
      "padding: 0.8rem 0.2rem; font-size: 1rem; border-radius: 8px; outline:none; cursor: pointer; box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);",
    );
    const randomLinesInput = p5
      .createInput("Número de linhas", "number")
      .parent("randomLines");
    const randonLinesButton = p5.createButton("Gerar").parent("randomLines");

    randonLinesButton.mouseClicked(() =>
      generateRandomLines(
        +randomLinesInput.value(),
        lines,
        canvasWidth,
        canvasHeight,
        { minPoint: minRectInit, maxPoint: minRectFinal },
        p5,
      ),
    );

    executeClipping.mouseClicked(() =>
      lineClipping(p5, select.value() as string, lines, {
        minPoint: minRectInit,
        maxPoint: minRectFinal,
      }),
    );

    clearCanvasButton.mouseClicked(() => clean(p5));

    canvas.mouseClicked(() => {
      setVertice(p5, { x: Math.round(p5.mouseX), y: Math.round(p5.mouseY) });
    });

    drawMinRect(p5, minRectInit, canvasWidth / 2, canvasHeight / 2);
  };

  const clean = (p5: p5Types) => {
    lines = [];
    currentLine = {
      initialPoint: { x: -1, y: -1 },
      endPoint: { x: -1, y: -1 },
      isLastVertice: false,
    };

    drawMinRect(p5, minRectInit, canvasWidth / 2, canvasHeight / 2);
  };

  return <Sketch setup={setup} />;
};

