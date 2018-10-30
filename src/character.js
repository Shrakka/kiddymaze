// ---------------- CHARACTER MODEL (if needed) ------------------

class Character {
  constructor() {
  }

  characterFunction() {
    console.log('Hello world'); 
  }

}

// ---------------- CHARACTER ANIMATION AND VIEWS ------------------

function drawCharacter() {
	character = new Sprite(loader.resources["images/sprites/active.png"].texture)
	character.width = TILE_SIZE;
	character.height = TILE_SIZE;
	character.anchor.set(0.5);
	character.x = TILE_SIZE / 2
	character.y = TILE_SIZE / 2
	// character.rotation = SOUTH;
  mazeContainer.addChild(character)
}

function runMaze() {
	character.alpha = 0;
	var frames = [];

	for (var i = 1; i < 7; i++) {
			frames.push(PIXI.Texture.fromFrame('cat0' + i + '.png'));
	}

	var anim = new PIXI.extras.AnimatedSprite(frames);
	anim.x = character.x;
	anim.y = character.y;
	anim.height = TILE_SIZE;
	anim.width = TILE_SIZE;
	anim.rotation = character.rotation;
	anim.anchor.set(0.5);
	anim.animationSpeed = 0.25;
	anim.play();
	app.stage.addChild(anim);


	const tween = PIXI.tweenManager.createTween(anim);
	tween.from({ x: 0 }).to({ x: 250 })
	tween.time = 1000;
	tween.repeat = 3;
	tween.on('start', () => { console.log('tween started') });
  tween.on('repeat', ( loopCount ) => { console.log('loopCount: ' + loopCount) });
  tween.on('end', () => { character.alpha = 1});
	tween.start();
}