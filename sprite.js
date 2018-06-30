//-----------
//	Sprite
//-----------


var Sprite = function(x, y, w, h, framesInRow, framesInCol) {

	this.textureRegion = null;
	this.framesInCol = 0;
	this.framesInRow = 0;
	this.frames = [];
	this.frameIndex = 0;
	this.frameW = 0;
	this.frameH = 0;
	
	if (x !== undefined) {
		this.textureRegion = new Rect(x, y, w, h);
		this.framesInCol = framesInCol;
		this.framesInRow = framesInRow;

		//	создние кадров
		this.frameW = Math.floor(this.textureRegion.w / this.framesInRow);
		this.frameH = Math.floor(this.textureRegion.h / this.framesInCol);
		for(var j = 0; j < this.framesInCol; j++) {
			for(var i = 0; i < this.framesInRow; i++) {
				this.frames.push(new Rect(i*this.frameW + this.textureRegion.x, j*this.frameH + this.textureRegion.y, this.frameW, this.frameH)); 
			}
		}
	}
};