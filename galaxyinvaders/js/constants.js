define([
  '../lib/gameEngine/Utilities/rectangle',
  '../lib/gameEngine/Utilities/vector2',
  './Entities/movement'
  ],
  function(Rectangle, Vector2, Movement) {

  var Constants = {};

  // Window Constants
  Constants.WINDOW_WIDTH = 640;
  Constants.WINDOW_HEIGHT = 480;
  Constants.FPS = 30;

  // Background Constants
  Constants.BACKGROUND_COLOR = '#2c3e50';

  // Start Text Constants
  Constants.START_TEXT_X = 130;
  Constants.START_TEXT_Y = 220;
  Constants.START_TEXT_TEXT = 'Press Space to Start';
  Constants.START_TEXT_COLOR = '#2ecc71';
  Constants.START_TEXT_FONT = '40px Georgia';
  Constants.GAME_START_KEY = 32;

  // Controls Text
  Constants.CONTROLS_TEXT_X = 120;
  Constants.CONTROLS_TEXT_Y = 280;
  Constants.CONTROLS_TEXT_TEXT = 'Press Arrow Left and Right to move, press Space to fire.';
  Constants.CONTROLS_TEXT_COLOR = '#16a085';
  Constants.CONTROLS_TEXT_FONT = '15px Georgia';

  // Sounds
  Constants.SHIP_DESTROYED_SOUND = 'sounds/Ship_Destroyed.ogg';
  Constants.KILL_ENEMY_SOUND = 'sounds/Kill_Enemy_Sound.ogg';
  Constants.FIRING_SOUND = 'sounds/Firing_Sound.ogg';
  Constants.BACKGROUND_MUSIC = 'sounds/Background.ogg';
  Constants.ALL_SOUNDS = [
    Constants.SHIP_DESTROYED_SOUND, Constants.KILL_ENEMY_SOUND,
    Constants.FIRING_SOUND, Constants.BACKGROUND_MUSIC];

  // Images
  Constants.SPRITE_SHEET = 'images/sprite-sheet.png';
  Constants.ALL_IMAGES = [Constants.SPRITE_SHEET];

  // Ship
  Constants.SHIP_SPRITE = new Rectangle(165, 53, 15, 16);
  Constants.SHIP_WIDTH = 40;
  Constants.SHIP_HEIGHT = 42;
  Constants.SHIP_SPEED = 10;
  Constants.PLAYER_START_X = Constants.WINDOW_WIDTH / 2 - Constants.SHIP_WIDTH;
  Constants.PLAYER_START_Y = 400;

  // Starfield
  Constants.STAR_COLOR = '#FFF';
  Constants.STAR_SIZE = 2;
  Constants.STARFIELD_SPEED = 0.02
  Constants.STARFIELD_STARS = 200;
  Constants.STARFIELD_BACKGROUND_COLOR = '#000';

  // Bullet
  Constants.BULLET_WIDTH = 4;
  Constants.BULLET_HEIGHT = 8;
  Constants.BULLET_SPEED = new Vector2(0, -12);
  Constants.BULLET_COLOR = 'yellow';

  // Bullet
  Constants.ENEMY_BULLET_WIDTH = 4;
  Constants.ENEMY_BULLET_HEIGHT = 8;
  Constants.ENEMY_BULLET_SPEED = new Vector2(0, 12);
  Constants.ENEMY_BULLET_COLOR = 'red';
  Constants.ENEMY_BULLET_CHANCE = 800;

  // Enemy1
  Constants.ENEMY1_SPRITE1 = new Rectangle(167, 152, 13, 10);
  Constants.ENEMY1_SPRITE2 = new Rectangle(191, 152, 13, 10);
  Constants.ENEMY1_LEFT = new Rectangle(24, 151, 10, 13);
  Constants.ENEMY1_UP_LEFT = new Rectangle(43, 150, 12, 14);
  Constants.ENEMY1_UP = Constants.ENEMY1_SPRITE1;
  Constants.ENEMY1_UP_RIGHT = new Rectangle(63, 151, 14, 13);
  Constants.ENEMY1_RIGHT = new Rectangle(85, 151, 10, 13);
  Constants.ENEMY1_BOTTOM_RIGHT = new Rectangle(103, 150, 13, 14);
  Constants.ENEMY1_BOTTOM = new Rectangle(120, 152, 13, 10);
  Constants.ENEMY1_BOTTOM_LEFT = new Rectangle(142, 151, 14, 13);
  Constants.ENEMY1_MOVEMENT_SPRITES = {
    'left': Constants.ENEMY1_LEFT,
    'up left': Constants.ENEMY1_UP_LEFT,
    'up': Constants.ENEMY1_UP,
    'up right': Constants.ENEMY1_UP_RIGHT,
    'right': Constants.ENEMY1_RIGHT,
    'bottom right': Constants.ENEMY1_BOTTOM_RIGHT,
    'bottom': Constants.ENEMY1_BOTTOM,
    'bottom left': Constants.ENEMY1_BOTTOM_LEFT
  };

  Constants.ENEMY2_SPRITE1 = new Rectangle(167, 176, 13, 10);
  Constants.ENEMY2_SPRITE2 = new Rectangle(191, 176, 13, 10);
  Constants.ENEMY2_LEFT = new Rectangle(24, 175, 10, 13);
  Constants.ENEMY2_UP_LEFT = new Rectangle(42, 175, 13, 14);
  Constants.ENEMY2_UP = Constants.ENEMY2_SPRITE1;
  Constants.ENEMY2_UP_RIGHT = new Rectangle(63, 175, 14, 14);
  Constants.ENEMY2_RIGHT = new Rectangle(86, 176, 10, 14);
  Constants.ENEMY2_BOTTOM_RIGHT = new Rectangle(103, 175, 14, 14);
  Constants.ENEMY2_BOTTOM = new Rectangle(120, 177, 13, 10);
  Constants.ENEMY2_BOTTOM_LEFT = new Rectangle(143, 175, 15, 15);
  Constants.ENEMY2_MOVEMENT_SPRITES = {
    'left': Constants.ENEMY2_LEFT,
    'up left': Constants.ENEMY2_UP_LEFT,
    'up': Constants.ENEMY2_UP,
    'up right': Constants.ENEMY2_UP_RIGHT,
    'right': Constants.ENEMY2_RIGHT,
    'bottom right': Constants.ENEMY2_BOTTOM_RIGHT,
    'bottom': Constants.ENEMY2_BOTTOM,
    'bottom left': Constants.ENEMY2_BOTTOM_LEFT
  };

  Constants.ENEMY3_SPRITE1 = new Rectangle(167, 224, 13, 11);
  Constants.ENEMY3_LEFT = new Rectangle(24, 223, 11, 11);
  Constants.ENEMY3_UP_LEFT = new Rectangle(42, 221, 10, 13);
  Constants.ENEMY3_UP = Constants.ENEMY3_SPRITE1;
  Constants.ENEMY3_UP_RIGHT = new Rectangle(65, 222, 13, 10);
  Constants.ENEMY3_RIGHT = new Rectangle(86, 222, 11, 11);
  Constants.ENEMY3_BOTTOM_RIGHT = new Rectangle(105, 223, 11, 12);
  Constants.ENEMY3_BOTTOM = new Rectangle(121, 224, 11, 11);
  Constants.ENEMY3_BOTTOM_LEFT = new Rectangle(144, 225, 12, 11);
  Constants.ENEMY3_MOVEMENT_SPRITES = {
    'left': Constants.ENEMY3_LEFT,
    'up left': Constants.ENEMY3_UP_LEFT,
    'up': Constants.ENEMY3_UP,
    'up right': Constants.ENEMY3_UP_RIGHT,
    'right': Constants.ENEMY3_RIGHT,
    'bottom right': Constants.ENEMY3_BOTTOM_RIGHT,
    'bottom': Constants.ENEMY3_BOTTOM,
    'bottom left': Constants.ENEMY3_BOTTOM_LEFT
  };

  Constants.ENEMY4_SPRITE1 = new Rectangle(167, 200, 11, 11);
  Constants.ENEMY4_LEFT = new Rectangle(24, 199, 11, 11);
  Constants.ENEMY4_UP_LEFT = new Rectangle(41, 199, 12, 12);
  Constants.ENEMY4_UP = Constants.ENEMY4_SPRITE1;
  Constants.ENEMY4_UP_RIGHT = new Rectangle(65, 198, 12, 12);
  Constants.ENEMY4_RIGHT = new Rectangle(86, 199, 11, 11);
  Constants.ENEMY4_BOTTOM_RIGHT = new Rectangle(105, 198, 12, 12);
  Constants.ENEMY4_BOTTOM = new Rectangle(120, 198, 12, 11);
  Constants.ENEMY4_BOTTOM_LEFT = new Rectangle(142, 200, 11, 11);
  Constants.ENEMY4_MOVEMENT_SPRITES = {
    'left': Constants.ENEMY4_LEFT,
    'up left': Constants.ENEMY4_UP_LEFT,
    'up': Constants.ENEMY4_UP,
    'up right': Constants.ENEMY4_UP_RIGHT,
    'right': Constants.ENEMY4_RIGHT,
    'bottom right': Constants.ENEMY4_BOTTOM_RIGHT,
    'bottom': Constants.ENEMY4_BOTTOM,
    'bottom left': Constants.ENEMY4_BOTTOM_LEFT
  };

  Constants.ENEMY_ANIMATE_DURATION = 1000;
  Constants.ENEMY_WIDTH = 25;
  Constants.ENEMY_HEIGHT = 27;

  Constants.ENEMY_MOVEMENT_SPRITES = [
    Constants.ENEMY4_MOVEMENT_SPRITES,
    Constants.ENEMY2_MOVEMENT_SPRITES,
    Constants.ENEMY1_MOVEMENT_SPRITES,
    Constants.ENEMY3_MOVEMENT_SPRITES
  ];

  // Wave
  Constants.WAVE_START_X = 130;
  Constants.WAVE_START_Y = 70;
  Constants.WAVE_PADDING = 20;
  Constants.WAVE_COLUMNS = 9;
  Constants.WAVES = [
    [Constants.ENEMY4_SPRITE1],
    [Constants.ENEMY2_SPRITE1, Constants.ENEMY2_SPRITE2],
    [Constants.ENEMY1_SPRITE1, Constants.ENEMY1_SPRITE2],
    [Constants.ENEMY3_SPRITE1],
  ];
  Constants.WAVE_MOVEMENT_TIME_LIST = [0, 5000, 10000, 15000];
  Constants.WAVE_MOVEMENT_VELOCITY_LIST = [
    new Vector2(-0.01, 0),
    new Vector2(0.01, 0),
    new Vector2(0.01, 0),
    new Vector2(-0.01, 0.002)
  ];
  Constants.WAVE_MOVEMENT_ROLLBACK = 20001;

  // Enemy Explosion
  Constants.ENEMY_EXPLOSION_SPRITE1 = new Rectangle(216, 200, 7, 7);
  Constants.ENEMY_EXPLOSION_SPRITE2 = new Rectangle(239, 198, 13, 13);
  Constants.ENEMY_EXPLOSION_SPRITE3 = new Rectangle(261, 197, 16, 16);
  Constants.ENEMY_EXPLOSION_SPRITE4 = new Rectangle(288, 191, 28, 28);
  Constants.ENEMY_EXPLOSION_SPRITE5 = new Rectangle(326, 189, 32, 32);
  Constants.ENEMY_EXPLOSION_ANIMATION = [
    Constants.ENEMY_EXPLOSION_SPRITE1,
    Constants.ENEMY_EXPLOSION_SPRITE2,
    Constants.ENEMY_EXPLOSION_SPRITE3,
    Constants.ENEMY_EXPLOSION_SPRITE4,
    Constants.ENEMY_EXPLOSION_SPRITE5
  ];
  Constants.SHIP_EXPLOSION_SPRITE1 = new Rectangle(215, 47, 29, 29);
  Constants.SHIP_EXPLOSION_SPRITE2 = new Rectangle(254, 47, 30, 30);
  Constants.SHIP_EXPLOSION_SPRITE3 = new Rectangle(293, 45, 32, 32);
  Constants.SHIP_EXPLOSION_SPRITE4 = new Rectangle(334, 47, 30, 30);
  Constants.SHIP_EXPLOSION_ANIMATION = [
    Constants.SHIP_EXPLOSION_SPRITE1,
    Constants.SHIP_EXPLOSION_SPRITE2,
    Constants.SHIP_EXPLOSION_SPRITE3,
    Constants.SHIP_EXPLOSION_SPRITE4,
    Constants.SHIP_EXPLOSION_SPRITE2,
    Constants.SHIP_EXPLOSION_SPRITE3,
    Constants.SHIP_EXPLOSION_SPRITE4
  ];
  Constants.EXPLOSION_ANIMATION_TIME = 400;
  Constants.EXPLOSION_SCALE = 2;

  // Enemy Movements
  Constants.ENEMY_ATTACK_CHANCE = 1000;
  Constants.ATTACK_MOVEMENT_TIME_LIST = [0, 2000, 4000];
  Constants.ATTACK1_MOVEMENT_VELOCITY_LIST = [
    new Vector2(0, -0.01),
    new Vector2(-0.01, 0),
    new Vector2(0.01, 0.02)
  ];
  Constants.ATTACK_MOVEMENT_ROLLBACK = 30001;
  Constants.ATTACK2_MOVEMENT_VELOCITY_LIST = [
    new Vector2(0, -0.01),
    new Vector2(-0.01, 0),
    new Vector2(-0.01, 0.02)
  ];

  Constants.ATTACK_MOVEBACK_VELOCITY = 0.02;

  // Score Constants
  Constants.SCORE_X = 40;
  Constants.SCORE_Y = 40;
  Constants.SCORE_COLOR = '#2ecc71';
  Constants.SCORE_FONT = '20px Georgia';

  // Game Over
  Constants.GAME_OVER_TEXT_X = 100;
  Constants.GAME_OVER_TEXT_Y = 220;
  Constants.GAME_OVER_TEXT_TEXT = 'Game Over. Press Space to Restart';
  Constants.GAME_OVER_TEXT_COLOR = '#ecf0f1';
  Constants.GAME_OVER_TEXT_FONT = '30px Georgia';
  Constants.GAME_OVER_START_KEY = 32;

  return Constants;

});
