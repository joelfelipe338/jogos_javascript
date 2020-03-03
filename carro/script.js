window.onload = function(){
	var pista = document.getElementById("pista");
	var ctx = pista.getContext("2d");
	var carroTam = 70;
	var pistaTam = 3;	
	var move = 140;
	var start = false;
	var obstaculos = [[0,0,1],[0,1,0],[1,0,0],[1,0,1],[0,1,0]];
	var obstaculoWidth = 30;
	var obstaculoHeight = 70;
	var rastro = [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]];
	var progressao = 0;
	var vel = 1;
	var pontos = -6;
	var pontosVel = 0;
	var posX;
	var posY;
	var areaX = [];
	var areaY = [];
	document.addEventListener("keydown", mover);
	/*
	1 0 0      0 0 1   0
	0 0 1      0 1 0   1
	0 1 0      0 0 1   2
	*/
	setInterval(function(){
		areaX = [];
		areaY = [];
		ctx.fillStyle = "green";
		ctx.fillRect(0,0,pista.width - 80,pista.height);

		ctx.fillStyle = "gray"; //200 -- 140 -- 80
		ctx.fillRect(pista.width - move - 80,pista.height - 70,carroTam-20,carroTam-20);

		if(pontos > 0){
			ctx.fillStyle = "white";
			ctx.fillRect(pista.width - 70,0,pista.width,pista.height);

			ctx.fillStyle = "blue";
			ctx.font = "30px Arial";
			ctx.fillText(pontos,pista.width - 70,50);
		}

		for(let i = pista.width - move-80; i < (pista.width - move -80 + carroTam -20);i++){
			areaX.push(i);
		}
		for(let i = pista.height - 70; i < (pista.height - 70 + carroTam-20) ;i++){
			areaY.push(i);
		}
		if(start){
			for(let i = 0;i < 7;i++){
				for(let j = 0; j < 3; j++){
					if(rastro[i][j] == 1){
						
						ctx.fillStyle = "brown";
						ctx.fillRect(pista.width - (80 + j * 60) - 60, (pista.height - i*180  + progressao ),obstaculoWidth-1,obstaculoHeight-1);
						
						posX = pista.width - (80 + j * 60) - 60;
						posY = pista.height - i*180  + progressao ;
						colisao();
					}
					
				}
			}
		}

		progressao+=vel;
		if(progressao > 180){
			gerarNovo();
			progressao = 0;
			if(start){
				pontos += 1;
			}
			if(pontos >= pontosVel + vel*20){
				vel++;
				pontosVel = pontos;
			}

		}
	},5);

	function colisao(){
		if(areaX.indexOf(posX) != -1 && areaY.indexOf(posY) != -1){
			alert("Perdeu!!!");
			window.location.href = window.location.href;
		}
		if(areaX.indexOf(posX) != -1 && areaY.indexOf(posY+70) != -1){
			alert("Perdeu!!!");
			window.location.href = window.location.href;
		}
	}

	function gerarNovo(){
		if(start){
			var num = Math.floor(Math.random()*5);
			if(rastro.length == 7){
				rastro.shift(0);
				rastro.push(obstaculos[num]);
			}else{
				rastro.push(obstaculos[num]);
			}
		}
	}

	function mover(event){
		start = true;
		switch(event.keyCode){
			case 37: //left
				if((move+60) <= 200){
					move += 60;
				}
				break;
			case 39: //right
				if((move-60) >= 80){
					move -= 60;
				}
				break;
		}

	}
}