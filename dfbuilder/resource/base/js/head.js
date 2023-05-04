let SIZE = 1;

function main(WIDTH, HEIGHT, FRAME_SIZE, MARGINLR, MARGINTB, FILENAME) {

let Width = WIDTH-FRAME_SIZE*2-MARGINLR;
let Height = HEIGHT-FRAME_SIZE*2-MARGINTB;

document.getElementById("screen").style.marginLeft= -(Width+FRAME_SIZE*2)/2 +'px';
document.getElementById("screen").style.marginTop= -(Height+FRAME_SIZE*2)/2 +'px';
let game = new Phaser.Game(Width, Height, Phaser.CANVAS, "screen",{preload:preload, create:create, update:update, render:render});