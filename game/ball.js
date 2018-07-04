
// Ball

var Ball = function(x, y) {
	GameObject.call(this);

	this.name = "ball";
	this.position = new Point(x, y);

	this.sprite = new Sprite(0, 0, 16, 16, 1, 1); 
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
		if (input.isKeyDown("Space")) {
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


/*var ball = {
  x: width / 2,
  y: height / 2,
  r: 7,
  vx: 1,
  vy: 1,
  speed: 7,
  contact: true,
  rect: function() {
    return new Rect(this.x - this.r, this.y - this.r, this.r * 2, this.r * 2);
  },
  move: function() {
    this.x += this.vx * this.speed;
    this.y += this.vy * this.speed;
  },
  reset: function() {
    this.x = width / 2;
    this.y = height / 2;
    this.vx = (random(0, 1) == 0) ? -1 : 1;
    this.vy = (random(0, 1) == 0) ? -1 : 1;
  }
};*/