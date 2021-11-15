// Чтение локального документа
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
