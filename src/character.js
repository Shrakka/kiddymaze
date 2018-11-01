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
  		console.log('update called');
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
				return 'collide';
			} else {
				this.goForward();
			}
		}
		return 'ok';
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
			case SOUTH: return maze.getGrid()[this.lig + 1][this.col] === WALL;
			case NORTH: return maze.getGrid()[this.lig - 1][this.col] === WALL;
			case EAST:  return maze.getGrid()[this.lig][this.col + 1] === WALL;
			case WEST:  return maze.getGrid()[this.lig][this.col - 1] === WALL;
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
	console.log(staticCharacter.rotation, SOUTH)
}

function runMaze() {
	// CHRIS You should work on this part. You can use whatever function you need and whatever class you want.
	// You can access any global variables from game.js file (particularly character and animatedCharacter) and change my implementation if you don't like it :)
	staticCharacter.alpha = 0;
	createAnimatedCharacter('w');
	instructionCharacter = new Character(ENTRY_LEVEL);
	
	// HERE IS A STUB IMPLEMENTATION OF THE INSTRUCTIONS // replace by instruction when its working
	//stubInstructions = createStubInstructionsPass();
    stubInstructions = createStubInstructionsFail();
	tweens = createTweenList(stubInstructions); 
	tweens[0].start();
}

function createStubInstructionsPass() {
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
function createStubInstructionsFail() {
    stubInstructions = []
    stubInstructions.push(new Instruction(FORWARD))
    stubInstructions.push(new Instruction(LEFT))
    stubInstructions.push(new Instruction(FORWARD))
    stubInstructions.push(new Instruction(FORWARD))
    stubInstructions.push(new Instruction(LEFT))
    stubInstructions.push(new Instruction(FORWARD))
    stubInstructions.push(new Instruction(RIGHT))
    stubInstructions.push(new Instruction(FORWARD))
    return stubInstructions;
}

function createAnimatedCharacter(val) {

	let frames = [];
	if(val==='w'){
        for (let i = 1; i < 7; i++) {
            frames.push(PIXI.Texture.fromFrame('cat0' + i + '.png'));
        }
	}
	else if(val==='c'){
        for (let i = 1; i < 7; i++) {
            frames.push(PIXI.Texture.fromFrame('bumpcat0' + i + '.png'));
        }
	}
	animatedCharacter = new PIXI.extras.AnimatedSprite(frames);
	animatedCharacter.x = staticCharacter.x;
	animatedCharacter.y = staticCharacter.y;
	animatedCharacter.height = staticCharacter.height;
	animatedCharacter.width = staticCharacter.width;
	animatedCharacter.rotation = staticCharacter.rotation;
	//animatedCharacter.tint = 0xff0000;
	animatedCharacter.anchor.set(0.5);
	animatedCharacter.animationSpeed = 0.17;
	animatedCharacter.play();
	mazeContainer.addChild(animatedCharacter);
}

function createAnimatedCharacter(x_pos, y_pos) {

    let frames = [];
	for (let i = 1; i < 7; i++) {
		frames.push(PIXI.Texture.fromFrame('cat0' + i + '.png'));
	}
    animatedCharacter = new PIXI.extras.AnimatedSprite(frames);
    animatedCharacter.x = x_pos;
    animatedCharacter.y = y_pos;
    animatedCharacter.height = staticCharacter.height;
    animatedCharacter.width = staticCharacter.width;
    animatedCharacter.rotation = staticCharacter.rotation;
    animatedCharacter.tint = 0;
    animatedCharacter.anchor.set(0.5);
    animatedCharacter.animationSpeed = 0.17;
    animatedCharacter.play();
    mazeContainer.addChild(animatedCharacter);
}

function createAnimatedCollision(x_pos, y_pos, rotation) {
    let frames = [];
	for (let i = 1; i < 7; i++) {
		frames.push(PIXI.Texture.fromFrame('bumpcat0' + i + '.png'));
	}

    animatedCollision = new PIXI.extras.AnimatedSprite(frames);
    animatedCollision.x = x_pos;
    animatedCollision.y = y_pos;
    animatedCollision.height = staticCharacter.height;
    animatedCollision.width = staticCharacter.width;
    animatedCollision.rotation = rotation;
    //animatedCharacter.tint = 0xff0000;
    animatedCollision.anchor.set(0.5);
    animatedCollision.animationSpeed = 0.17;
    animatedCharacter.visible = false;
    animatedCollision.play();
    mazeContainer.addChild(animatedCollision);

}

function createTweenList(instuctions) {
	let tweens = instuctions.map(instruction => getTween(instruction));
	return setTweenChain(tweens, resetAnimation)
}

function setTweenChain(tweens, cb) { //There is an order of operations problem where the animation happens at the end of the 'tween'
	tweens[0].on('end', () => {});
	for(let i=0; i < (tweens.length - 1); i++) {
		tweens[i].on('start', () =>{
			console.log('started a tween yay');
			let from = tweens[i]._from;
			let to = tweens[i]._to;
			console.log("from: " + JSON.stringify(from));
			console.log("to: " + JSON.stringify(to));
			if(from.x === to.x && from.y === to.y && to.rotation === 0 && from.rotation === 0){
				console.log("Realtime Collision!");
				animatedCharacter.visible = false;
				//mazeContainer.removeChild(animatedCharacter);
				createAnimatedCollision(tweens[i]._from.x, tweens[i]._from.y, tweens[i]._from.rotation);
			}
		});
		tweens[i].on('end', () => {
            console.log('endtween', i);
			if(animatedCollision!==null){
				mazeContainer.removeChild(animatedCollision);
			}
        	animatedCharacter.visible = true;
			tweens[i+1].start()
		});
	}
	tweens[tweens.length - 1].on('end', () => cb());
	return tweens;
}

function resetAnimation() {
	staticCharacter.alpha = 1;
	animatedCharacter.alpha = 0;
}

function getTween(instruction) {
	const start = instructionCharacter.getState();
	const type = instructionCharacter.updateState(instruction);
	const end = instructionCharacter.getState();
	

	let tween;
	if (type === 'collide') {
		console.log('collided');
		tween = PIXI.tweenManager.createTween(animatedCharacter);
	} else {
		tween = PIXI.tweenManager.createTween(animatedCharacter);
	}
	
	tween.time = 1000;
	tween.from(start).to(end);

	return tween;
}