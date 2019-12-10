
  ////////////
 //  Game  //
////////////

var Game = new function() {
	
	this.isDebug = false;
	this.objects = [];
	this.framesCount = 0;
	
	var scenes = [];
	var currentScene = null;
	var _this = this;

	this.getCurrentScene = function() {
		return currentScene;
	};
	this.addScene = function(gameScene) {
		if (gameScene instanceof GameScene && !scenes.includes(gameScene)) {
			scenes.push(gameScene);
		}
	};
	this.getScene = function(name) {
		return (scenes.find(function(s) {
			return s.name === name;
		}));
	};
	this.gotoScene = function(name) {
		if (currentScene && currentScene.onExit) currentScene.onExit();
		currentScene = this.getScene(name);
		if (currentScene && currentScene.onEnter) currentScene.onEnter();
	};
	this.addObject = function(gameObject) {
		if (gameObject instanceof GameObject && !this.objects.includes(gameObject)) {
			this.objects.push(gameObject);
		}
	};
	this.getObject = function(name) {
		return (this.objects.find(function(o) {
			return o.name === name;
		}));
	};
	this.start = function(sceneName) {
		this.gotoScene(sceneName);
		var frame = function(dt) {
			if (currentScene) {
				currentScene.update();
//TODO: перенести в нужный scene
				Graphics.clear();
				Graphics.color('green');
				Graphics.fillRect(0, 0, width, height);
				Graphics.color("darkgrey");
				Graphics.font("15px Arial");
				Graphics.drawText(_this.framesCount, 5, height-5);
//---
				currentScene.draw();
			}
			++_this.framesCount;
		};
		setInterval(frame, 0);
		//window.requestAnimationFrame(frame);
	};

};