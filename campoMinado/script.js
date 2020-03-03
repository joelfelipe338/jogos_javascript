window.onload  = function(){
	var campo = document.getElementById('campo');
	var ctx = campo.getContext("2d");
	var pecasTam = 20;
	var campoTam = 20;
	var perdeu = false; 
	var areas = 0;
	campo.addEventListener("click",jogada);
	var abertos = [];
	var gradeMinas = [];
	minas(60);
	game(-1,-1, false);



	function game(X,Y, perigo){
		//CAMPO
		ctx.fillStyle = "black";
		ctx.fillRect(0,0,campo.width, campo.height);
		// Localizando Minas
		// Pecas jogo
		for (let i = 0;i < campoTam; i ++){
			for (let j = 0; j < campoTam; j++){
				var posAtual = i.toString()+","+j.toString();
				if(i == X && j == Y && abertos.indexOf(posAtual) == -1){
					var posSelecionada = i.toString()+","+j.toString();
					abertos.push(posSelecionada);
					areas++;
					if(perigo == false){
						zonaSegura(i,j, perigo);
					}
					perigo = false;
				}

				if(abertos.indexOf(posAtual) == -1){
					ctx.fillStyle = "gray";
				}else if(gradeMinas.indexOf(posAtual) != -1){
					ctx.fillStyle = "red";
					perdeu = true;
				}else{
					ctx.fillStyle = "blue";
				}
				ctx.fillRect(i * campoTam,j * campoTam, campoTam-1, campoTam-1);
			}
		}
		if(perdeu){
			alert("Você perdeu!!!");
			window.location.href = window.location.href;
		}
		if(areas >= 340){
			alert("Você venceu!!!");
			window.location.href = window.location.href;
		}
		
	}

	function localizarMinas(){
		var posAtual;
		var posTeste;
		var qtdMinas = 0;
		for (let i = 0; i < campoTam; i++){
			for(let j = 0; j < campoTam; j++){
				posAtual = i.toString()+","+j.toString();
				if(gradeMinas.indexOf(posAtual) == -1 && abertos.indexOf(posAtual) != -1){
					posTeste = (i-1).toString()+","+(j-1).toString();
					if(gradeMinas.indexOf(posTeste) != -1) qtdMinas++;

					posTeste = (i-1).toString()+","+(j).toString();
					if(gradeMinas.indexOf(posTeste) != -1) qtdMinas++;

					posTeste = (i).toString()+","+(j-1).toString();
					if(gradeMinas.indexOf(posTeste) != -1) qtdMinas++;

					posTeste = (i+1).toString()+","+(j-1).toString();
					if(gradeMinas.indexOf(posTeste) != -1) qtdMinas++;

					posTeste = (i-1).toString()+","+(j+1).toString();
					if(gradeMinas.indexOf(posTeste) != -1) qtdMinas++;

					posTeste = (i+1).toString()+","+(j+1).toString();
					if(gradeMinas.indexOf(posTeste) != -1) qtdMinas++;

					posTeste = (i+1).toString()+","+(j).toString();
					if(gradeMinas.indexOf(posTeste) != -1) qtdMinas++;

					posTeste = (i).toString()+","+(j+1).toString();
					if(gradeMinas.indexOf(posTeste) != -1) qtdMinas++;

					ctx.fillStyle = "red";
					ctx.font = "14px Arial";
					ctx.fillText(qtdMinas, i*20 + 6, j*20+14);
					qtdMinas = 0;
				}
			}
		}
	}

	function zonaSegura(x,y, p){
		console.log("espalhar");
		var pos = x.toString()+","+y.toString();
		var livre;

		pos = (x-1).toString()+","+(y).toString();
		livre = posLivre(x-1,y);
		if(gradeMinas.indexOf(pos) == -1 && p == false) livre ? game(x-1,y,false):game(x-1,y,true);

		pos = (x-1).toString()+","+(y-1).toString();
		livre = posLivre(x-1,y-1);
		if(gradeMinas.indexOf(pos) == -1 && p == false) livre ? game(x-1,y-1,false):game(x-1,y-1,true);

		pos = (x-1).toString()+","+(y+1).toString();
		livre = posLivre(x-1,y+1);
		if(gradeMinas.indexOf(pos) == -1 && p == false) livre ? game(x-1,y+1,false):game(x-1,y+1,true);

		pos = (x+1).toString()+","+(y-1).toString();
		livre = posLivre(x+1,y-1);
		if(gradeMinas.indexOf(pos) == -1 && p == false) livre ? game(x+1,y-1,false):game(x+1,y-1,true);

		pos = (x+1).toString()+","+(y+1).toString();
		livre = posLivre(x+1,y+1);
		if(gradeMinas.indexOf(pos) == -1 && p == false) livre ? game(x+1,y+1,false):game(x+1,y+1,true);

		pos = (x).toString()+","+(y-1).toString();
		livre = posLivre(x,y-1);
		if(gradeMinas.indexOf(pos) == -1 && p == false) livre ? game(x,y-1,false):game(x,y-1,true);

		pos = (x+1).toString()+","+(y).toString();
		livre = posLivre(x+1,y);
		if(gradeMinas.indexOf(pos) == -1 && p == false) livre ? game(x+1,y,false):game(x+1,y,true);

		pos = (x).toString()+","+(y+1).toString();
		livre = posLivre(x,y+1);
		if(gradeMinas.indexOf(pos) == -1 && p == false) livre ? game(x,y+1,false):game(x,y+1,true);


	}

	function posLivre(x,y){
		var posTeste = x.toString()+","+y.toString();
		var livre = true;
		posTeste = (x-1).toString()+","+(y-1).toString();
		if(gradeMinas.indexOf(posTeste) != -1) livre = false;

		posTeste = (x-1).toString()+","+(y).toString();
		if(gradeMinas.indexOf(posTeste) != -1) livre = false;

		posTeste = (x).toString()+","+(y-1).toString();
		if(gradeMinas.indexOf(posTeste) != -1) livre = false;

		posTeste = (x+1).toString()+","+(y-1).toString();
		if(gradeMinas.indexOf(posTeste) != -1) livre = false;

		posTeste = (x-1).toString()+","+(y+1).toString();
		if(gradeMinas.indexOf(posTeste) != -1) livre = false;

		posTeste = (x+1).toString()+","+(y+1).toString();
		if(gradeMinas.indexOf(posTeste) != -1) livre = false;

		posTeste = (x+1).toString()+","+(y).toString();
		if(gradeMinas.indexOf(posTeste) != -1) livre = false;

		posTeste = (x).toString()+","+(y+1).toString();
		if(gradeMinas.indexOf(posTeste) != -1) livre = false;

		return livre;
	}	

	function minas(minas){
		var posMinaX; 
		var posMinaY;
		for (let i = 0; i < minas; i++){
			posMinaY = Math.floor(Math.random()*20);
			posMinaX = Math.floor(Math.random()*20);
			gradeMinas.push(posMinaX.toString()+","+posMinaY.toString());
		}		
	}

	function jogada(event){
		var posX = Math.floor((event.layerX-8)/20);
		var posY = Math.floor((event.layerY-8)/20);
		var pos = posX.toString()+","+posY.toString();
		if(posLivre(posX,posY) == true && gradeMinas.indexOf(pos) == -1){
			game(posX,posY,false);
		}else{
			game(posX,posY,true);
		}
		console.log("X: "+posX+" Y: "+posY);
		
		localizarMinas();
	}
}
