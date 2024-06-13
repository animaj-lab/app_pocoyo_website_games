// carga objeto Phaser
var game = new Phaser.Game(768, 1024, Phaser.AUTO, "pocoyo-game", "game");
// iniciamos los estados al final de este archivo.

//  The Google WebFont Loader will look for this object, so create it before loading the script.
WebFontConfig = {
  google: {
    families: ["Dosis"],
  },
};

// GameObject es el objeto principal:
var GameObject = {};

/*
	Boot:
*/
GameObject.Boot = function (game) {
  // el LANG tira de jQuery para coger el lang del browser:
  // GameObject.LANG = $("html").attr("lang") == "es" ? "es" : "en";
  GameObject.LANG = "es";

  // GameObject.GAME_PATH = "/html5-games/aventura-espacio/";
  GameObject.GAME_PATH = "/space-adventure/";

  GameObject.GAME_IMG =
    GameObject.LANG == "es"
      ? "https://benoiteveillard.github.io/pocoyo/space-adventure/assets/images/cover-aventura-espacio.jpg"
      : "https://benoiteveillard.github.io/pocoyo/space-adventure/assets/images/cover-space-adventure.jpg";
  // GameObject.GAME_IMG =
  // GameObject.LANG == "es"
  //   ? "https://www.pocoyo.com/img/juegos/2015/03/cover-aventura-espacio.jpg"
  //   : "https://www.pocoyo.com/img/juegos/2015/03/cover-space-adventure.jpg";

  GameObject.GAME_NAME =
    GameObject.LANG == "es"
      ? "Pocoyo: Aventura en el espacio"
      : "Pocoyo: Space adventure";

  GameObject.GAME_SEO_URL =
    GameObject.LANG == "es"
      ? "https://www.pocoyo.com/juegos-ninos/aventura-espacio"
      : "https://www.pocoyo.com/en/funny-games/space-adventure";

  GameObject.PLAYER_WIDTH = 185;
  GameObject.PLAYER_HEIGHT = 100;

  GameObject.GROUND_HEIGHT = 150;

  GameObject.MUTE = false;
};

GameObject.Boot.prototype = {
  init: function () {
    this.input.maxPointers = 1;
    this.stage.disableVisibilityChange = true;

    if (this.game.device.desktop) {
      // scale.scaleMode pone los controles para escalar, las opciones son: EXACT_FIT (100% escala alto y ancho), NO_SCALE (sin escalar) and SHOW_ALL (escala asegurándose q se muestra todo y se preserva el radio)
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      // alinea horizontal y vertical por lo que siempre se alinea el canvas en la pantalla (una especia de margin: 0 auto)
      this.scale.forceOrientation(true); //forceOrientation(forceLandscape, forcePortrait)
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      this.scale.setScreenSize(true); // scale.setScreenSize(true) activa el escalado
    } else {
      this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
      //this.scale.setMinMax(480, 260, 871, 635);
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      this.scale.forceOrientation(false, true);
      this.scale.setResizeCallback(this.forceExactFit, this);
      this.scale.enterIncorrectOrientation.add(
        this.enterIncorrectOrientation,
        this
      );
      this.scale.leaveIncorrectOrientation.add(
        this.leaveIncorrectOrientation,
        this
      );
    }
  },
  preload: function () {
    this.load.image(
      "bg-loading",
      GameObject.GAME_PATH +
        "assets/images/bg-loading-" +
        GameObject.LANG +
        ".jpg"
    );
    this.load.image(
      "preloaderbar",
      GameObject.GAME_PATH + "assets/images/loading-bar.png"
    );
  },
  create: function () {
    this.state.start("Preloader");
  },
  gameResized: function (width, height) {
    // This could be handy if you need to do any extra processing if the game resizes.
    // A resize could happen if for example swapping orientation on a device or resizing the browser window.
    // Note that this callback is only really useful if you use a ScaleMode of RESIZE and place it inside your main game state.
    var h = window.innerHeight;
    var w = window.innerWidth;
    /*
		w1/h1 = w2/h2
		formula alto conocido: w2 = (w1*h2) / h1
		*/
    var calculateWidth = (game.width * h) / game.height;
    this.scale.setMinMax(calculateWidth, h, calculateWidth, h);
  },
  forceExactFit: function (width, height) {
    var h = window.innerHeight;
    var w = window.innerWidth;
    this.scale.setMinMax(w, h, w, h);
  },
  enterIncorrectOrientation: function () {
    GameObject.orientated = false;
    document.getElementById("incorrect-orientation").style.display = "block";
  },
  leaveIncorrectOrientation: function () {
    GameObject.orientated = true;
    document.getElementById("incorrect-orientation").style.display = "none";
  },
};

/*
	Preloader
*/

GameObject.Preloader = function (game) {};

