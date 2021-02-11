//=====================Variávei globais=====================//
const canvasWidth = 900,
  canvasHeight = 500;
var canvas;
var borderColor = document.getElementById("borderColor").value, //pega as cores do poligono no inicio do programa
  PolygonColor = document.getElementById("polygonColor").value;

var polygon = {
  vertices: {},
  arestas: {},
};
//==========================================================//

function setup() {
  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent("canvas");
}

function getPolygonColors() {
  borderColor = document.getElementById("borderColor").value;
  PolygonColor = document.getElementById("polygonColor").value;

  console.log(borderColor, PolygonColor);
}
