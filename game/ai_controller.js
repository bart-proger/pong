
// AiController


function AiController(owner) {
	Controller.call(this, owner);

	this.neuron = new Neuron(5);
	console.log(this.neuron.toString());

};
AiController.prototype = Object.create(Controller.prototype);
AiController.prototype.constructor = AiController;

AiController.prototype.onUpdate = function() {
	var ball = Game.getCurrentScene().getObject("ball");
	if (ball.position.x > (width / 2)) {
		if (this.owner.position.y-20 < ball.position.y) {
			this.owner.position.y += 3.5;
		}
		if (this.owner.position.y-20 > ball.position.y){
			this.owner.position.y -= 3.5;
		}
		if (this.owner === ball.pitcher) {
			ball.pitcher = null;
		}
	}

	if (Input.isKeyDown("KeyN")) {
		this.neuron.update([Math.randomRange(0,2), 
			Math.randomRange(0,2), 
			Math.randomRange(0,2), 
			Math.randomRange(0,2),
			Math.randomRange(0,2)]);
		console.log(this.neuron.toString());
	}
};