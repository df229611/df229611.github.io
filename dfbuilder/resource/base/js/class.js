//https://phaser.io/docs/2.6.2/Phaser.Graphics.html

let cKey;
let qKey;
let wKey;
let eKey;
let rKey;

let upKey;
let downKey;
let leftKey;
let rightKey;
let spaceKey;
let enterKey;

let TILE_BLOCK = 80;
let TILE_RIGHT = 90;
let TILE_UP = 91;
let TILE_LEFT = 92;
let TILE_DOWN = 93;

let BLOCK_APPROXIMATION = 0.1;	//Приближение к блоку тайла
let COLLISION_SHOW = 1;			//Показать коллизии
let FLAG_CO = false;			//Проверять коллизию объектов
let FLAG_CB = true;				//Проверять коллизию блоков
let SHIFT_TILE = -1;

let CAnimationList = [];
let counterCAnimation = 0;

class CAnimation{

	constructor(idle, run, take){

		this.idle = idle;
		this.run = run;
		this.take = take;

		counterCAnimation++;
	}

	static Create(id, run, take){

		return new CAnimation(id, run, take);
	}
}

CAnimationList[0] = CAnimation.Create(	[3, 4, 5, 6],
										[29, 30, 31, 32, 33, 34, 35, 36],
										[16, 17, 18, 19, 20, 19, 18, 17, 16]
									);

CAnimationList[1] = CAnimation.Create(	[0, 1],
										[0, 1, 2, 3, 4, 5, 6, 7],
										[0, 1]
									);

CAnimationList[2] = CAnimation.Create(	[0, 1, 2, 3],
										[0, 1, 2, 3],
									);

const MAX_WAVE_X = 16;
const MAX_WAVE_Y = 16;
let CPlayerList = [];
let counterCPlayer = 0;
let PlayerId = 0;

class CMove{

	constructor(id, map_id, x, y, speed, direction, width, height, widthc, heightc, size){

		this.id = id;			//Индификатор движения
		this.map_id = map_id;
		this.x = x;			//Координаты x
		this.y = y;			//Координаты y
		this.mx = x;			//Направление mx к которой двигается объект по оси x
		this.my = y;			//Направление my к которой двигается объект по оси y
		this.cx = x;			/// Коллизия блока x
		this.cy = y;			/// Коллизия блока y
		this.direction = direction;	//Направление где 0 лево 2 право
		this.width = width;		//Ширина спрайта
		this.height = height;		//Высота спрайта
		this.widthc = widthc;		//Ширина коллизии
		this.heightc = heightc;		//Высота коллизии
		this.size = size;		//Размер изображения

		this.angle;			//Угол движения x y
		this.dx;			//Значение движения по x
		this.dy;			//Значение движения по y
		this.distance = 0;		//Дистанция между mx и x и my и y
		this.speed = speed;		//Скорость передвижения mx my
		this.speed_move = 0;		//Скорость движения (изменяется)
		this.checkCollide = true;	//Проверять на столкновения
		this.timer_animation = 0;
	}
}

class CPlayer extends CMove{

