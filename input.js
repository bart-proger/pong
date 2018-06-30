//----------
//	Input
//----------


var input = {

	keys: [],
	mousePosition: null,

	isKeyDown: function(key) {
		return this.keys[key] && (this.keys[key] === "down"/* || this.keys[key] === "press"*/);
	},
	isKeyUp: function(key) {
		return this.keys[key] && (this.keys[key] === "up");
	}

};

document.addEventListener("keydown", function(e) {
	input.keys[e.code] = "down";
});
document.addEventListener("keyup", function(e) {
	input.keys[e.code] = "up";
});