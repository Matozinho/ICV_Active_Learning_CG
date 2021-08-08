interface PointType {
  x: number;
  y: number;
}

export class Line {
  initialPoint: PointType;
  endPoint: PointType;

  constructor(initialPoint: PointType, endPoint: PointType) {
    this.initialPoint = initialPoint;
    this.endPoint = endPoint;
  }

  public show() {
    console.log('InitialPoint: ', this.initialPoint);
    console.log('EndPoint: ', this.endPoint);
  }
}