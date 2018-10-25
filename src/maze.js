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

  exampleOfGlobaleVariable() {
    console.log('TILE_SIZE CAN BE ACCESSED ANYWHERE', TILE_SIZE);
  }

}