
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
	instructions.splice(spriteId, 1);
	updateInstructions();
}

function addForward() {
	instructions.push('images/sprites/forward.png');
	updateInstructions();
}
