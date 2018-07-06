// Score

var Drawable = function() {};
Drawable.prototype.onDraw = function() {};

var Score = function() {
	Drawable.call(this);

	this.left = 0;
	this.right = 0;

};
Score.prototype = Object.create(Drawable.prototype);
Score.prototype.constructor = Score;

Score.prototype.onDraw = function() {
	font("40px Arial");
	drawText("" + this.left, width / 2 - 5, 45, "right");
	drawText("" + this.right, width / 2 + 5, 45, "left");
};