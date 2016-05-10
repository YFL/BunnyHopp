function View()
{
	this.ctx;
	this.addCtx = function(canvas)
	{
		this.ctx = canvas.getContext("2d");
	}
	this.drawViewSpace = function(viewSpace, type)
	{
		/*if(type === undefined)*/ this.ctx.clearRect(0, 0, 1200, 600);
		if(type === "carrot")
		{
			this.ctx.beginPath();
			this.ctx.fillStyle = "HotPink";
			this.ctx.fillRect(0, 0, 1200, 600);
			this.ctx.closePath();
		}
		if(type === "poison")
		{
			this.ctx.beginPath()
			this.ctx.fillStyle = "MidnightBlue";
			this.ctx.fillRect(0, 0, 1200, 600)
			this.ctx.closePath();
		}
		var i, j, layer, item;
		for(var i in viewSpace)
		{
			layer = viewSpace[i];
			for(var j in layer)
			{
				item = layer[j];
				this.ctx.drawImage(item.src, item.position[0], item.position[1], item.widthToDisplay, item.heightToDisplay);
			}
		}
	}
	this.drawPlayer = function(player)
	{
		this.ctx.drawImage(player.src, player.sXPos, player.sYPos, player.widthToDisplay, player.heightToDisplay, player.x, player.y, player.widthToDisplay, player.heightToDisplay);
		console.log(this.ctx);
		console.log(player.src + " " + player.sXPos + " " + player.sYPos + " " + player.widthToDisplay + " " + player.heightToDisplay)
	}
	this.drawButton = function(name)
	{
		var button = $("#"+name);
		button.attr("hidden", "false");
		button.css("display", "block");
	}
	this.hideButton = function(name)
	{
		var button = $("#"+name);
		button.attr("hidden", "true");
		button.css("display", "none");
	}
	this.printHighScoreReached = function()
	{
		this.ctx.beginPath();
		var gradient = this.ctx.createLinearGradient(0, 0, 300, 0);
		gradient.addColorStop(0, "red");
		gradient.addColorStop(0.17, "orange");
		gradient.addColorStop(0.34, "yellow");
		gradient.addColorStop(0.51, "green");
		gradient.addColorStop(0.68, "blue");
		gradient.addColorStop(0.95, "indigo");
		gradient.addColorStop(1, "violet");
		this.ctx.fillStyle = gradient;
		this.ctx.font = "50px Georgia";
		this.ctx.fillText("New High Score", 475, 200, 300);
		this.ctx.closePath();
	}
	this.printScore = function(score, fillcolor)
	{
		this.ctx.font = "30px Georgia";
		this.ctx.fillStyle = fillcolor;
		this.ctx.fillText(score, 10, 30);
	}
}




/////////////////////////////////////////////////////////////////////




//new game button click function


//retry button click function

//continue button click function


//funciton to print score
