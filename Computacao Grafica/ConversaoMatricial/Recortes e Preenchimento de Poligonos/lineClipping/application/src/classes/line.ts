interface LinePointType {
  x: number;
  y: number;
  clippingCode: number;
}

interface PointType {
  x: number;
  y: number;
}

interface RectType {
  minPoint: PointType;
  maxPoint: PointType;
}

export class Line {
  initialPoint: LinePointType;
  endPoint: LinePointType;

  constructor(initialPoint: PointType, endPoint: PointType, rect: RectType) {
    this.initialPoint = { x: initialPoint.x, y: initialPoint.y, clippingCode: 0 };
    this.endPoint = { x: endPoint.x, y: endPoint.y, clippingCode: 0 };

    this.defineClippingCode(this.initialPoint, rect);
    this.defineClippingCode(this.endPoint, rect);
  }

  public show() {
    console.log('InitialPoint: ', this.initialPoint);
    console.log('EndPoint: ', this.endPoint);
  }

  private defineClippingCode(point: LinePointType, rect: RectType) {
    if (point.x < rect.minPoint.x)
      point.clippingCode += 1;

    if (point.x > rect.maxPoint.x)
      point.clippingCode += 2;

    if (point.y > rect.maxPoint.y)
      point.clippingCode += 4;

    if (point.y < rect.minPoint.y)
      point.clippingCode += 8;
  }
}