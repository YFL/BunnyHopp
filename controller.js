var gameLoop = function()
{
	rafID = window.requestAnimationFrame(gameLoop);
	/*if(player.y === 399 && poison && speed === speedTemp)
	{
		speed += 5;
		itemTimer = setTimeout(function(){speed = speedTemp; poison = false}, 5000);
	}
	if(player.y === 399 && carrot && speed === speedTemp)
	{
		speed -= 5;
		itemTimer = setTimeout(function(){speed = speedTemp; carrot = false}, 5000);
	}*/

	checkCollision();
	generateObstacle();
	generateCloud();
	generateTree();
	updateViewSpace();
	drawViewSpace();
	scoreCounter();
	printScore();
	highScoreReached();
	player.update();
	drawPlayer();
	levelUp();
}

window.addEventListener("keydown", keyDownHandle, true);
window.addEventListener("keyup", keyUpHandle, true);
//function to handle keypress
function keyDownHandle (event)
{
	if(event.keyCode == 32)
	{
		if(!isPaused && isStarted)
		{
			jump = true;
			jumpA.currentTime = 0;
			console.log(pInfo.y);
			if(pInfo.y > 389) jumpA.play();
		}
		keyUp = false;
		console.log("pressed");
	}

	if(event.keyCode === 27)
	{
		pauseGame();
	}
};

//function to handle keyrelease
function keyUpHandle (event)
{
	if(event.keyCode === 32) keyUp = true;
};

//new game button click function
var newGameClick = function()
{
	$("#newGame").attr("hidden", "true");
	isStarted = true;
	gameLoop();
}

//retry button click function
var retryClick = function()
{
	if(score > highScore) highScore = score;
	init();
	gameLoop();
	retry.setAttribute("hidden", "true");
	$("#replay").css("display", "none");
}

//continue button click function
var contClick = function()
{
	isPaused = false;
	gameLoop();
	cont.setAttribute("hidden", "true");
	$("#continue").css("display", "none");
}
