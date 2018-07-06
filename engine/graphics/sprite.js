//-----------
//	Sprite
//-----------


function Sprite(tx, ty, tw, th, framesInRow, framesInCol) {

	this.position = null;

	this.textureRegion = null;
	this.frames = [];
	this.frameIndex = 0;
	this.frameSize = null;
	
	if (tx !== undefined) {
		this.textureRegion = new Rect(tx, ty, tw, th);

		//	создние кадров
		this.frameSize = new Size(Math.floor(this.textureRegion.w / framesInRow), 
								  Math.floor(this.textureRegion.h / framesInCol));
		this.position = new Point(-this.frameSize.w / 2, -this.frameSize.h / 2);

		for(var j = 0; j < framesInCol; j++) {
			for(var i = 0; i < framesInRow; i++) {
				this.frames.push(new Rect(i*this.frameSize.w + this.textureRegion.x, j*this.frameSize.h + this.textureRegion.y, this.frameSize.w, this.frameSize.h));
			}
		}
	}
};