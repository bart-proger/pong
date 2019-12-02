
// AiController


function AiController(owner) {
	Controller.call(this, owner);

};
AiController.prototype = Object.create(Controller.prototype);
AiController.prototype.constructor = AiController;

AiController.prototype.onUpdate = function() {
    var ball = Game.getCurrentScene().getObject("ball");
	if (this.owner.position.y-20 < ball.position.y) {
		this.owner.position.y += 4;
	}
	if (this.owner.position.y-20 > ball.position.y){
		this.owner.position.y -= 4;
    }
    if (this.owner === ball.pitcher) {
		ball.pitcher = null;
    }
	//console.log(this.owner.bbox.x + " " + this.owner.bbox.y);
};