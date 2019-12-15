
  ////////////
 //  MAIN  //
////////////


!function () {

	Graphics.createCanvas(600, 600, "grey");

	Game.isDebug = true;

	var ball = new Ball(width / 2, height / 2);
	//ball.sprite = new Sprite(img, new Rect(0, 0, 16, 16));
	//ball.collider = new BoxCollider(-8, -8, 16, 16);

	var racketLeft = new Racket("racket-left", 50, height/2, new Point(1, 0));
	racketLeft.collider.box.y -= racketLeft.collider.box.h / 4;
	racketLeft.collider.box.w /= 5;
	racketLeft.collider.box.x = -racketLeft.collider.box.w + 7;
	racketLeft.sprite = new Sprite(new Rect(19, 0, 47, 121));
	racketLeft.sprite.position.x += -5;

	racketLeft.controller = new PlayerController(racketLeft);

	var racketRight = new Racket("racket-right", width - 50, height/2, new Point(-1, 0));
	racketRight.collider.box.y -= racketRight.collider.box.h / 4;
	racketRight.collider.box.w /= 5;
	racketRight.collider.box.x = 0 - 7;
	racketRight.sprite = new Sprite(new Rect(81, 0, 47, 121));
	racketRight.sprite.position.x += 5;

	racketRight.controller = new AiController(racketRight);

	var scenePlay = new GameScene("scene-play");
	scenePlay.addObject(new GameObject("bottom", width/2, height + 10/2, width, 10));
	scenePlay.addObject(new GameObject("left", -10/2, height/2, 10, height));
	scenePlay.addObject(new GameObject("top", width/2, -10/2, width, 10));
	scenePlay.addObject(new GameObject("right", width + 10/2, height/2, 10, height));
	scenePlay.addObject(racketLeft);
	scenePlay.addObject(racketRight);
	scenePlay.addObject(ball);
	scenePlay.addObject(new Score());

	scenePlay.showObjects = true;

	Game.addScene(scenePlay);
	Game.start("scene-play");

}();