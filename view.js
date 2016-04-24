//funciton to draw the viewSpace to the screen
var drawViewSpace = function()
{
	if(!carrot && !poison) ctx.clearRect(0, 0, 1200, 600);
	if(carrot)
	{
		ctx.beginPath();
		ctx.fillStyle = "HotPink";
		ctx.fillRect(0, 0, 1200, 600);
		ctx.closePath();
	}
	if(poison)
	{
		ctx.beginPath()
		ctx.fillStyle = "MidnightBlue";
		ctx.fillRect(0, 0, 1200, 600)
		ctx.closePath();
	}
	for(var i = 0; i < 4; i++)
	{
		for(var j = 0; j < viewSpace[i].length; j++)
		{
			ctx.drawImage(viewSpace[i][j].src, viewSpace[i][j].position[0], viewSpace[i][j].position[1], viewSpace[i][j].widthToDisplay, viewSpace[i][j].heightToDisplay);
		}
	}
}

	//function to draw player
var drawPlayer = function()
{
	//ctx.clearRect(0, 0, 1200, 800);
	ctx.drawImage(player, pInfo.sXPos, pInfo.sYPos, pInfo.sWidth, pInfo.sHeight, pInfo.x, pInfo.y, pInfo.width, pInfo.height);
}
