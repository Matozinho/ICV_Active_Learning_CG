//=================Variáveis Globais====================//
let canvas, Cwidth = 900, Cheight = 500; //variáveis sobre o canvas
let colunas, linhas, tamanho; //variáveis para resolução do canvas (Quantidade de quadrados)
let Xpontos = [2], Ypontos = [2]; //para guardar as coordenadas dos pontos
let counter = 0;
let lastLine

colunas = document.getElementById("input_col");

let Draw = "line_1" //valor inicial do radio Button

//======================================================//

function setup() {
  canvas = createCanvas(Cwidth, Cheight);
  canvas.parent('canvas') //linka o canvas à div no html
  
  tamanho = Cwidth / colunas.value; //define o tamanho dos quadrados
  linhas = Cheight / tamanho; //define a quantidade de linhas a serem desenhadas
  lastLine = Cheight - tamanho*Math.trunc(linhas); //desenhar as colunas até a útima linha, não até o final do canvas
  let i;

  for(i=0; i<=colunas.value; i++)
    line(i*tamanho, 0, i*tamanho, Cheight-lastLine)

  for(i=0; i<=linhas; i++) //desenha as linhas no canvas
    line(0, i*tamanho, Cwidth, i*tamanho)
}

function draw() {
  canvas.mousePressed(redirect);
}


//valida o numero de colunas
function redefineCol(){
  counter = 0;
  colunas = document.getElementById("input_col");
  let i;

  canvas.clear();

  tamanho = Cwidth / colunas.value; //define o tamanho dos quadrados
  linhas = Cheight / tamanho; //define a quantidade de linhas a serem desenhadas
  lastLine = Cheight - tamanho*Math.trunc(linhas); //desenhar as colunas até a útima linha, não até o final do canvas

  for(i=0; i<=colunas.value; i++)
    line(i*tamanho, 0, i*tamanho, Cheight-lastLine)

  for(i=0; i<=linhas; i++) //desenha as linhas no canvas
    line(0, i*tamanho, Cwidth, i*tamanho)
}

//value do Radio Button, para o tipo do desenho
function selectedValue(typeDraw) {
  Draw = typeDraw;
  redefineCol();
};

function redirect(){
  if(counter < 2 && mouseY < Cheight-lastLine) 
  {   
    //define qual o quadrado a partir das coordenadas
    Xpontos[counter] = Math.trunc(mouseX / tamanho);
    Ypontos[counter] = Math.trunc(mouseY / tamanho);

    //pinta o quadrado referente à coordenada
    WritePixel(Xpontos[counter], Ypontos[counter]);

    if(counter == 1)
    {
      if(Draw == "line_1")
        drawLine_1();
  
      else if(Draw == "line_2")
        drawLine_2();
      
      else if(Draw == "circle")
        drawCircle();
      
      else
        drawElipse();
    }
    counter++;
  }
};

function drawLine_1(){
  let x1,x2, y1, y2;

  //caso a reta seja da direita para a esquerda, troca-se os pontos
  if(Xpontos[1] < Xpontos[0]){
    x1 = Xpontos[1];
    y1 = Ypontos[1];
    x2 = Xpontos[0];
    y2 = Ypontos[0];
  }
  //caso seja da esquerda para a direita, mantém-se os pontos
  else{
    x1 = Xpontos[0];
    y1 = Ypontos[0];
    x2 = Xpontos[1];
    y2 = Ypontos[1]
  }

  let dy = y2 - y1; 
  let dx = x2 - x1; 
  let m = dy / dx; //coeficiente angular
  let x, y = y1; //variávei para desenho dos quadrados

  //trata os casos de linha vertical
  if(x1 == x2){
    console.log(m);
    let aux1, aux2;
    x = x1;
    if(y2 < y1){
      aux1 = y2;
      aux2 = y1;
    }
    else{
      aux1 = y1;
      aux2 = y2;
    }

    for(y = aux1; y < aux2; y++)
      WritePixel(x, Math.round(y));  
  }
  //trata os casos de coeficiente fora do intervalo de -1 a 1
  else if(m < -1 || m > 1){
    let aux1, aux2;
    x = x1;
    m = dx / dy;

    if((y2 < y1)){
      aux1 = y2;
      aux2 = y1;
      x=x2;
    }
    else{
      aux1 = y1;
      aux2 = y2;
    }

    for(y = aux1; y <= aux2; y++){
      WritePixel(Math.round(x), y);
      x += m;
    }
  }
  //para quaisquer outros casos
  else
    for(x = x1; x <= x2; x++){
      WritePixel(x, Math.round(y));
      y += m;
    }
};

