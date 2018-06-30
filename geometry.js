//------------
//	Geometry
//------------


// Point
//-------------------------------

var Point = function(x, y) {

	this.x = 0;
	this.y = 0;

	if (x !== undefined) {
		if (x instanceof Point) {
			this.x = x.x;
			this.y = x.y;
		}
		else {
			this.x = x;
			this.y = y;
		}		
	}
};
Point.prototype.add = function(point) {
	this.x += point.x;
	this.y += point.y;
	return this;
};
Point.prototype.sub = function(point) {
	this.x -= point.x;
	this.y -= point.y;
	return this;
};
Point.prototype.mult = function(number) {
	this.x *= number;
	this.y *= number;
	return this;
};
Point.prototype.div = function(number) {
	this.x /= number;
	this.y /= number;
	return this;
};
Point.prototype.length = function() {
	return Math.sqrt(this.x*this.x + this.y*this.y);
};
Point.prototype.distanceTo = function(a) {
	return Math.sqrt((a.x-this.x)*(a.x-this.x) + (a.y-this.y)*(a.y-this.y));
};

//	Rectangle
//------------------------------------

var Rect = function(x, y, w, h) {

	this.x = 0;
	this.y = 0;
	this.w = 0;
	this.h = 0;

	if (x !== undefined) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}
};
Rect.prototype.inRect = function(rect) {
	return (this.x >= rect.x && this.y >= rect.y &&
		this.x + this.w <= rect.x + rect.w && this.y + this.h <= rect.y + rect.h);
};
Rect.prototype.intersectRect = function(rect) {
	return !(this.y > rect.y + rect.h || this.y + this.h < rect.y ||
		this.x + this.w < rect.x || this.x > rect.x + rect.w);
};
Rect.prototype.move = function(offset) {
	this.x += offset.x;
	this.y += offset.y;
};
Rect.prototype.moveTo = function(position) {
	this.x = position.x;
	this.y = position.y;
};


// Intersect
//-----------------------------------------

var Intersect = {

	circleSegment: function(center, radius, p1, p2) {
		var x1 = p1.x - center.x;
		var y1 = p1.y - center.y;
		var x2 = p2.x - center.x;
		var y2 = p2.y - center.y;

		var dx = x2 - x1;
		var dy = y2 - y1;

		var a = dx*dx + dy*dy;
		var b = 2 * (x1*dx + y1*dy);
		var c = x1*x1 + y1*y1 - radius*radius;

		if (-b < 0) return c < 0;
		if (-b < 2*a) return (4*a*c - b*b) < 0;
		return (a + b + c) < 0;
	}

};
