interface PointType {
  x: number,
  y: number, 
}

interface EdgesType {
  [index: number]: PointType[];
}

class Polygon {
  borderColor: string;
  polygonColor: string;
  vertices: PointType[];
  edges: EdgesType;
  isOpen: boolean;

  constructor(borderColor: string, polygonColor: string) {
    this.borderColor = borderColor;
    this.polygonColor = polygonColor;
    this.vertices = []
    this.edges = {}
    this.isOpen = true;
  }

  changeBorderColor(newColor: string) {
    this.borderColor = newColor;
  }

  changePolygonColor(newColor: string) {
    this.borderColor = newColor;
  }

  reset() {
    this.isOpen = true;
    this.vertices = [];
    this.edges = {}
  }

  defineEdge(p1: PointType, p2: PointType) {
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
      }
    } else {
      let currentX = p1.x;

      for (let i = p1.y; i < p2.y; i++) {
        currentX += deltaX;
        let currentPoint = { x: currentX, y: i }
        edgePoints.push(currentPoint);
      }
    }

    const idx = Object.keys(this.edges).length;
    this.edges[idx] = edgePoints;
  }
}

export { Polygon }