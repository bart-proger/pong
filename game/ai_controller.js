
// AiController


function AiController(owner) {
	Controller.call(this, owner);

	this.images = new NeuralNet(6);
	this.knowledges = new NeuralNet();
};
AiController.prototype = Object.create(Controller.prototype);
AiController.prototype.constructor = AiController;

var fail;

AiController.prototype.onUpdate = function() {
	var ball = Game.getCurrentScene().getObject("ball");
	var top = 0,
		middle = 0,
		bottom = 0,
		far = 0,
		near = 0, 
		pitcher = 0;

	if (this.owner.position.y-20 < ball.position.y)	
		bottom = 1;
	if (this.owner.position.y-20 > ball.position.y)	
		top = 1;
	if (Math.abs(this.owner.position.y-20 - ball.position.y) < 1) 
		middle = 1;
	if (Math.abs(this.owner.position.x - ball.position.x) < (width / 2))
		near = 1;
	else 
		far = 1;
	if (this.owner === ball.pitcher) 
		pitcher = 1;
	if (ball.position.x > this.owner.position.x)
		++fail;// = 1;
	else
		fail = 0;
	this.images.inputSignals([top, middle, bottom, far, near, /*pitcher,*/ fail === 1 ? 1 : 0]);
	this.images.update();

//-------------
	if (ball.position.x > (width / 2)) {
		if (this.owner.position.y-20 < ball.position.y) {
			this.owner.position.y += 2.5 + (Math.random()-0.5)*3;
		}
		if (this.owner.position.y-20 > ball.position.y){
			this.owner.position.y -= 2.5 + (Math.random()-0.5)*3;
		}
		if (this.owner === ball.pitcher) {
			ball.pitcher = null;
		}
	}
};
AiController.prototype.onShowDbgInfo = function() {
	this.images.onShowDbgInfo(20, 50);
};