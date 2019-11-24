//----------
//	Game
//----------

var Game = new function() {
	
	this.isDebug = false;
	this.objects = [];
	
	var states = [];
	var currentState = null;

	this.getState = function(name) {
		return (states.find(function(s) {
			return s.name === name;
		}));
	};
	this.gotoState = function(name) {
		if (currentState && currentState.onExit) currentState.onExit();
		currentState = this.getState(name);
		if (currentState && currentState.onEnter) currentState.onEnter();
	};
	this.addObject = function(object) {
		if (object instanceof GameObject) {
			this.objects.push(object);
		}
	};
	this.getObject = function(name) {
		return (this.objects.find(function(o) {
			return o.name === name;
		}));
	};
	this.start = function() {
		var frame = function(dt) {
			if (currentState) {
				currentState.update();
//TODO: перенести в нужный state
				Graphics.clear();
				Graphics.color('green');
				Graphics.fillRect(0, 0, width, height);
//---
				currentState.draw();
			}
		};
		setInterval(frame, 16);
	};

};