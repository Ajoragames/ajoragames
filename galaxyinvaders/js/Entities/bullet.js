define(['../constants',
  '../../lib/gameEngine/sceneObject'],

  function(Constants, SceneObject, BasicObject) {

    function Bullet(x, y) {
      this.x = x;
      this.y = y;
      this.width = Constants.BULLET_WIDTH;
      this.height = Constants.BULLET_HEIGHT;
      this.color = Constants.BULLET_COLOR;
      this.velocity = Constants.BULLET_SPEED;
      this.type = 'Bullet';
    }

    Bullet.prototype = new SceneObject();

    Bullet.prototype.draw = function(c) {
      c.fillStyle = this.color;
      c.fillRect(this.x, this.y, this.width, this.height);
    };

    Bullet.prototype.update = function (dt) {
      this.x += this.velocity.x;
      this.y += this.velocity.y;

      if (this.y < 0) {
        this.scene.removeObject(this);
      }
    };

    Bullet.prototype.keyDown = function(key) {};

    return Bullet;
  }
);
