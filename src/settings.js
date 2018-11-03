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
WAL2 = 5;

NORTH = 3* Math.PI / 2;
EAST = 0;
WEST = Math.PI;
SOUTH = Math.PI / 2;

FORWARD = 0;
LEFT = 1;
RIGHT = 2;
COLOR = 3;

RED = 0xff0000;
BLUE = 0x0000ff;
BACKGROUND = 0x422e2f;

WALK = 0;
COLLIDE = 1;