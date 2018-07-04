//	BoxCollider


var BoxCollider = function(owner, x, y, w, h) {
	Collider.call(this, [owner]);

	this.owner = owner;
	this.box = new Rect(x, y, w, h);

};
BoxCollider.prototype = Object.create(Collider.prototype);
BoxCollider.prototype.constructor = BoxCollider;

BoxCollider.prototype.intersect = function(other) {
	var a = new Rect(this.owner.position.x + this.box.x, this.owner.position.y + this.box.y, this.box.w, this.box.h),
		b = new Rect(other.owner.position.x + other.box.x, other.owner.position.y + other.box.y, other.box.w, other.box.h);

	return (a.intersectRect(b));
};