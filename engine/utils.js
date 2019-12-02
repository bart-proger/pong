
  /////////////
 //  Utils  //
/////////////

var Utils = new function() {
	
	this.hash = function(obj) {
		var hash = 0;
		var str = String(obj);
		if (str.length === 0) return hash;
		for (i = 0; i < str.length; i++) {
			char = str.charCodeAt(i);
			hash = ((hash << 5) - hash) + char;
			hash = hash & hash; // Convert to 32bit integer
		}
		return hash;
	};
};

Math.randomRange = function(min, max) {
	return Math.trunc(Math.random() * (max - min) + min);
};
Math.randomBool = function() {
	return Math.random() < 0.5;
};
Math.randomSign = function() {
	return Math.random < 0.5 ? -1 : 1;
};

Array.prototype.remove = function(element) {
	var i = this.indexOf(element);
	if (i > -1) this.splice(i, 1);
};
Array.prototype.last = function() {
	return this[this.length-1];
};