var Line = function (start, end, color) {
	this.start = start || [0,0];
	this.end = end || [height,width]; 
	this.color = color || 'black';
};
Line.prototype.calcLength = function () {
	this.length = Math.sqrt(Math.pow(this.end[1] - this.start[1], 2) + Math.pow(this.end[0] - this.start[0],2));
};
Line.prototype.calcSlope = function () {
	if (this.end[0] == this.start[0]) this.slope = Number.MAX_VALUE;
	else 
		this.slope = (this.end[1] - this.start[1])/ (this.end[0] - this.start[0]);
};

Line.prototype.drawLine = function (config) {
	context.save();
	context.beginPath();
	context.moveTo(this.start[0], this.start[1]);
	context.lineTo(this.end[0], this.end[1]);
	context.lineWidth = config.lineWidth || 1;
	context.lineCap = config.lineCap || 'round';
	context.stroke();
	context.restore();
};
Line.prototype.rotate = function (radian, config) {
	context.beginPath();
	var length = this.end[0] - this.start[0];
	oldEnd  = [this.end[0], this.end[1]];
	
	this.end[0] = (oldEnd[0]-this.start[0])*Math.cos(radian) - (oldEnd[1]-this.start[1])*Math.sin(radian) + this.start[0];
	this.end[1] = ((oldEnd[0]-this.start[0])*Math.sin(radian) + (oldEnd[1]-this.start[1])*Math.cos(radian)) + this.start[1];
	
	context.moveTo(this.start[0], this.start[1]);
	context.lineTo(this.end[0], this.end[1]);
	this.drawLine(config);
};
Line.prototype.clearLine = function (config) {
	context.save();
	context.beginPath();
	context.moveTo(this.start[0], this.start[1]);
	context.lineTo(this.end[0], this.end[1]);
	context.lineWidth = this.width;
	context.strokeStyle = '#F3F3F3';
	context.lineWidth = config.lineWidth || 1;
	context.lineCap = config.lineCap || 'round';
	context.stroke();
	context.restore();
};


