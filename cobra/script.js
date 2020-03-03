window.onload = function(){
	var stage = document.getElementById('stage');
	var ctx = stage.getContext("2d");
	var fps = 90;
	const vel = 1; // velocidade
	var velX = velY = 0; // movimento
	var posX = posY = 10; // posição
	var tam = 20; // tamanho peca
	var quantPecas = 20; // tabuleiro
	var itemPosX = itemPosY = 15; // posicao item
	var rastro = [];
	var tail = 5; //cauda
	var pontos = 0; // pontuação
	document.addEventListener("keydown",keyPush)
	game(fps);


	function game(fps){
		//atualizando posiçao
		posX += velX;
		posY += velY;

		if(posX < 0 || posX > quantPecas -1 || posY < 0 || posY > quantPecas -1){
			setTimeout(function(){
				rastro = [];
				posX = posY = 10;
				velX = velY = 0;
				fps = 90;
				tail = 5;
				pontos = 0;
			},100)
		}
		
 		// desenhando o jogo 
		ctx.fillStyle = "#000";
		ctx.fillRect(0,0,stage.width - 100,stage.height);

		ctx.fillStyle = "white";
		ctx.fillRect(stage.width - 100, 0, stage.width,stage.height)

		ctx.fillStyle = "red";
		ctx.font = "50px Arial ";
		ctx.fillText(pontos, stage.width - 80, 50)

		ctx.fillStyle = "red";
		ctx.fillRect(itemPosX * tam ,itemPosY*tam, tam,tam);

		ctx.fillStyle = "gray";

		for (var i = 0; i < rastro.length; i++) {
			ctx.fillRect(rastro[i].x * tam,rastro[i].y * tam,tam-1,tam-1 )
			if(rastro[i].x == posX && rastro[i].y == posY){
				velX = velY = 0;
				fps = 90;
				tail = 5;
				pontos = 0;
			}
		}

		rastro.push({x: posX, y:posY})
		while(rastro.length > tail){
			rastro.shift()
		}

		if(posX == itemPosX && posY == itemPosY){
			pontos++;
			tail++;
			while (true){
				itemPosY = Math.floor(Math.random()*tam);
				itemPosX = Math.floor(Math.random()*tam);
				for (var i = 0; i < rastro.length; i++) {
					if(rastro[i].x == itemPosX && rastro[i].y == itemPosY){
						itemPosY = Math.floor(Math.random()*tam);
						itemPosX = Math.floor(Math.random()*tam);
						continue;
					}
				}
				break;

			}

			if(fps > 30){
				//fps -= 5;
			}
		}
		setTimeout(function(){
			game(fps);
		}, fps)

	}

	function keyPush(event){
		switch(event.keyCode){
			case 37: // left
				if(velX != vel){
					velX = -vel;
					velY = 0;
				}
				break;
			case 38: //up
				if(velY != vel){
					velX = 0;
					velY = -vel;
				}
				break;
			case 39: //right
				if(velX != -vel){
					velX = vel;
					velY = 0;
				}
				break;
			case 40: // down
				if(velY != -vel){
					velX = 0;
					velY = vel;
				}
				break;
		}
	}









}






