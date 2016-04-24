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

//funciton to print score
var printScore = function()
{
	ctx.font = "30px Georgia";
	if(poison) ctx.fillStyle = "white";
	else ctx.fillStyle = "black";
	ctx.fillText(score, 10, 30);
}
