
// AiController


function AiController(owner) {
	Controller.call(this, owner);

	this.imageNet = new NeuralNet("img");
	this.knowledgeNet = new NeuralNet("knw");
	this.prevImages = [];

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

	if (this.owner.position.y-20 < ball.position.y-1)	
		bottom = 1;
	if (this.owner.position.y-20 > ball.position.y+1)	
		top = 1;
	if (Math.abs(this.owner.position.y-20 - ball.position.y) <= 3) 
		middle = 1;
	if (Math.abs(this.owner.position.x - ball.position.x) < (width / 2))
		near = 1;
	else 
		far = 1;
	if (this.owner === ball.pitcher) 
		pitcher = 1;
	if (ball.position.x-10 > this.owner.position.x)
		++fail;// = 1;
	else
		fail = 0;

	var action = {name: "idle", output: 1};
	
//-------------
	if (ball.position.x > (width / 2)) {
		if (this.owner.position.y-20 < ball.position.y) {
			this.owner.position.y += 5 ;
			action.name = "down";
		}
		if (this.owner.position.y-20 > ball.position.y){
			this.owner.position.y -= 5 ;
			action.name = "up";
		}
		if (this.owner === ball.pitcher) {
			ball.pitcher = null;
			action.name = "pitch";
		}
	}
//-------------

	this.imageNet.inputSignals([
		{name: "top", output: top}, 
		//{name: "middle", output: middle},
		{name: "bottom", output: bottom},
		//{name: "far", output: far},
		//{name: "near", output: near},
		{name: "pitcher", output: pitcher},
		{name: "fail", output: fail === 1 ? 1 : 0}
	]);
	//this.prevImages = this.imageNet.outputSignals();
	var images = this.imageNet.update();
	
	this.prevImages.forEach(pimg => {
		images.forEach(img => {
			var signals = [pimg, action, img];
			this.knowledgeNet.inputSignals(signals/*this.prevImages.concat(images)*/);
			this.knowledgeNet.update(1);
		});
	});

	(this.prevImages = images).forEach(img => img.name = "p-" + img.name);
};
AiController.prototype.onShowDbgInfo = function() {
	this.imageNet.onShowDbgInfo(20, 50, 200);
	this.knowledgeNet.onShowDbgInfo(20, 300, 300);
};