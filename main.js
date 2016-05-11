window.addEventListener("load", function()
{
	var model = new Model();
	var view = new View();
	var controller = new Controller();
	controller.addModel(model);
	controller.addView(view);

	var startOnKeyDown = function(event)
	{
		controller.keyDownHandle(event);
	}

	var startOnKeyUp = function(event)
	{
		controller.keyUpHandle(event);
	}

	var newGameClick = function()
	{
		console.log(this);
		controller.view.hideButton("newGame");
		controller.model.isStarted = true;
		controller.gameLoop();
	}
	var retryClick = function()
	{
		if(controller.model.score > controller.model.highScore) controller.model.highScore = controller.model.score;
		controller.model.gameOver = false;
		controller.model.init();
		controller.gameLoop();
		controller.view.hideButton("replay");
	}
	var contClick = function()
	{
		controller.model.isPaused = false;
		controller.gameLoop();
		controller.view.hideButton("continue")
	}

	var ctx = document.getElementById("myCanvas").getContext("2d");
	controller.view.addCtx(document.getElementById("myCanvas"));
	//images and sound
	var playerImage = document.getElementById("bunny");
	var groundImage = document.getElementById("ground");
	var rockImage = document.getElementById("rock");
	var cloudImage = document.getElementById("cloud");
	var treeImage = document.getElementById("tree");
	var carrotImage = document.getElementById("carrot");
	var poisonImage = document.getElementById("poison");
	var newGame = document.getElementById("newGame");
	newGame.onclick = newGameClick;
	var retry = document.getElementById("replay");
	retry.onclick = retryClick;
	var cont = document.getElementById("continue");
	cont.onclick = contClick;
	var jumpA = document.getElementById("jump");
	var chewA = document.getElementById("chew");
	var drinkA = document.getElementById("drink");
	var deathA = document.getElementById("death");
	var viewSpace = new ViewSpace();
	var player = new Player(playerImage, 300, 201, 2, 0);
	controller.model.add("jumpA", jumpA);
	controller.model.add("chewA", chewA);
	controller.model.add("drinkA", drinkA);
	controller.model.add("deathA", deathA);
	controller.model.add("viewSpace", viewSpace);
	controller.model.add("player", player);
	controller.model.add("rockImage", rockImage);
	controller.model.add("cloudImage", cloudImage);
	controller.model.add("treeImage", treeImage);
	controller.model.add("poisonImage", poisonImage);
	controller.model.add("carrotImage", carrotImage);

	//print ground to canvas
	for(var i = 0; i < 1200; i += 40)
		{
			ctx.drawImage(groundImage, i, 600);
		}
	//print player to canvas
	ctx.drawImage(player.src, player.sXPos, player.sYPos, player.widthToDisplay, player.heightToDisplay, player.x, player.y, player.widthToDisplay, player.heightToDisplay);
	//print 0 score to canvas
	//haha
	ctx.font="30px Georgia";
	ctx.fillText(controller.model.score, 10, 30);

	window.addEventListener("keydown", startOnKeyDown, true);
	window.addEventListener("keyup", startOnKeyUp, true);
});
