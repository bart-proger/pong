//----------------
//	GameObject
//----------------

function GameObject(name, x, y, w, h) {

	this.position = x && y ? new Point(x, y) : null;
	this.sprite = null;
	this.collider = w && h ? new BoxCollider(this, -w/2, -h/2, w, h) : null;
	this.controller = null;

	this.name = name || "unnamed-" + Utils.hash(this);
	
};

//GameObject.prototype.onUpdate = function() {};
//GameObject.prototype.onDraw = function() {};
//GameObject.prototype.onCollisionEnter = function() {};
//GameObject.prototype.onCollision = function() {};
//GameObject.prototype.onCollisionExit = function() {};
//GameObject.prototype.onShowDbgInfo = function() {};

GameObject.prototype.showDbgInfo = function() {
	Graphics.color("white");
	Graphics.font("12px Arial");
	if (this.sprite) {
		var sw = this.sprite.textureRect.w * this.sprite.scale.x,
			sh = this.sprite.textureRect.h * this.sprite.scale.y;
			Graphics.drawRect(this.sprite.position.x + this.position.x - sw/2, this.sprite.position.y + this.position.y - sh/2, this.sprite.textureRect.w * this.sprite.scale.x, this.sprite.textureRect.h * this.sprite.scale.y);
	}
	if (!this.position || !this.collider) 
		return;
	if (this.collider.contacts.length > 0)
		Graphics.color("red");
	else
		Graphics.color("white");
	Graphics.drawRect(this.collider.box.x + this.position.x, this.collider.box.y + this.position.y, this.collider.box.w, this.collider.box.h);
	Graphics.drawText(this.toString(), this.collider.box.x + this.position.x, this.collider.box.y + this.position.y - 3);
	Graphics.drawCircle(this.position.x, this.position.y, 3);

};
GameObject.prototype.toString = function() {
	if (!this.position) 
		return this.name;
	return this.name + " (" + this.position.x + ", " + this.position.y + ")";
};