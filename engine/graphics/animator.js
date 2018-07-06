//------------
//	Animator
//------------

function Animator(owner) {
	Updatable.call(this);
	
	this.animations = [];
	this.currentAnimation = null;
	this.currentTime = 0;
	
}
Animator.prototype = Object.create(Updatable.prototype);
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