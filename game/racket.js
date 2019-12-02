
// Racket

function Racket(name, x, y, lookTo) {

	GameObject.apply(this, null);
	this.name = name;
	this.position = new Point(x, y);

	this.sprite = new Sprite(18, 0, 47, 121, 1, 1);
	this.collider = new BoxCollider(this, -48/2, -78/2, 48, 78);

	this.score = 0;
	this.lookTo = lookTo;

};

Racket.prototype = Object.create(GameObject.prototype);
Racket.prototype.constructor = Racket;

/*Racket.prototype.onDraw = function() {
	drawSprite(this.sprite, this.position.x - this.sprite.frameSize.w / 2, this.position.y - this.sprite.frameSize.h / 2);
};*/
Racket.prototype.onCollision = function(object) {
	switch (object.name) {
		case "top":
			this.position.y = -this.collider.box.y;
			break;
		case "bottom":
			this.position.y = height - (this.collider.box.y + this.collider.box.h);
			break;
	}
};
