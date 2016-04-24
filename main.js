window.onload = function()
{
	//canvas
	var canvas = document.getElementById("myCanvas");
	//2d canvas context
	var ctx = canvas.getContext("2d");
	console.log(ctx);
	//images and sound
	var playerImage = document.getElementById("bunny");
	var groundImage = document.getElementById("ground");
	var rockImage = document.getElementById("rock");
	var cloudImage = document.getElementById("cloud");
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

	var player = new Player(playerImage, 300, 201, 2, 0);

	//print ground to canvas
	for(var i = 0; i < 1200; i += 40)
		{
			ctx.drawImage(groundImage, i, 600);
		}
	//print player to canvas
	ctx.drawImage(player.src, player.sXPos, player.sYPos, player.widthToDisplay, player.heightToDisplay, player.x, player.y, player.widthToDisplay, player.heightToDisplay);
	//print 0 score to canvas
	ctx.font="30px Georgia";
	ctx.fillText(score, 10, 30);

	//gameloop function
}
