define([], function() {

  function Vector2(x, y) {
    this.x = x;
    this.y = y;
  }

  Vector2.prototype.magnitude = function() {
    return Math.sqrt((this.x * this.x) + (this.y * this.y));
  };

  Vector2.prototype.unit = function() {
    return new Vector2(this.x / this.magnitude(), this.y / this.magnitude());
  };

  Vector2.prototype.add = function(vector) {
    return new Vector2(
      this.x + vector.x,
      this.y + vector.y
    );
  };

  Vector2.prototype.multiply = function(scalar) {
    return new Vector2(
      this.x * scalar,
      this.y * scalar
    );
  };

  return Vector2;
});
