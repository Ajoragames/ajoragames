define([], function() {

  function Rectangle(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  Rectangle.prototype.intersects = function(rect) {
    var x1 = this.x;
    var y1 = this.y;
    var x2 = this.x + this.width;
    var y2 = this.y + this.height;

    var _x1 = rect.x;
    var _y1 = rect.y;
    var _x2 = rect.x + rect.width;
    var _y2 = rect.y + rect.height;

    return (_x2 >= x1 && _x1 <= x2) && (_y2 >= y1 && _y1 <= y2);
  };

  return Rectangle;
});
