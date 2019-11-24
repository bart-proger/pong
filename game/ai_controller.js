
// AiController


function AiController(owner) {

	Controller.apply(this, arguments);

};

AiController.prototype = Object.create(Controller.prototype);
AiController.prototype.constructor = AiController;

AiController.prototype.onUpdate = function() {
    var ball = Game.getObject("ball");
	if (this.owner.position.y < ball.position.y) {
		this.owner.position.y += 10;
	}
	else if (this.owner.position.y > ball.position.y){
		this.owner.position.y -= 10;
    }
    else if (this === ball.pitcher) {
        
    }
	//console.log(this.owner.bbox.x + " " + this.owner.bbox.y);
};