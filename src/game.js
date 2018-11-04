// GLOBAL VARIABLES SHARED WITH ALL FILES
let TILE_SIZE;
let mazeContainer, instructionsContainer, buttonsContainer;
let maze, instructions, title, stackFrame;
let staticCharacter, animatedCharacter, animatedCollision, instructionCharacter;

function setupCanvas() {
	setupMazeScreen();
	setupInstructionScreen();
}