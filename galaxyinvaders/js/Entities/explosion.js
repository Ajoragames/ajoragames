define([
  '../constants',
  '../../lib/gameEngine/sceneObject'],
  function (Constants, SceneObject) {

    function Explosion(x, y, animation) {
      this.x = x;
      this.y = y;
      this.animationFrames = animation;
      this.time = 0;
      this.currentFrame = 0;
    }

    Explosion.prototype = new SceneObject();

    Explosion.prototype.draw = function(c) {
      var frame = this.animationFrames[this.currentFrame];
      var image = this.scene.game.imageManager.get(
        Constants.SPRITE_SHEET);
      c.drawImage(image,
        frame.x,
        frame.y,
        frame.width,
        frame.height,
        this.x - ((frame.width / 2) * Constants.EXPLOSION_SCALE),
        this.y - ((frame.height /2) * Constants.EXPLOSION_SCALE),
        frame.width * Constants.EXPLOSION_SCALE,
        frame.height * Constants.EXPLOSION_SCALE);
    };

    Explosion.prototype.update = function (dt) {
      this.time += dt;

      if (this.time > Constants.EXPLOSION_ANIMATION_TIME) {
        this.time = 0;
        this.currentFrame += 1;

        if (this.currentFrame >= this.animationFrames.length) {
          this.scene.removeObject(this);
        }
      }
    };

    Explosion.prototype.keyDown = function (key) {};

    return Explosion;
  }
);
