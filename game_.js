

var field = {
  x: 0,
  y: 0,
  w: width,
  h: height
};

const PLAYER_WIDTH = 5;
const PLAYER_HEIGHT = 80;
var player1 = {
  x: 45,
  y: (height - PLAYER_HEIGHT) / 2,
  score: 0,
  rect: function() {
    return {
      x: this.x,
      y: this.y,
      w: PLAYER_WIDTH,
      h: PLAYER_HEIGHT
    };
  }
};
var player2 = {
  x: width - 50,
  y: (height - PLAYER_HEIGHT) / 2,
  score: 0,
  rect: function() {
    return {
      x: this.x,
      y: this.y,
      w: PLAYER_WIDTH,
      h: PLAYER_HEIGHT
    };
  }
};

function checkCollision() {
  var br = ball.rect();
  if (br.x < field.x)
    goal(player2);
  if (br.x + br.w > field.x + field.w)
    ball.vx *= -1;
  //		goal(player1);
  if (br.y < field.y || br.y + br.h > field.y + field.h)
    ball.vy *= -1;
}

function checkHit() {
    /*if (rectxrect(ball.rect(), {x: player1.x, y: player1.y, w: PLAYER_WIDTH, h: 1}) ||
        rectxrect(ball.rect(), {x: player1.x, y: player1.y+PLAYER_HEIGHT, w: PLAYER_WIDTH, h: 1})){
      if (!ball.contact)
        ball.vy *= -1;
      ball.contact = true;
    }
    else */if (rectxrect(ball.rect(), player1.rect())) {
    if (!ball.contact)
      ball.vx *= -1;
    ball.contact = true;
  }
  else
    ball.contact = false;
}

function goal(player) {
  player.score += 1;
  ball.reset();
}

function input() { }

function update() {
  ball.move();
  checkHit();
  checkCollision();
}

function draw() {
  color("green");
  fillrect(field);
  color("white");
  drawline(width / 2, 0, width / 2, height);
  fillcircle(ball.x, ball.y, ball.r);

  var score = player1.score + "   " + player2.score;
  font("normal 40pt Calibri");
  context.textAlign = "center";
  drawtext(score, (width / 2), 60);
  fillrect(player1.x, player1.y, PLAYER_WIDTH, PLAYER_HEIGHT);
  fillrect(player2.x, player2.y, PLAYER_WIDTH, PLAYER_HEIGHT);

  /*
  color("red");
  if (ball.contact){
    fillrect(player1.rect());
    fillrect(ball.rect());
  }
  else {
    drawrect(player1.rect());
    drawrect(ball.rect());
  }*/
}





