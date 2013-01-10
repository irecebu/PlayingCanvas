$(document).ready(function(){
	init();
});
var circlesInCanvas = [];
var colorsArray = ['green', 'yellow', 'red', 'blue', 'black', 'YellowGreen', 'Sienna', 'Purple',
				'Peru', 'Navy', 'MediumVioletRed'];

var init = function () {
	this.playfunc = play;
	var location = 'body';
	this.startButton = $('<button>', {text : 'start'});
	this.nextBallButton = $('<button>', {text : 'next ball'});
	this.startButton[0].addEventListener('click', start);
	this.nextBallButton[0].addEventListener('click', nextBall);
	this.canvas = $('<canvas>');
	this.height = 500;
	this.width = 500;
	this.canvas.attr({'width' :this.width, 'height' : this.height});
	this.canvas.css({'border':'1px solid'});
	$('body').append(this.canvas);
	$('body').append(this.startButton);
	$('body').append(this.nextBallButton);
	this.context = this.canvas[0].getContext("2d");
	

	this.c2 = new Circle(50,50,25, 'green');
	circlesInCanvas.push(c2);
	c2.drawCircle(true);
	this.clearCircle = new Circle(25,25,27, '#F3F3F3');
	
	
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
		clearCircle.drawCircle(false);
		c2.x = e.offsetX;
		c2.y = e.offsetY;
		c2.drawCircle(true);
	}
};

function start (e) {
	
	// play(endx, endy, start);
	// for each (var circle in circlesInCanvas) play(endx, endy, start, circle);
	circlesInCanvas.forEach(function(circle) {
		var endx = Math.floor(Math.random()*(height-60));
		var endy = Math.floor(Math.random()*(width-60));
		// setTimeout(function  () {
			play(endx, endy, start, circle);
		// }, 1);
	});
	// for (i in circlesInCanvas) play(endx, endy, start, circlesInCanvas[i]);
};
function play (endx, endy, func, circle) {
	console.log(circle);
	console.log(endx + ': ', endy);
	var dx = (endx - circle.x)
		, dy = (endy - circle.y)
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
	nexty = circle.y + incy;
	nextx = circle.x + incx;
	
	(function loop (func) {
		setTimeout(function (func) {
			clearCircle.x = circle.x;
			clearCircle.y = circle.y;
			clearCircle.drawCircle(true);
			nextx += incx;
			nexty += incy;
			circle.x = nextx;
			circle.y = nexty;
			circle.drawCircle(true);
			if (!circle.hitTheWall()) {
				loop(func);
			} else {
				// start();
			}
		}, 2);	
	})();
};
function nextBall (e) {
	console.log('next ball');
	var x = 50 + Math.floor(Math.random()*(450 - 50));
	var y = 50 + Math.floor(Math.random()*(450 - 50));
	var c = new Circle(x, y, 25, colorsArray[Math.floor(Math.random()*colorsArray.length)]);
	circlesInCanvas.push(c);
	c.drawCircle(true);
};
