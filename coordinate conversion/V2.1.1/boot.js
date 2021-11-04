
//====Variavéis=================================================
var sru, srn, srt, ctx1, ctx2, ctx3, frames = 0;
var click = 0
var propX, propY;
var fatorCorrecao;
    var ponto = document.getElementById('pontos');
    var selectedValue = document.getElementById("correcao").value;


//coordenadas sru,srn,srt
var sruX = [4], sruY = [4],
    srnX = [4], srnY = [4],
    srtX = [4], srtY = [4];

var count = 0, i, flag = 0,
    xU,yU,
    xN,yN;
    xUT = [], yUT = [];

//botões
var b1 = document.getElementById('b1');
var b2 = document.getElementById('b2');

//texts
var t,coor;

//mínimos e máximos de mundo sru
var xMin = document.getElementById("xmin"),
    xMax = document.getElementById("xmax"),
    yMin = document.getElementById("ymin"),
    yMax = document.getElementById("ymax");

//mínimos e máximos de mundo srt
var xMint = document.getElementById("xminT"),
    xMaxt = document.getElementById("xmaxT"),
    yMint = document.getElementById("yminT"),
    yMaxt = document.getElementById("ymaxT");

    var pU = document.getElementById("p1");
    pU.innerHTML = "Coordinates: "
    var pN = document.getElementById("p2");
    pN.innerHTML = "Coordinates: "
    var pT = document.getElementById("p3");
    pT.innerHTML = "Coordinates: "

//====Main======================================================
function main() {
    
    //define sru

        sru = document.getElementById("canU");
        sru.width = 320;
        sru.height = 280;
        sru.style.border = "1px solid #000";
        ctx1 = sru.getContext("2d");


    //define o srn

        srn =  document.getElementById("canN");
        srn.width = 200;
        srn.height = 200;
        srn.style.border = "1px solid #000";
        ctx2 = srn.getContext("2d");


    //define srt

        srt =  document.getElementById("canT");
        srt.width = 450;
        srt.height = 450;
        srt.style.border = "1px solid #000";
        ctx3 = srt.getContext("2d");

    //desenha os limites escolhidos
        ctx3.beginPath();
        ctx3.strokeStyle = "black";
        ctx3.rect(xMint.value,yMint.value,(xMaxt.value-xMint.value),(yMaxt.value-yMint.value));
        ctx3.stroke();

        //caixa de info

        show();
}



