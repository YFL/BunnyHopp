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
	this.jump = false;
	this.direction = 1;
	this.keyUp = true;
	this.update = function(speed)
	{
		this.ticks++;
		if(this.ticks >= 60 / speed)
		{
			this.frameIndex++;
			this.ticks = 0;
		}
		if(this.frameIndex >= this.numOfFrames || this.y < 399) this.frameIndex = 0;
		this.sXPos = this.frameIndex * this.widthToDisplay;

		console.log(this);
	};

	this.jumping = function(speed)
	{
		if(this.jump)
		{
			if(this.y === 399) this.direction = 1;
			if(this.y <= 159 || this.direction === 0 && this.keyUp){ this.direction = 0; this.jump = false; }
			if(this.direction === 1 && this.y >= 159) this.y -= speed;
			else this.y += speed;
		}
		else
		{
			if(this.direction === 0 && this.y < 399) this.y += speed;
			if(this.y >= 399) this.y = 399;
		}
	}
}

//function to return cloudObject
var Cloud = function(src, width, height, position)
{
	this.src = src;
	this.type = "cloud";
	this.widthToDisplay = width;
	this.heightToDisplay = height;
	this.position = position;
};

//function to return itemObject
var Item = function(src, type, position)
{
	console.log(src);
	this.src = src;
	this.widthToDisplay = src.width;
	this.heightToDisplay = src.height;
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
	this.widthToDisplay = 200;
	this.heightToDisplay = 100;
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
	this.heightToDisplay = 500;
	this.widthToDisplay = src.width - 250;
};
