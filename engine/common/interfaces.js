// Все интерфейсы и абстрактные классы


function Updatable () {}
Updatable.prototype.onUpdate = function(dt) {};


function Transformable() {
	this.position = new Point(0, 0);
	this.rotation = 0;
	this.scale = new Point(1, 1);
	
}