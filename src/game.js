// GLOBAL VARIABLES SHARED WITH ALL FILES
let TILE_SIZE;
let mazeContainer, instructionsContainer;
let maze, character, animatedCharacter, instructions, title;

function setupCanvas() {
	setupMazeScreen();
	setupInstructionScreen();
}



// WILL BE REMOVED SOON (not used in the game)
function bindKeys() {
	window.addEventListener("keyup", function(event) {
		switch(event.keyCode) {
			case 37: character.x -= TILE_SIZE; break;
			case 38: character.y -= TILE_SIZE; break;
			case 39: character.x += TILE_SIZE; break;
			case 40: character.y += TILE_SIZE; break;
		}
	})
}
