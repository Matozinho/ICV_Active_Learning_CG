import { quickSort } from "../utils/quickSort";
import p5Types from 'p5';

interface PointType {
  x: number,
  y: number, 
}

interface PolygonType {
  borderColor: string;
  fillColor: string;
  vertices: PointType[];
  intersections: Map<number, number[]>;
  isOpen: boolean;
  maxCoordinantes: PointType;
  minCoordinantes: PointType;
  reset: () => void;
  defineMaxsAndMins: () => void;
  scanLine: (p1: PointType, p2: PointType) => void;
  fillPolygon: (p5: p5Types) => void;
  setColors: (p5: p5Types, newBorderColor: string, newFillColor: string) => void;
}

export const polygon: PolygonType = {
  borderColor: "#000000",
  fillColor: "#000000",
  vertices: [],
  intersections: new Map(),
  isOpen: true,
  maxCoordinantes: {
    x: Number.NEGATIVE_INFINITY,
    y: Number.NEGATIVE_INFINITY
  },
  minCoordinantes: {
    x: Number.POSITIVE_INFINITY,
    y: Number.POSITIVE_INFINITY
  },

  setColors(p5: p5Types, newBorderColor: string, newFillColor: string) {
    this.borderColor = newBorderColor;
    this.fillColor = newFillColor;

    p5.clear();
    this.fillPolygon(p5);
  },

  reset() {
    this.isOpen = true;
    this.vertices = [];
    this.intersections = new Map();
  },

  defineMaxsAndMins() {
    let xCoordinantes: number[] = [];
    let yCoordinantes: number[] = [];
    
    this.vertices.forEach((currentVertice) => {
      xCoordinantes.push(currentVertice.x);
      yCoordinantes.push(currentVertice.y);
    });

    this.maxCoordinantes.x = Math.max(...xCoordinantes);
    this.minCoordinantes.x = Math.min(...xCoordinantes);
    this.maxCoordinantes.y = Math.max(...yCoordinantes);
    this.minCoordinantes.y = Math.min(...yCoordinantes);
  },

  // Defines all the X point in a edge
  scanLine(p1: PointType, p2: PointType) {
    const intersections = this.intersections;
    let initialPoint: number, endPoint: number;
    let currentX: number;

    if (p1.y !== p2.y) {
      const deltaX = (p2.x - p1.x) / (p2.y - p1.y);

      initialPoint = p1.y;
      endPoint = p2.y;
      currentX = p1.x;

      if (p1.y > p2.y) {
        [initialPoint, endPoint] = [endPoint, initialPoint]; // Swap Points
        currentX = p2.x;
      }

      for (let j = initialPoint; j < endPoint; j++) {
        if (!intersections.get(j))
          intersections.set(j, [currentX]);
        else
          intersections.get(j)?.push(currentX);
        currentX += deltaX;
      }
    }

    // Order array with X coordinantes of each Y point (key of the map)
    intersections.forEach(content => quickSort(content, 0, (content.length - 1)));
  },

  fillPolygon (p5: p5Types) {
    p5.stroke(this.fillColor);
    const initialY = this.minCoordinantes.y;
    const endY = this.maxCoordinantes.y;
    const intersections = this.intersections;

    for (let i = initialY; i < endY; i++) {
      const currentPoint = intersections.get(i) || [0];
      let k = 0;

      do {
        let firstX = currentPoint[k];
        let endX = currentPoint[k + 1];

        for (let j = firstX; j < endX; j++)
          p5.point(j, i);

        k += 2;
      } while (currentPoint[k]);
    }
  }
}