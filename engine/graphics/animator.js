
function Updateble () {}
Updateble.prototype.onUpdate = function(dt) {};

function Animator(owner) {
	Updateble.call(this);
	
	this.animations = [];
	this.currentAnimation = null;
	this.currentTime = 0;
	
}
Animator.prototype = Object.create(Updateble.prototype);
Animator.prototype.constructor = Animator;

Animator.prototype.setAnimation = function(name) {
	this.currentAnimation = name;
};
Animator.prototype.onUpdate = function(dt) {
	if (this.currentAnimation) {
		var anim = this.animations[this.currentAnimation];
		this.currentTime += dt;
		this.currentTime %= anim.endTime();
		this.owner.sprite = anim.getFrame(this.currentTime);
	}
};