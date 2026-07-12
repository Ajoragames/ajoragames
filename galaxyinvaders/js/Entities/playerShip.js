define([
  '../constants',
  '../../lib/gameEngine/sceneObject',
  './bullet',
  ], function (Constants, SceneObject, Bullet) {

    function PlayerShip(image) {
      this.x = Constants.PLAYER_START_X;
      this.y = Constants.PLAYER_START_Y;
      this.width = Constants.SHIP_WIDTH;
      this.height = Constants.SHIP_HEIGHT;
      this.type = 'Ship';
      this.image = image;
      this.rect = Constants.SHIP_SPRITE;
    }

    PlayerShip.prototype = new SceneObject();

    PlayerShip.prototype.draw = function(c) {

      c.drawImage(this.image, this.rect.x, this.rect.y,
        this.rect.width, this.rect.height,
        this.x, this.y, this.width, this.height);
    };

    PlayerShip.prototype.keyDown = function (key) {
      if (key === 37) {
        this.x -= Constants.SHIP_SPEED;
      } else if (key === 39) {
        this.x += Constants.SHIP_SPEED;
      } else if (key === 32) {
        var bLeft = new Bullet(this.x, this.y);
        var bRight = new Bullet(this.x + this.width, this.y);
        this.scene.addObject(bLeft);
        this.scene.addObject(bRight);
        this.scene.game.soundManager.play(Constants.FIRING_SOUND);
      }
    };

    return PlayerShip;
  }
);
