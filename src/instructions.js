// ---------------- INSTRUCTION MODEL  ------------------
class Instruction {
  constructor(type) {
		this.type = type;
		this.spriteName = '';
		this.position = 0;
		this.x = 0;
		this.y = 0;
  }

  getSprite() {
		switch(this.type) {
			case FORWARD: this.spriteName = 'forward'; break;
			case LEFT: this.spriteName = 'left'; break;
			case RIGHT: this.spriteName = 'right'; break;
			case COLOR: this.spriteName = 'color'; break;
			default: this.spriteName = 'forward';
		}
		return new Sprite(getSpriteTexture(this.spriteName));
	}
}

// ---------------- INSTRUCTION VIEWS AND FUNCTION  ------------------
function setupInstructionScreen() {
	setTitle();
	setInstructionStack();
	setButtons();
	setTranslationButton();
}

function setTitle() {
	title = new Sprite(getSpriteTexture('title'));
	title.anchor.set(0.5, 0);
	setSpriteWidth(title, Math.floor(WIDTH * INSTRUCTION_RATIO / 2))
	title.x = Math.floor(INSTRUCTION_MIDDLE);
	title.y = Math.floor(HEIGHT * 0.01) // margin
	app.stage.addChild(title);
}

function setButtons() {
	buttonsContainer = new Container();
	app.stage.addChild(buttonsContainer);

	addInstructionButton('b_forward', FORWARD, INSTRUCTION_MIDDLE, HEIGHT * 0.72, BUTTON_WIDTH*1.3, 0.5, 0);
	addInstructionButton('b_right', RIGHT, WIDTH*0.98, HEIGHT*0.8, BUTTON_WIDTH*1.3, 1, 0);
	addInstructionButton('b_left', LEFT, WIDTH*0.63, HEIGHT*0.8, BUTTON_WIDTH*1.3, 0, 0);
	addInstructionButton('b_color', COLOR, INSTRUCTION_MIDDLE, HEIGHT*0.98, BUTTON_WIDTH*1.3, 0.5, 1);

	runButton = new Sprite(getSpriteTexture('run')) 
	setSpriteWidth(runButton, WIDTH*0.07);
	runButton.anchor.set(1, 1);
	runButton.x = Math.floor(stackFrame.getBounds().x + stackFrame.getBounds().width);
	runButton.y = Math.floor(stackFrame.getBounds().y + stackFrame.getBounds().height);
	runButton.interactive = true;
	runButton.buttonMode = true;
	runButton.on('pointerdown', runMaze);
	app.stage.addChild(runButton);
}

function setInstructionStack() {
	instructions = []
	instructionsContainer = new Container();
	instructionsContainer.x = Math.floor(WIDTH*MAZE_RATIO);
	instructionsContainer.y = Math.floor(title.height + HEIGHT * 0.02);
	app.stage.addChild(instructionsContainer);
	addStackFrameSprite();
}

function addStackFrameSprite() {
	stackFrame = new Sprite(loader.resources["images/sprites/stackframe.png"].texture);
	stackFrame.width = Math.floor( (INSTRUCTION_RATIO - 0.05) * WIDTH );
	stackFrame.anchor.set(0.5, 0);
	stackFrame.height = Math.floor(0.6 * HEIGHT);
	stackFrame.x = Math.floor(INSTRUCTION_MIDDLE);
	stackFrame.y = Math.floor(title.height + HEIGHT * 0.02);
	app.stage.addChild(stackFrame);
}

function addInstruction(instructionCode) {
	instructions.push(new Instruction(instructionCode));
	updateInstructions();
}

function updateInstructions() {
	instructionsContainer.removeChildren();
	drawInstructions();
}

function drawInstructions() {
	let deldaY = 10;
	for(let i = 0; i < instructions.length; i++) {
		let sprite = instructions[i].getSprite();
		sprite.x = stackFrame.width * 0.1;
		sprite.y = deldaY;
		sprite.interactive = true;
		sprite.buttonMode = true;
		setSpriteWidth(sprite, Math.floor(stackFrame.width - stackFrame.width * 0.05))
		deldaY += (sprite.height + 5);
		sprite.on('pointerdown', () => removeInstruction(i));
		instructionsContainer.addChild(sprite);
	}
	resizeStackIfNecessary();
}

function removeInstruction(spriteId) {
	instructions.splice(spriteId, 1);
	updateInstructions();
}

function resizeStackIfNecessary() {
	const stackHeight = stackFrame.getBounds().height;
	if (instructionsContainer.height > stackHeight - 20) {
		instructionsContainer.height = stackHeight - 20;
	}
}

function setSpriteWidth(sprite, width) {
	sprite.scale.set(width / sprite.width);
}

function setSpriteHeight(sprite, height) {
	sprite.scale.set(height / sprite.height);
}

function getSpriteTexture(spriteName) {
	return loader.resources[`images/sprites/${spriteName}_${LANGUAGE}.png`].texture;
}

function addInstructionButton(spriteName, buttonCode, x, y, width, xAnchor=0.5, yAnchor=0) {
	const button = new Sprite(getSpriteTexture(spriteName));
	button.interactive = true;
	button.buttonMode = true;
	button.anchor.set(xAnchor, yAnchor);
	setSpriteWidth(button, width);
	button.x = Math.floor(x);
	button.y = Math.floor(y);
	button.on('pointerdown', () => addInstruction(buttonCode));
	buttonsContainer.addChild(button);
}

function setTranslationButton() {
	const flagName = (LANGUAGE === 'fr' ? 'en' : 'fr');
	const translationButton = new Sprite(loader.resources[`images/sprites/${flagName}.png`].texture);
	translationButton.interactive = true;
	translationButton.buttonMode = true;
	translationButton.anchor.set(1,1);
	translationButton.x = app.screen.width - 5;
	translationButton.y = app.screen.height - 5;
	setSpriteWidth(translationButton, 20)
	translationButton.on('pointerdown', () => switchLanguage(translationButton));
	app.stage.addChild(translationButton);
}

function switchLanguage(translationButton) {
	translationButton.setTexture(loader.resources[`images/sprites/${LANGUAGE}.png`].texture);
	LANGUAGE = (LANGUAGE === 'fr' ? 'en' : 'fr');
	app.stage.removeChild(buttonsContainer);
	app.stage.removeChild(runButton);
	setButtons();
	updateInstructions();

}