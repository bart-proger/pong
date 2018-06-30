//---------
//	Utils
//---------

var random = function(min, max) {
	return Math.random() * (max - min) + min;
};

Array.prototype.remove = function(element) {
	var i = this.indexOf(element);
	if (i > -1) this.splice(i, 1);
};