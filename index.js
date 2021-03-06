const app = new PIXI.Application({ 
	width: WIDTH, 
	height: HEIGHT,
	antialias: true, 
	transparent: false, 
	resolution: 1,
	backgroundColor: BACKGROUND,
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
	const message = (LANGUAGE == 'en' ? 'PLEASE RELOAD THE PAGE AFTER RESIZE' : 'RECHARGEZ LA PAGE APRES REDIMENSIONNEMENT');
	const resizeWarning = new Text(message, styleText);
	resizeWarning.anchor.set(0.5);
	resizeWarning.x = Math.floor(WIDTH/2);
	resizeWarning.y = Math.floor(HEIGHT/2);
	app.stage.addChild(resizeWarning);
	setTimeout(() => resizeWarning.destroy(), 3000);
}

function loadAssetsAndBootstrap() {
	// Declare assets here
	loader
	.add("images/sprites/active.png")
	.add("images/sprites/cat.png")
  .add("images/sprites/b_color_en.png")
  .add("images/sprites/b_forward_en.png")
  .add("images/sprites/b_left_en.png")
  .add("images/sprites/b_right_en.png")
  .add("images/sprites/color_en.png")
	.add("images/sprites/forward_en.png")
	.add("images/sprites/b_color_fr.png")
  .add("images/sprites/b_forward_fr.png")
  .add("images/sprites/b_left_fr.png")
  .add("images/sprites/b_right_fr.png")
  .add("images/sprites/color_fr.png")
  .add("images/sprites/forward_fr.png")
  .add("images/sprites/free.png")
  .add("images/sprites/goal.png")
  .add("images/sprites/green.png")
  .add("images/sprites/hint_en.png")
  .add("images/sprites/left_en.png")
	.add("images/sprites/level1_en.png")
  .add("images/sprites/left_fr.png")
  .add("images/sprites/red.png")
  .add("images/sprites/right_en.png")
	.add("images/sprites/run_en.png")
	.add("images/sprites/title_en.png")
	.add("images/sprites/right_fr.png")
	.add("images/sprites/run_fr.png")
	.add("images/sprites/title_fr.png")
  .add("images/sprites/stackframe.png")
	.add("images/sprites/wall.png")
	.add("images/sprites/wall2.png")
	.add("images/sprites/en.png")
	.add("images/sprites/fr.png")
	.add("images/sprites/door.png")
  .add('images/spritesheets/walk.json')
  .add('images/spritesheets/bump.json')
	.add('images/sprites/win_en.png')
	.add('images/sprites/win_fr.png')
	.add('images/sprites/lose_en.png')
	.add('images/sprites/lose_fr.png')
	.load(startGame); 
}

function startGame() {
	app.ticker.add(delta => gameLoop(delta));
	setupCanvas(); // see game.js file. 
}

function gameLoop(delta){ 
	PIXI.tweenManager.update();
}