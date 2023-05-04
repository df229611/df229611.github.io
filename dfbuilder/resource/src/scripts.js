//Генерируем целое число от минимального до максимального числа
function getRandomInt(min, max) {

	return Math.floor(Math.random() * (max - min)) + min;
}

//Расстояние от точки A до точки B
function GetDistance(x1, y1, x2, y2) {

	var xdiff = x2 - x1;
	var ydiff = y2 - y1;

	return Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5);
}

//Угол между двумя точками
function getAngle(x1, y1, x2, y2){
	
	return Math.atan2(y2-y1, x2-x1);
}

//DX
function getDx(speed, angle){

	return speed*Math.cos(-angle);
}

//DY
function getDy(speed, angle){

	return speed*-Math.sin(-angle);
}

//Определяем столкновение двух прямоугольников
function checkCollide(x, y, oWidth, oHeight, xTwo, yTwo, oTwoWidth, oTwoHeight) {

    // AABB 1
    let x1Min = x;
    let x1Max = x+oWidth;
    let y1Max = y+oHeight;
    let y1Min = y;

    // AABB 2
    let x2Min = xTwo;
    let x2Max = xTwo+oTwoWidth;
    let y2Max = yTwo+oTwoHeight;
    let y2Min = yTwo;

    // Collision tests
    if( x1Max < x2Min || x1Min > x2Max ) return false;
    if( y1Max < y2Min || y1Min > y2Max ) return false;

    return true;
}

// Получить имя текущего файла html
function getCurentFileName() {

    var pagePathName= window.location.pathname;
    return pagePathName.substring(pagePathName.lastIndexOf("/") + 1);
}

//Полноэкранный режим
function toggleFullScreen() {

	  if (!document.fullscreenElement &&    // alternative standard method
	      !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods

    	if (document.documentElement.requestFullscreen) {

      		document.documentElement.requestFullscreen();

    	} else if (document.documentElement.mozRequestFullScreen) {

      		document.documentElement.mozRequestFullScreen();

    	} else if (document.documentElement.webkitRequestFullscreen) {

      		document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    	}
  	}
}

//Запрещаем контекстное меню
function disableContextMenu(e) {

	var clickedEl = (e==null) ? event.srcElement.tagName : e.target.tagName;
	if (clickedEl == "CANVAS") {
		
		//alert("Context menu disabled.");
		return false;
	}
}

// Функция добавления скриптов 
function addScript(src){

	var script = document.createElement('script');
	script.src = src;
	script.async = false; // чтобы гарантировать порядок
	document.head.appendChild(script);
}

// Включить выключить скан линий
function scanLines(scanlines){

	if(scanlines){

		document.getElementById("scanlines").className = "scanlines";
	}else{
		
		document.getElementById("scanlines").className = "";
	}
}

// Включить выключить полный экран
function fullScreen(fullscreen){

	if(!fullscreen){

		document.getElementById("screen").onmousedown = null;
	}
}

function readFile(object) {

	console.log(object.files);
	var file = object.files[0]
	var reader = new FileReader()

	// name – имя файла,
	// lastModified – таймстамп для даты последнего изменения.
	// size – размер файла.

	// Преобразуем в понятную дату и время 
	let modiDate = new Date(file.lastModified);
	let showAs = modiDate.getDate() + "-" + (modiDate.getMonth() + 1) + "-" + modiDate.getFullYear();
	let showTime = modiDate.getHours() + ":" + modiDate.getMinutes();
	console.log(showAs);
	
	document.getElementById('out').innerHTML = "<br>";
	document.getElementById('out').innerHTML += "name: " + file.name + "<br>";
	document.getElementById('out').innerHTML += "data: " + showAs + ", " + showTime + " <br>";
	document.getElementById('out').innerHTML += "size: " + file.size + "<br>";
	document.getElementById('out').innerHTML += "<br>";

	reader.onload = function() {

		document.getElementById('out').innerHTML+= reader.result;
	}
	reader.readAsText(file, "UTF-8");
}

// Чтение документа по url
function readXMLHttp(URL, OUT){

	var txt = '';
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){

		if(xmlhttp.status==200 && xmlhttp.readyState==4){

	    	txt = xmlhttp.responseText;
			document.getElementById(OUT).innerHTML = txt.replaceAll("world", '');
			return xmlhttp.responseText;
		}
	}

	xmlhttp.open("GET", URL, true);
	xmlhttp.send();
}

