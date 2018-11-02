// -------------------------------- CHARACTER MODEL -------------------------
class Character {
  constructor(levelNumber) {
		this.col = CHARACTER_INIT_POSITION[levelNumber].col;
		this.lig = CHARACTER_INIT_POSITION[levelNumber].lig;
		this.orientation = CHARACTER_INIT_POSITION[levelNumber].orientation;
		this.color = CHARACTER_INIT_POSITION[levelNumber].color;
	}
	
	getState() {
		return {
			x: this.col * TILE_SIZE + TILE_SIZE / 2,
			y: this.lig * TILE_SIZE + TILE_SIZE / 2,
			rotation: this.orientation,
			tint: this.color
		}
	}

	updateState(instruction) {
		if (instruction.type === LEFT) {
			this.orientation -= (Math.PI / 2);
		}

		if (instruction.type === RIGHT) {
			this.orientation += (Math.PI / 2);
		}

		if (instruction.type === COLOR) {
			this.color = (this.color === BLUE ? RED : BLUE);
		}

		if (instruction.type === FORWARD) {
			if (this.isForwardForbidden()) {
				return COLLIDE;
			} else {
				this.goForward();
			}
		}
		return WALK;
	}

	isForwardForbidden() {
		return this.isEdgy() || this.isFacingWall() || this.isFacingWrongDoor();
	}

	isEdgy() {
		// Return True if character is facing a outside boundery of the maze
		switch(this.orientation) {
			case SOUTH: return this.lig === maze.getSize().lig - 1;
			case NORTH: return this.lig === 0;
			case EAST:  return this.col === maze.getSize().col - 1;
			case WEST:  return this.col === 0;
		}
	}

	isFacingWall() {
		switch(this.orientation) {	
			case SOUTH: return (maze.getGrid()[this.lig + 1][this.col] === WALL) || (maze.getGrid()[this.lig + 1][this.col] === WAL2);
			case NORTH: return (maze.getGrid()[this.lig - 1][this.col] === WALL) || (maze.getGrid()[this.lig - 1][this.col] === WAL2);
			case EAST:  return (maze.getGrid()[this.lig][this.col + 1] === WALL) || (maze.getGrid()[this.lig][this.col + 1] === WAL2);
			case WEST:  return (maze.getGrid()[this.lig][this.col - 1] === WALL) || (maze.getGrid()[this.lig][this.col - 1] === WAL2);
		}
	}

	isFacingWrongDoor() {
		if(this.color === RED) {
			switch(this.orientation) {
				case SOUTH: return maze.getGrid()[this.lig + 1][this.col] === D_BL;
				case NORTH: return maze.getGrid()[this.lig - 1][this.col] === D_BL;
				case EAST:  return maze.getGrid()[this.lig][this.col + 1] === D_BL;
				case WEST:  return maze.getGrid()[this.lig][this.col - 1] === D_BL;
			}
		} else {
			switch(this.orientation) {
				case SOUTH: return maze.getGrid()[this.lig + 1][this.col] === D_RD;
				case NORTH: return maze.getGrid()[this.lig - 1][this.col] === D_RD;
				case EAST:  return maze.getGrid()[this.lig][this.col + 1] === D_RD;
				case WEST:  return maze.getGrid()[this.lig][this.col - 1] === D_RD;
			}
		}	
	}

