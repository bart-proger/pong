//----------
//	Input
//----------

var Input = new function(){

		var keys = [];
		var mousePosition = null;
	
		this.isKeyDown = function(key) {
			return keys[key] && (keys[key] === "down"/* || this.keys[key] === "press"*/);
		};
		this.isKeyUp = function(key) {
			return keys[key] && (keys[key] === "up");
		};

		document.addEventListener("keydown", function(e) {
			keys[e.code] = "down";
		});
		document.addEventListener("keyup", function(e) {
			keys[e.code] = "up";
		});
};