//=====Subfunções================================================//
function draw() {
var rect = sru.getBoundingClientRect(); // abs. size of element


propX = (xMax.value - xMin.value) / sru.width;
propY = (yMax.value - yMin.value) / sru.height;

//desenha poligno
sru.addEventListener("mousedown", function(e) {

    if(flag < 4)
    {
        trying = getMousePos(sru, e);
        sruX[flag] = trying.x-1.0;
        sruY[flag] = trying.y-3.0;

        xUT[flag] = xU; 
        yUT[flag] = yU 

        srnX[flag] = ((sruX[flag]+1.0) / sru.width);
        srnY[flag] = ((sruY[flag]+3.0) / sru.height);

        srtX[flag] = (((srnX[flag]) * (xMaxt.value - xMint.value)) + xMint.value);
        srtY[flag] = (((srnY[flag]) * (yMaxt.value - yMint.value)) + yMint.value);

        //começa desenho no sru
        ctx1.beginPath();
        ctx1.arc(sruX[flag],sruY[flag],1,0,2*Math.PI);
        ctx1.stroke();

        //começa desenho no srn
        ctx2.beginPath();
        ctx2.arc(srnX[flag]*srn.width,srnY[flag]*srn.height,1,0,2*Math.PI);
        ctx2.fill();

        //desenho no srt
        ctx3.beginPath();
        ctx3.arc(srtX[flag],srtY[flag],1,0,2*Math.PI);
        ctx3.stroke();

        if(flag == 3)
        {
            //liga o poligono no sru
            ctx1.beginPath();
            ctx1.moveTo(sruX[0],sruY[0]);
            for( i = 1; i < 4; i++) {
                ctx1.lineTo(sruX[i],sruY[i]);
            }
            ctx1.closePath();
            ctx1.strokeStyle = "black";
            ctx1.stroke();

            //liga o poligono no srn
            ctx2.beginPath();
            ctx2.moveTo(srnX[0]*srn.width,srnY[0]*srn.height);
            for( i = 1; i < 4;i++) {
                ctx2.lineTo(srnX[i]*srn.height,srnY[i]*srn.width);
            }
                    ctx2.closePath();
            ctx2.strokeStyle = "black";
            ctx2.stroke();

            //liga o poligono no srt
            ctx3.beginPath();
            ctx3.moveTo(srtX[0],srtY[0]);
            for( i = 1; i < 4;i++) {
                ctx3.lineTo(srtX[i],srtY[i]);
            }
            ctx3.closePath();
            ctx3.strokeStyle = "black";
            ctx3.stroke();

            tabela();
        }

        

        flag++;
    }
        
}, true);

b2.onclick = function() {

    selectedValue = document.getElementById("correcao").value;

    var ndh, ndv, width, height;
    ndh = (xMaxt.value - xMint.value);
    ndv = (yMaxt.value - yMint.value);
    width = xMax.value - xMin.value;
    height = yMax.value - yMin.value;

    ctx3.clearRect(0,0,450,450);
    ctx3.beginPath();
    ctx3.strokeStyle = "black";
    ctx3.rect(xMint.value,yMint.value,(xMaxt.value-xMint.value),(yMaxt.value-yMint.value));
    ctx3.stroke();
    
    //redefine os pontos
    if(selectedValue == "sem_correcao")
    {
        for(var j = 0; j < 4; j++) {
            srtX[j] = srnX[j] * (xMaxt.value - xMint.value) + 1.0 * xMint.value;
            srtY[j] = srnY[j] * (yMaxt.value - yMint.value) + 1.0 * yMint.value;
        }
    }
    else if(selectedValue == "em_x")
    {
        for(var j = 0; j < 4; j++) {
            srtX[j] = (srnX[j] * (xMaxt.value - xMint.value) + 1.0 * xMint.value) * ((width/height) / (ndh/ndv)); 
            srtY[j] = srnY[j] * (yMaxt.value - yMint.value) + 1.0 * yMint.value;
        }
    }
    else if(selectedValue == "em_y")
    {
        for(var j = 0; j < 4; j++) {
            srtX[j] = srnX[j] * (xMaxt.value - xMint.value) + 1.0 * xMint.value; 
            srtY[j] = (srnY[j] * (yMaxt.value - yMint.value) + 1.0 * yMint.value) * ((ndh/ndv) / (width/height));
        }
    }

    //desenha os pontos
    for(var i = 0; i < 4; i++) {
    ctx3.beginPath();
    ctx3.arc(srtX[i],srtY[i],1,0,2*Math.PI);
    ctx3.stroke();

    tabela();
}

//liga o poligono no srt
ctx3.beginPath();
ctx3.moveTo(srtX[0],srtY[0]);
for( i = 1; i < 4;i++) {
    ctx3.lineTo(srtX[i],srtY[i]);
}
        ctx3.closePath();
ctx3.strokeStyle = "black";
ctx3.stroke();

for(var z = 0; z < 4; z++){
    ponto.rows[z+1].cells[3].style.fontSize = "small";
    ponto.rows[z+1].cells[3].innerHTML = Math.round(srtX[z]) + " ; " + Math.round(srtY[z]);
}
}

//mostra as coordenadas do sru
sru.addEventListener("mousemove", function(e) {
    
    var mousePos = getMousePos(sru, e);
    xU = ( ((mousePos.x*propX)/sru.width) * (xMax.value - xMin.value) ) + (xMin.value * 1.0);
    yU = ( ((mousePos.y*propY)/sru.height) * (yMax.value - yMin.value) ) + (yMin.value * 1.0);
        var coor = "Coordinates: (" + xU.toFixed(2) + " ; " + yU.toFixed(2) + ")";
        pU.innerHTML = coor;
    });
    sru.addEventListener("mouseout", function(e) {
            document.getElementById('p1').innerHTML = "Coordinates:";
    });

}

function tabela() {

for(var z = 0; z < 4; z++){
    ponto.rows[z+1].cells[1].style.fontSize = "small";
    ponto.rows[z+1].cells[1].innerHTML = xUT[z].toFixed(2) + " ; " + yUT[z].toFixed(2);
}
for(var z = 0; z < 4; z++){
    ponto.rows[z+1].cells[2].style.fontSize = "small";
    ponto.rows[z+1].cells[2].innerHTML = (srnX[z]).toFixed(2) + " ; " + (srnY[z]).toFixed(2);
}
for(var z = 0; z < 4; z++){
    ponto.rows[z+1].cells[3].style.fontSize = "small";
    ponto.rows[z+1].cells[3].innerHTML = Math.round(srtX[z]) + " ; " + Math.round(srtY[z]);
}
}