	goForward() {
		switch(this.orientation) {
			case SOUTH: this.lig += 1; break;
			case NORTH: this.lig -= 1; break;
			case EAST:  this.col += 1; break;
			case WEST:  this.col -= 1; break;
		}
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
	staticCharacter.rotation = CHARACTER_INIT_POSITION[ENTRY_LEVEL].orientation;
	mazeContainer.addChild(staticCharacter);
}

function runMaze() {
	staticCharacter.alpha = 0;
	createAnimatedCharacter();
	instructionCharacter = new Character(ENTRY_LEVEL);
	instructions = (instructions.length === 0) ? createStubInstructions() : instructions; // to be updated;
	tweens = createTweenList(instructions);
	tweens[0].start();
}

function createAnimatedCharacter(type = WALK) {
	animatedCharacter = new PIXI.extras.AnimatedSprite(getFrames(type));
	animatedCharacter.x = staticCharacter.x;
	animatedCharacter.y = staticCharacter.y;
	animatedCharacter.height = staticCharacter.height;
	animatedCharacter.width = staticCharacter.width;
	animatedCharacter.rotation = staticCharacter.rotation;
	animatedCharacter.anchor.set(0.5);
	animatedCharacter.animationSpeed = 0.17;
	animatedCharacter.play();
	mazeContainer.addChild(animatedCharacter);
}

function getFrames(type) {
	let frames = [];
	if (type === WALK) {
		for (let i = 1; i < 7; i++) {
			frames.push(PIXI.Texture.fromFrame('cat0' + i + '.png'));
		}
	}
	if (type === COLLIDE) {
		for (let i = 1; i < 7; i++) {
			frames.push(PIXI.Texture.fromFrame('bumpcat0' + i + '.png'));
		}
	}
	return frames;
}

function createAnimatedCollision(x, y, rotation) {
    animatedCollision = new PIXI.extras.AnimatedSprite(getFrames(COLLIDE));
    animatedCollision.x = x;
    animatedCollision.y = y;
		animatedCollision.rotation = rotation;
		animatedCollision.height = staticCharacter.height;
    animatedCollision.width = staticCharacter.width;
    animatedCollision.anchor.set(0.5);
    animatedCollision.animationSpeed = 0.2;
    animatedCollision.play();
    mazeContainer.addChild(animatedCollision);
}

function createTweenList(instuctions) {
	let tweens = instuctions.map(instruction => getTween(instruction));
	return setTweenChain(tweens, resetAnimation)
}

function setTweenChain(tweens, cb) {
	for (let i = 0; i < (tweens.length - 1); i++) {
		tweens[i].on('start', () => checkCollision(tweens[i]))
		tweens[i].on('end', () => { checkEndCollision(); tweens[i+1].start(); });
	}
	// special case for last tween
	tweens[tweens.length - 1].on('start', () => checkCollision(tweens[tweens.length - 1]));
	tweens[tweens.length - 1].on('end', () => { checkEndCollision(); cb()});
	return tweens;
}

function resetAnimation() {
	staticCharacter.alpha = 1;
	animatedCharacter.alpha = 0;
	animatedCollision = null;
}

function getTween(instruction) {
	const start = instructionCharacter.getState();
	const type = instructionCharacter.updateState(instruction);
	const end = instructionCharacter.getState();

	let tween = PIXI.tweenManager.createTween(animatedCharacter);
	tween.time = 1000;
	tween.from(start).to(end);
	return tween;
}

function checkCollision(tween) {
	const from = tween._from;
	const to = tween._to;
	if ( (from.x === to.x) && (from.y === to.y) && (from.rotation === to.rotation)){
		animatedCharacter.visible = false;
		createAnimatedCollision(from.x, from.y, from.rotation);
	}
}

function checkEndCollision() {
	if (animatedCollision !== null) {
		mazeContainer.removeChild(animatedCollision);
	}
	animatedCharacter.visible = true;
}

function updateAnimatedCharacter(type, start) {
	animatedCharacter = new PIXI.extras.AnimatedSprite(getFrames(type));
	animatedCharacter.x = start.x;
	animatedCharacter.y = start.y;
	animatedCharacter.rotation = start.rotation;
	animatedCharacter.height = staticCharacter.height;
	animatedCharacter.width = staticCharacter.width;
	animatedCharacter.anchor.set(0.5);
	animatedCharacter.animationSpeed = 0.17;
	animatedCharacter.play();
}

function createStubInstructions() {
	stubInstructions = []
	stubInstructions.push(new Instruction(FORWARD))
	// stubInstructions.push(new Instruction(FORWARD))
	stubInstructions.push(new Instruction(LEFT))
	stubInstructions.push(new Instruction(FORWARD))
	// stubInstructions.push(new Instruction(FORWARD))
	// stubInstructions.push(new Instruction(FORWARD))
	// stubInstructions.push(new Instruction(FORWARD))
	// stubInstructions.push(new Instruction(RIGHT))
	// stubInstructions.push(new Instruction(FORWARD))
	return stubInstructions;
}
