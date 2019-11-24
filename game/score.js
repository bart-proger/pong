// Score

var Score = function() {
	GameObject.call(this);

};
Score.prototype = Object.create(GameObject.prototype);
Score.prototype.constructor = Score;

Score.prototype.onDraw = function() {
	Graphics.color("white");
	Graphics.font("40px Arial");

	Graphics.drawText("" + Game.getObject("racket-left").score, width / 2 - 15, 45, "right");
	Graphics.drawText("" + Game.getObject("racket-right").score, width / 2 + 15, 45, "left");
	//drawText(":", width / 2, 45, "center");

	Graphics.drawLine(width / 2, 0, width / 2, height);
};
