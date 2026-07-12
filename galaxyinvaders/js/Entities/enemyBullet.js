define(['../constants',
  '../../lib/gameEngine/sceneObject'],

  function(Constants, SceneObject, BasicObject) {

    function EnemyBullet(x, y) {
      this.x = x;
      this.y = y;
      this.width = Constants.ENEMY_BULLET_WIDTH;
      this.height = Constants.ENEMY_BULLET_HEIGHT;
      this.color = Constants.ENEMY_BULLET_COLOR;
      this.velocity = Constants.ENEMY_BULLET_SPEED;
      this.type = 'EnemyBullet';
    }

    EnemyBullet.prototype = new SceneObject();

    EnemyBullet.prototype.draw = function(c) {
      c.fillStyle = this.color;
      c.fillRect(this.x, this.y, this.width, this.height);
    };

    EnemyBullet.prototype.update = function (dt) {
      this.x += this.velocity.x;
      this.y += this.velocity.y;

      if (this.y >= Constants.WINDOW_HEIGHT) {
        this.scene.removeObject(this);
      }
    };

    EnemyBullet.prototype.keyDown = function(key) {};

    return EnemyBullet;
  }
);
