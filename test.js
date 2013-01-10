$(document).ready(function(){
	init();
});

function init () {
	this.canvas = $('<canvas>');
	this.height = 500;
	this.width = 1000;
	this.canvas.attr({'width': this.width, 'height': this.height});
	this.canvas.css({'border' : '1px solid black'});
	$('body').append(this.canvas);
	
	this.context = this.canvas[0].getContext("2d");
	rectangleShadow();
	clipFun();
	context.restore();
	manipulateImage('logo3w.png');
	// createDataUrl();
	animateBox();
};

function rectangleShadow () {
	context.save();
	context.rect(10,10,200,100);
	context.fillStyle = 'red';
	context.shadowColor = '#999';
	context.shadowBlur = 10;
	context.shadowOffsetX = -1;
	context.shadowOffsetY = -5;
	context.fill();
	context.restore();
	// context.shadowColor = '#F3F3F3';
	// context.shadowOffsetX = 0;
	// context.shadowOffsetY = 0;
	// context.shadowBlur = 0;
};

function clipFun () {
	var x = 350;
	var y = 150;
	var r = 75;
	var offset = 50;
	
	context.save();
	context.beginPath();
	context.arc(x,y,r,0,2*Math.PI, false);
	// context.clip();
	
	context.beginPath();
	context.arc(x,y,r,0,2*Math.PI, false);
	context.fillStyle = 'blue';
	context.fill();	
	context.clip();
	
	context.beginPath();
	context.arc(x,y,20, 0, 2*Math.PI, false);
	context.fillStyle = 'yellow';
	context.fill();
	// context.clip();
	
	context.beginPath();
	context.rect(x,y,100,100);
	context.fillStyle = 'green';
	context.fill();
	
};
function manipulateImage (source) {
	this.imageObj = new Image();
	imageObj.onload = function () {
		drawImage();
	};
	imageObj.src = source;
};
function drawImage () {
	var imageWidth = imageObj.width;
	var imageHeight = imageObj.height;
	context.drawImage(imageObj, 10, 250, imageWidth, imageHeight);
	
	var imageData = context.getImageData(10, 250, imageWidth, imageHeight);
	var data = imageData.data;
	// console.log(data);
	for (var i = 0; i < data.length; i+=4) {
		// data[i] = 110;
		// data[i+1] = 110;
		// data[i+2] = 110;
		data[i+3] = 110;
	}
	
	context.putImageData(imageData, 10, 260 + imageHeight);
};

function createDataUrl () {
	context.beginPath();
	context.arc(500 + 50, 50, 30, 0, 2*Math.PI, false);
	context.fillStyle = 'brown';
	context.fill();
	var dataUrl = canvas[0].toDataURL('image/jpeg');
	console.log(dataUrl);
};

function animateBox () {
	window.requestAnimFrame = (function (callback) {
		console.log('callback' + callback);
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame
        || function(callback) {
          window.setTimeout(callback, 1000/6);
        };
    })();
  	
  	var myRectangle = {
  		x : 500,
  		y : 15,
  		width : 100,
  		height : 50,
  		borderWidth : 5
  	};
  	
  	function drawRectangle (myRectangle) {
		
  		context.beginPath();
  		context.rect(myRectangle.x, myRectangle.y, myRectangle.width, myRectangle.height);
  		context.fillStyle = 'red';
  		context.fill();
  		// context.lineWidth = myRectangle.borderWidth;
  		context.stroke();
  	};
  	
  	function animate (myRectangle, startTime) {
  		var time = (new Date()).getTime() - startTime;
  		var linearSpeed = 500;
  		var newX = 500 + 0.5*(linearSpeed * Math.pow(time/1000, 2));
  		
  		if (newX + myRectangle.width + 10 < canvas[0].width) 
  			myRectangle.x = newX;
  		else  return;
  		
  		context.clearRect(498, 14, canvas[0].width, canvas[0].height);
  		
  		drawRectangle(myRectangle);
  		
  		requestAnimFrame(function () {
  			animate(myRectangle, startTime);
  		});
  	};
  	drawRectangle(myRectangle);
  	setTimeout(function () {
  		var startTime = (new Date()).getTime();
  		animate(myRectangle, startTime);
  	}, 500);
  	
};

