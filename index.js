const app = new PIXI.Application({ 
	width: WIDTH, 
	height: HEIGHT,
	antialias: true, 
	transparent: false, 
	resolution: 1
});

setupApp();
loadAssetsAndBootstrap();

function setupApp() {
	window.addEventListener("resize", function(event){ showResizeWarning() });
	document.body.appendChild(app.view);
}

function showResizeWarning() {
	const styleText = new TextStyle({
		fontSize: 36,
		fontWeight: 'bold',
		stroke: '#ffffff',
		strokeThickness: 5 })
	const resizeWarning = new Text('PLEASE RELOAD THE PAGE AFTER RESIZE', styleText);
	resizeWarning.anchor.set(0.5);
	resizeWarning.x = Math.floor(WIDTH/2);
	resizeWarning.y = Math.floor(HEIGHT/2);
	app.stage.addChild(resizeWarning)
}

function loadAssetsAndBootstrap() {
	// Declare assets here
	loader
	.add("images/sprites/active.png")
  .add("images/sprites/b_color.png")
  .add("images/sprites/b_forward.png")
  .add("images/sprites/b_left.png")
  .add("images/sprites/b_right.png")
  .add("images/sprites/ball.png")
  .add("images/sprites/color.png")
  .add("images/sprites/forward.png")
  .add("images/sprites/free.png")
  .add("images/sprites/goal.png")
  .add("images/sprites/green.png")
  .add("images/sprites/hint.png")
  .add("images/sprites/left.png")
  .add("images/sprites/level1.png")
  .add("images/sprites/red.png")
  .add("images/sprites/right.png")
  .add("images/sprites/run.png")
  .add("images/sprites/title.png")
  .add("images/sprites/wall.png")
  .add('images/spritesheets/spritesheet.json')
	.load(startGame); 
}

function startGame() {
	app.ticker.add(delta => gameLoop(delta));
	setupCanvas(); // see game.js file. Everything should be set there
}

function gameLoop(delta){ 
	PIXI.tweenManager.update();
}