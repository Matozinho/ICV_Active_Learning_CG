interface LinePointType {
  x: number;
  y: number;
  clippingCode: number;
}

interface LineType {
  initialPoint: LinePointType;
  endPoint: LinePointType;
}

interface PointType {
  x: number;
  y: number;
}
interface RectType {
  minPoint: PointType;
  maxPoint: PointType;
}

export const cohenSutherlandMethod = (lines: LineType[], rect: RectType): LineType[] => {
  let clippedLines: LineType[] = [];

  lines.forEach((line) => {
    let isTrivial = trivialVerify(line, clippedLines);
    let isFirstVertice = true;

    while (!isTrivial) {
      cutVerify(line, rect, isFirstVertice);

      isTrivial = trivialVerify(line, clippedLines);
      isFirstVertice = false;
    }
  });

  return clippedLines;
}

const trivialVerify = (line: LineType, clippedLines: LineType[]): boolean => {
  const clippingCode1 = line.initialPoint.clippingCode;
  const clippingCode2 = line.endPoint.clippingCode;
  let isTrivial = false;

  if ((clippingCode1 & clippingCode2) !== 0)
    isTrivial = true;
  if ((clippingCode1 | clippingCode2) === 0) {
    clippedLines.push(line);
    isTrivial = true;
  }

  return isTrivial;
}

const cutVerify = (line: LineType, rect: RectType, isFirstVertice: boolean) => {
  let mainPoint = line.initialPoint;
  let secodaryPoint = line.endPoint;

  if (!isFirstVertice)
    [mainPoint, secodaryPoint] = [secodaryPoint, mainPoint];

  let clippingCode = mainPoint.clippingCode;

  // intersection on left side
  if (clippingCode === 1 || clippingCode === 5 || clippingCode === 9) {
    cut(mainPoint, secodaryPoint, rect, 'left');
    clippingCode = mainPoint.clippingCode;
  }

  // intersection on right side
  if (clippingCode === 2 || clippingCode === 6 || clippingCode === 10) {
    cut(mainPoint, secodaryPoint, rect, 'right');
    clippingCode = mainPoint.clippingCode;
  } 
  
  // intersection on bottom side
  if (clippingCode === 4) {
    cut(mainPoint, secodaryPoint, rect, 'bottom');
    clippingCode = mainPoint.clippingCode;
  }

  // intersection on top side
  if (clippingCode === 8) {
    cut(mainPoint, secodaryPoint, rect, 'top');
    clippingCode = mainPoint.clippingCode;
  }
}

const cut = (p1: LinePointType, p2: LinePointType, rect: RectType, side: string) => {
  if (side === 'left') {
    // x = x1 + u*(x2 - x1) => u = (x1 - x) / (x1 - x2)
    let u = (p1.x - rect.minPoint.x) / (p1.x - p2.x);
    p1.y = (p1.y + u * (p2.y - p1.y));
    p1.x = rect.minPoint.x;
  }

  if (side === 'right') {
    // x = x1 + u*(x2 - x1) => u = (x1 - x) / (x1 - x2)
    let u = (p1.x - rect.maxPoint.x) / (p1.x - p2.x);
    p1.y = (p1.y + u * (p2.y - p1.y));
    p1.x = rect.maxPoint.x;
  }

  if (side === 'bottom') {
    // y = y1 + u*(y2 - y1) => u = (y1 - y) / (y1 - y2)
    let u = (p1.y - rect.maxPoint.y) / (p1.y - p2.y);
    p1.x = (p1.x + u * (p2.x - p1.x));
    p1.y = rect.maxPoint.y;
  }

  if (side === 'top') {
    // y = y1 + u*(y2 - y1) => u = (y1 - y) / (y1 - y2)
    let u = (p1.y - rect.minPoint.y) / (p1.y - p2.y);
    p1.x = (p1.x + u * (p2.x - p1.x));
    p1.y = rect.minPoint.y;
  }

  p1.clippingCode = 0;
  defineClippingCode(p1, rect);
}

function defineClippingCode(point: LinePointType, rect: RectType) {
  if (point.x < rect.minPoint.x)
    point.clippingCode += 1;

  if (point.x > rect.maxPoint.x)
    point.clippingCode += 2;

  if (point.y > rect.maxPoint.y)
    point.clippingCode += 4;

  if (point.y < rect.minPoint.y)
    point.clippingCode += 8;
}