GameObject.Preloader.prototype = {
  preload: function () {
    this.add.sprite(0, 0, "bg-loading");

    // barra de carga: loading...
    this.preloadBar = this.add.sprite(210, 827, "preloaderbar");
    this.preloadBar.anchor.setTo(0, 0);
    this.load.setPreloadSprite(this.preloadBar);

    //  Load the Google WebFont Loader script
    this.load.script(
      "webfont",
      "//ajax.googleapis.com/ajax/libs/webfont/1.5.10/webfont.js"
    );

    // precargamos las imágenes
    this.load.image(
      "background-mainmenu",
      GameObject.GAME_PATH +
        "assets/images/bg-mainmenu-" +
        GameObject.LANG +
        ".jpg"
    );
    this.load.image(
      "background",
      GameObject.GAME_PATH + "assets/images/bg.jpg"
    );
    this.load.image(
      "ground",
      GameObject.GAME_PATH + "assets/images/bg-ground.png"
    );
    this.load.image(
      "rocket",
      GameObject.GAME_PATH + "assets/images/rocket.png"
    );
    this.load.image(
      "score-board",
      GameObject.GAME_PATH + "assets/images/bg-score-board.png"
    );
    this.load.image(
      "bg-finger-tap",
      GameObject.GAME_PATH + "assets/images/bg-finger-tap.png"
    );
    this.load.image(
      "star-1",
      GameObject.GAME_PATH + "assets/images/star-1.png"
    );
    this.load.image(
      "star-2",
      GameObject.GAME_PATH + "assets/images/star-2.png"
    );
    this.load.image(
      "star-3",
      GameObject.GAME_PATH + "assets/images/star-3.png"
    );
    this.load.image(
      "star-4",
      GameObject.GAME_PATH + "assets/images/star-4.png"
    );
    this.load.image(
      "star-5",
      GameObject.GAME_PATH + "assets/images/star-5.png"
    );
    this.load.image(
      "hearth",
      GameObject.GAME_PATH + "assets/images/hearth.png"
    );
    this.load.image("moon", GameObject.GAME_PATH + "assets/images/moon.png");
    this.load.image(
      "planet",
      GameObject.GAME_PATH + "assets/images/planet.png"
    );

    // precargamos los sprites
    this.load.spritesheet(
      "player",
      GameObject.GAME_PATH + "assets/images/sprite-player.png",
      GameObject.PLAYER_WIDTH,
      GameObject.PLAYER_HEIGHT,
      3
    );
    this.load.spritesheet(
      "alien",
      GameObject.GAME_PATH + "assets/images/sprite-alien.png",
      200,
      200
    );
    this.load.spritesheet(
      "button-play",
      GameObject.GAME_PATH + "assets/images/btn-play.png",
      271,
      86
    );
    this.load.spritesheet(
      "button-ranking",
      GameObject.GAME_PATH + "assets/images/btn-ranking.png",
      271,
      86
    );
    this.load.spritesheet(
      "button-instructions",
      GameObject.GAME_PATH +
        "assets/images/btn-instrucciones-" +
        GameObject.LANG +
        ".png",
      270,
      86
    );
    this.load.spritesheet(
      "button-menu",
      GameObject.GAME_PATH + "assets/images/btn-menu.png",
      64,
      64
    );
    this.load.spritesheet(
      "meteor",
      GameObject.GAME_PATH + "assets/images/sprite-meteor.png",
      75,
      75
    );
    this.load.spritesheet(
      "button-mute",
      GameObject.GAME_PATH + "assets/images/btn-mute.png",
      80,
      80
    );

    // audios:
    game.load.audio(
      "audio-bg-menu",
      GameObject.GAME_PATH + "assets/audio/PY_RACING_Loop_02_acelerado_YES.mp3"
    );
    game.load.audio(
      "audio-bg",
      GameObject.GAME_PATH + "assets/audio/SFX0013.mp3"
    );
    game.load.audio(
      "audio-score",
      GameObject.GAME_PATH + "assets/audio/pocoyo0008.mp3"
    );
    game.load.audio(
      "audio-jump",
      GameObject.GAME_PATH + "assets/audio/pocoyo-salto01.mp3"
    );
    game.load.audio("audio-hit", GameObject.GAME_PATH + "assets/audio/hit.mp3");
    game.load.audio(
      "audio-boing",
      GameObject.GAME_PATH + "assets/audio/FX4.mp3"
    );
    game.load.audio(
      "audio-gameover",
      GameObject.GAME_PATH + "assets/audio/error.mp3"
    );
    game.load.audio(
      "audio-impact",
      GameObject.GAME_PATH + "assets/audio/woosh.mp3"
    );
    game.load.audio(
      "audio-alien-risa",
      GameObject.GAME_PATH + "assets/audio/angry-risa2.mp3"
    );
  },
  create: function () {
    // audio
    GameObject._bgMenuMusic = this.add.audio("audio-bg-menu", 1, true);
    GameObject._bgMusic = this.add.audio("audio-bg", 1, true);
    GameObject._bgMenuMusic.play("", 0, 0.5, true);

    this.state.start("MainMenu");
  },
};

/*
	MainMenu
*/

GameObject.MainMenu = function (game) {};

GameObject.MainMenu.prototype = {
  create: function () {
    this.add.sprite(0, 0, "background-mainmenu");

    //music
    if (GameObject._bgMusic.isPlaying) GameObject._bgMusic.stop();
    if (!GameObject._bgMenuMusic.isPlaying && !GameObject.MUTE)
      GameObject._bgMenuMusic.play("", 0, 0.5, true);

    // mute:
    this._muteButton = this.add.button(
      20,
      game.height - 100,
      "button-mute",
      this.manageSound,
      this,
      1,
      0,
      2
    );
    if (GameObject.MUTE) this._muteButton.frame = 2;

    // botón start
    this._startButton = this.add.button(
      600,
      765,
      "button-play",
      this.startGame,
      this,
      0,
      1
    );
    this._startButton.anchor.setTo(0.5, 0.5);
    // botón ranking
    this._rankingButton = this.add.button(
      600,
      865,
      "button-ranking",
      this.goRanking,
      this,
      0,
      1
    );
    this._rankingButton.anchor.setTo(0.5, 0.5);
    // botón instrucciones
    this._instructionButton = this.add.button(
      600,
      965,
      "button-instructions",
      this.goInstructions,
      this,
      1,
      0
    );
    this._instructionButton.anchor.setTo(0.5, 0.5);
  },
  startGame: function () {
    this.state.start("Game");
  },
  goRanking: function () {
    this.state.start("Ranking");
  },
  goInstructions: function () {
    this.state.start("Instructions");
  },
  manageSound: function () {
    if (GameObject.MUTE) {
      // restauramso la música:
      GameObject._bgMenuMusic.resume();
      // cambiamso el frame del sprite del botón mute:
      this._muteButton.setFrames(0);

      GameObject.MUTE = false;
    } else {
      // pausamso la musica
      GameObject._bgMenuMusic.pause();
      // cambiamso el frame del sprite del botón mute:
      this._muteButton.setFrames(2);

      GameObject.MUTE = true;
    }
  },
};

