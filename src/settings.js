LANGUAGE = 'en';

WIDTH  = window.innerWidth;
HEIGHT = window.innerHeight;
ENTRY_LEVEL = 1;
MAZE_RATIO = 0.6; // 60% of the screen
INSTRUCTION_RATIO = 1 - MAZE_RATIO;

WALL = 0;
FREE = 1;
GOAL = 2;
D_BL = 3;
D_RD = 4;

NORTH = 0;
EAST = Math.PI / 2;
WEST = 3 * Math.PI / 2;
SOUTH = Math.PI;

FORWARD = 0;
LEFT = 1;
RIGHT = 2;
COLOR = 3;

RED = 0xff0000;
BLUE = 0x0000ff;