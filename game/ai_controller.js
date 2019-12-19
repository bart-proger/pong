
// AiController


function AiController(owner) {
	Controller.call(this, owner);

	this.imageNet = new NeuralNet("I-");
	this.knowledgeBase = new KnowledgeBase();
	this.prevImages = [{name: "--I-top", output: 1}];
	this.prevAction = {name: "A-idle", output: 1};
	this.nextActions = [];
	this.action = {name: "A-idle", output: 1};

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

	if (this.owner === ball.pitcher) 
		pitcher = 1;
	//else {
		if (this.owner.position.y-20 < ball.position.y-1)	
			bottom = 1;
		if (this.owner.position.y-20 > ball.position.y+1)	
			top = 1;
		if (Math.abs(this.owner.position.y-20 - ball.position.y) <= 3) 
			middle = 1;
	//}
	if (ball.position.x > (width / 2))
		near = 1;
	else 
		far = 1;
	if (ball.position.x-10 > this.owner.position.x)
		++fail;// = 1;
	else
		fail = 0;

	this.imageNet.inputSignals([
		{name: "I-top", output: top},
		{name: "I-mddl", output: middle},
		{name: "I-bttm", output: bottom},
		{name: "I-far", output: far},
		{name: "I-near", output: near},
		{name: "I-ptcr", output: pitcher},
		{name: "I-fail", output: fail === 1 ? 1 : 0}
	]);
	//this.prevImages = this.imageNet.outputSignals();
	var images = this.imageNet.update();

	this.prevAction = this.action;
	this.nextActions = []
	this.prevImages.forEach(pimg => {
		images.forEach(img => {
			this.knowledgeBase.update(pimg, this.prevAction, img);
		});
	});
	images.forEach(img => {
		img.name = "--" + img.name;
		this.nextActions = this.nextActions.concat(this.knowledgeBase.getNextActions(img));
	});
	this.prevImages = images;

	this.nextActions = this.nextActions.unique((a, b) => a.name !== b.name);
	if (this.nextActions.length < 1) {
		/*this.nextActions = this.nextActions.concat([
			{name: "A-up", output: 1}, 
			{name: "A-down", output: 1}, 
			{name: "A-pitch", output: 1},
			{name: "A-idle", output: 1}
		]);*/
	}
	else
		this.action = this.nextActions[Math.randomRange(0, this.nextActions.length)];

	if (Input.isKeyDown("Space"))
		this.action = {name: "A-pitch", output: 1};
	if (Input.isKeyDown("ArrowUp"))
		this.action = {name: "A-up", output: 1};
	if (Input.isKeyDown("ArrowDown"))
		this.action = {name: "A-down", output: 1};
		
//-------------
	if (this.action)
	switch (this.action.name) {
		case "A-up":
			this.owner.position.y -= 10;
			break;
		case "A-down":
			this.owner.position.y += 10;
			break;
		case "A-pitch":
			ball.pitcher = null;;
			break;
		default:
			break;
	}

	//if (ball.position.x > (width / 2)) {
	//	if (this.owner.position.y-20 < ball.position.y) {
	//		this.owner.position.y += 5 ;
	//	} else
	//	if (this.owner.position.y-20 > ball.position.y){
	//		this.owner.position.y -= 5 ;
	//	}
	//	if (this.owner === ball.pitcher) {
	//		ball.pitcher = null;
	//	}
	//}
//-------------
};
AiController.prototype.onShowDbgInfo = function() {
	this.imageNet.onShowDbgInfo(20, 50, 600, 220);
	this.knowledgeBase.onShowDbgInfo(20, 300, 600, 300);
	if (this.action) {
		Graphics.color("Yellow");
		Graphics.font("14px Arial");
		Graphics.drawText(this.action.name, 100, 50, "right");
	}
	if (this.nextActions.length > 0) {
		Graphics.color("Aqua");
		Graphics.font("10px Arial");
		Graphics.drawText(this.nextActions.reduce((s,a)=>s+" "+a.name, ""), 150, 50);
		var a=0;
	}
};