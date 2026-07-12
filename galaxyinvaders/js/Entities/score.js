define(['../constants',
  '../../lib/gameEngine/Entities/staticText'],
  function(Constants, StaticText) {

    function Score(x, y, color, font) {
      this.x = x;
      this.y = y;
      this.text = 0;
      this.color = color;
      this.font = font;
    };

    Score.prototype = StaticText.prototype;

    Score.prototype.draw = function(c) {
      c.fillStyle = this.color;
      c.font = this.font;
      c.fillText("Score : " + this.text, this.x, this.y);
    };

    Score.prototype.increment = function() {
      this.text += 10;
    };

    return Score;
  }
);
