
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
	return Math.random() < 0.5 ? -1 : 1;
};

Array.prototype.remove = function(element) {
	var i = this.indexOf(element);
	if (i > -1) this.splice(i, 1);
};
Array.prototype.last = function() {
	return this[this.length-1];
};
Array.prototype.max = function() {
	return this.reduce(function(max, cur) {
		return (cur > max) ? cur : max;
	});
};
Array.prototype.min = function() {
	return this.reduce(function(min, cur) {
		return (cur > min) ? cur : min;
	});
};
Array.prototype.intersect = function(array) {
	var result = [];
	array.forEach(v => {
		if (this.includes(v)) result.push(v);
	});
	return result;
};
Array.prototype.forReverse = function(callback, thisArg) {
	if (!thisArg) 
		thisArg = this;
	for (var i = this.length-1; i >= 0; --i) 
		if (this[i] !== undefined)
			callback(this[i], i, this);
};
Array.prototype.index2DOf = function(element) {
	var result = null;
	this.some((array, i) => { 
		return array.some((elem, j) => {
			if (elem === element) {
				result = {i: i, j: j};
				return true;
			}
			return false;
		});
	});
	return result;
};