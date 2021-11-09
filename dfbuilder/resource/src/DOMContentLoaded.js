function DOMContentLoaded(W, H, F, FILENAME){
	
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
	
	if(W>=200){
		
		clientWidth = W;
		MarginLR = 0;
	}
	
	if(H>=200){
		
		clientHeight = H;
		MarginTB = 0;
	}

	// Запускаем игру
	setTimeout(main, 10, clientWidth, clientHeight, Frame, MarginLR, MarginTB, FILENAME);
}
