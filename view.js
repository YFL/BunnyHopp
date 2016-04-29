function View = function()
{
	this.ctx;
	this.addCtx = function(canvas)
	{
		this.ctx = canvas.getContext("2D");
	}
	this.drawViewSpace = function(viewSpace)
	{
		for(var layer in viewSpace)
		{
			for(var item in layer)
			{
				this.ctx.drawImage(item.src, item.position[0], item.position[1], item.widthToDisplay, item.heightToDisplay);
			}
		}
	}
	this.drawPlayer = function(player)
	{
		this.ctx.drawImage(player.src, player.frameIndex*player.widthToDisplay, player.heightToDisplay, player.widthToDisplay, player.heightToDisplay, 0, 399, player.widthToDisplay, player.heightToDisplay;)
	}
	this.drawButton = function(name)
	{
		$("#"+name).css()
	}
}