function drawLine_2(){
  let dx, dy, d;
  let incrE, incrNE;
  let x, y; //desenho dos quadrados
  let x1 = Xpontos[0], x2 = Xpontos[1];
  let y1 = Ypontos[0], y2 = Ypontos[1];

  //inversão dos extremos da linha (direita para esquerda)
  if(Xpontos[1] < Xpontos[0]){
    x1 = Xpontos[1];
    y1 = Ypontos[1];
    x2 = Xpontos[0];
    y2 = Ypontos[0];
  }
  dx = Math.abs(x2 - x1);
  dy = Math.abs(y2 - y1);

  //para linhas horizontais
  if(dy == 0){
    for(x = x1; x<= x2; x++)
      WritePixel(x, y1);
  }
  //para linhas verticais
  else if(dx == 0){
    if(y1 < y2)
      for(y = y1; y<= y2; y++)
        WritePixel(x1, y);
    else
      for(y = y2; y<=y1; y++)
        WritePixel(x1, y);
  }
  //para inclinação entre 0 e 45º
  else if(dx > dy){
    d = 2 * dy - dx;
    incrE = 2 * dy;
    incrNE = 2 * (dy - dx);
    x = x1;
    y = y1;

    //para reta descendente - incre menta x e y
    if(y2 > y1){
      while(x < x2){
        if(d <= 0){
          d += incrE;
          x += 1;
        }
        else{
          d += incrNE;
          x += 1;
          y += 1;
        }
        WritePixel(x, y);
      }
    }
    //para reta ascendente - incrementa x e decrementa o y  
    else{
      while(x < x2){
        if(d <= 0){
          d += incrE;
          x += 1;
        }
        else{
          d += incrNE;
          x += 1;
          y -= 1;
        }
        WritePixel(x,y);
      }
    }
  }
  // para inclinação de 45 a 90º
  else{
    d = 2 * dx - dy;
    incrE = 2 * dx;
    incrNE = 2 * (dx - dy);
    x = x1;
    y = y1;

    //reta descendente - incrementa x e y
    if(y2 > y1){
      while(y < y2){
        if(d <= 0){
          d += incrE;
          y += 1;
        }
        else{
          d += incrNE;
          y += 1;
          x += 1;
        }
        WritePixel(x, y);
      }
    }
    //reta ascendente - decrementa y e incrementa x
    else{
      while(y > y2){
        if(d <= 0){
          d += incrE;
          y -= 1;
        }
        else{
          d += incrNE;
          y -= 1;
          x += 1;
        }
        WritePixel(x, y);
      }
    }
  }
};

function drawCircle(){

  let radius;
  let x1, y1, x2, y2;
  let Xcenter, Ycenter;
  let k;

  //faz que o ponto 1 seja sempre no canto superior esquerdo e o ponto 2 seja sempre no lado inferior direito
  if(Xpontos[0] > Xpontos[1] && Ypontos[0] > Ypontos[1]){
    x1 = Xpontos[1];
    y1 = Ypontos[1];
    x2 = Xpontos[0];
    y2 = Ypontos[0];
  }
  else if(Ypontos[1] < Ypontos[0] && Xpontos[0] < Xpontos[1]){
    x1 = Xpontos[0];
    y1 = Ypontos[1];
    x2 = Xpontos[1];
    y2 = Ypontos[0];
  }
  else if(Ypontos[1] > Ypontos[0] && Xpontos[0] > Xpontos[1]){
    x1 = Xpontos[1];
    y1 = Ypontos[0];
    x2 = Xpontos[0];
    y2 = Ypontos[1]
  }
  else{
    x1 = Xpontos[0];
    y1 = Ypontos[0];
    x2 = Xpontos[1];
    y2 = Ypontos[1];
  }

  //constante para deslocamento da figura
  k = y1 - x1;

  //define o raio da circunferência
  if(Math.abs(x2 - x1) > Math.abs(y2 - y1))
    radius = Math.trunc(Math.abs(y2 - y1) / 2);
  else
    radius = Math.trunc(Math.abs(x2 - x1) / 2);

  Xcenter = x1 + radius;
  Ycenter = y1 + radius;

  let x = 0;
  let y =  radius;
  let d = 1 - radius;

  resetaCanvas(); //tira os pontos escolhidos pelo usuário
  WritePixel(Xcenter, Ycenter); //coloca o centro do círculo
  CirclePoints(x, y, Xcenter, Ycenter, k); //rotina para os pontos reflexos
  
  while (y > x){
    if (d < 0 ) //escolhe E
      d += 2 * x + 3;
    else{ //escolhe SE
      d += 2 * (x - y) + 5;
      y--;
    }
    x++;
    i++;
    CirclePoints(x, y, Xcenter, Ycenter, k);
  }
};

