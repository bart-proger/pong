
// PlayerController


function PlayerController(owner) {

	Controller.apply(this, arguments);

};

PlayerController.prototype = Object.create(Controller.prototype);
PlayerController.prototype.constructor = PlayerController;

PlayerController.prototype.onUpdate = function() {
	if (Input.isKeyDown("ArrowDown")) {
		this.owner.position.y += 5;
	}
	if (Input.isKeyDown("ArrowUp")){
		this.owner.position.y += -5;
	}
	var ball = Game.getCurrentScene().getObject("ball");
	if (this.owner === ball.pitcher && Input.isKeyDown("Space")) {
		ball.pitcher = null;
	}
};