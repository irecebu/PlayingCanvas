$(document).ready(function(){
	init();
});

function init() {
	this.canvas = $('<canvas>');
	this.height = 500;
	this.width = 500;
	this.canvas.attr({'width' : this.width, 'height' : this.height});
	this.canvas.css({'border' : '1px solid black'});
	$('body').append(this.canvas);
	
	this.context = this.canvas[0].getContext("2d");
	
	this.midX = this.height/2;
	this.midY = this.height/2;
	this.midRadius = 5;
	this.midPoint = new Circle(this.midX, this.midY, this.midRadius, 'black');
	//this.midPoint.drawCircle(true);
	
	this.innerX = this.height/2;
	this.innerY = this.width/2;
	this.innerRadius = 50;
	this.innerCircle = new Circle(this.innerX, this.innerY, this.innerRadius);
	//this.innerCircle.drawCircle(false);
	
	this.line = new Line([100,100], [0,100]);
	this.line.drawLine();
	
	
	
	function foo (callback) {
		var step = Math.PI/30;
		var count = 0;
		var inside = false;
		(function loop () {
			setTimeout(function () {
				inside = true;
				this.line.rotate(step);
				// console.log(this.line.start + " : " + this.line.end);
				count++;
				if (count < 30) loop();
				else {
					console.log(this.line.start + " : " + this.line.end);
					this.line = new Line(this.line.end, this.line.begin, 'green');
					console.log(this.line.start + " : " + this.line.end);
					callback();	
					// console.log(this.line.start + " : " + this.line.end);
				}	
			}, 50);
		})();
	};
	var globalCount = 0;
	
	foo(bar);
	
	function bar () {
		console.log('after foo');
		if (globalCount < 2) {
			globalCount++;
			
			// console.log(this.line.start + " : " + this.line.end);
			foo(bar);
		} else {
			console.log('done');
		}
	};
	// this.line.rotate(Math.PI/2);
	
	
};

