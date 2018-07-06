//-------------
//	Animation
//-------------

function Animation() {
	
	this.keys = [];
	
};

function AnimationKey(time, sprite) {

	this.time = time;
	this.sprite = sprite;

};

Animation.prototype.endTime = function() {
	return this.keys[this.keys.length-1].time;
};

Animation.prototype.addKey = function(time, sprite) {
	this.keys.push(new AnimationKey(time, sprite));
	this.keys.sort(function(a, b) {	return a - b; });
	return this;
};
