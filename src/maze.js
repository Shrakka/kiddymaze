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
}

function drawMaze() {
	for (let lig=0; lig < maze.getSize().lig; lig++) {
		for (let col=0; col < maze.getSize().col; col++) {
			addBackgroundTile(lig, col);
			addTileSprite(lig, col);
		}
	}
	mazeContainer.y = Math.floor( (HEIGHT - TILE_SIZE * maze.getSize().lig) / 2 )
	app.stage.addChild(mazeContainer)
}

function addBackgroundTile(lig, col) {
	let tile = new Sprite(loader.resources["images/sprites/free.png"].texture);
			tile.width = TILE_SIZE;
			tile.height = TILE_SIZE;
			tile.x = col * TILE_SIZE;
			tile.y = lig * TILE_SIZE;
			mazeContainer.addChild(tile);
}

function addTileSprite(lig, col) {
	let tileType = maze.getGrid()[lig][col];
	let texture;
	switch(tileType) {
		case WALL: texture = loader.resources["images/sprites/wall.png"].texture; break;
		case WAL2: texture = loader.resources["images/sprites/wall2.png"].texture; break;
		case FREE: texture = loader.resources["images/sprites/free.png"].texture; break;
		case GOAL: texture = loader.resources["images/sprites/goal.png"].texture; break;
		case D_RD:
		case D_BL: texture = loader.resources["images/sprites/door.png"].texture; break;
	}
	let sprite = new Sprite(texture);
	sprite.anchor.set(0.5)
	sprite.width = TILE_SIZE;
	sprite.height = TILE_SIZE;
	sprite.x = col * TILE_SIZE + TILE_SIZE / 2;
	sprite.y = lig * TILE_SIZE + TILE_SIZE / 2;

	switch(tileType) {
		case GOAL: sprite.scale.set(0.5); break;
		case D_BL: sprite.tint = BLUE; break;
		case D_RD: sprite.tint = RED; break;
	}

	mazeContainer.addChild(sprite);
}