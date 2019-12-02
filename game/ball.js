
// Ball

function Ball(x, y) {
	GameObject.call(this, "ball");

	this.position = new Point(x, y);

	this.sprite = new Sprite(new Rect(0, 0, 16, 16)); 
	this.collider = new BoxCollider(this, -8, -8, 16, 16);

	this.minSpeed = 7;
	this.maxSpeed = 14;
	this.speed = 1;
	this.direction = (new Point(1, 0.7)).normalize();
	this.pitcher = null;

};
Ball.prototype = Object.create(GameObject.prototype);
Ball.prototype.constructor = Ball;

/*Ball.prototype.onDraw = function() {
	drawSprite(this.sprite, this.position.x - this.sprite.frameSize.w / 2, this.position.y - this.sprite.frameSize.h / 2);
};*/
Ball.prototype.onUpdate = function() {
	if (this.pitcher) {
		this.position = new Point(this.pitcher.position.x, this.pitcher.position.y - 20);
	} 
	else {
		this.speed = Math.max(this.minSpeed, this.speed-0.2);
		this.position.add(new Point(this.direction.x * this.speed, this.direction.y * this.speed)); 
	}
};

Ball.prototype.onCollisionEnter = function(object) {
	switch (object.name) {
		case "racket-left":
		case "racket-right":
			this.direction.x *= -1;
			this.speed = this.maxSpeed;
			break;
		case "top":
		case "bottom":
			this.direction.y *= -1;
			break;
		case "left":
			this.pitcher = Game.getCurrentScene().getObject("racket-right");
			this.onGoal();
			break;
		case "right":
			this.pitcher = Game.getCurrentScene().getObject("racket-left");
			this.onGoal();
			break;
	}
};

Ball.prototype.onGoal = function() {
	this.direction.x *= -1;
	this.direction.y *= Math.randomSign();
	this.pitcher.score++;
};
