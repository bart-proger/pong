//----------
//	Input
//----------

var Input = new function(){

	var keys = [];
	var mousePosition = null;

	this.isKeyDown = function(key) {
		return keys[key] && (keys[key] === "down");
	};
	this.isKeyUp = function(key) {
		return keys[key] && (keys[key] === "up" || this.keys[key] === "press");
	};
	this.isKeyPress = function(key) {
		return keys[key] && (keys[key] === "press");
	}

	window.addEventListener("keydown", function(e) {
		keys[e.code] = "down";
	});
	window.addEventListener("keyup", function(e) {
		if (keys[e.code] === "down")
			keys[e.code] = "press";
		else
			keys[e.code] = "up";
	});
};