//------------
//	Graphics
//------------

var /*canvas, context,*/ width, height;
var texture = new Image();
texture.src = "texture.png";



var Graphics = new function(){

	this.canvas = null;
	this.context = null;
	//var width, height;

	var _this = this;
	this.createCanvas = function(w, h, color) {
		_this.canvas = document.createElement("canvas");
		_this.canvas.style = "border:1px solid black;background-color:" + color;
		width = _this.canvas.width = w;
		height = _this.canvas.height = h;
		document.body.insertBefore(_this.canvas, document.body.childNodes[0]);
		_this.context = _this.canvas.getContext("2d");
	};

	this.drawSprite = function(textureRect, x, y, w, h) {
		_this.context.drawImage(texture, textureRect.x, textureRect.y, textureRect.w, textureRect.h, x, y, w, h);
	};
	
	this.clear = function() {
		_this.context.clearRect(0, 0, width, height);
	};
	
	this.color = function(c) {
		_this.context.fillStyle = c;
		_this.context.strokeStyle = c;
	};
	this.font = function(f) {
		_this.context.font = f;
	};
	this.fillRect = function(x, y, w, h) {
		if (x.x != undefined)
			_this.context.fillRect(x.x, x.y, x.w, x.h);
		else
			_this.context.fillRect(x, y, w, h);
	};
	this.drawRect = function(x, y, w, h) {
		if (x.x != undefined)
			_this.context.strokeRect(x.x, x.y, x.w, x.h);
		else
			_this.context.strokeRect(x, y, w, h);
	};
	this.fillCircle = function(x, y, r) {
		_this.context.beginPath();
		_this.context.arc(x, y, r, 0, 2 * Math.PI);
		_this.context.fill();
	};
	this.drawCircle = function(x, y, r) {
		_this.context.beginPath();
		_this.context.arc(x, y, r, 0, 2 * Math.PI);
		_this.context.stroke();
	};
	this.drawText = function(text, x, y, align) {
		_this.context.textAlign = align ? align : "left";
		_this.context.fillText(text, x, y);
	};
	this.textWidth = function(text) {
		return _this.context.measureText(text).width;
	};
	this.drawLine = function(x1, y1, x2, y2) {
		_this.context.beginPath();
		_this.context.moveTo(x1, y1);
		_this.context.lineTo(x2, y2);
		_this.context.stroke();
	};
	this.drawCurve = function(xb, yb, x1, y1, x2, y2, xe, ye) {
		this.context.beginPath();
		this.context.moveTo(xb, yb);
		if (!xe && !ye)
			this.context.quadraticCurveTo(x1, y1, x2, y2);
		else
			this.context.bezierCurveTo(x1, y1, x2, y2, xe, ye);
		this.context.stroke();
	};
};


/*
var drawSprite = function(sprite, x, y) {
	var f = sprite.frames[sprite.frameIndex];
	context.drawImage(texture, f.x, f.y, f.w, f.h, x, y, f.w, f.h);
	//console.log(f);
};

function createCanvas(w, h, color) {
	canvas = document.createElement("canvas");
	canvas.style = "border:1px solid black;background-color:" + color;
	width = canvas.width = w;
	height = canvas.height = h;
	document.body.insertBefore(canvas, document.body.childNodes[0]);
	context = canvas.getContext("2d");
};
*/
