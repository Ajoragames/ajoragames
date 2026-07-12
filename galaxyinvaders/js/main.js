(function() {

  requirejs.config({
    urlArgs: "bust=" + (new Date()).getTime()
  });

  var dependencies = [
    '../lib/gameEngine/game',
    'constants',
    'Scenes/menuScene',
    'Scenes/gameScene'];

  require(dependencies, function(Game, Constants, menuScene, gameScene) {

    var game = new Game('game', Constants.WINDOW_WIDTH,
      Constants.WINDOW_HEIGHT, Constants.FPS, 7);

    game.addScene('menu', menuScene);
    game.addScene('game', gameScene);

    var loader = document.getElementById('loader-wrapper');

    function loadImages() {
      game.imageManager.preLoad(Constants.ALL_IMAGES, function() {
        // Start Game
        loader.parentElement.removeChild(loader);
        game.startScene('menu');
      });
    }
    // Load Sounds
    if (game.soundManager !== undefined) {
      game.soundManager.preLoad(Constants.ALL_SOUNDS, loadImages);
    } else {
      loadImages();
    }
  });

})();
