
// AiController


function AiController(owner) {
	Controller.call(this, owner);

	this.net = new NeuralNet(5);
};
AiController.prototype = Object.create(Controller.prototype);
AiController.prototype.constructor = AiController;

AiController.prototype.onUpdate = function() {
	var top = 0,
		bottom = 0,
		middle = 0, 
		far = 0,
		near = 0, 
		pitcher = 0;

	var ball = Game.getCurrentScene().getObject("ball");

	if (this.owner.position.y-20 < ball.position.y)	
		bottom = 1;
	if (this.owner.position.y-20 > ball.position.y)	
		top = 1;
	if (Math.abs(this.owner.position.y-20 - ball.position.y) < 40) 
		middle = 1;
	if (Math.abs(this.owner.position.x - ball.position.x) < (width / 2))
		near = 1;
	else
		far = 1;
	if (this.owner === ball.pitcher) {
		pitcher = 1;
	}


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

	this.net.setInputs([top, bottom, near, far, pitcher]);
	//if (Input.isKeyDown("KeyN")) {
		this.net.update();
	//}
};
AiController.prototype.onShowDbgInfo = function() {
	this.net.onShowDbgInfo();
};