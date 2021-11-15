// Функция запускается при полной загрузки HTML страницы
function onLoad(){
	
	var elemH = document.getElementById("hellow");
	var elemS = document.getElementById("screen");

	elemH.innerHTML = "<p class='fhellow'>abcdefghijklmnopqrstuvwxwz<br>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>";

	elemS.innerHTML= "> hello world! HELLO WORLD!";
	elemS.innerHTML+= "<br>";
	elemS.innerHTML+= "> привет мир! ПРИВЕТ МИР!";
}