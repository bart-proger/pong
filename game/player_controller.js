
// PlayerController


var PlayerController = function(owner) {

	Controller.apply(this, arguments);

};

PlayerController.prototype = Object.create(Controller.prototype);
PlayerController.prototype.constructor = PlayerController;

PlayerController.prototype.onUpdate = function() {
	if (input.isKeyDown("ArrowDown")) {
		this.owner.position.add(new Point(0, 10));
	}
	if (input.isKeyDown("ArrowUp")){
		this.owner.position.add(new Point(0, -10));
	}
	//console.log(this.owner.bbox.x + " " + this.owner.bbox.y);
};