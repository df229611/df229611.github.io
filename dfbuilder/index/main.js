class CPlayer{

	constructor(id, x, y, speed, width, height, size){
		
		this.id = id;
		this.width = width;									//Высота коллизии игрока
		this.height = height;								//Ширина коллизии игрока
		this.size = size;									//Размер игрока
		this.speed = speed;									//Скорость перемещения игрока
		this.speedr = speed;								//Скорость сохранения перемещения игрока
		this.mx = x;										//Точка следования по x
    	this.my = y;										//Точка следования по y
		this.direction;										//Направление игрока
		this.rectangle = new Phaser.Rectangle(x, y, width, height);
	}

	static Create(id, x, y, speed, width, height, size){

		return new CPlayer(id, x, y, speed, width, height, size);
	}

	static MoveXY(id, dx, dy){
		
		CPlayerList[id].rectangle.x+=CPlayerList[id].speed*dx;
		CPlayerList[id].rectangle.y+=CPlayerList[id].speed*dy;
/*
		CPlayerList[id].skin.animations.play('run', 10, true);
		for(let key in CPlayerList){
			if(CPlayerList[key].id == id) continue;
			if(checkCollide(CPlayerList[id].skin.x-CPlayerList[id].width/2, CPlayerList[id].skin.y-CPlayerList[id].height/2, CPlayerList[id].width*CPlayerList[id].size, CPlayerList[id].height*CPlayerList[id].size, CPlayerList[key].skin.x-CPlayerList[key].width/2, CPlayerList[key].skin.y-CPlayerList[key].height/2, CPlayerList[key].width*CPlayerList[key].size, CPlayerList[key].height*CPlayerList[key].size)){

				CPlayerList[id].skin.x+=CPlayerList[id].speed*(-dx);
				CPlayerList[id].skin.y+=CPlayerList[id].speed*(-dy);
			}
		}
*/
	}

}

var CPlayerList = [];
var PlayerId = 0;

function main(WIDTH, HEIGHT, FRAME_SIZE, MARGINLR, MARGINTB, FILENAME) {

		let Width = WIDTH-FRAME_SIZE*2-MARGINLR;
		let Height = HEIGHT-FRAME_SIZE*2-MARGINTB;
		
		document.getElementById("screen").style.marginLeft= -(Width+FRAME_SIZE*2)/2 +'px';
		document.getElementById("screen").style.marginTop= -(Height+FRAME_SIZE*2)/2 +'px';

		let game = new Phaser.Game(Width, Height, Phaser.CANVAS, "screen",
			{preload:preload, create:create, update:update, render:render});

		function preload() {
			
			// Включаем FPS
			game.time.advancedTiming = true;
			// Устанавливаем шрифт
			SerifTextBig = {font:"12px serif", fill:"#ffffff", align:"center"};
			// Загружаем изображение в память x, y, frame
			game.load.spritesheet("sprite00", FILENAME+"/img/soul.png", 39, 44, 4);
			
		}

		function create() {

			// Устанавливаем цвет фона
			game.stage.backgroundColor = "#151515";

			//Установка кнопок
			n1Key		= game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_1);
			n2Key		= game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_2);
			n3Key		= game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_3);
			n4Key		= game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_4);
			n5Key		= game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_5);
			n6Key		= game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_6);
			n7Key		= game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_7);
			n8Key		= game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_8);
			n9Key		= game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_9);

			upKey		= game.input.keyboard.addKey(Phaser.Keyboard.UP);
			downKey		= game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
			leftKey		= game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
			rightKey	= game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
			spaceKey	= game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			
			Rectangle = new Phaser.Rectangle(0, 0, Width, Height);
			
			game.add.text(Width/2, 85, "HELLO WORLD!", SerifTextBig).anchor.setTo(0.5);

			// Загружаем спрайт в переменную
			animation00 = game.add.sprite(Width/2, Height/2, "sprite00");
			// Устанавливаем точку вращения
			animation00.anchor.setTo(0.5);
			// Устанавливаем масштаб спрайта
			animation00.scale.setTo(1);
			// Устанавливаем сглаживание
			animation00.smoothed = 0;
			// Устанаваливаем кадры анимации
			animation00.animations.add("frame00", [0, 1, 2, 3]);
			animation00.animations.play("frame00", 4, true);
			
			game.world.setBounds(0, 0, 250, 250);
			
			game.input.onTap.add(function(pointer, isDoubleClick){

				if(isDoubleClick){

					alert("OK");
				}
			});

			//Создаём игрока
			CPlayerList[PlayerId] = CPlayer.Create(PlayerId, 10, 10, 3, 20, 20, 3);
			//CPlayerList[1] = CPlayer.Create(1, 0, 100, 3, 20, 20, 3);
		}

		function update() {

			// Управление размера экрана
			if(n1Key.isDown) sizeBody(1,1,1);
			if(n2Key.isDown) sizeBody(2,2,1);
			if(n3Key.isDown) sizeBody(3,3,1);
			if(n4Key.isDown) sizeBody(4,4,1);
			if(n5Key.isDown) sizeBody(5,5,1);
			if(n6Key.isDown) sizeBody(6,6,1);
			if(n7Key.isDown) sizeBody(7,7,1);
			if(n8Key.isDown) sizeBody(8,8,1);
			if(n9Key.isDown) sizeBody(9,9,1);

			// Уравление игроком
			if(upKey.isDown){

				CPlayer.MoveXY(PlayerId, 0, -1);
			}else if(downKey.isDown){

				CPlayer.MoveXY(PlayerId, 0, +1);
			}else if(leftKey.isDown){

				CPlayer.MoveXY(PlayerId, -1, 0);
			}else if(rightKey.isDown){

				CPlayer.MoveXY(PlayerId, +1, 0);
			}else{

				// Игрок стоит	
			}
		}

		function render() {

			game.debug.text("FPS: "+game.time.fps, 10, 20);
			game.debug.geom(Rectangle, "#ffffff", false);
			
			// Перебираем все элементы класса игрок			
			for(let key in CPlayerList){
				game.debug.geom(CPlayerList[key].rectangle, "#ffffff", false);
			}
		}

	document.getElementById('screen').style.display = "table";
	document.getElementById("filename").innerHTML = "";
}




