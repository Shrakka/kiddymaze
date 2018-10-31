// -------------------------------- CHARACTER MODEL -------------------------
class Character {
  constructor(levelNumber) {
		this.col = 0;
		this.lig = 0;
  }
}

// ---------------- CHARACTER ANIMATION AND VIEWS ------------------

function drawStaticCharacter() {
	// character = new Sprite(loader.resources["images/sprites/active.png"].texture)
	staticCharacter = new Sprite(loader.resources["images/sprites/cat.png"].texture)
	staticCharacter.width = TILE_SIZE;
	staticCharacter.height = TILE_SIZE;
	staticCharacter.anchor.set(0.5);
	staticCharacter.x = TILE_SIZE / 2;
	staticCharacter.y = TILE_SIZE / 2;
	staticCharacter.rotation = SOUTH;
  mazeContainer.addChild(staticCharacter);
}

function runMaze() {
	// CHRIS You should work on this part
	// Do whatever function you need and whatever class you want.
	// You can access any global variables from game.js file (particularly character and animatedCharacter)
	// and change the implementation if you don't like it :)
	// HERE IS A STUB IMPLEMENTATION OF THE INSTRUCTIONS -> we need to replace the variable when its working
	stubInstructions = createStubInstructions();
	staticCharacter.alpha = 0;
	createAnimatedCharacter();
	tweens = createTweenList(stubInstructions); // replace by instruction when its working
	tweens[0].start();
}

function createStubInstructions() {
	stubInstructions = []
	stubInstructions.push(new Instruction(FORWARD))
	stubInstructions.push(new Instruction(FORWARD))
	stubInstructions.push(new Instruction(LEFT))
	stubInstructions.push(new Instruction(FORWARD))
	stubInstructions.push(new Instruction(FORWARD))
	stubInstructions.push(new Instruction(FORWARD))
	stubInstructions.push(new Instruction(FORWARD))
	stubInstructions.push(new Instruction(RIGHT))
	stubInstructions.push(new Instruction(FORWARD))
	return stubInstructions;
}

function createAnimatedCharacter() {
	let frames = [];
	for (let i = 1; i < 7; i++) {
			frames.push(PIXI.Texture.fromFrame('cat0' + i + '.png'));
	}

	animatedCharacter = new PIXI.extras.AnimatedSprite(frames);
	animatedCharacter.x = staticCharacter.x;
	animatedCharacter.y = staticCharacter.y;
	animatedCharacter.height = staticCharacter.height;
	animatedCharacter.width = staticCharacter.width;
	animatedCharacter.rotation = staticCharacter.rotation + WEST;
	animatedCharacter.anchor.set(0.5);
	animatedCharacter.animationSpeed = 0.17;
	animatedCharacter.play();
	mazeContainer.addChild(animatedCharacter);
}

function createTweenList(instuctions) {
	let tweens = instuctions.map(instruction => getTween(instruction));
	return setTweenChain(tweens, () => { staticCharacter.alpha = 1; animatedCharacter.alpha = 0;})
}

function setTweenChain(tweens, cb) {
	tweens[0].on('end', () => {});
	for(let i=0; i < (tweens.length - 1); i++) {
		tweens[i].on('end', () => tweens[i+1].start());
	}
	tweens[tweens.length - 1].on('end', () => cb());
	return tweens;
}

function getTween(instruction) {
	const tween = PIXI.tweenManager.createTween(animatedCharacter);
	tween.from({ y: animatedCharacter.y }).to({ y: animatedCharacter.y + TILE_SIZE });
	tween.time = 1000;
	return tween;
}