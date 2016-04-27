var gameLoop = function()
{
	rafID = window.requestAnimationFrame(gameLoop);

	viewSpace.checkCollision();
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
			if(player.y > 389) jumpA.play();
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