/*
	// Доступный размер экрана — это ширина и высота активного экрана без панели инструментов операционной системы.
	const screenWidth = window.screen.width
	const screenHeight = window.screen.height
	
	// Пполучения доступного размера экрана - это ширина и высота активного экрана без панели инструментов операционной системы.
	const availableScreenWidth = window.screen.availWidth;
	const availableScreenHeight = window.screen.availHeight;

	//Размер внешнего окна — это ширина и высота текущего окна браузера, включая адресную строку, панель вкладок и другие панели браузера.
	const windowOuterWidth = window.outerWidth;
	const windowOuterHeight = window.outerHeight;
	
	// Внутренний размер окна — это ширина и высота области просмотра (вьюпорта).
	const windowInnerWidth = window.innerWidth;
	const windowInnerHeight = window.innerHeight;
	
	// Если мы хотим получить внутренний размер окна без полос прокрутки, то делаем следующее:
	const windowClientWidth = document.documentElement.clientWidth;
	const windowClientHeight = document.documentElement.clientHeight;

	// Размер веб-страницы — это ширина и высота отображаемого содержимого (отрендеренного контента).
	const pageWidth = document.documentElement.scrollWidth;
	const pageHeight = document.documentElement.scrollHeight;

	let size = 1;
	for(let i=size; i<10; i++){

		//if(Width*i<screenWidth && Height*i<screenHeight) size = i;
		//if(Width*i<availableScreenWidth && Height*i<availableScreenHeight) size = i;
		//if(Width*i<windowOuterWidth && Height*i<windowOuterHeight) size = i;
		if(WIDTH*i<windowInnerWidth && HEIGHT*i<windowInnerHeight) size = i;
		//if(WIDTH*i<windowClientWidth && HEIGHT*i<windowClientHeight) size = i;
		//if(Width*i<pageWidth && Height*i<pageHeight) size = i;
	}
	
	if(size>1){
	
		document.body.style.setProperty("-o-transform", "scale("+size+","+size+")");
		document.body.style.setProperty("-ms-transform", "scale("+size+","+size+")");
		document.body.style.setProperty("-moz-transform", "scale("+size+","+size+")");
		document.body.style.setProperty("-webkit-transform", "scale("+size+","+size+")");
		document.body.style.setProperty("transform", "scale("+size+", "+size+")");
	}
*/