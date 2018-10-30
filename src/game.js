// GLOBAL VARIABLES
let TILE_SIZE;
let mazeContainer, instructionsContainer;
let maze, character, instructions;


function setupCanvas() {
	setupMazeScreen();
	setupInstructionScreen();
}

function setupMazeScreen() {
	mazeContainer = new Container();
	maze = new Maze(ENTRY_LEVEL);
	TILE_SIZE = Math.min( 
    Math.floor(WIDTH * MAZE_RATIO / maze.getSize().col),
    Math.floor(HEIGHT / maze.getSize().lig));
	drawMaze();
	drawCharacter();
  bindKeys(); // to be removed

  maze.exampleOfGlobaleVariable(); // Variable scope ;-)
}

function drawMaze() {
	for (let lig=0; lig < maze.getSize().lig; lig++) {
		for (let col=0; col < maze.getSize().col; col++) {
			let texture;
			switch(maze.getGrid()[lig][col]) {
				case 0: texture = loader.resources["images/sprites/wall.png"].texture; break;
				case 1: texture = loader.resources["images/sprites/free.png"].texture; break;
				case 2: texture = loader.resources["images/sprites/goal.png"].texture; break;
			}
			sprite = new Sprite(texture);
			sprite.width = TILE_SIZE;
			sprite.height = TILE_SIZE;
			sprite.x = col * TILE_SIZE;
			sprite.y = lig * TILE_SIZE;
			mazeContainer.addChild(sprite);
		}
	}
	mazeContainer.y = Math.floor( (HEIGHT - TILE_SIZE * maze.getSize().lig) / 2 )
	app.stage.addChild(mazeContainer)
}

function drawCharacter() {
	character = new Sprite(loader.resources["images/sprites/active.png"].texture)
	character.width = TILE_SIZE;
	character.height = TILE_SIZE;
	character.x = 0
	character.y = 0
  mazeContainer.addChild(character)
}

function setupInstructionScreen() {
	const title = new Sprite(loader.resources["images/sprites/title.png"].texture)
	title.width = Math.floor(WIDTH * INSTRUCTION_RATIO);
	title.x = Math.floor(WIDTH * MAZE_RATIO);
	app.stage.addChild(title);

	const forwardButton = new Sprite(loader.resources["images/sprites/b_forward.png"].texture) 
	forwardButton.width = Math.floor(WIDTH*0.1);
	forwardButton.anchor.set(0.5);
	forwardButton.x = Math.floor(WIDTH*0.8);
	forwardButton.y = Math.floor(HEIGHT*0.7);
	forwardButton.interactive = true;
	forwardButton.buttonMode = true;
	forwardButton.on('pointerdown', addForward);
	app.stage.addChild(forwardButton);

	const runButton = new Sprite(loader.resources["images/sprites/run.png"].texture) 
	runButton.width = Math.floor(WIDTH*0.1);
	runButton.anchor.set(0.5);
	runButton.x = Math.floor(WIDTH*0.8);
	runButton.y = Math.floor(HEIGHT*0.9);
	runButton.interactive = true;
	runButton.buttonMode = true;
	runButton.on('pointerdown', runMaze);
	app.stage.addChild(runButton);

	instructions = []
	instructionsContainer = new Container();
	instructionsContainer.x = Math.floor(WIDTH*0.6);
	app.stage.addChild(instructionsContainer);
}

function addForward() {
	instructions.push('images/sprites/forward.png');
	updateInstructions();
}

function runMaze() {
	character.alpha = 0;
	var frames = [];

	for (var i = 1; i < 7; i++) {
			frames.push(PIXI.Texture.fromFrame('cat0' + i + '.png'));
	}

	var anim = new PIXI.extras.AnimatedSprite(frames);
	anim.x = app.screen.width / 2;
	anim.y = app.screen.height / 2;
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

function updateInstructions() {
	instructionsContainer.removeChildren();
	drawInstructions();
}

function drawInstructions() {
	for(let i=0; i< instructions.length; i++) {
		let sprite = new Sprite(loader.resources[instructions[i]].texture);
		sprite.y = i * sprite.height + 10;
		sprite.interactive = true;
		sprite.buttonMode = true;
		sprite.on('pointerdown', () => removeInstruction(i));
		instructionsContainer.addChild(sprite);
	}
	instructionsContainer.height = 100;
}

function removeInstruction(spriteId) {
	console.log('remove', spriteId);
	instructions.splice(spriteId, 1);
	updateInstructions();
}



function bindKeys() {
  // Not used in the game
	window.addEventListener("keyup", function(event) {
		switch(event.keyCode) {
			case 37: character.x -= TILE_SIZE; break;
			case 38: character.y -= TILE_SIZE; break;
			case 39: character.x += TILE_SIZE; break;
			case 40: character.y += TILE_SIZE; break;
		}
	})
}
