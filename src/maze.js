class Maze {
  constructor(grid) {
    this.grid = grid
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