
function AnimationKey(time, sprite) {
	
	this.time = time;
	this.sprite = sprite;
	
}

function Animation() {
	
	this.keys = [];
	
}
Animation.prototype.endTime = function() {
	return this.keys[this.keys.length-1].time;
};