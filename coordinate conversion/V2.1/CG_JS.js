
//====Variavéis=================================================
	var sru, srn, srt, ctx1, ctx2, ctx3, frames = 0;
	var Paspect, aspect, fatorCorrecao;
		var ponto = document.getElementById('pontos');
		var selectedValue = document.getElementById("correcao").value;


	//coordenadas sru,srn,srt
	var sruX = [], sruY = [],
		srnX = [], srnY = [],
		srtX = [], srtY = [];

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

//desenha poligno
	sru.addEventListener("mousedown", function(e) {


		sruX[flag] = (e.clientX - rect.left);
		sruY[flag] = (e.clientY - rect.top);

		srnX[flag] = (sruX[flag] - xMin.value) / (xMax.value - xMin.value);
		srnY[flag] = (sruY[flag] - yMin.value) / (yMax.value - yMin.value);

		srtX[flag] = (srnX[flag] * (xMaxt.value - xMint.value)) + xMint.value;
		srtY[flag] = (srnY[flag] * (yMaxt.value - yMint.value)) + yMint.value;

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

			var coor = "Coordinates: (" + mousePos.x.toFixed(2) + " ; " + mousePos.y.toFixed(2) + ")";
			var pU = document.getElementById("p1");
			pU.innerHTML = coor;

		});
		sru.addEventListener("mouseout", function(e) {
				document.getElementById('p1').innerHTML = "";
		});

}

function tabela() {

	for(var z = 0; z < 4; z++){
			xUT[z] = ((sruX[z]/sru.width) * (xMax.value - xMin.value)) + (xMin.value * 1.0);
			yUT[z] = ((sruY[z]/sru.width) * (yMax.value - yMin.value)) + (yMin.value * 1.0);
	}

	for(var z = 0; z < 4; z++){
		ponto.rows[z+1].cells[1].style.fontSize = "small";
		ponto.rows[z+1].cells[1].innerHTML = sruX[z].toFixed(2) + " ; " + sruY[z].toFixed(2);
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
				window.location.reload();
			}
}

function show() {
		draw();
		update();

			//mostra as coordenadas do srn
			srn.addEventListener("mousemove", function(e) {

				var mousePos = getMousePos(srn, e);

				var coor = "Coordinates: (" + (mousePos.x/srn.width).toFixed(2) + " ; " + (mousePos.y/srn.height).toFixed(2) + ")";
				var pN = document.getElementById("p2");
				pN.innerHTML = coor;
			});

			srn.addEventListener("mouseout", function(e) {
					document.getElementById('p2').innerHTML = "";
			});


			//mostra as coordenadas do srt
			srt.addEventListener("mousemove", function(e) {

				var mousePos = getMousePos(srt, e);

				 var coor = "Coordinates: (" + 	mousePos.x.toFixed(2) + " ; " + mousePos.y.toFixed(2) + ")";
				 var pT = document.getElementById("p3");
				 pT.innerHTML= coor;
			});
			
			srt.addEventListener("mouseout", function(e) {
					document.getElementById('p3').innerHTML = "";
			});
		//window.requestAnimationFrame(show);
	}
	
	function info_box(tipo) {

		selectedValue = document.getElementById("correcao").value;
		var popup;

		if(tipo == "Popup1")
			popup = document.getElementById("normalizado");
		else
		{
			if(selectedValue == "sem_correcao")
				popup = document.getElementById("semCorrecao");

			else if(selectedValue == "em_x")
				popup = document.getElementById("emX");
			else
				popup = document.getElementById("emY");
		}	

		popup.classList.toggle("show");
	}

	//da as coordenadas do mouse no canvas
	function getMousePos(canvas, e) {
    	var rect = canvas.getBoundingClientRect();
   		return {
      		x: e.clientX - rect.left,
     		y: e.clientY - rect.top
    	}
	}
//====Incialização da tela==========================================
	main();
