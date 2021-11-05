// Скрипт плавной прокрутки наверх -->

function up() {

	var top = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
	
	if(top > 0) {
	
		/* window.scrollBy(0,-100); */
		/* Замедление при приближении к началу страницы */
		window.scrollBy(0,((top+100)/-15));
		t = setTimeout('up()',20);
	} else clearTimeout(t);

	return false;
}
