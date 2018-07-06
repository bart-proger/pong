//----------
//	Game
//----------

var Game = function() {
	
	this.objects = [];
	this.isDebug = false;

};

Game.prototype.checkCollisions = function() {
	for (var i = 0; i < this.objects.length-1; i++) {
		for (var j = i+1; j < this.objects.length; j++) {
			var a = this.objects[i],
				b = this.objects[j];
			if (a.collider && b.collider) { 
				if (a.collider.intersect(b.collider)) {
					if (!a.collider.contacts.includes(b)) {
						a.collider.contacts.push(b);
						b.collider.contacts.push(a);
						if (a.onCollisionEnter) a.onCollisionEnter(b);  
						if (b.onCollisionEnter) b.onCollisionEnter(a);
					}
					if (a.onCollision) a.onCollision(b);  
					if (b.onCollision) b.onCollision(a);
				} 
				else {
					a.collider.contacts.remove(b);
					b.collider.contacts.remove(a);
					if (a.onCollisionExit) a.onCollisionExit(b);  
					if (b.onCollisionExit) b.onCollisionExit(a);
				}
			}
		}
	}
};
Game.prototype.update = function() {
	this.objects.forEach(function(o) {
		if (o.controller) o.controller.onUpdate();
	});
	this.checkCollisions();
	this.objects.forEach(function(o) {
		if (o.onUpdate) o.onUpdate();
	});
};
Game.prototype.draw = function() {
	this.objects.forEach(function(o) {
		if (o.sprite) {
			drawSprite(o.sprite, o.position.x + o.sprite.position.x, o.position.y + o.sprite.position.y);
		}
		//if (o.onDraw) o.onDraw();
		if (this.isDebug) o.showDbgInfo();
	}, this); 
};
Game.prototype.addObject = function(object) {
	if (object instanceof GameObject) {
		this.objects.push(object);
	}
};
Game.prototype.getObject = function(name) {
	return (this.objects.find(function(o) {
		return o.name === name;
	}));
};