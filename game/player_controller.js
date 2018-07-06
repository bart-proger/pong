
// PlayerController


function PlayerController(owner) {

	Controller.apply(this, arguments);

};

PlayerController.prototype = Object.create(Controller.prototype);
PlayerController.prototype.constructor = PlayerController;

PlayerController.prototype.onUpdate = function() {
	if (Input.isKeyDown("ArrowDown")) {
		this.owner.position.y += 10;
	}
	if (Input.isKeyDown("ArrowUp")){
		this.owner.position.y += -10;
	}
	//console.log(this.owner.bbox.x + " " + this.owner.bbox.y);
};