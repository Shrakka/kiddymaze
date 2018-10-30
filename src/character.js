// ---------------- CHARACTER ANIMATION AND VIEWS ------------------

function drawCharacter() {
	// character = new Sprite(loader.resources["images/sprites/active.png"].texture)
	character = new Sprite(loader.resources["images/sprites/cat.png"].texture)
	character.width = TILE_SIZE;
	character.height = TILE_SIZE;
	character.anchor.set(0.5);
	character.x = TILE_SIZE / 2;
	character.y = TILE_SIZE / 2;
	character.rotation = SOUTH;
  mazeContainer.addChild(character);
}

function runMaze() {
	// CHRIS You should work on this part
	// Do whatever function you need and whatever class you want.
	// You can access any global variables from game.js file (particularly character and animatedCharacter)
	// and change the implementation if you don't like it :)

	// HERE IS A STUB IMPLEMENTATION OF THE INSTRUCTIONS
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
	
	character.alpha = 0;
	var frames = [];
	for (var i = 1; i < 7; i++) {
			frames.push(PIXI.Texture.fromFrame('cat0' + i + '.png'));
	}

	animatedCharacter = new PIXI.extras.AnimatedSprite(frames);
	animatedCharacter.x = character.x;
	animatedCharacter.y = character.y;
	animatedCharacter.height = character.height;
	animatedCharacter.width = character.width;
	animatedCharacter.rotation = character.rotation + WEST;
	animatedCharacter.anchor.set(0.5);
	animatedCharacter.animationSpeed = 0.25;
	animatedCharacter.play();
	mazeContainer.addChild(animatedCharacter);

	for(instruction in stubInstructions) {
		// TODO: replace file at the right positon
		console.log(instruction);
	}

	const tween = PIXI.tweenManager.createTween(animatedCharacter);
	tween.from({ y: character.x }).to({ y: character.y + TILE_SIZE })
	tween.time = 1000;
	tween.on('start', () => { console.log('tween started') });
  tween.on('repeat', ( loopCount ) => { console.log('loopCount: ' + loopCount) });
  tween.on('end', () => { character.alpha = 1; animatedCharacter.alpha = 0;});
	tween.start();
}