
window.onload = function(){
	var toques = 0;
	var campo = document.getElementById("campo");
	var ctx = campo.getContext("2d");
	var teclas = [];
	var velMov  = 8;
	var start = false;
	var player1 = {
		tamx : 20,
		tamy : 70,
		posx : 10,
		posy : campo.height / 2 - 35,
		colisaoLocal : [],
	}
	var player2 = {
		tamx : 20,
		tamy : 70,
		posx : campo.width - 30,
		posy : campo.height / 2 - 35,
		colisaoLocal: [],
	}
	var bola = {
		tamx : 20,
		tamy : 20,
		posx : campo.width / 2 - 10,
		posy : campo.height / 2 - 10,
		direcao :  Math.floor(Math.random()*14),
		vel: 4,
		colisaoDir: [],
		colisaoEsq: [],
	}

	setInterval(play,1000/60);
	
	document.addEventListener("keydown",function(e){
		teclas[e.keyCode] = true;
		start = true;
	});

	document.addEventListener("keyup",function(e){
		delete teclas[e.keyCode];
	});

	function play(){
		ctx.clearRect(0,0,campo.width,campo.height);

		ctx.fillStyle = "black";
		ctx.fillRect(0,0,campo.width,campo.height);
		move();
		// PLayer 1
		ctx.fillStyle = "white";
		ctx.fillRect(player1.posx, player1.posy, player1.tamx, player1.tamy);
		// Player 2
		ctx.fillStyle = "white";
		ctx.fillRect(player2.posx, player2.posy, player2.tamx, player2.tamy);
		// Bola
		if(start){
			ctx.fillStyle = "white";
			moveBola();
			atualizarColisoes();
			detectarColisao();
			
			ctx.fillRect(bola.posx, bola.posy, bola.tamx, bola.tamy);
		}else{
			ctx.fillStyle = "white";
			ctx.fillRect(bola.posx, bola.posy, bola.tamx, bola.tamy);
		}

	}

	function move(){
		if(87 in teclas && player1.posy > 10){ /// up player 1
			player1.posy -= velMov;
		}
		if(83 in teclas && player1.posy < campo.height - 10 - player2.tamy){ /// down player 1
			player1.posy += velMov;
		}
		if(38 in teclas && player2.posy > 10){ /// up player 2
			player2.posy -= velMov;
		}
		if(40 in teclas && player2.posy < campo.height - 10 - player2.tamy){ /// down player 2
			player2.posy += velMov;
		}

	}

	function atualizarColisoes(){
		player1.colisaoLocal = [];
		player2.colisaoLocal = [];
		bola.colisaoDir = [];
		bola.colisaoEsq = [];

		for(let i = bola.posy; i < bola.posy + bola.tamy; i++){
			bola.colisaoDir.push(i + bola.tamy);
			bola.colisaoEsq.push(i);
		}
		for (let i = player1.posy; i < player1.posy + player1.tamy; i++){
			player1.colisaoLocal.push(i);
		}
		for (let i = player2.posy; i < player2.posy + player2.tamy; i++){
			player2.colisaoLocal.push(i);
		}

	}

	function detectarColisao(){
		let aleatorio = Math.floor(Math.random()*3);
		let localImpacto1 = player1.colisaoLocal.indexOf(bola.posy + 10);
		let localImpacto2 = player2.colisaoLocal.indexOf(bola.posy + 10);

		if(bola.posx <= player1.posx + 20){
			if(player1.colisaoLocal.indexOf(bola.posy) != -1 || player1.colisaoLocal.indexOf(bola.posy+20) != -1){
				toques++;
				if(localImpacto1 >= 0 && localImpacto1 < 10){
					bola.direcao = 4;
				}else if(localImpacto1 >= 10 && localImpacto1 < 20){
					bola.direcao = 5;
				}else if(localImpacto1 >= 20 && localImpacto1 < 30){
					bola.direcao = 6;
				}else if(localImpacto1 >= 30 && localImpacto1 < 40){
					switch(aleatorio){
						case 0:
							bola.direcao = 7;
						case 1:
							bola.direcao = 6;
						case 2:
							bola.direcao = 8;
					}
				}else if(localImpacto1 >= 40 && localImpacto1 < 50){
					bola.direcao = 8;
				}else if(localImpacto1 >= 50 && localImpacto1 < 60){
					bola.direcao = 9;
				}else if(localImpacto1 >= 60 && localImpacto1 < 70){
					bola.direcao = 10;
				}
			}
		}else if(bola.posx >= player2.posx - 20){
			if(player2.colisaoLocal.indexOf(bola.posy) != -1 || player2.colisaoLocal.indexOf(bola.posy+20) != -1){
				toques++;
				if(localImpacto2 >= 0 && localImpacto2 < 10){
					bola.direcao = 3;
				}else if(localImpacto2 >= 10 && localImpacto2 < 20){
					bola.direcao = 2;
				}else if(localImpacto2 >= 20 && localImpacto2 < 30){
					bola.direcao = 1;
				}else if(localImpacto2 >= 30 && localImpacto2 < 40){
					switch(aleatorio){
						case 0:
							bola.direcao = 0;
						case 1:
							bola.direcao = 1;
						case 2:
							bola.direcao = 13;
					}
				}else if(localImpacto2 >= 40 && localImpacto2 < 50){
					bola.direcao = 13;
				}else if(localImpacto2 >= 50 && localImpacto2 < 60){
					bola.direcao = 12;
				}else if(localImpacto2 >= 60 && localImpacto2 < 70){
					bola.direcao = 11;
				}
			}
		}
		if(toques > 12){
			bola.vel += 2;
			toques = 0;
		}
	}

	function reiniciar(player){
		//alert("Vitoria do jogador "+player);
		window.location.href = location.href;
	}

	function moveBola(){
		switch(bola.direcao){
			case 0: // Direita
				if(bola.posx - bola.vel <= 0){
					reiniciar(2);
					// PERDEU
				}else{
					bola.posx -= bola.vel;
				}
				break;
				
			case 1:
				if(bola.posy - bola.vel/2 <= 0){
					bola.direcao = 13;
				}else if(bola.posx - bola.vel <= 0){
					reiniciar(2);
					// PERDEU
				}else{
					bola.posx -= bola.vel;
					bola.posy -= bola.vel/2;
				}
				break;
			case 2:
				if(bola.posy - bola.vel <= 0){
					bola.direcao = 12;
				}else if(bola.posx - bola.vel <= 0){
					reiniciar(2);					
					// PERDEU
				}else{
					bola.posx -= bola.vel;
					bola.posy -= bola.vel;
				}
				break;
			case 3:
				if(bola.posy - bola.vel <= 0){
					bola.direcao = 11;
				}else if(bola.posx - bola.vel <= 0){
					reiniciar(2);					
					// PERDEU
				}else{
					bola.posx -= bola.vel/2;
					bola.posy -= bola.vel;
				}
				break;
			case 4:
				if(bola.posy - bola.vel <= 0){
					bola.direcao = 10;
				}else if(bola.posx + bola.vel/2 > campo.width - 20){
					reiniciar(2);					
					// PERDEU
				}else{
					bola.posx += bola.vel/2;
					bola.posy -= bola.vel;
				}
				break;
			case 5:
				if(bola.posy - bola.vel <= 0){
					bola.direcao = 9;
				}else if(bola.posx + bola.vel > campo.width - 20){
					reiniciar(1);					
					// PERDEU
				}else{
					bola.posx += bola.vel;
					bola.posy -= bola.vel;
				}
				break;
			case 6:
				if(bola.posy - bola.vel/2 <= 0){
					bola.direcao = 8;
				}else if(bola.posx + bola.vel > campo.width - 20){
					reiniciar(1);					
					// PERDEU
				}else{
					bola.posx += bola.vel;
					bola.posy -= bola.vel/2;
				}
				break;
			case 7: // Esquerda
				if(bola.posx + bola.vel > campo.width - 20){
					reiniciar(1);					
					//PERDEU 
				}else{
					bola.posx += bola.vel;
				}
				break;
			case 8: 
				if(bola.posy + bola.vel/2 > campo.height - 20){
					bola.direcao = 6;
				}else if(bola.posx + bola.vel > campo.width - 20){
					reiniciar(1);					
					//PERDEU 
				}else{
					bola.posx += bola.vel;
					bola.posy += bola.vel/2;
				}
				break;
			case 9:
				if(bola.posy + bola.vel > campo.height - 20){
					bola.direcao = 5;
				}else if(bola.posx + bola.vel > campo.width - 20){
					reiniciar(1);					
					//PERDEU 
				}else{
					bola.posx += bola.vel;
					bola.posy += bola.vel;
				}
				break;
			case 10:
				if(bola.posy + bola.vel > campo.height - 20){
					bola.direcao = 4;
				}else if(bola.posx + bola.vel/2 > campo.width - 20){
					reiniciar(1);					
					//PERDEU 
				}else{
					bola.posx += bola.vel/2;
					bola.posy += bola.vel;
				}
				break;
			case 11:
				if(bola.posy + bola.vel > campo.height - 20){
					bola.direcao = 3;
				}else if(bola.posx - bola.vel/2 <= 0){
					reiniciar(2);					
					//PERDEU 
				}else{
					bola.posx -= bola.vel/2;
					bola.posy += bola.vel;
				}
				break;
			case 12:
				if(bola.posy + bola.vel > campo.height - 20){
					bola.direcao = 2;
				}else if(bola.posx - bola.vel <= 0){
					reiniciar(2);					
					//PERDEU 
				}else{
					bola.posx -= bola.vel;
					bola.posy += bola.vel;
				}
				break;
			case 13:
				if(bola.posy + bola.vel > campo.height - 20){
					bola.direcao = 1;
				}else if(bola.posx - bola.vel/2 <= 0){
					reiniciar(2);					
					//PERDEU 
				}else{
					bola.posx -= bola.vel/2;
					bola.posy += bola.vel;
				}
				break;
		}
	}
}