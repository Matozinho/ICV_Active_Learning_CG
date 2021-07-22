var canvas;

const polygon = {
  vertices: [],
  minY: Number.POSITIVE_INFINITY,
  maxY: Number.NEGATIVE_INFINITY,
  intersections: new Map(),
};

function setup() {
  canvas = createCanvas(1100, 650).parent("canvas");

  fill("#000000");
  stroke("#000000");
  strokeWeight(3);

  canvas.mousePressed(() => {
    const currentVertice = { x: Math.trunc(mouseX), y: Math.trunc(mouseY) };

    setVertice(currentVertice);
  });
}

function setVertice(currentVertice) {
  polygon.vertices.push(currentVertice);

  const lastIndex = polygon.vertices.length - 1;

  circle(currentVertice.x, currentVertice.y, 2);

  if (lastIndex > 0) {
    const lastVertice = polygon.vertices[lastIndex - 1];
    line(lastVertice.x, lastVertice.y, currentVertice.x, currentVertice.y);
  }
}

function defineIntersections() {
  const verticesSize = polygon.vertices.length;

  for (let i = 0; i < verticesSize; i++)
    defineEdge(polygon.vertices[i], polygon.vertices[(i + 1) % verticesSize]);

  polygon.intersections.forEach((xArray) => {
    xArray.sort((a, b) => a - b);

    const arraySize = xArray.length;

    for (let i = 0; i < arraySize; i++) {
      if (i % 2 === 0) xArray[i] = Math.ceil(xArray[i]);
      else xArray[i] = Math.floor(xArray[i]);
    }
  });

  polygon.vertices.forEach((vertice) => {
    if (polygon.maxY < vertice.y) polygon.maxY = vertice.y;
    if (polygon.minY > vertice.y) polygon.minY = vertice.y;
  });

  fillPolygon();
}

function defineEdge(vertice1, vertice2) {
  if (vertice1.y != vertice2.y) {
    const intersections = polygon.intersections;
    let initialY, endY;
    let currentX;

    const variation = (vertice2.x - vertice1.x) / (vertice2.y - vertice1.y);

    if (vertice1.y < vertice2.y) {
      initialY = vertice1.y;
      endY = vertice2.y;
      currentX = vertice1.x;
    } else {
      initialY = vertice2.y;
      endY = vertice1.y;
      currentX = vertice2.x;
    }

    for (let currentY = initialY; currentY < endY; currentY++) {
      if (!intersections.get(currentY)) intersections.set(currentY, [currentX]);
      else intersections.get(currentY).push(currentX);
      currentX += variation;
    }
  }
}

function fillPolygon() {
  const initialY = polygon.minY;
  const endY = polygon.maxY;
  const intersections = polygon.intersections;

  for (let currentY = initialY; currentY < endY; currentY++) {
    const currentPoint = intersections.get(currentY);
    let k = 0;

    do {
      let firstX = currentPoint[k];
      let endX = currentPoint[k + 1];

      for (let currentX = firstX; currentX < endX; currentX++)
        point(currentX, currentY);

      k += 2;
    } while (currentPoint[k]);
  }
}

function keyPressed() {
  if (keyCode === 32) {
    const lastIndex = polygon.vertices.length - 1;
    const vertices = polygon.vertices;

    line(
      vertices[0].x,
      vertices[0].y,
      vertices[lastIndex].x,
      vertices[lastIndex].y,
    );

    defineIntersections();
  }
}

function clearCanvas() {
  polygon.vertices = [];
  polygon.intersections = new Map();
  polygon.minY = Number.POSITIVE_INFINITY;
  polygon.maxY = Number.NEGATIVE_INFINITY;

  clear();
}
