interface verticesType {
  x: number,
  y: number, 
}

class Polygon {
  borderColor: string;
  polygonColor: string;
  vertices: verticesType[];
  edges: object;

  constructor() {
    this.borderColor = "#000000";
    this.polygonColor = "#000000";
    this.vertices = []
    this.edges = {}
  }

  changeBorderColor(newColor: string) {
    this.borderColor = newColor;
  }

  changePolygonColor(newColor: string) {
    this.borderColor = newColor;
  }
}

export { Polygon }