function resetaCanvas(){
  canvas.clear();

  for(i=0; i<=colunas.value; i++)
    line(i*tamanho, 0, i*tamanho, Cheight-lastLine)

  for(i=0; i<=linhas; i++) //desenha as linhas no canvas
    line(0, i*tamanho, Cwidth, i*tamanho)
  
    return;
};

function CirclePoints (x, y, Cx, Cy, k){
  
  WritePixel(x + Cx, y + Cy);
  WritePixel(y + Cy - k, x + Cx + k);//
  WritePixel(y + Cy - k, -x + Cx + k);//
  WritePixel (x + Cx, -y + Cy);
  WritePixel (-x + Cx, -y + Cy); 
  WritePixel (-y + Cy - k, -x + Cx + k);// 
  WritePixel (-y + Cy - k, x + Cx + k);//
  WritePixel (-x + Cx, y + Cy);
};

function drawElipse(){
  let x1, y1, x2, y2;
  let Xcenter, Ycenter;

  if(Xpontos[0] > Xpontos[1] && Ypontos[0] > Ypontos[1]){
    x1 = Xpontos[1];
    y1 = Ypontos[1];
    x2 = Xpontos[0];
    y2 = Ypontos[0];
  }
  else if(Ypontos[1] < Ypontos[0] && Xpontos[0] < Xpontos[1]){
    x1 = Xpontos[0];
    y1 = Ypontos[1];
    x2 = Xpontos[1];
    y2 = Ypontos[0];
  }
  else if(Ypontos[1] > Ypontos[0] && Xpontos[0] > Xpontos[1]){
    x1 = Xpontos[1];
    y1 = Ypontos[0];
    x2 = Xpontos[0];
    y2 = Ypontos[1]
  }
  else{
    x1 = Xpontos[0];
    y1 = Ypontos[0];
    x2 = Xpontos[1];
    y2 = Ypontos[1];
  }
  a = Math.trunc(Math.abs(x2 - x1) / 2);
  b = Math.trunc(Math.abs(y2 - y1) / 2);

  Xcenter = x1 + a;
  Ycenter = y1 + b;
  resetaCanvas();
  WritePixel(Xcenter, Ycenter);
  
  let k = y1 - x1;
  let a2 = a * a; 
  let b2 = b * b;
  let twoa2 = 2 * a2; 
  let twob2 = 2 * b2;
  let x = 0; 
  let y = b;
  let px = 0;
  let py = twoa2 * y;
  let p;
  EllipsePoints (x, y, Xcenter, Ycenter);
  p = Math.round(b2 - (a2 * b) + (0.25 * a2) + 0.5);
  while (px < py){
    x++;
    px += twob2;
    if (p < 0)
      p += b2 + px
    else{
      y--;
      py -= twoa2;
      p += b2 + px - py;
    }
    EllipsePoints (x, y, Xcenter, Ycenter);
  }
  p = int(b2 * (x+0.5)*(x+0.5) + a2 * (y-1)*(y-1) - a2 * b2 + 0.5);
  while (y > 0){
    y--;
    py -= twoa2;
    if (p > 0)
      p += a2 - py;
    else{
      x++;
      px += twob2;
      p += a2 - py + px;
    }
    EllipsePoints (x, y, Xcenter, Ycenter);
  }
};

function EllipsePoints (x, y, Cx, Cy){
  
  WritePixel(x + Cx, y + Cy);
  WritePixel(-x + Cx, y + Cy);
  WritePixel(-x + Cx, -y + Cy); 
  WritePixel(x + Cx, -y + Cy);  
};

function WritePixel(x, y){
  fill('black');
  rect(x * tamanho, y * tamanho, tamanho);
}