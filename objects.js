/*viewSpace:
**array of arrays - layers
**layers:
**arrays of objects
**Type of objects:
**item, obstacle, background
*/

function ViewSpace()
{
	this.bg = [];
	this.obstacles = [];
	this.items = [];
}

ViewSpace.prototype.draw = function()
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
	for(var i in this)
	{
		for(var j = 0; j < this[i].length; j++)
		{
			ctx.drawImage(this[i][j].src, this[i][j].position[0], this[i][j].position[1], this[i][j].widthToDisplay, this[i][j].heightToDisplay);
		}
	}
}

//player constructor
function Player(src, width, height, numOfFrames, frameIndex)
{
	this.src = src;
	console.log(this.src);
	this.ticks = 0;
	this.widthToDisplay = width;
	this.heightToDisplay = height;
	this.sXPos = 0;
	this.sYPos = 0;
	this.x = 0;
	this.y = 399;
	this.numOfFrames = numOfFrames;
	this.frameIndex = frameIndex;
	this.update = function()
	{
		this.ticks += 1;
		if(this.ticks >= 60 / speed)
		{
			this.frameIndex += 1;
			this.ticks = 0;
		}
		if(this.frameIndex >= this.numOfFrames || this.y < 399) this.frameIndex = 0;
		this.sXPos = this.frameIndex * this.width;
	};

	this.jump = function()
	{
		if(jump)
		{
			if(player.y === 399) direction = 1;
			if(player.y <= 159 || direction === 0 && keyUp){ direction = 0; jump = false; }
			if(direction === 1 && player.y >= 159) player.y -= speed;
			else player.y += speed;
		}
		else
		{
			if(direction === 0 && player.y < 399) player.y += speed;
			if(player.y >= 399) player.y = 399;
		}
	}
}

//function to return cloudObject
var Cloud = function(src, width, height, position)
{
	this.src = cloudImage;
	this.type = "cloud";
	this.width = width;
	this.height = height;
	this.position = position;
};

//function to return itemObject
var Item = function(src, type, position)
{
	console.log(src);
	this.src = src;
	this.width = src.width;
	this.height = src.height;
	this.type = type;
	this.position = position;
	this.activate = function()
	{
		if (type === "carrot")
		{
			carrot = true;
			speedTemp = speed;
			chewA.currentTime = 0;
			chewA.play();
			if(player.y === 399 && carrot && speed === speedTemp)
			{
				speed -= 5;
				itemTimer = setTimeout(function(){speed = speedTemp; carrot = false}, 5000);
			}
		}
		else
		{
			poison = true;
			speedTemp = speed;
			drinkA.currentTime = 0;
			drinkA.play();
			if(player.y === 399 && poison && speed === speedTemp)
			{
				speed += 5;
				itemTimer = setTimeout(function(){speed = speedTemp; poison = false}, 5000);
			}
		}
	}
};

//function to return rockObject (obstacle)
var Rock = function(src, position)
{
	this.type = "rock";
	this.src = src;
	this.position = position;
	this.width = 200;
	this.height = 100;
	this.pseudoPosition = [position[0] + 50, position[1] + 50];
	this.pseudoHeight = 50;
	this.pseudoWidth = 100;
};

//function to return treeObject
var Tree = function(src, position)
{
	this.src = src;
	this.position = position;
	this.type = tree;
	this.height = 500;
	this.width = src.width - 250;
};