// Функция вызова после того как браузер полностью загрузил HTML-код страницы и построил дерево DOM.
function DOMContentLoaded(WIDTH, HEIGHT, FRAME_IMG, FRAME_SIZE, SIZE, FILENAME) {
	
	//Запрещаем контекстное меню
	document.oncontextmenu = disableContextMenu;
	
	// HEADER
	//let elem_header = document.getElementById("header");
	//elem_header.innerHTML = 'Ok';
	// FOOTER
	//let elem_footer = document.getElementById("footer");
	//elem_footer.innerHTML = 'Ok';

	let clientWidth=document.body.clientWidth;		//Ширина области браузера
	let clientHeight=document.body.clientHeight;		//Высота области браузера
	let MarginLR = clientWidth/16;				// Отступы слева справа
	let MarginTB = clientHeight/10;				// Отступы сверху снизу

	// Определяем устройство
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
		
		// Вы используете мобильное устройство (телефон или планшет)

		if (navigator.userAgent.search(/Safari/) < -1) {

		    document.getElementById('screen').style.border = FRAME_SIZE+'px solid #000000';
			document.getElementById('screen').style.borderImage = 'url(../resource/img/'+FRAME_IMG+') '+FRAME_SIZE+' round round';
		};

	}else{
	  	// Вы используете компьютер

	    document.getElementById('screen').style.border = FRAME_SIZE+'px solid #000000';
	    document.getElementById('screen').style.borderImage = 'url(../resource/img/'+FRAME_IMG+') '+FRAME_SIZE+' round round';
	}
	
	// Ширина
	if(WIDTH>=100){
		
		clientWidth = WIDTH;
		MarginLR = 0;
	}else{
		
		if(clientWidth>=500){

		}else{

			clientWidth = 450;
			MarginLR = 0;
		}
	}

	// Высота
	if(HEIGHT>=100){
		
		clientHeight = HEIGHT;
		MarginTB = 0;
	}else{
		
		if(clientHeight>=500){


		}else{

			clientHeight = 350;
			MarginTB = 0;
		}
	}
	
	sizeBody(SIZE, SIZE, 1);
	
	// Запускаем игру
	setTimeout(main, 10, clientWidth, clientHeight, FRAME_SIZE, MarginLR, MarginTB, FILENAME);
}

// Изменяем размер тела документа
function sizeBody(width, height, template){
	
	if(template<2){

		document.body.style.setProperty("-o-transform", "scale("+width+","+width+")");
		document.body.style.setProperty("-ms-transform", "scale("+width+","+width+")");
		document.body.style.setProperty("-moz-transform", "scale("+width+","+size+")");
		document.body.style.setProperty("-webkit-transform", "scale("+width+","+width+")");
		document.body.style.setProperty("transform", "scale("+width+", "+width+")");
	}else{

		document.body.style.setProperty("-o-transform", "scale("+width+","+height+")");
		document.body.style.setProperty("-ms-transform", "scale("+width+","+height+")");
		document.body.style.setProperty("-moz-transform", "scale("+width+","+height+")");
		document.body.style.setProperty("-webkit-transform", "scale("+width+","+height+")");
		document.body.style.setProperty("transform", "scale("+width+", "+height+")");

	}
}

// Определяем изменился ли размер экрана, если да тогда меняем размер тела документа
function res(width, height, innerWidth, innerHeight, maxsize, template, timeout, validation) {

	if((innerWidth == window.innerWidth) && (innerHeight == window.innerHeight)) {
  		
  		if(validation) {

			let size = 1;
			let sizeY = 1; 

			if(!template){

				for(let i=size; i<maxsize+1; i++){

					if(width*i*0.5<window.innerWidth && height*i*0.5<window.innerHeight) size = i*0.5; else break;
				}

			}else if(template==1){

				for(let i=size; i<maxsize+1; i++){

					if(width*i<window.innerWidth && height*i<window.innerHeight) size = i; else break;
				}				
			}else if(template==2){

				for(let i=size; i<maxsize+1; i++){

					if(width*i*0.92<window.innerWidth && height*i*0.92<window.innerHeight){

						size = i;
						sizeY = size;

					}else break;
				}	
			}else if(template==3){

				for(let i=size; i<maxsize+1; i++){

					if(width*i*0.5<window.innerWidth && height*i*0.5<window.innerHeight){

						size = i*0.5;
						sizeY = size;

					}else break;
				}
			}else{

				for(let i=size; i<maxsize+1; i++){

					if(width*i*0.4<window.innerWidth) size  = i*0.4;
					if(height*i*0.5<window.innerHeight) sizeY = i*0.5;
				}				
			}


			if(size>=1){
				
				sizeBody(size, sizeY, template);
			}


  		} else {

    		timeout = 1000;
  		}
		
		window.setTimeout(res, timeout, width, height, innerWidth, innerHeight, maxsize, template,timeout, 0); 
	} else {

		innerWidth = window.innerWidth;
		innerHeight = window.innerHeight;
		timeout = 500;
		window.setTimeout(res, timeout, width, height, innerWidth, innerHeight, maxsize, template, timeout, 1);
	}
}
