//Генерация целого числа от минимального до максимального числа
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
function checkCollide(x, y, oWidth, oHeight, xTwo, yTwo, oTwoWidth, oTwoHeight){

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