function reloadTabela(){
    if(sruX[3]) {
        tabela();
    }
}

function update() {
    frames++;
    b1.onclick = function() {
        ctx1.clearRect(0,0,sru.width, sru.height);
        ctx2.clearRect(0,0,srn.width, srn.height);
        ctx3.clearRect(0,0, srt.width, srt.height);
        flag = 0;
        xU=0;
        yU=0;
        xN=0;
        yN=0;
      
        for(var f=0; f<4; f++)
        {
            sruX[f]=0;
            sruY[f]=0;
            srnX[f]=0;
            srnY[f]=0;
            srtX[f]=0;
            srtY[f]=0;
            xUT[f]=0;
            yUT[f]=0;
        }
        
        tabela();
    }
}

function show() {
    draw();
    update();

        //mostra as coordenadas do srn
        srn.addEventListener("mousemove", function(e) {

            var mousePos = getMousePos(srn, e);

            var coor = "Coordinates: (" + (mousePos.x/(srn.width+1.0)).toFixed(2) + " ; " + (mousePos.y/(srn.height+1.0)).toFixed(2) + ")";
            pN.innerHTML = coor;
        });

        srn.addEventListener("mouseout", function(e) {
                document.getElementById('p2').innerHTML = "Coordinates:";
        });


        //mostra as coordenadas do srt
        srt.addEventListener("mousemove", function(e) {

            var mousePos = getMousePos(srt, e);

             var coor = "Coordinates: (" + 	(mousePos.x-1.0).toFixed(2) + " ; " + (mousePos.y-3.0).toFixed(2) + ")";
             pT.innerHTML= coor;
        });
        
        srt.addEventListener("mouseout", function(e) {
                document.getElementById('p3').innerHTML = "Coordinates:";
        });
}

//da as coordenadas do mouse no canvas
function getMousePos(canvas, e) {
    var rect = canvas.getBoundingClientRect();

       return {
          x: e.clientX - rect.left - 1.0, //-1 das bordas
         y: e.clientY - rect.top - 1.0
    }
    
}

function exibepopover(){

    if(click < 2)
    {
        selectedValue = document.getElementById("correcao").value;
        
        if(selectedValue == "sem_correcao")
        {
            $('#popCorrec').popover({html: true, title: "Sem Correção", content: "D<sub>X</sub> = X<sub>n</sub> * ( DX<sub>max</sub> − DX<sub>min</sub> ) + DX<sub>min</sub> <br>D<sub>Y</sub> = Y<sub>n</sub> * ( DY<sub>max</sub> − DY<sub>min</sub> D) + DY<sub>min</sub>"})
            console.log("SEM")
        }
        else if(selectedValue == "em_x")
        {
            $('#popCorrec').popover({html: true, title: "Correção em X", content: "D<sub>X</sub> = ( X<sub>n</sub> *  ( DX<sub>max</sub> − DX<sub>min</sub> ) + DX<sub>min</sub> ) * FC <br>D<sub>Y</sub> = Y<sub>n</sub> * ( DY<sub>max</sub> − DY<sub>min</sub> ) + DY<sub>min</sub> ) <br><br>FC = ( (X<sub>max</sub> - X<sub>min</sub>) / (Y<sub>max</sub> - Y<sub>min</sub>) ) / ( (DX<sub>max</sub> - DX<sub>min</sub>) / (DY<sub>max</sub> - DY<sub>min</sub>) )"})
            console.log("x")
        }
        else
        {
            $('#popCorrec').popover({html: true, title: "Correção em Y", content: "D<sub>X</sub> = X<sub>n</sub> * ( DX<sub>max</sub> − DX<sub>min</sub> ) + DX<sub>min</sub> ) <br>D<sub>Y</sub> = Y<sub>n</sub> * ( DY<sub>max</sub> − DY<sub>min</sub> ) + DY<sub>min</sub> ) * FC <br><br>FC = ( (DX<sub>max</sub> - DX<sub>min</sub>) / (DY<sub>max</sub> - DY<sub>min</sub>) ) / ( (X<sub>max</sub> - X<sub>min</sub>) / (Y<sub>max</sub> - Y<sub>min</sub>) ) "})
            console.log("Y")
        }
        click++;
    }
    else
    {
        $('#popCorrec').popover('dispose');
        click = 0;
    }
    
}

$(function () {
    $('#fon').popover({html: true})
})
//====Incialização da tela==========================================
main();
