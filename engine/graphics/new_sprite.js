
function Drawable() {

	this.position = new Point(0, 0);
	this.rotation = 0;
	this.scale = new Point(1, 1);
	
}

function Sprite(tx, ty, tw, th) {	
	Drawable.call(this);
	
	this.textureRect = new Rect(tx, ty, tw, th);
	
}
Sprite.prototype = Object.create(Drawable.prototype);
Sprite.prototype.constructor = Sprite;