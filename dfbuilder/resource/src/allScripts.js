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
function DOMContentLoaded(W, H, F, FILENAME) {
	
	//Запрещаем контекстное меню
	document.oncontextmenu = disableContextMenu;
	
	// HEADER
	//let elem_header = document.getElementById("header");
	//elem_header.innerHTML = 'Ok';
	// FOOTER
	//let elem_footer = document.getElementById("footer");
	//elem_footer.innerHTML = 'Ok';

    let clientWidth=document.body.clientWidth;		//Ширина области браузера
    let clientHeight=document.body.clientHeight;	//Высота области браузера
	let MarginLR = clientWidth/16;					// Отступы слева справа
	let MarginTB = clientHeight/10;					// Отступы сверху снизу
	let Frame = F;									// Рамка

	// Определяем устройство
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
		
		// Вы используете мобильное устройство (телефон или планшет)

		if (navigator.userAgent.search(/Safari/) < -1) {

			document.getElementById('screen').style.border = '0px solid #000000';
		};

	}else{
	  	// Вы используете компьютер

	    document.getElementById('screen').style.border = Frame+'px solid #000000';
	    document.getElementById('screen').style.borderImage = 'url(resource/img/frame.png) '+Frame+' round round';
	  	//alert("w:"+clientWidth+"h:"+clientHeight);

	}
	
	// Ширина
	if(W>=200){
		
		clientWidth = W;
		MarginLR = 0;
	}else{
		
		if(clientWidth>=500){

		}else{

			clientWidth = 450;
			MarginLR = 0;
		}

	}

	// Высотка
	if(H>=200){
		
		clientHeight = H;
		MarginTB = 0;
	}else{
		
		if(clientHeight>=500){


		}else{

			clientHeight = 350;
			MarginTB = 0;
		}

	}

	// Запускаем игру
	setTimeout(main, 10, clientWidth, clientHeight, Frame, MarginLR, MarginTB, FILENAME);
}
