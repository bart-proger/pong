//------------
//	Graphics
//------------

var canvas, context, width, height;
var texture = new Image();
texture.src = "texture.png";



var Graphics = new function(){

	//var canvas, context;
	//var width, height;

	this.createCanvas = function(w, h, color) {
		canvas = document.createElement("canvas");
		canvas.style = "border:1px solid black;background-color:" + color;
		width = canvas.width = w;
		height = canvas.height = h;
		document.body.insertBefore(canvas, document.body.childNodes[0]);
		context = canvas.getContext("2d");
	};

	this.drawSprite = function(textureRect, x, y, w, h) {
		context.drawImage(texture, textureRect.x, textureRect.y, textureRect.w, textureRect.h, x, y, w, h);
	};
	
};



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
function clear() {
	context.clearRect(0, 0, width, height);
};

function color(c) {
	context.fillStyle = c;
	context.strokeStyle = c;
}
function font(f) {
	context.font = f;
}
function fillRect(x, y, w, h) {
	if (x.x != undefined)
		context.fillRect(x.x, x.y, x.w, x.h);
	else
		context.fillRect(x, y, w, h);
}
function drawRect(x, y, w, h) {
	if (x.x != undefined)
		context.strokeRect(x.x, x.y, x.w, x.h);
	else
		context.strokeRect(x, y, w, h);
}
function fillCircle(x, y, r) {
	context.beginPath();
	context.arc(x, y, r, 0, 2 * Math.PI);
	context.fill();
}
function drawCircle(x, y, r) {
	context.beginPath();
	context.arc(x, y, r, 0, 2 * Math.PI);
	context.stroke();
}
function drawText(text, x, y, align) {
	context.textAlign = align ? align : "left";
	context.fillText(text, x, y);
}
function textWidth(text) {
	return context.measureText(text).width;
}
function drawLine(x1, y1, x2, y2) {
	context.beginPath();
	context.moveTo(x1, y1);
	context.lineTo(x2, y2);
	context.stroke();
}
