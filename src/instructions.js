
// ---------------- INSTRUCTION MODEL  ------------------

class Instruction {
  constructor(type) {
		this.type = type;
		this.spriteName = '';
		this.position = 0;
		this.x = 0;
		this.y = 0;
		this.execute = () => console.log('hey');
  }

  getSprite() {
		switch(this.type) {
			case FORWARD: this.spriteName = 'forward_'; break;
			case LEFT: this.spriteName = 'left_'; break;
			case RIGHT: this.spriteName = 'right_'; break;
			case COLOR: this.spriteName = 'color_'; break;
			default: this.spriteName = 'forward_';
		}
		return new Sprite(loader.resources['images/sprites/' + this.spriteName + LANGUAGE + '.png'].texture);
  }

}


// ---------------- INSTRUCTION VIEWS AND FUNCTION  ------------------

function setupInstructionScreen() {
	setTitle();
	setButtons();
	setInstructionStack();
}

function setTitle() {
	title = new Sprite(loader.resources["images/sprites/title_en.png"].texture)
	title.width = Math.floor(WIDTH * INSTRUCTION_RATIO);
	title.x = Math.floor(WIDTH * MAZE_RATIO);
	app.stage.addChild(title);
}

function setButtons() {
	const forwardButton = new Sprite(loader.resources["images/sprites/b_forward_en.png"].texture) 
	forwardButton.width = Math.floor(WIDTH*0.1);
	forwardButton.anchor.set(0.5);
	forwardButton.x = Math.floor(WIDTH*0.8);
	forwardButton.y = Math.floor(HEIGHT*0.7);
	forwardButton.interactive = true;
	forwardButton.buttonMode = true;
	forwardButton.on('pointerdown', addForward);
	app.stage.addChild(forwardButton);

	const runButton = new Sprite(loader.resources["images/sprites/run_en.png"].texture) 
	runButton.width = Math.floor(WIDTH*0.1);
	runButton.anchor.set(0.5);
	runButton.x = Math.floor(WIDTH*0.8);
	runButton.y = Math.floor(HEIGHT*0.9);
	runButton.interactive = true;
	runButton.buttonMode = true;
	runButton.on('pointerdown', runMaze);
	app.stage.addChild(runButton);
}

function setInstructionStack() {
	instructions = []
	instructionsContainer = new Container();
	instructionsContainer.x = Math.floor(WIDTH*0.6) + 5;
	instructionsContainer.y = Math.floor(title.height);
	app.stage.addChild(instructionsContainer);
}

function updateInstructions() {
	instructionsContainer.removeChildren();
	drawInstructions();
}

function drawInstructions() {
	for(let i=0; i< instructions.length; i++) {
		let sprite = instructions[i].getSprite();
		sprite.y = i * sprite.height + 10;
		sprite.interactive = true;
		sprite.buttonMode = true;
		sprite.on('pointerdown', () => removeInstruction(i));
		instructionsContainer.addChild(sprite);
	}
	resizeStackIfNecessary();
}

function removeInstruction(spriteId) {
	instructions.splice(spriteId, 1);
	updateInstructions();
}

function addForward() {
	instructions.push(new Instruction(FORWARD));
	updateInstructions();
}

function resizeStackIfNecessary() {
	if (instructionsContainer.height > HEIGHT*0.5) {
		instructionsContainer.height = Math.floor(HEIGHT*0.5);
	}
}