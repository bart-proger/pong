
// Ball

function Ball(x, y) {
	GameObject.call(this);

	this.name = "ball";
	this.position = new Point(x, y);

	this.sprite = new Sprite(new Rect(0, 0, 16, 16)); 
	this.collider = new BoxCollider(this, -8, -8, 16, 16);

	this.speed = 5;
	this.direction = new Point(1, 1);
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
		if (Input.isKeyDown("Space")) {
			this.pitcher = null;
		}
	}
	else
		this.position.add(new Point(this.direction.x * this.speed, this.direction.y * this.speed)); 
};

Ball.prototype.onCollisionEnter = function(object) {
	switch (object.name) {
		case "top":
		case "bottom":
			this.direction.y *= -1;
			break;
		case "racket-left":
		case "racket-right":
			if (!this.pitcher)
				this.direction.x *= -1;
			break;
		case "left":
			this.pitcher = game.getObject("racket-right");
			this.pitcher.score++;
			this.direction.x = -1;
			break;
		case "right":
			this.pitcher = game.getObject("racket-left");
			this.pitcher.score++;
			this.direction.x = 1;
			break;
	}
};
