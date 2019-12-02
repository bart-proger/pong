
  /////////////////
 //  GameScene  //
/////////////////


function GameScene(name) {
    
    this.name = name;
    this.objects = [];
    
};

//GameScene.prototype.onEnter = function() {}
//GameScene.prototype.onExit = function() {}

GameScene.prototype.addObject = function(gameObject) {
    if (gameObject instanceof GameObject && !this.objects.includes(gameObject)) {
        this.objects.push(gameObject);
    }
};
GameScene.prototype.getObject = function(name) {
    return (this.objects.find(function(o) {
        return o.name === name;
    }));
};
//TODO: вынести определение столкновений

GameScene.prototype.checkCollisions = function() {
    for (var i = 0; i < this.objects.length-1; i++) {
        for (var j = i+1; j < this.objects.length; j++) {
            var a = this.objects[i],
                b = this.objects[j];
            if (a.collider && b.collider) {
                var contacted = a.collider.contacts.includes(b); 
                if (a.collider.intersect(b.collider)) {
                    if (!contacted) {
                        a.collider.contacts.push(b);
                        b.collider.contacts.push(a);
                        if (a.onCollisionEnter) a.onCollisionEnter(b);
                        if (b.onCollisionEnter) b.onCollisionEnter(a);
                    }
                    if (a.onCollision) a.onCollision(b);  
                    if (b.onCollision) b.onCollision(a);
                } 
                else if (contacted) {
                    a.collider.contacts.remove(b);
                    b.collider.contacts.remove(a);
                    if (a.onCollisionExit) a.onCollisionExit(b);  
                    if (b.onCollisionExit) b.onCollisionExit(a);
                }
            }
        }
    }
};

GameScene.prototype.update = function() {
    this.objects.forEach(function(o) {
        if (o.controller) o.controller.onUpdate();
    });
    this.checkCollisions();
    this.objects.forEach(function(o) {
        if (o.onUpdate) o.onUpdate();
    });
};
GameScene.prototype.draw = function() {
    this.objects.forEach(function(o) {
        if (o.sprite) {
            var sw = o.sprite.textureRect.w * o.sprite.scale.x,
                sh = o.sprite.textureRect.h * o.sprite.scale.y;
            Graphics.drawSprite(o.sprite.textureRect, 
                                o.position.x + o.sprite.position.x - sw/2, 
                                o.position.y + o.sprite.position.y - sh/2, 
                                sw, sh);
        }
        if (o.onDraw) o.onDraw();
        if (Game.isDebug) {
            o.showDbgInfo();
            if (o.onShowDbgInfo) o.onShowDbgInfo();
        }
    }, this); 
};