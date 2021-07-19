import { quickSort } from "../utils/quickSort";
import p5Types from "p5";

interface PointType {
  x: number;
  y: number;
}

interface PolygonType {
  borderColor: string;
  fillColor: string;
  vertices: PointType[];
  intersections: Map<number, number[]>;
  isOpen: boolean;
  maxY: number;
  minY: number;
  reset: () => void;
  defineMaxAndMin: () => void;
  close: (p5: p5Types) => void;
  scanLine: (p1: PointType, p2: PointType) => void;
  fillPolygon: (p5: p5Types) => void;
  setColors: (
    p5: p5Types,
    newBorderColor: string,
    newFillColor: string,
  ) => void;
}

export const polygon: PolygonType = {
  borderColor: "#000000",
  fillColor: "#000000",
  vertices: [],
  intersections: new Map(),
  isOpen: true,
  maxY: Number.NEGATIVE_INFINITY,
  minY: Number.POSITIVE_INFINITY,

  setColors(p5: p5Types, newBorderColor: string, newFillColor: string) {
    this.borderColor = newBorderColor;
    this.fillColor = newFillColor;

    // re-draw the polygon
    this.fillPolygon(p5);
  },

  reset() {
    this.isOpen = true;
    this.vertices = [];
    this.intersections = new Map();
  },

  defineMaxAndMin() {
    let xCoordinantes: number[] = [];
    let yCoordinantes: number[] = [];

    this.vertices.forEach((currentVertice) => {
      xCoordinantes.push(currentVertice.x);
      yCoordinantes.push(currentVertice.y);
    });

    this.maxY = Math.max(...yCoordinantes);
    this.minY = Math.min(...yCoordinantes);
  },

  close(p5: p5Types) {
    const firstVertice = this.vertices[0];
    const lastVertice = this.vertices[this.vertices.length - 1];

    this.isOpen = false;
    this.scanLine(firstVertice, lastVertice);
    this.defineMaxAndMin();
    
    // Order array with X coordinantes of each Y point (key of the map)
    this.intersections.forEach((node) =>
      quickSort(node, 0, node.length - 1),
    );

    this.fillPolygon(p5);
  },

  // Defines all the X point in a edge
  scanLine(p1: PointType, p2: PointType) {
    const intersections = this.intersections;
    let initialY: number, endY: number;
    let currentX: number;

    if (p1.y !== p2.y) {
      const deltaX = (p2.x - p1.x) / (p2.y - p1.y);

      initialY = p1.y;
      endY = p2.y;
      currentX = p1.x;

      if (p1.y > p2.y) {
        [initialY, endY] = [endY, initialY]; // Swap Points
        currentX = p2.x;
      }

      for (let currentY = initialY; currentY < endY; currentY++) {
        if (!intersections.get(currentY)) intersections.set(currentY, [currentX]);
        else intersections.get(currentY)?.push(currentX);
        currentX += deltaX;
      }
    }
  },

  fillPolygon(p5: p5Types) {
    p5.clear();
    p5.stroke(this.fillColor);

    const initialY = this.minY;
    const endY = this.maxY;
    const intersections = this.intersections;

    for (let currentY = initialY; currentY < endY; currentY++) {
      const currentPoint = intersections.get(currentY) || [0];
      let k = 0;

      do {
        let firstX = currentPoint[k];
        let endX = currentPoint[k + 1];

        for (let currentX = firstX; currentX < endX; currentX++)
          p5.point(currentX, currentY);

        k += 2;
      } while (currentPoint[k]);
    }

    p5.stroke(this.borderColor);
    p5.fill(this.borderColor);

    const size = this.vertices.length;

    for (let i = 1; i <= size; i++) {
      p5.circle(this.vertices[i % size].x, this.vertices[i % size].y, 2);
      p5.line(
        this.vertices[i - 1].x,
        this.vertices[i - 1].y,
        this.vertices[i % size].x,
        this.vertices[i % size].y,
      );
    }
  },
};