	constructor(id, map_id, skin, animation, x, y, speed, direction, width, height, shy, widthc, heightc, size){

		super(id, map_id, x*CMazeList[map_id].tile_width, y*CMazeList[map_id].tile_height, speed, direction, width, height, widthc, heightc, size);

		counterCPlayer++;

		this.shy = shy;
		
		this.skin = game.add.sprite(x, y, skin);

		this.animation = animation;

		if(CAnimationList[animation]){

			if(CAnimationList[animation].idle) this.skin.animations.add( 'idle', CAnimationList[animation].idle);
			if(CAnimationList[animation].run) this.skin.animations.add( 'run', CAnimationList[animation].run);
			if(CAnimationList[animation].take) this.skin.animations.add( 'take', CAnimationList[animation].take);
		}else{
			
			this.skin.animations.add( 'idle', [0, 1]);
		}

		this.skin.animations.play('idle', 2, true);

		this.skin.anchor.setTo(0.5, 0);

		if(direction==0){

			this.skin.scale.setTo(size, size);
		}else{

			this.skin.scale.setTo(-size, size);
		}
		
		this.skin.alpha = 1;
		this.skin.smoothed = 0;

		this.cross = game.add.sprite(x, y, "cross");
		this.cross.smoothed = 0;
		this.cross.anchor.setTo(0.5, 0.5);
		this.cross.x = x;
		this.cross.y = y;

		this.collision = new Phaser.Rectangle(x*CMazeList[map_id].tile_width, y*CMazeList[map_id].tile_height, widthc*size, heightc*size);
		this.collision_block = new Phaser.Rectangle(x*CMazeList[map_id].tile_width, y*CMazeList[map_id].tile_height, CMazeList[map_id].tile_width*size, CMazeList[map_id].tile_height*size);

	    this.pathx = 0;
	    this.pathy = 0;
	    this.savex = 0;
	    this.savey = 0;
	    this.pathupdate = 0;
	    this.map = [
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ]
	            ];
	}

	static Create(id, map_id, skin, animation, x, y, speed, direction, width, height, shy, widthc, heightc, size){

		return new CPlayer(id, map_id, skin, animation, x, y, speed, direction, width, height, shy, widthc, heightc, size);
	}

	static PlayerUpdate(id){

		if(CPlayerList[id].timer_animation>0){

			CPlayerList[id].timer_animation-=1;
		}
		
		let shd = 4;
		let shx = CMazeList[CPlayerList[id].map_id].tile_width/4;
		let shy = CPlayerList[id].height+CPlayerList[id].shy - CMazeList[CPlayerList[id].map_id].tile_height/shd;

		let distance = GetDistance(CPlayerList[id].skin.x, CPlayerList[id].skin.y + shy, CPlayerList[id].mx+shx, CPlayerList[id].my);
		CPlayerList[id].speed_move = CPlayerList[id].speed*distance*0.08;

		CPlayerList[id].angle = getAngle(CPlayerList[id].skin.x, CPlayerList[id].skin.y + shy, CPlayerList[id].mx+shx, CPlayerList[id].my);
		CPlayerList[id].dx = getDx(CPlayerList[id].speed_move, CPlayerList[id].angle);
		CPlayerList[id].dy = getDy(CPlayerList[id].speed_move, CPlayerList[id].angle);

		if(distance>1){

	        if(CPlayerList[id].mx+shx>CPlayerList[id].skin.x){

	            CPlayerList[id].skin.x+=CPlayerList[id].dx;
	            CPlayerList[id].direction = 0;
	        }

	        if(CPlayerList[id].mx+shx<CPlayerList[id].skin.x){

	            CPlayerList[id].skin.x+=CPlayerList[id].dx;
	            CPlayerList[id].direction = 2;
	        }

	        if(CPlayerList[id].my>CPlayerList[id].skin.y){

	            CPlayerList[id].skin.y+=CPlayerList[id].dy;
	        }

	        if(CPlayerList[id].my<CPlayerList[id].skin.y){

	            CPlayerList[id].skin.y+=CPlayerList[id].dy;
	        }

	        if(CPlayerList[id].direction==2){

				CPlayerList[id].skin.scale.setTo(-CPlayerList[id].size, CPlayerList[id].size);
			}else if(CPlayerList[id].direction==0){

				CPlayerList[id].skin.scale.setTo(CPlayerList[id].size, CPlayerList[id].size);
			}

			CPlayerList[id].cross.x=CPlayerList[id].skin.x;			
			CPlayerList[id].cross.y=CPlayerList[id].skin.y+CPlayerList[id].height+CPlayerList[id].shy;

		}else{

			CPlayerList[id].speed_move = 0;
		}
	}

	static PlayerCollision(id, dx, dy){
	    
	    /// Делаем шаг, для проверерки коллизий
    	let sx = CPlayerList[id].mx+CPlayerList[id].speed*dx;
    	let sy = CPlayerList[id].my+CPlayerList[id].speed*dy;

    	let shx = CMazeList[CPlayerList[id].map_id].tile_width/4;

		if(FLAG_CB){

			let tile = CMazeList[CPlayerList[id].map_id].map_tile[xy2i(Math.round(sx/CMazeList[CPlayerList[id].map_id].tile_width+dx*BLOCK_APPROXIMATION), Math.round(sy/CMazeList[CPlayerList[id].map_id].tile_height+dy*BLOCK_APPROXIMATION), CMazeList[CPlayerList[id].map_id].map_width)] + SHIFT_TILE;
			//--->
			if(tile==TILE_RIGHT){
				
				if(CMazeList[CPlayerList[id].map_id+1]){

					CPlayerList[id].map_id+=1;
					CMaze.updateMaze(CPlayerList[id].map_id);
				    
				    CPlayerList[id].mx=1*CMazeList[CPlayerList[id].map_id].tile_width;
					//CPlayerList[id].my=2*CMazeList[CPlayerList[id].map_id].tile_height;
					CPlayerList[id].collision.x = CPlayerList[id].mx;
					//CPlayerList[id].collision.y = CPlayerList[id].my;
					CPlayerList[id].skin.x=CPlayerList[id].mx+shx;
				}

				return true;
			}
			//<---
			if(tile==TILE_LEFT){

				if(CMazeList[CPlayerList[id].map_id-1]){

					CPlayerList[id].map_id-=1;
					CMaze.updateMaze(CPlayerList[id].map_id);
				    
				    CPlayerList[id].mx=(CMazeList[CPlayerList[id].map_id].map_width-2)*CMazeList[CPlayerList[id].map_id].tile_width;
					//CPlayerList[id].my=2*CMazeList[CPlayerList[id].map_id].tile_height;
					CPlayerList[id].collision.x = CPlayerList[id].mx;
					//CPlayerList[id].collision.y = CPlayerList[id].my;
					CPlayerList[id].skin.x=CPlayerList[id].mx+shx;
				}

				return true;
			}

	        if(tile>=TILE_BLOCK) return false;
		}

		let cx=Math.round(CPlayerList[id].mx/CMazeList[CPlayerList[id].map_id].tile_width)*CMazeList[CPlayerList[id].map_id].tile_width;
    	let cy=Math.round(CPlayerList[id].my/CMazeList[CPlayerList[id].map_id].tile_height)*CMazeList[CPlayerList[id].map_id].tile_height;
		
		CPlayerList[id].collision_block.x = cx-CMazeList[CPlayerList[id].map_id].tile_width/4;
		CPlayerList[id].collision_block.y = cy-CMazeList[CPlayerList[id].map_id].tile_height/4;

	    CPlayerList[id].mx=sx;
		CPlayerList[id].my=sy;
		
		CPlayerList[id].collision.x=sx;
		CPlayerList[id].collision.y=sy;

		if(FLAG_CO){

			for(let key in CPlayerList){

				if(CPlayerList[key].id == id) continue;
				if(!CPlayerList[key].checkCollide) continue;

				if(checkCollide(CPlayerList[id].collision.x, CPlayerList[id].collision.y, CPlayerList[id].widthc*CPlayerList[id].size, CPlayerList[id].heightc*CPlayerList[id].size, CPlayerList[key].collision.x, CPlayerList[key].collision.y, CPlayerList[key].widthc*CPlayerList[key].size, CPlayerList[key].heightc*CPlayerList[key].size)){

					CPlayerList[id].mx+=CPlayerList[id].speed*(-dx);
					CPlayerList[id].my+=CPlayerList[id].speed*(-dy);

					CPlayerList[id].collision.x=CPlayerList[id].mx;
					CPlayerList[id].collision.y=CPlayerList[id].my;

					return false;
				}
			}
		}

		if(CPlayerList[id].timer_animation<=0) CPlayerList[id].skin.animations.play('run', 10, true);

		return true;
	}

	static Idle(id){

		CPlayerList[id].skin.animations.play('idle', 2, true);
	}

	static createForCPlayer(){

		cKey = game.input.keyboard.addKey(Phaser.Keyboard.C);
		qKey = game.input.keyboard.addKey(Phaser.Keyboard.Q);
		wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
		eKey = game.input.keyboard.addKey(Phaser.Keyboard.E);
		rKey = game.input.keyboard.addKey(Phaser.Keyboard.R);

		upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
	}

	static updateForCPleyer(id){
		
		if(CPlayerList[id].timer_animation>0) return false;
		
		if(cKey.isDown){

			if(COLLISION_SHOW) COLLISION_SHOW=0; else COLLISION_SHOW=1;
			
			CPlayerList[PlayerId].timer_animation = 10;
			return true;
		}

		if(spaceKey.isDown){
			
			if(PlayerId < counterCPlayer){
				
				while(PlayerId < counterCPlayer){

					PlayerId++;

					if(CPlayerList[PlayerId]) break;
				}
				
				if(!CPlayerList[PlayerId]) PlayerId = 0;
				//if(CPlayerList[PlayerId].skin.visible) CPlayerList[PlayerId].skin.visible = false; else CPlayerList[PlayerId].skin.visible = true;

			}else{

				PlayerId = 0;
			}

			CPlayerList[PlayerId].timer_animation = 20;
			return true;
		}
		
		if(enterKey.isDown){

			if(CAnimationList[CPlayerList[id].animation].take) CPlayerList[id].skin.animations.play('take', 15, false);
			
			CPlayerList[id].timer_animation = 30;
			return true;
		}

	    if(upKey.isDown){

	    	CPlayer.PlayerCollision(id, 0, -1);
	    }else if(downKey.isDown){

	    	CPlayer.PlayerCollision(id, 0, +1);
	    }else if(leftKey.isDown){
	    	
	    	CPlayer.PlayerCollision(id, -1, 0);
	    }else if(rightKey.isDown){

	    	CPlayer.PlayerCollision(id, +1, 0);
	    }else{
			
			CPlayer.Idle(id);
	    }

	    return true;
	}

	static renderForCPleyer(id){

		if(COLLISION_SHOW){
		    for(let key in CPlayerList){

		    	//CPlayerList[key].skin.visible = false;

		    	game.debug.geom(CPlayerList[key].collision_block, "#ffffff", false);
		    	//game.debug.geom(CPlayerList[key].collision, "#ffffff", false);
		    }
		}
	}

	//Пускаем волну на карту
	static CPlayerWave(key, n){

		let flag = 0;
		for (let y = 1; y < MAX_WAVE_Y-1; y++) {
			for (let x = 1; x < MAX_WAVE_X-1; x++){

				if (CPlayerList[key].map[y][x] == n) {
					if (CPlayerList[key].map[y + 1][x] == 0) {

						CPlayerList[key].map[y + 1][x] = n + 1;
						flag = 1;
					}

					if (CPlayerList[key].map[y - 1][x] == 0) {

						CPlayerList[key].map[y - 1][x] = n + 1;
						flag = 1;
					}

					if (CPlayerList[key].map[y][x + 1] == 0) {

						CPlayerList[key].map[y][x + 1] = n + 1;
						flag = 1;
					}

					if (CPlayerList[key].map[y][x - 1] == 0) {

						CPlayerList[key].map[y][x - 1] = n + 1;
						flag = 1;
					}

				}
			}
		}

		return flag;
	}

	//Шаг по волне
	static CPlayerStep(key, x1, y1){

		if (CPlayerList[key].map[y1][x1] == 1) return 0;
		if (CPlayerList[key].map[y1][x1] == 0) return 0;

		//Движение по диагонали
		if (CPlayerList[key].map[y1 - 1][x1 - 1] < CPlayerList[key].map[y1][x1]) {

			CPlayerList[key].pathx--;
			CPlayerList[key].pathy--;
			return 1;
		}

		if (CPlayerList[key].map[y1 - 1][x1 + 1] < CPlayerList[key].map[y1][x1]) {

			CPlayerList[key].pathx++;
			CPlayerList[key].pathy--;
			return 1;
		}

		if (CPlayerList[key].map[y1 + 1][x1 + 1] < CPlayerList[key].map[y1][x1]) {

			CPlayerList[key].pathx++;
			CPlayerList[key].pathy++;
			return 1;
		}

		if (CPlayerList[key].map[y1 + 1][x1 - 1] < CPlayerList[key].map[y1][x1]) {

			CPlayerList[key].pathx--;
			CPlayerList[key].pathy++;
			return 1;
		}

		//Движение по горизонтали и вертикали
		if (CPlayerList[key].map[y1 + 1][x1] < CPlayerList[key].map[y1][x1]) {

			CPlayerList[key].pathy++;
			return 1;
		}

		if (CPlayerList[key].map[y1 - 1][x1] < CPlayerList[key].map[y1][x1]) {

			CPlayerList[key].pathy--;
			return 1;
		}

		if (CPlayerList[key].map[y1][x1 + 1] < CPlayerList[key].map[y1][x1]) {

			CPlayerList[key].pathx++;
			return 1;
		}

		CPlayerList[key].pathx--;

		return 1;
	}

	//Загружаем карту волны
	static CPlayerWaveMapLoad(key){

		for (var y = 0; y < MAX_WAVE_Y; y++) {

			for (var x = 0; x < MAX_WAVE_X; x++) {

				CPlayerList[key].map[y][x] = xy2i(x, y, CMazeList[CPlayerList[key].map_id].map_width);
			}
		}

		return true;
	}

	//Удаление игрока по ключу
	static CPlayerRemoveKey(key){

		skin.remove(CPlayerList[key].skin, true);    
		CPlayerList[key].skin.destroy();
		delete CPlayerList[key];
	}

	//Удаление всех игроков
	static AllPlayerRemove(){

		for (var key in CPlayerList){
			
			skin.remove(CPlayerList[key].skin, true); 
			CPlayerList[key].skin();
			delete CPlayerList[key];
		}
	}

	//Поис игрока по ID
	static PlayerSerchId(id){

		for (var key in CPlayerList){

			if (id == CPlayerList[key].id) return true;
		}

		return false;
	}
}


