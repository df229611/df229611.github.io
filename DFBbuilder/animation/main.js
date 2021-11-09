function main(WIDTH, HEIGHT, FRAME, MARGINLR, MARGINTB, FILENAME){

		let Width = WIDTH-FRAME*2-MARGINLR;
		let Height = HEIGHT-FRAME*2-MARGINTB;
		
		document.getElementById("screen").style.marginLeft= -(Width+FRAME*2)/2 +'px';
		document.getElementById("screen").style.marginTop= -(Height+FRAME*2)/2 +'px';

		let game = new Phaser.Game(Width, Height, Phaser.CANVAS, "screen",
			{preload:preload, create:create, update:update, render:render});

		function preload(){

			// Включаем FPS
			game.time.advancedTiming = true;
			// Устанавливаем шрифт
			SerifTextBig = {font:"40px serif", fill:"#ffffff", align:"center"};
			// Загружаем изображение в память x, y, frame
			game.load.spritesheet("sprite00", FILENAME+"/img/soul.png", 39, 44, 4);
			
		}

		function create(){

			// Устанавливаем цвет фона
			game.stage.backgroundColor = "#151515";

			// Загружаем спрайт в переменную
			animation00 = game.add.sprite(Width/2, Height/2, "sprite00");
			// Устанавливаем точку вращения
			animation00.anchor.setTo(0.5);
			// Устанавливаем масштаб спрайта
			animation00.scale.setTo(3);
			// Устанавливаем сглаживание
			animation00.smoothed = 0;
			// Устанаваливаем кадры анимации
			animation00.animations.add("frame00", [0, 1, 2, 3]);
			animation00.animations.play("frame00", 4, true);
		}

		function update(){

		}

		function render(){

			game.debug.text("FPS: "+game.time.fps, 10, 20);
		}

	document.getElementById('screen').style.display = "table";
	document.getElementById("filename").innerHTML = "";
}