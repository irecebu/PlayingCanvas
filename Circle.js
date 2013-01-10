var Circle = function(x, y, radius, color){
	this.x = x || 0;
	this.y = y || 0; 
	this.radius = radius || 10;
	this.color = color || 'orange';
};
Circle.prototype.drawCircle = function (fill) {
	context.beginPath();
	context.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false);
	if (fill) {
		context.fillStyle = this.color;	
		context.fill();
		context.lineWidth = 2;
	}
	context.stroke();
};
Circle.prototype.hitTheWall = function () {
	if (this.x + this.radius > width || this.x - this.radius < 0) return true;
	if (this.y + this.radius > height || this.y - this.radius < 0) return true;
	return false;
};
