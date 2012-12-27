$(document).ready(function(){
	init();
});

var init = function(){
	var location = 'body';
	this.canvas = document.createElement('canvas');

	this.canvas = $('<canvas>', {width:'400', height: '200'});
	this.canvas.css({'border':'1px solid'});
	$('body').append(this.canvas);

	this.context = this.canvas[0].getContext("2d");
	var imageObj = new Image();
	imageObj.onload = function() {
		context.drawImage(imageObj,50,50);
		context.drawImage(imageObj, 100, 100);
	};
	imageObj.src = 'ball.png';	
	this.mousedown = false;
	this.canvas[0].addEventListener('mousedown', mousedownHandler);
	this.canvas[0].addEventListener('mouseup', mouseupHandler);
	this.canvas[0].addEventListener('mousemove', mousemoveHandler);
};

function mousedownHandler() {
	mousedown = true;
	console.log('down');
	console.log(canvas);

};

function mouseupHandler() {
	mousedown = false;
	console.log('up');
};

function mousemoveHandler() {
	if (mousedown) {
		console.log('mousemove');
	}
};
