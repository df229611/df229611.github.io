// Чтение документа по url
function readXMLHttp(URL, OUT){

	var txt = '';
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){

		if(xmlhttp.status==200 && xmlhttp.readyState==4){

	    	txt = xmlhttp.responseText;
			document.getElementById(OUT).innerHTML = txt;
			return xmlhttp.responseText;
		}
	}

	xmlhttp.open("GET", URL, true);
	xmlhttp.send();
}

function loadPage(){

	//readXMLHttp("http://lzcelebrity.github.io/header.html", "header");
	//readXMLHttp("http://lzcelebrity.github.io/footer.html", "footer");
	
	// HEADER
	let elem_header = document.getElementById("header");
	elem_header.innerHTML = '<div class=logo ; onclick=\'location.href="index.html"\'></div><div class=navbar><a href=index.html></a><div class=dropdown><button class=dropbtn onclick=myFunction()><i class="fa fa-caret-down"></i></button><div class=dropdown-content id=myDropdown><a href=index.html>магазин</a> <a href=payment.html>информация</a> <a href=contact.html>контакты</a></div></div></div>';

	// FOOTER
	let elem_footer = document.getElementById("footer");
	elem_footer.innerHTML = '<div class=information><br>LZ Celebrity<br><br><p>Designer L. Zaitseva<p>Ukrainian fashion brand<p><a href=index.html>lzcelebrity@gmail.com</a><p>Kyiv, Ukraine<div class=icon><a href=https://www.facebook.com/lzcelebrity target=_blank><img src=img/facebook_w.png></a></div><div class=icon><a href=https://www.instagram.com/lzcelebrity target=_blank><img src=img/instagram_w.png></a></div></div><div class=creator>Create by df229611</div>';

/*
	elem_header.innerHTML = '<div class="information"><br>LZ Celebrity<br><br><p> Designer L. Zaitseva </p><p> Ukrainian fashion brand </p><p> <a href="index.html">lzcelebrity@gmail.com</a></p><p> Kyiv, Ukraine</p><div class="icon"><a href="https://www.instagram.com"><img src="img/instagram_w.png"></a></div><div class="icon"><a href="https://vk.com/"><img src="img/vk_w.png"></a></div><div class="icon"><a href="https://www.facebook.com"><img src="img/facebook_w.png"></a></div></div>';
*/
/*
	elem_footer.innerHTML = '<object type="text/html" data="v0000.html"></object>';
*/
}

document.addEventListener('DOMContentLoaded', function() {

  setTimeout(loadPage, 100);
}, false);	