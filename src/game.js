// GLOBAL VARIABLES SHARED WITH ALL FILES
let TILE_SIZE;
let mazeContainer, instructionsContainer;
let maze, instructions, title, stackFrame;
let staticCharacter, animatedCharacter, animatedCollision, instructionCharacter;

function setupCanvas() {
	setupMazeScreen();
	setupInstructionScreen();
}

// WILL BE REMOVED SOON (not used in the game)
function bindKeys() {
	window.addEventListener("keyup", function(event) {
		switch(event.keyCode) {
			case 37: staticCharacter.x -= TILE_SIZE; break; // BACKWARD
			case 38: staticCharacter.y -= TILE_SIZE; break; // 
			case 39: staticCharacter.x += TILE_SIZE; break; // FORWARD
			case 40: staticCharacter.y += TILE_SIZE; break;
		}
	})
}
