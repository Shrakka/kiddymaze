const MAZES = {
  1: [
      [FREE, FREE, FREE, WALL, FREE, GOAL],
      [FREE, WALL, FREE, WALL, WALL, FREE],
      [FREE, FREE, FREE, FREE, FREE, FREE],
      [FREE, WALL, WALL, WALL, FREE, WALL],
      [FREE, WALL, FREE, FREE, FREE, WALL],
      [FREE, WALL, FREE, WALL, WALL, WALL],
    ],
  2: [
      [FREE, FREE, FREE, WALL, FREE, GOAL],
      [FREE, WALL, FREE, WALL, WALL, FREE],
      [FREE, FREE, FREE, FREE, FREE, FREE],
      [FREE, WALL, WALL, WALL, FREE, WALL],
      [FREE, WALL, FREE, FREE, FREE, WALL],
      [FREE, WALL, FREE, WALL, WALL, WALL],
  ],
}

const CHARACTER_INIT_POSITION = {
  1: { col: 0, lig: 0, orientation: SOUTH, color: RED },
  2: { col: 0, lig: 0, orientation: SOUTH, color: BLUE },
}