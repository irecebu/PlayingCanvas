$(document).ready(function(){
	init();
});
var Circle = function(x, y, radius){
	this.x = x || 0;
	this.y = y || 0; 
	this.radius = radius || 10;
};
Circle.prototype.drawCircle = function (color, border) {
	context.beginPath();
	context.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false);
	context.fillStyle = color;
	context.fill();
	if (border) {
		context.lineWidth = 2;
		context.stroke();
	}
};
var init = function () {
	var location = 'body';
	this.startButton = $('<button>', {text : 'start'});
	this.nextBall = $('<button>', {text : 'next ball'});
	this.startButton[0].addEventListener('click', start);
	this.nextBall[0].addEventListener('click', nextBall);
	this.canvas = $('<canvas>');
	this.height = 500;
	this.width = 500;
	this.canvas.attr({'width' :this.width, 'height' : this.height});
	this.canvas.css({'border':'1px solid'});
	$('body').append(this.canvas);
	$('body').append(this.startButton);
	$('body').append(this.nextBall)
	this.context = this.canvas[0].getContext("2d");
	
	
	this.c1 = new Circle(150,150,25);
	// c1.drawCircle('blue', true);
	this.c2 = new Circle(50,50,25);
	c2.drawCircle('green', true);
	this.clearCircle = new Circle(25,25,27);
	
	
	this.mousedown = false;
	this.canvas[0].addEventListener('mousedown', mousedownHandler);
	this.canvas[0].addEventListener('mouseup', mouseupHandler);
	this.canvas[0].addEventListener('mousemove', mousemoveHandler);
};
function mousedownHandler (e) {
	mousedown = true;
};
function mouseupHandler (e) {
	mousedown = false;
};
function mousemoveHandler (e) {
	if (mousedown) {
		clearCircle.x = c2.x;
		clearCircle.y = c2.y;
		clearCircle.drawCircle('white', false);
		c2.x = e.offsetX;
		c2.y = e.offsetY;
		c2.drawCircle('green', true);
	}
};
function start (e) {
	console.log('start playing');
	var endx = Math.floor(Math.random()*(height-60));//height and width minus the radius
	var endy = Math.floor(Math.random()*(width-60));
	console.log(c2.x);
	console.log(c2.y);
	console.log(endx);
	console.log(endy);
	var dx = (endx - c2.x)
		, dy = (endy - c2.y)
		, m = dy/dx
		, incx = 0
		, incy = 0
		, nexty = 0
		, nextx = 0;

	if (m > 1) {
		incy = (dy < 0) ? -1 : 1;
		incx = 1/Math.abs(m);
		incx = (dx<0) ? -1*incx : incx;
	} else {
		incx = (dx < 0) ? -1 : 1;
		incy = Math.abs(m);
		incy = (dy<0) ? -1*incy : incy;
	}
	nexty = c2.y + incy;
	nextx = c2.x + incx;
	
	(function loop () {
		setTimeout(function () {
			clearCircle.x = c2.x;
			clearCircle.y = c2.y;
			clearCircle.drawCircle('white', false);
			nextx += incx;
			nexty += incy;
			c2.x = nextx;
			c2.y = nexty;
			c2.drawCircle('green', true);
			if (Math.abs(nextx-endx) > 0.001 && Math.abs(nexty-endy) > 0.001) {
				loop();
			}
		}, 5);
	})();
	
	play();
}
function nextBall (e) {
	console.log('next ball');
};
function play () {
	
};

