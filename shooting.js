$(document).ready(function(){
	init();
});

var components = [];

function init () {
	this.canvas = $('<canvas>');
	this.height = 500;
	this.width = 500;
	this.canvas.attr({'height' : this.height, 'width' : this.width});
	this.canvas.css({'border': '1px solid black'});
	$('body').append(this.canvas);
	
	this.context = this.canvas[0].getContext('2d');	
	
	startAnimation();
	
};

function startAnimation () {
	window.requestAnimFrame = (function (callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame
        || function (callback) {
          window.setTimeout(callback, 1000/6);
        };
    })();
    
	var hit = false;
	
	function animate (myRectangle, startTime) {
  		var time = (new Date()).getTime() - startTime;
  		var acceleration = 500;
  		var newX = 5 + 0.5*(acceleration * Math.pow(time/1000, 2));
  		// console.log('animate');
  		if (newX + myRectangle.width + 10 < canvas[0].width && !hit)  
  			myRectangle.x = newX;
  		else  {
  			context.clearRect(4, 24, myRectangle.width + myRectangle.x + 1, myRectangle.height+2);
  			myRectangle.x = 5;
  			var startTime = (new Date()).getTime();
  			hit = false;
    		// animate(myRectangle, startTime);
  		}
  		context.clearRect(4, 24, myRectangle.width + myRectangle.x + 1, myRectangle.height+2);
  		
  		drawRectangle(myRectangle);
  		
  		requestAnimFrame(function () {
  			animate(myRectangle, startTime);
  		});
  	};
	
	
	var myRectangle = {
  		x : 5,
  		y : 25,
  		width : 25,
  		height : 20,
  		borderWidth : 1
  	};
  	
	function drawRectangle (myRectangle) {
		
  		context.beginPath();
  		context.rect(myRectangle.x, myRectangle.y, myRectangle.width, myRectangle.height);
  		context.fillStyle = 'red';
  		context.fill();
  		// context.lineWidth = myRectangle.borderWidth;
  		context.stroke();
  	};
  	
  	function getMousePos(canvas, evt) {
    	var rect = canvas.getBoundingClientRect();
    	return {
    		x : evt.clientX - rect.left,
    		y : evt.clientY - rect.top
    	};
    };
   	var gun = new Line([this.canvas[0].width/2 , this.canvas[0].height], [this.canvas[0].width/2 , this.canvas[0].height - 100]);
	gun.calcLength();
	gun.calcSlope();
    gun.drawLine({lineWidth : 10});
	var temp = new Line([0,0], [1,1]);
    
    drawRectangle(myRectangle);
    var startTime = (new Date()).getTime();
    animate(myRectangle, startTime);
    
    var prevAngle = 0;
    var prevX = gun.end[0];
    var down = false;
    
    canvas[0].addEventListener('mousemove', function (evt) {
    	var mousePos = getMousePos(canvas[0], evt);
    	// var newLine = new Line(gun.start, [mousePos.x, mousePos.y]);
    	if (mousePos.y > 300) {
    	temp.start = gun.start;
    	temp.end = [mousePos.x, mousePos.y];
    	temp.calcSlope();
    	
    	var theta = Math.atan(temp.slope);
    	var x = (mousePos.x > 250) ? (250 + gun.length * Math.cos(theta)) : (250 - gun.length * Math.cos(theta));
    	var y = (Math.sin(theta) < 0) ? (500 + gun.length * Math.sin(theta)) : (500 - gun.length * Math.sin(theta));
    	
    	temp.end = [x,y];
    	
    	gun.clearLine({lineWidth : 12});
    	// gun = new Line(gun.start, [x,y]);
    	gun.end = [x,y];
    	gun.calcSlope();
    	gun.drawLine({lineWidth : 10});
    	}
    	
    });
    
    canvas[0].addEventListener('mousedown', function (evt) {
    	hit = true;
    	console.log(gun.end);
    	console.log(myRectangle.y*gun.slope + " : " + myRectangle.y);
    	// context.beginPath();
    	// context.arc(temp.end[1]/temp.slope, myRectangle.y, 10, 0, 2*Math.Pi, false);
    	// context.stroke();
    	// c = new Circle()
    });
    
};
