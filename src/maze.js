// -------------------------------- MAZE MODEL -------------------------
class Maze {
  constructor(levelNumber) {
		this.grid = MAZES[levelNumber];
  }

  getGrid() {
    return this.grid;
  }

  getSize() {
    return {
      lig: (this.grid || []).length,
      col: (this.grid[0] || []).length 
    }
  }
}

// --------------------------- MAZE VIEW --------------------------------

function setupMazeScreen() {
	mazeContainer = new Container();
	maze = new Maze(ENTRY_LEVEL);
	TILE_SIZE = Math.min( 
    Math.floor(WIDTH * MAZE_RATIO / maze.getSize().col),
    Math.floor(HEIGHT / maze.getSize().lig));
	drawMaze();
	drawStaticCharacter();
  bindKeys(); // to be removed
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
