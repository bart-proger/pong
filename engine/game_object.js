//----------------
//	GameObject
//----------------

function GameObject(name, x, y, w, h) {

	this.name = name ? name : "unnamed-" + Math.floor(random(0, 1000));
	this.position = new Point(x, y);

	this.sprite = null;
	this.collider = new BoxCollider(this, -w/2, -h/2, w, h);
	this.controller = null;
};

//GameObject.prototype.onUpdate = function() {};
//GameObject.prototype.onDraw = function() {};
//GameObject.prototype.onCollisionEnter = function() {};
//GameObject.prototype.onCollision = function() {};
//GameObject.prototype.onCollisionExit = function() {};
//GameObject.prototype.onShowDbgInfo = function() {};

GameObject.prototype.showDbgInfo = function() {
	color("white");
	font("12px Arial");
	if (this.sprite) {
		var sw = this.sprite.textureRect.w * this.sprite.scale.x,
			sh = this.sprite.textureRect.h * this.sprite.scale.y;
		drawRect(this.sprite.position.x + this.position.x - sw/2, this.sprite.position.y + this.position.y - sh/2, this.sprite.textureRect.w * this.sprite.scale.x, this.sprite.textureRect.h * this.sprite.scale.y);
	}
	drawRect(this.collider.box.x + this.position.x, this.collider.box.y + this.position.y, this.collider.box.w, this.collider.box.h);
	drawText(this.toString(), this.collider.box.x + this.position.x, this.collider.box.y + this.position.y - 3);
	drawCircle(this.position.x, this.position.y, 3);

};
GameObject.prototype.toString = function() {
	return this.name + " (" + this.position.x + ", " + this.position.y + ")";
};