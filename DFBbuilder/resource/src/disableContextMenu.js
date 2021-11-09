//Запрещаем контекстное меню
function disableContextMenu(e) {
	var clickedEl = (e==null) ? event.srcElement.tagName : e.target.tagName;
	if (clickedEl == "CANVAS") {
		
		//alert("Context menu disabled.");
		return false;
	}
}
