interface verticesType {
  x: number,
  y: number, 
}

class Polygon {
  borderColor: string;
  polygonColor: string;
  vertices: verticesType[];
  edges: object;
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
}

export { Polygon }