let CImgList = [];
let counterCImg = 0;


class CImg{

    constructor(id, img, frame, x, y, size){

		this.id = id;
		this.img = game.add.sprite(x, y, img);
		this.img.frame = frame;
		this.img.scale.setTo(size);
		this.img.smoothed = 0;

		counterCImg++;
    }

    static Create(id, img, frame, x, y, size){

        return new CImg(id, img, frame, x, y, size);
    }

}

/// Конвертируем карту в тайловый индекс координат
function xy2i(x, y, mapWidth){

    return y*mapWidth + x;
}

let CTileList = [];
let counterCTile = 0;

class CTile{

    constructor(id, img, tile, x, y, size){

		this.id = id;
		this.img = game.add.sprite(x, y, img);
		this.img.frame = tile;
		this.img.scale.setTo(size);
		this.img.smoothed = 0;

		counterCTile++;
    }

    static Create(id, img, tile, x, y, size){

        return new CTile(id, img, tile, x, y, size);
    }

	static setTile(id, tile){
		
		CTileList[id].img.frame = tile;
        return true;
    }
}


let CMazeList = [];
let counterCMap = 0;

class CMaze{

	constructor(id, tilesheet, color, width, height, tile_width, tile_height){

		this.id = id;                 		//Идентификационный номер игрока
		this.tilesheet = tilesheet;			//Картинка
		this.backgroundcolor = color;		//Цвет фона
		this.map_width = width;				//Ширина
		this.map_height = height;			//Высота
		this.tile_width = tile_width;		//Ширина тайла
		this.tile_height = tile_height;		//Высота тайла
		
		this.map_tile = [];					//Карта тайлов
		this.map_obj   = [];           		//Карта объектов
		this.map_collision   = [];			//Карта коллизий

		/*
		this.respawnx = [];           	//Точка респауна по икс
		this.respawny = [];           	//Точка респауна по игрек
		this.scriptx = 0;             	//появление скрипта по икс
		this.scripty = 0;             	//появление скрипта по игрек
		this.startscript = 0;         	//скрипт выполнения
		this.countscriptpoint = 0;    	//Счетчик выполненных сценарных точек
		this.maxcountscriptpoint =0;  	//Максимальное колчиство требуемых к выполнению скриптов в локации
		this.CDoorTeleportList = [];  	//Список дверей телепортов
		this.CDoorTeleportCounter = 0;	//Счетчик дверей телепорта
		*/
		counterCMap++;
	}

	static Create(id, tilesheet, color, width, height, tile_width, tile_height){

        return new CMaze(id, tilesheet, color, width, height, tile_width, tile_height);
    }

    static createMaze(id){

    	if(!CMazeList[id]) return false;

		for (let y = 0; y<CMazeList[id].map_height; y++){
			for (let x = 0; x<CMazeList[id].map_width; x++){
				
    			CTileList[counterCTile] = CTile.Create(counterCTile, CMazeList[id].tilesheet, 0, x*CMazeList[id].tile_width-CMazeList[id].tile_width/4, y*CMazeList[id].tile_height-CMazeList[id].tile_height/4, 1);
			}
		}
		
		CMaze.updateMaze(id);
		
		return true;
    }

	static updateMaze(id){

    	if(!CMazeList[id]) return false;

		let tile;
		let key = 0;

		for (let y = 0; y<CMazeList[id].map_height; y++){
			for (let x = 0; x<CMazeList[id].map_width; x++){

				tile = CMazeList[id].map_tile[xy2i(x, y, CMazeList[id].map_width)] + SHIFT_TILE;
				CTile.setTile(key, tile);
				key++;
			}
		}

		return true;
    }

}