/*
	Game
*/

GameObject.Game = function (game) {
  this._background = null;
  this._ground = null;
  this._player = null;
  this._flapKey = null;

  GameObject._score = null;
  GameObject._health = null;

  GameObject._scoreText = null;
  GameObject._healthText = null;
  GameObject._timerText = null;

  GameObject._audioScore = null;

  GameObject._startTimer = null;
  GameObject._totalSeconds = 0;
  GameObject._seconds = 0;

  GameObject._scrollVelocity = -200;

  this._fingerInstructions = null;
  this._starsGroup = null;
  this._meteorGroup = null;
  this._alienGroup = null;
  this._rocketGroup = null;
  this._planetGroup = null;

  this._spawnStarTimer = 0;
  this._spawnMeteorTimer = 0;
  this._spawnAlienTimer = 0;
  this._spawnRocketTimer = 0;
  this._spawnPlanetTimer = 0;
};

GameObject.Game.prototype = {
  create: function () {
    GameObject.userLogged = false; // para saber si está logado en la sesión en la web de Pocoyo el usuario para mandar puntuación

    GameObject._startTimer = new Date();

    GameObject._score = 0;
    GameObject._health = 3;

    GameObject._audioScore = this.add.audio("audio-score");
    GameObject._audioJump = this.add.audio("audio-jump");
    GameObject._audioHit = this.add.audio("audio-hit");
    GameObject._audioBoing = this.add.audio("audio-boing");
    GameObject._audioImpact = this.add.audio("audio-impact");
    GameObject._audioAlienRisa = this.add.audio("audio-alien-risa");

    // cargamos el audio para cuando coge un caramelo creados en el GameObject.Preloader
    if (GameObject._bgMenuMusic.isPlaying) GameObject._bgMenuMusic.stop();
    if (!GameObject._bgMusic.isPlaying && !GameObject.MUTE)
      GameObject._bgMusic.play("", 0, 0.75, true);

    // ARCADE physics system
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.physics.arcade.gravity.y = 500;

    // ground y background
    this._background = new Background(game, 0, 0, game.width, game.height);
    game.add.existing(this._background);
    this._ground = new Ground(
      game,
      0,
      game.height - GameObject.GROUND_HEIGHT,
      game.width,
      game.height
    );
    game.add.existing(this._ground);

    // mute:
    this._muteButton = this.add.button(
      20,
      game.height - 100,
      "button-mute",
      this.manageSound,
      this,
      1,
      0,
      2
    );
    if (GameObject.MUTE) this._muteButton.frame = 2;

    // planeta y luna:
    this._planetGroup = this.add.group();

    // estrellas premios score:
    this._starsGroup = this.add.group();
    game.add
      .tween(this._starsGroup)
      .to({ y: -30 }, 350, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

    // meteoros:
    this._meteorGroup = this.add.group();

    // alien:
    this._alienGroup = this.add.group();
    game.add
      .tween(this._alienGroup)
      .to({ y: -10 }, 1000, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

    // rocket
    this._rocketGroup = this.add.group();

    /*
		Score y health (puntuación y salud):
	    */
    // cargamos el background de score board
    this.add.sprite(30, 30, "score-board");

    GameObject._scoreText = this.add.text(185, 46, "0", {
      font: "35px Dosis",
      fill: "#FFF31E",
    });
    GameObject._scoreText.anchor.set(1, 0);
    GameObject._healthText = this.add.text(185, 90, "3", {
      font: "35px Dosis",
      fill: "#D90000",
    });
    GameObject._healthText.anchor.set(1, 0);
    GameObject._timerText = this.add.text(185, 140, "00:00:00", {
      font: "23px Dosis",
      fill: "#1e003c",
    });
    GameObject._timerText.anchor.set(1, 0);

    /*
		 player:
		*/
    this._player = new Player(game, 200, 400);
    this._player.anchor.setTo(0.5, 0.5);
    game.add.existing(this._player);
    // rebote:
    this._player.body.bounce.set(0.8);

    /*
			Instrucciones
		*/
    this._fingerInstructions = this.add.sprite(
      this._player.x,
      this._player.y + 175,
      "bg-finger-tap"
    );
    this._fingerInstructions.anchor.setTo(0.5, 0.5);
    game.add
      .tween(this._fingerInstructions)
      .to(
        { y: this._fingerInstructions.y - 10 },
        350,
        Phaser.Easing.Linear.NONE,
        true,
        0,
        1000,
        true
      );

    /*
			controles:
		*/

    // keep the spacebar from propogating up to the browser
    game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

    // control de teclado:
    this._flapKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this._flapKey.onDown.addOnce(this.startGame, this);
    this._flapKey.onDown.add(this._player.flap, this._player);
    // mouse/touch
    game.input.onDown.addOnce(this.startGame, this);
    game.input.onDown.add(this._player.flap, this._player);
  },
  update: function () {
    // generar planetas y lunas
    if (this._planetGroup.children.length === 0) {
      this._spawnPlanetTimer += this.time.elapsed;
      if (this._spawnPlanetTimer > 1750) {
        this._spawnPlanetTimer = 0;
        this.spawnPlanet(this);
      }
    }
    this.moveLikeBakground(this._planetGroup);

    /*
		elementos vivos
		*/
    if (this._player.alive) {
      this._spawnStarTimer++;
      this._spawnMeteorTimer++;
      this._spawnAlienTimer++;
      this._spawnRocketTimer++;

      // generar estrellas cada cierto tiempo
      //this._spawnStarTimer += GameObject._totalSeconds;

      if (this._spawnStarTimer > 100) {
        this._spawnStarTimer = 0;
        this.spawnStar(this);
      }
      // movimiento velocidad (velocity) horizontal de la estrella
      this.moveLikeBakground(this._starsGroup);

      // generar meteoros cada cierto tiempo
      //this._spawnMeteorTimer += GameObject._totalSeconds;
      if (this._spawnMeteorTimer > 150) {
        this._spawnMeteorTimer = 0;
        this.spawnMeteor(this);
      }

      // movimiento velocidad (velocity) horizontal del meteor
      this.moveMeteors(this._meteorGroup);

      // generar aliens cada cierto tiempo y sólo uno a la vez
      if (this._alienGroup.children.length === 0) {
        //this._spawnAlienTimer += GameObject._totalSeconds;
        if (this._spawnAlienTimer > 1000) {
          this._spawnAlienTimer = 0;
          this.spawnAlien(this);
        }
      }

      // movimiento velocidad (velocity) horizontal del alien
      this.moveAliens(this._alienGroup);

      // generar cohete cada cierto tiempo y sólo uno a la vez
      if (this._rocketGroup.children.length === 0) {
        //this._spawnRocketTimer += GameObject._totalSeconds;
        if (this._spawnRocketTimer > 1500) {
          this._spawnRocketTimer = 0;
          this.spawnRocket(this);
        }
      }

      this.moveLikeBakground(this._rocketGroup);
    }

    // rotar meteoros
    this._meteorGroup.forEach(function (meteor) {
      meteor.angle += meteor.rotateMe;
    });

    // rotar aliens
    this._alienGroup.forEach(function (alien) {
      alien.angle += alien.rotateMe;
    });

    // Game Over si nos quedamos sin vidas cargamos el método gameOver()
    if (!GameObject._health) {
      this._player.kill();
      this.gameOver();
    }

    // aumentar dificultad cada 10 segundos:
    //if( GameObject._seconds > 9 && Math.floor(GameObject._seconds%10) == 0 ) {
    if (GameObject._score > 49 && Math.floor(GameObject._score % 50) == 0) {
      GameObject._scrollVelocity--;
    }

    /*
		overlaps (entre grupos)
		*/
    // colisión ground y meteoro:
    game.physics.arcade.overlap(
      this._meteorGroup,
      this._ground,
      this.intersecMeteorGround,
      null,
      this
    );
    // colisión entre player y estrella:
    this.physics.arcade.overlap(
      this._player,
      this._starsGroup,
      this.intersecStar,
      null,
      this
    );
    // colisión entre player y meteorito:
    this.physics.arcade.overlap(
      this._player,
      this._meteorGroup,
      this.intersecMeteor,
      null,
      this
    );
    // colisión entre player y alien:
    this.physics.arcade.overlap(
      this._player,
      this._alienGroup,
      this.intersecAlien,
      null,
      this
    );
    // colisión entre player y cohete:
    this.physics.arcade.overlap(
      this._player,
      this._rocketGroup,
      this.intersecRocket,
      null,
      this
    );
    /*
		colisiones
		*/
    // colisión player y ground:
    game.physics.arcade.collide(
      this._player,
      this._ground,
      this.intersecGround,
      null,
      this
    );
  },
  updateTimer: function () {
    GameObject._totalSeconds++;

    var hours = Math.floor(GameObject._totalSeconds / 3600);
    GameObject._totalSeconds %= 3600;
    var minutes = Math.floor(GameObject._totalSeconds / 60);
    GameObject._seconds = parseInt(GameObject._totalSeconds % 60);

    GameObject._timerText.setText(
      this.addLeadingZeros(hours) +
        ":" +
        this.addLeadingZeros(minutes) +
        ":" +
        this.addLeadingZeros(GameObject._seconds)
    );
  },
  addLeadingZeros: function (number) {
    return number < 10 ? "0" + number : number;
  },
  startGame: function () {
    if (!this._player.alive && GameObject._health > 0) {
      this._fingerInstructions.destroy();

      this._player.body.allowGravity = true;
      this._player.alive = true;

      // creo los primeros meteoros y estrellas para que salgan inmediatamente y le doy un poco de relleno al contador para que no tarden en salir la segunda tanda
      this.moveLikeBakground(this._starsGroup);
      this._spawnStarTimer = 1000;
      this.spawnMeteor(this);
      this.moveMeteors(this._meteorGroup);

      // crear cronómetro:
      GameObject._startTimer = game.time.create(false);
      GameObject._startTimer.loop(Phaser.Timer.SECOND, this.updateTimer, this);
      GameObject._startTimer.start();
    }
  },
  spawnStar: function () {
    // creamos la estrella:
    var dropPos = Math.floor(
      Math.random() * (game.height - (GameObject.GROUND_HEIGHT + 25)) + 1
    );
    var aStarType = Math.floor(Math.random() * (6 - 1) + 1);
    var star = game.add.sprite(775, dropPos, "star-" + aStarType);
    star.points = aStarType;

    // añadimos física a la estrella:
    this.physics.enable(star, Phaser.Physics.ARCADE);
    star.body.allowGravity = false;
    star.body.immovable = true;
    star.checkWorldBounds = true;
    star.outOfBoundsKill = true; // If true Sprite.kill is called as soon as Sprite.inWorld returns false, as long as Sprite.checkWorldBounds is true.
    star.anchor.setTo(0.5, 0.5);

    this._starsGroup.add(star); // añadimos estrella al grupo
  },
  spawnMeteor: function () {
    // creamos meteor:
    var dropPos = Math.floor(Math.random() * (game.height - 250));
    var meteor = game.add.sprite(game.width + 40, dropPos, "meteor");
    // añadimos física
    this.physics.enable(meteor, Phaser.Physics.ARCADE);
    meteor.body.allowGravity = false;
    meteor.body.immovable = true;
    meteor.checkWorldBounds = true;
    meteor.outOfBoundsKill = true;
    meteor.anchor.setTo(0.5, 0.5);
    meteor.rotateMe = Math.random() * 4 - 2; //valor aleatorio entre +2 y -2

    this._meteorGroup.add(meteor); // añadimos estrella al grupo
  },
  moveMeteors: function (meteors) {
    // setAll establece para todos los hijos de un grupo:
    meteors.setAll("body.velocity.x", GameObject._scrollVelocity * 2);
    meteors.setAll("body.velocity.y", 25 * 2);
  },
  spawnAlien: function () {
    // creamos alien:
    var dropPos =
      Math.random() * (game.height - (GameObject.GROUND_HEIGHT + 100));
    var alien = game.add.sprite(game.width + 50, dropPos, "alien");
    alien.scale.set(0.5, 0.5);
    // añadimos física
    this.physics.enable(alien, Phaser.Physics.ARCADE);
    alien.body.allowGravity = false;
    alien.body.immovable = true;
    alien.checkWorldBounds = true;

    // eliminar el grupo de alen para que solo hay auno en juego a la vez
    alien.events.onOutOfBounds.add(this.removeGroup, this);

    alien.anchor.setTo(0.5, 0.5);
    alien.rotateMe = Math.random() * 4 - 2; //valor aleatorio entre +2 y -2

    this._alienGroup.add(alien);
  },
  moveAliens: function (aliens) {
    // setAll establece para todos los hijos de un grupo:
    aliens.setAll("body.velocity.x", GameObject._scrollVelocity);
  },
  spawnRocket: function () {
    var rocket = game.add.sprite(0, 0, "rocket");
    rocket.reset(game.width + rocket.width / 2, game.height + 10);
    rocket.anchor.setTo(0.5, 1);
    // añadimos física
    this.physics.enable(rocket, Phaser.Physics.ARCADE);
    rocket.body.allowGravity = false;
    rocket.body.immovable = true;
    rocket.checkWorldBounds = true;

    rocket.events.onOutOfBounds.add(this.removeGroup, this);

    this._rocketGroup.add(rocket);
  },
  spawnPlanet: function () {
    var aPlanetType =
      Math.floor(Math.random() * 2) + 1 == 1 ? "planet" : "moon";
    var planet = game.add.sprite(825, 200, aPlanetType);
    planet.anchor.setTo(0.5, 1);
    // añadimos física
    this.physics.enable(planet, Phaser.Physics.ARCADE);
    planet.body.allowGravity = false;
    planet.body.immovable = true;
    planet.checkWorldBounds = true;

    planet.events.onOutOfBounds.add(this.removeGroup, this);

    this._planetGroup.add(planet);
  },
  moveLikeBakground: function (group) {
    // setAll establece para todos los hijos de un grupo:
    group.setAll("body.velocity.x", -200);
  },
  intersecStar: function (player, star) {
    star.kill();

    // aumentamos el score y actualizamos el label del score
    GameObject._score += star.points;
    GameObject._scoreText.setText(GameObject._score);

    // texto de puntos
    var pointsText = this.add.text(
      player.x + 100,
      player.y,
      "+ " + star.points,
      { font: "35px Dosis", fill: "#FFFFFF" }
    );
    this.add
      .tween(pointsText)
      .to({ alpha: 0, y: player.y - 500 }, 2000, "Linear", true, 10, 3);
    setTimeout(function () {
      game.world.remove(pointsText);
    }, 2000);

    // sonido
    if (!GameObject.MUTE) GameObject._audioScore.play("", 0);
  },
  intersecMeteor: function (player, meteor) {
    /*
			creamos una propiedad .hasCollide para el objeto meteor y la ponemos a false
			si está a false o todavía no existe (ya que la creamso dentro), el grupo meteor no ha chocado con el player así que entramos en la función,
			de lo contrario no entramso en este grupo
		*/

    if (!meteor.hasOwnProperty("hasCollided") || !meteor.hasCollided) {
      // animación explosión
      meteor.animations.add("explote", [1, 2, 3], 10, false);
      meteor.animations.play("explote");

      // reducimos la vida
      GameObject._health -= 1;
      GameObject._healthText.setText(GameObject._health);

      // sonido
      if (!GameObject.MUTE) {
        GameObject._audioBoing.volume = 0.35;
        GameObject._audioBoing.play("", 0);
      }

      meteor.hasCollided = true;

      this._player.alpha = 0;
      this.add.tween(this._player).to({ alpha: 1 }, 150, "Linear", true, 10, 3);

      // texto con la vida y corazón
      this.healthTextOnIntersec("#FF0000", "- 1");
    }
  },
  intersecMeteorGround: function (ground, meteor) {
    if (!meteor.hasOwnProperty("hasCollided") || !meteor.hasCollided) {
      // animación explosión
      meteor.animations.add("explote", [1, 2, 3], 10, false);
      meteor.animations.play("explote");

      // sonido
      if (!GameObject.MUTE) GameObject._audioImpact.play("", 0);

      meteor.hasCollided = true;
    }
  },
  intersecGround: function () {
    // quitamos vida
    GameObject._health -= 1;
    GameObject._healthText.setText(GameObject._health);

    // sonido
    if (!GameObject.MUTE) GameObject._audioJump.play("", 0);

    // texto con la vida y corazón
    this.healthTextOnIntersec("#FF0000", "- 1");
  },
  intersecAlien: function (player, alien) {
    if (!alien.hasOwnProperty("hasCollided") || !alien.hasCollided) {
      // animación explosión
      alien.animations.add("explote", [1, 2, 3], 10, false);
      alien.animations.play("explote");

      alien.angle = 0;
      alien.rotateMe = 0;
      alien.body.allowGravity = true;

      // aumentamos una vida
      GameObject._health += 1;
      GameObject._healthText.setText(GameObject._health);

      // texto con la vida y corazón
      this.healthTextOnIntersec("#aab300", "+ 1");

      // sonido
      if (!GameObject.MUTE) {
        GameObject._audioAlienRisa.play("", 0);
        GameObject._audioAlienRisa.volume = 0.25;
      }

      alien.hasCollided = true;
    }
  },
  intersecRocket: function (player, rocket) {
    if (!rocket.hasOwnProperty("hasCollided") || !rocket.hasCollided) {
      // aumentamos una vida
      GameObject._health -= 1;
      GameObject._healthText.setText(GameObject._health);

      // sonido
      if (!GameObject.MUTE) GameObject._audioHit.play("", 0);

      this._player.alpha = 0;
      this.add.tween(player).to({ alpha: 1 }, 150, "Linear", true, 10, 3);

      this.add.tween(rocket).to({ angle: 15 }, 150).start();

      rocket.hasCollided = true;

      // texto con la vida y corazón
      this.healthTextOnIntersec("#FF0000", "- 1");
    }
  },
  healthTextOnIntersec: function (color, text) {
    var addressY = this._player.y - 500;

    // indicador de vida al colisionar
    var hearth = game.add.sprite(
      this._player.x + 100,
      this._player.y,
      "hearth"
    );
    this.add
      .tween(hearth)
      .to({ alpha: 0, y: addressY }, 2000, "Linear", true, 10, 3);

    var healthBubbleText = this.add.text(
      hearth.x + 45,
      hearth.y - 10,
      String(text),
      { font: "35px Dosis", fill: String(color) }
    );
    this.add
      .tween(healthBubbleText)
      .to({ alpha: 0, y: addressY }, 2000, "Linear", true, 10, 3);

    setTimeout(function () {
      game.world.remove(hearth);
      game.world.remove(healthBubbleText);
    }, 2000);
  },
  removeGroup: function (group) {
    group.parent.children = [];
  },
  gameOver: function () {
    // reset de valores:
    GameObject._totalSeconds = 0;
    GameObject._seconds = 0;
    GameObject._scrollVelocity = -200;

    // llamamos al estado Game Over
    this.state.start("GameOver");
  },
  manageSound: function () {
    if (GameObject.MUTE) {
      // restauramos la música:
      GameObject._bgMusic.play();
      // cambiamso el frame del sprite del botón mute:
      this._muteButton.setFrames(0);

      GameObject.MUTE = false;
    } else {
      // pausamso la musica
      GameObject._bgMusic.pause();
      // cambiamso el frame del sprite del botón mute:
      this._muteButton.setFrames(2);

      GameObject.MUTE = true;
    }
  },
};

/*
	Game Over
*/

GameObject.GameOver = function (game) {
  this._startButton = null;
  this._rankingButton = null;
  this._gameOverScore = null;
};

GameObject.GameOver.prototype = {
  preload: function () {
    this.load.image(
      "background-gameover",
      GameObject.GAME_PATH + "assets/images/bg-gameover.jpg"
    );
    this.load.image(
      "btn-twitter",
      GameObject.GAME_PATH +
        "assets/images/btn-twitter-" +
        GameObject.LANG +
        ".png"
    );
    this.load.image(
      "btn-facebook",
      GameObject.GAME_PATH +
        "assets/images/btn-facebook-" +
        GameObject.LANG +
        ".png"
    );

    this.load.spritesheet(
      "button-play-morado",
      GameObject.GAME_PATH + "assets/images/btn-play-morado.png",
      270,
      85
    );
    this.load.spritesheet(
      "button-ranking-morado",
      GameObject.GAME_PATH + "assets/images/btn-ranking-morado.png",
      270,
      85
    );
    this.load.spritesheet(
      "button-menu-morado",
      GameObject.GAME_PATH +
        "assets/images/btn-menu-morado-" +
        GameObject.LANG +
        ".png",
      270,
      84
    );
  },
  create: function () {
    // paramos la música de fondo
    GameObject._bgMusic.stop();

    if (!GameObject.MUTE) {
      var audioGameOver = this.add.audio("audio-gameover");
      audioGameOver.play("", 0);
    }

    // imagen de fondo:
    this.add.sprite(0, 0, "background-gameover");

    // botones
    this._startButton = this.add.button(
      102,
      656,
      "button-play-morado",
      this.startGame,
      this,
      1,
      0
    );
    this._rankingButton = this.add.button(
      405,
      656,
      "button-ranking-morado",
      this.goRanking,
      this,
      1,
      0
    );
    this._menuButton = this.add.button(
      game.width / 2,
      810,
      "button-menu-morado",
      this.backMainMenu,
      this,
      1,
      0
    );
    this._menuButton.anchor.set(0.5, 0.5);

    // botones compartir score:
    this.shareTwitterButton = this.add.button(
      101,
      497,
      "btn-twitter",
      this.shareOnTwitter,
      this
    );
    this.shareFacebookButton = this.add.button(
      401,
      497,
      "btn-facebook",
      this.shareFacebook,
      this
    );

    // texto de la puntuación:
    this._gameOverScore = game.add.text(381, 435, String(GameObject._score), {
      font: "60px Dosis",
      fill: "#a75ea3",
      align: "center",
    });
    this._gameOverScore.anchor.set(0.5, 1);

    /*
    	llamamos a la función sendScore(),
    	que por Ajax nos comunique con la bbdd para ver si estamos o no logados, y en tal caso guardar el score en el perfil del usuario
    	*/
    if (!GameObject.userLogged) this.sendScore();
    //this.sendScore();
  },
  backMainMenu: function () {
    this.state.start("MainMenu");
  },
  shareOnTwitter: function () {
    if (GameObject.LANG == "es") {
      var shareTwitterUrl =
        "http://twitter.com/share?text=Conseguí " +
        GameObject._score +
        " puntos en el Juego de " +
        GameObject.GAME_NAME +
        " ¿Te atreves a superarme?&url=" +
        GameObject.GAME_SEO_URL +
        "&hashtags=pocoyo,juegos";
    } else {
      var shareTwitterUrl =
        "http://twitter.com/share?text=I got " +
        GameObject._score +
        " points in " +
        GameObject.GAME_NAME +
        " game. Dare you to improve my score?&url=" +
        GameObject.GAME_SEO_URL +
        "&hashtags=pocoyo,games";
    }
    window.open(shareTwitterUrl);
  },
  shareFacebook: function () {
    if (GameObject.LANG == "es") {
      var shareFbUrl =
        "https://www.facebook.com/dialog/feed?app_id=140586622674265&link=" +
        GameObject.GAME_SEO_URL +
        "&name=Conseguí " +
        GameObject._score +
        " puntos en el Juego de " +
        GameObject.GAME_NAME +
        " ¿Te atreves a superarme?&redirect_uri=http%3A%2F%2Fs7.addthis.com%2Fstatic%2Fpostshare%2Fc00.html&picture=" +
        GameObject.GAME_IMG +
        "&description=Diviértete con el juego de los caramelos de Pocoyo. Cuantas más golosinas consigas coger, mejor puntuación obtendras.";
    } else {
      var shareFbUrl =
        "https://www.facebook.com/dialog/feed?app_id=140586622674265&link=" +
        GameObject.GAME_SEO_URL +
        "&name=I got " +
        GameObject._score +
        " points in " +
        GameObject.GAME_NAME +
        " game. Dare you to improve my score?&redirect_uri=http%3A%2F%2Fs7.addthis.com%2Fstatic%2Fpostshare%2Fc00.html&picture=" +
        GameObject.GAME_IMG +
        "&description=Have fun with the sweets game of Pocoyo. Pick up many candies and you will have better score.";
    }
    window.open(shareFbUrl);
  },
  startGame: function () {
    this.state.start("Game");
  },
  goRanking: function () {
    this.state.start("Ranking");
  },
  sendScore: function () {
    var myThis = this; // el this n el aax cambia
    var gameID = $("#pocoyo-game").attr("data-gameid"); // el id del game

    // jQuery Ajax para conectar con el usurio de Pocoyo y guardar su score:
    $.ajax({
      type: "POST",
      //url:  GameObject.GAME_PATH+"save-user-score.php",
      url: "/game/saveScore",
      //data: {points: GameObject._score, gameId: 1},
      data: { points: GameObject._score, gameId: gameID },
      context: document.body,
    }).success(function (data) {
      if (data == 0) {
        // si devuelve 0 es que no está registrado o no está logado
        myThis.state.start("Register");
      } else {
        console.log("Se han guardado los puntos en el usuario XXX");
      }
    });
  },
};

/*
	Ranking
*/

GameObject.Ranking = function (game) {
  this._ranking;
  this.rankingData = "hola";

  this._textStyleScore = null;
  this._textStyleWho = null;
};

GameObject.Ranking.prototype = {
  preload: function () {
    this.load.image(
      "background-ranking",
      GameObject.GAME_PATH + "assets/images/bg-ranking.jpg"
    );

    this.load.spritesheet(
      "btn-menu",
      GameObject.GAME_PATH +
        "assets/images/btn-menu-plano-verde-" +
        GameObject.LANG +
        ".png",
      226,
      64
    );
  },
  create: function () {
    // imágenes pantalla
    this.add.sprite(0, 0, "background-ranking");

    // botón volver al menú
    var btMenu = this.add.button(
      game.width / 2,
      716,
      "btn-menu",
      this.backMainMenu,
      this,
      0,
      1
    );
    btMenu.anchor.set(0.5, 0.5);
    btMenu.scale.setTo(0.75, 0.75);

    this._ranking = this.getScore();

    /*
		puntuaciones:
		*/
    this._textStyleScore = {
      font: "48px Dosis",
      fill: "#727f0c",
      align: "right",
    };
    this._textStyleWho = { font: "30px Dosis", fill: "#f3f7ab" };

    var pos1Score = this.add.text(
      650,
      258,
      this._ranking[0][0].score,
      this._textStyleScore
    );
    pos1Score.anchor.set(1, 0);
    var pos1Who = this.add.text(
      280,
      265,
      this._ranking[0]["User"].username,
      this._textStyleWho
    );

    var pos2Score = this.add.text(
      650,
      343,
      this._ranking[1][0].score,
      this._textStyleScore
    );
    pos2Score.anchor.set(1, 0);
    var pos2Who = this.add.text(
      280,
      352,
      this._ranking[1]["User"].username,
      this._textStyleWho
    );

    var pos3Score = this.add.text(
      650,
      425,
      this._ranking[2][0].score,
      this._textStyleScore
    );
    pos3Score.anchor.set(1, 0);
    var pos3Who = this.add.text(
      280,
      432,
      this._ranking[2]["User"].username,
      this._textStyleWho
    );

    var pos4Score = this.add.text(
      650,
      510,
      this._ranking[3][0].score,
      this._textStyleScore
    );
    pos4Score.anchor.set(1, 0);
    var pos4Who = this.add.text(
      280,
      518,
      this._ranking[3]["User"].username,
      this._textStyleWho
    );

    var pos5Score = this.add.text(
      650,
      593,
      this._ranking[4][0].score,
      this._textStyleScore
    );
    pos5Score.anchor.set(1, 0);
    var pos5Who = this.add.text(
      280,
      601,
      this._ranking[4]["User"].username,
      this._textStyleWho
    );
  },
  backMainMenu: function () {
    this.state.start("MainMenu");
  },
  getScore: function () {
    myThis = this; // el this n el ajax cambia
    var gameID = $("#pocoyo-game").attr("data-gameid"); // el id del game

    // jQuery Ajax para conectar con el usurio de Pocoyo y guardar su score:
    $.ajax({
      type: "POST",
      //url:  GameObject.GAME_PATH+"get-ranking.php",
      url: "/game/getScore",
      data: { gameId: gameID },
      context: document.body,
      async: false,
    }).success(function (data) {
      if (data == 0) {
        // si devuelve 0 es que no está registrado o no está logado
        console.log("Error: no getRanking");
      } else {
        myThis.rankingData = data;
      }
    });

    return JSON.parse(myThis.rankingData);
  },
};

/*
	Instructions
*/

GameObject.Instructions = function (game) {};

GameObject.Instructions.prototype = {
  preload: function () {
    this.load.image(
      "background-instructions",
      GameObject.GAME_PATH +
        "assets/images/bg-instructions-" +
        GameObject.LANG +
        ".jpg"
    );

    this.load.spritesheet(
      "button-menu-instructions",
      GameObject.GAME_PATH +
        "assets/images/btn-menu-instructions-" +
        GameObject.LANG +
        ".png",
      226,
      64
    );
  },
  create: function () {
    // imágenes pantalla
    this.add.sprite(0, 0, "background-instructions");

    // botón volver al menú
    var btMenu = this.add.button(
      0,
      0,
      "button-menu-instructions",
      this.backMainMenu,
      this,
      0,
      1
    );
    btMenu.reset(game.width / 2 - btMenu.width / 2, 775);
  },
  backMainMenu: function () {
    this.state.start("MainMenu");
  },
};

/*
	Register screen
*/

GameObject.Register = function (game) {};

GameObject.Register.prototype = {
  preload: function () {
    this.load.image(
      "background-register",
      GameObject.GAME_PATH +
        "assets/images/bg-register-" +
        GameObject.LANG +
        ".jpg"
    );

    this.load.spritesheet(
      "button-register",
      GameObject.GAME_PATH +
        "assets/images/btn-registrarse-" +
        GameObject.LANG +
        ".png",
      222,
      70
    );
    this.load.spritesheet(
      "button-login",
      GameObject.GAME_PATH +
        "assets/images/btn-login-" +
        GameObject.LANG +
        ".png",
      222,
      70
    );
    this.load.spritesheet(
      "button-menu",
      GameObject.GAME_PATH +
        "assets/images/btn-menu-rosa-" +
        GameObject.LANG +
        ".png",
      222,
      70
    );
    this.load.spritesheet(
      "button-close",
      GameObject.GAME_PATH + "assets/images/btn-close.png",
      56,
      56
    );
  },
  create: function () {
    // imágenes pantalla
    this.add.sprite(0, 0, "background-register");

    // botones
    registerBt = this.add.button(
      0,
      0,
      "button-register",
      this.registration,
      this,
      1,
      0
    );
    registerBt.reset(game.width / 2 - (registerBt.width + 10), 385);
    loginBt = this.add.button(0, 0, "button-login", this.login, this, 1, 0);
    loginBt.reset(game.width / 2 + 10, 385);
    btMenu = this.add.button(
      0,
      0,
      "button-menu",
      this.backMainMenu,
      this,
      1,
      0
    );
    btMenu.anchor.set(0.5, 0.5);
    btMenu.reset(game.width / 2, 510);
    closeBt = this.add.button(600, 185, "button-close", this.close, this, 1, 0);
  },
  backMainMenu: function () {
    this.state.start("MainMenu");
  },
  close: function () {
    GameObject.userLogged = true;
    this.state.start("GameOver");
  },
  registration: function () {
    var url =
      GameObject.LANG == "es"
        ? "https://www.pocoyo.com/club#registerForm"
        : "http://www.pocoyo.com/en/club#registerForm";
    window.open(url);
  },
  login: function () {
    var url =
      GameObject.LANG == "es"
        ? "https://www.pocoyo.com/entrar"
        : "https://www.pocoyo.com/en/login";
    window.open(url);
  },
};

/*
	prefab Player
*/

var Player = function (game, x, y, frame) {
  // llamada al sprite
  Phaser.Sprite.call(this, game, x, y, "player", frame);
  this.anchor.setTo(-0.2, 0.5);

  // add and play animations
  this.animations.add("flap", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 12, true);
  this.animations.play("flap");

  this.alive = false;

  // física:
  game.physics.arcade.enableBody(this);
  this.body.allowGravity = false;
};

Player.prototype = Object.create(Phaser.Sprite.prototype);

Player.prototype.constructor = Player;

Player.prototype.flap = function () {
  if (this.body.y > 50) this.body.velocity.y = -300;
};

/*
	prefab Ground
*/

var Ground = function (game, x, y, width, height) {
  Phaser.TileSprite.call(this, game, x, y, width, height, "ground");
  // start scrolling our ground
  this.autoScroll(GameObject._scrollVelocity, 0);

  // física para la colisión:
  game.physics.arcade.enableBody(this);
  this.body.allowGravity = false;
  this.body.immovable = true;
};

Ground.prototype = Object.create(Phaser.TileSprite.prototype);

Ground.prototype.constructor = Ground;

Ground.prototype.update = function () {};

/*
	prefab Background
*/

var Background = function (game, x, y, width, height) {
  Phaser.TileSprite.call(this, game, x, y, width, height, "background");
  // start scrolling our ground
  this.autoScroll(GameObject._scrollVelocity, 0);

  // física para la colisión:
  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = false;
  this.body.immovable = true;
};

Background.prototype = Object.create(Phaser.TileSprite.prototype);

Background.prototype.constructor = Background;

Background.prototype.update = function () {};

/*
	iniciamos los estados:
*/
game.state.add("Boot", GameObject.Boot);
game.state.add("Preloader", GameObject.Preloader);
game.state.add("MainMenu", GameObject.MainMenu);
game.state.add("Game", GameObject.Game);
game.state.add("GameOver", GameObject.GameOver);
game.state.add("Ranking", GameObject.Ranking);
game.state.add("Instructions", GameObject.Instructions);
game.state.add("Register", GameObject.Register);
game.state.start("Boot");
