//=================Variáveis Globais====================//
let canvas, Cwidth = 1200, Cheight = 800; //variáveis sobre o canvas
let colunas, linhas, tamanho; //variáveis para resolução do canvas (Quantidade de quadrados)
let vertices = []; //guarda as coordenadas dos n vértices do poligono
let boundingBox = []; //Guarda as coordenadas do menor retangulo possível que reveste o polígono (mínimo esquerda e máximo da direita)
//para definir os pontos extremo do bounding box
let maiorX, maiorY;
let menorX, menorY;
let counter = 0;

//======================================================//

function setup() {
  canvas = createCanvas(Cwidth, Cheight);
  canvas.parent('canvas') //linka o canvas à div no html
  canvas.elt.style.border = '1px solid black';
  
}

function draw() {
  canvas.mousePressed(redirect);
}

addEventListener('keydown', function(){
  if(event.keyCode == 13 || event.keyCode == 32){
    //liga o primeiro ao último ponto, fechando o poligono
    line(vertices[counter-1].x, vertices[counter-1].y, vertices[0].x, vertices[0].y);

    boundingBox[0] = {x: menorX, y: menorY};
    boundingBox[1] = {x: maiorX, y: maiorY};

    line(boundingBox[0].x, boundingBox[0].y, boundingBox[0].x, boundingBox[1].y);
    line(boundingBox[0].x, boundingBox[1].y, boundingBox[1].x, boundingBox[1].y);
    line(boundingBox[1].x, boundingBox[0].y, boundingBox[1].x, boundingBox[1].y)
    line(boundingBox[0].x, boundingBox[0].y, boundingBox[1].x, boundingBox[0].y);

    scanLine();
  
    //zera o vetor e o counter para outro desenho
    vertices = [];
    counter = 0;
  }

});

function redirect(){
  //guarda as coordenadas do vértice no vetor
  vertices.push({
    x: Math.trunc(mouseX), 
    y: Math.trunc(mouseY)
  });
  
  //desenha os pontos(vértices)
  ellipse(vertices[counter].x, vertices[counter].y, 1.5);
  
  //desenha a linha entre um vértice e outro e define os extremos do boundingBox
  if(counter > 0){ 
    line(vertices[counter-1].x, vertices[counter-1].y, vertices[counter].x, vertices[counter].y); 

    //define o menor e o maior X
    if(vertices[counter].x < menorX)
      menorX = vertices[counter].x;
    else if(vertices[counter].x > maiorX)
      maiorX = vertices[counter].x;

    //define o maior e o menor Y
    if(vertices[counter].y < menorY)
      menorY = vertices[counter].y;
    else if(vertices[counter].y > maiorY)
      maiorY = vertices[counter].y;
  }
  else{
    maiorY = vertices[0].y;
    maiorX = vertices[0].x;
    menorY = vertices[0].y;
    menorX = vertices[0].x;
  }

  counter++;
};

function limparBtn(){
  //limpa o canvas
  canvas.clear();

  //zera o vetor e o counter para outro desenho
  vertices = [];
  counter = 0;
}

function scanLine(){
  let m, x, y;
  let i, j;
  x = boundingBox[0].x;
  for(i = 0; i < boundingBox[1].y - boundingBox[0].y; i++){
    for(j = 0; j < boundingBox[1].x - boundingBox[0].x; j++){
      
    }
  }
}
