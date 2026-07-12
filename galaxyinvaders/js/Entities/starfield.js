define(['../constants',
  '../../lib/gameEngine/sceneObject'], function(Constants, SceneObject) {

    function StarField(speed, stars) {
      this.x = 0;
      this.y = 0;
      this.width = Constants.WINDOW_WIDTH;
      this.height = Constants.WINDOW_HEIGHT;

      this.imagey = 0;
      this.speed = speed;
      this.bufferedImage = document.createElement('canvas');
      this.bufferedImage.width = Constants.WINDOW_WIDTH;
      this.bufferedImage.height = Constants.WINDOW_HEIGHT;
      this.bufferedCtx = this.bufferedImage.getContext && this.bufferedImage.getContext('2d');

      this.bufferedCtx.fillStyle = Constants.STARFIELD_BACKGROUND_COLOR;
      this.bufferedCtx.fillRect(0, 0, Constants.WINDOW_WIDTH, Constants.WINDOW_HEIGHT);

      for (var x = 0; x < stars; x++) {
        var randX = Math.floor((Math.random() * Constants.WINDOW_WIDTH) + 1);
        var randY = Math.floor((Math.random() * Constants.WINDOW_HEIGHT) + 1);

        this.bufferedCtx.fillStyle = Constants.STAR_COLOR;
        this.bufferedCtx.fillRect(randX, randY, Constants.STAR_SIZE, Constants.STAR_SIZE);
      }

      this.type = 'Starfield';
    }

    StarField.prototype = new SceneObject();

    StarField.prototype.update = function (dt) {
      this.imagey -= (dt * this.speed);

      if (this.imagey <= 1) {
        this.imagey = Constants.WINDOW_HEIGHT - 1;
      }
    };

    StarField.prototype.draw = function (c) {
      c.drawImage(this.bufferedImage, 0, this.imagey, this.width, this.height -
        this.imagey, this.x, this.y, this.width, this.height - this.imagey);

      c.drawImage(this.bufferedImage, 0, 0, this.width, this.imagey,
        this.x, this.y + this.height - this.imagey, this.width, this.imagey);
    };

    return StarField;
});
