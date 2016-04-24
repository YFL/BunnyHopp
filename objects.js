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
var cloud = function(src, width, height, position)
{
	this.src = cloudImage;
	this.type = "cloud";
	this.width = width;
	this.height = height;
	this.position = position;
};

//function to return itemObject
var item = function(src, type, position)
{
	console.log(src);
	this.src = src;
	this.width = src.width;
	this.height = src.height;
	this.type = type;
	this.position = position;
	this.activate = function()
	{
		if (layer[j].type == "carrot")
		{
			carrot = true;
			speedTemp = speed;
			chewA.currentTime = 0;
			chewA.play();
		}
		else
		{
			poison = true;
			speedTemp = speed;
			drinkA.currentTime = 0;
			drinkA.play();
		}
	}
};

//function to return rockObject (obstacle)
var rock = function(src, position)
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
var tree = function(src, position)
{
	this.src = src;
	this.position = position;
	this.type = tree;
	this.height = 500;
	this.width = src.width - 250;
};
