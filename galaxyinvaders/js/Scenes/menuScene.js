define(['../constants', '../../lib/gameEngine/scene',
  '../../lib/gameEngine/Entities/basicObject',
  '../../lib/gameEngine/Entities/staticText',
  '../../lib/gameEngine/Entities/staticImage',
  '../Entities/starfield'],
  function(Constants, Scene, BasicObject, StaticText, StaticImage,
    StarField) {

  var menuScene = new Scene();

  menuScene.init = function() {

    this.sceneObjects = [];

    var background = new StarField(Constants.STARFIELD_SPEED, Constants.STARFIELD_STARS);

    var startText = new StaticText(Constants.START_TEXT_X, Constants.START_TEXT_Y,
      Constants.START_TEXT_TEXT, Constants.START_TEXT_COLOR,
      Constants.START_TEXT_FONT);

    startText.keyDown = function(key) {
      if (key === Constants.GAME_START_KEY) {
        this.scene.game.fullScreen();
        this.scene.game.startScene('game');
      }
    };

    var controlsText = new StaticText(Constants.CONTROLS_TEXT_X,
      Constants.CONTROLS_TEXT_Y,
      Constants.CONTROLS_TEXT_TEXT, Constants.CONTROLS_TEXT_COLOR,
      Constants.CONTROLS_TEXT_FONT);

    this.addObject(background);
    this.addObject(startText);
    this.addObject(controlsText);
  }

  menuScene.postUpdate = function() {};

  return menuScene;
});
