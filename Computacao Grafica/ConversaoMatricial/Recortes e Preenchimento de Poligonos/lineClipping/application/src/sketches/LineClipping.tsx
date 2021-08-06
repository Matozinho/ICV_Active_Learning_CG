import Sketch from "react-p5";
import p5Types from 'p5';

interface FillPolygonSketchType {
  canvasParentRef: string;
  canvasWidth: number;
  canvasHeight: number;
}

export const LineClipping = ({ canvasParentRef, canvasWidth, canvasHeight }: FillPolygonSketchType) => {
  let canvas;
  const setup = (p5: p5Types) => {
    canvas = p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
  }

  return <Sketch setup={setup} />
}