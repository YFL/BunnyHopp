 function Model()
{
	this.viewSpace;
	this.player;
	this.obstacleDelay = 60;
	this.delayCounter = 0;
	this.cloudDelay = 60;
	this.cloudDelayCounter = 0;
	this.score = 0;
	this.scoreDelay = 0;
	this.highScore = 0
	this.jump = false;
	this.direction = 1;
	this.keyUp = false;
	this.speed = 10;
	this.speedTemp;
	this.leveler = 50;
	this.lAdder = 100;
	this.carrot = false
	this.poison = false;
	this.isPaused = false;
	this.isStarted = false;
	this.itemTimer = false;
	this.rafID;

	this.init = function()
	{
		this.player.ticks = 0;
		this.player.sXPos = 0;
		this.player.sYPos = 0;
		this.player.widthToDisplay = 300;
		this.player.heightToDisplay = 201;
		this.player.x = 0;
		this.player.y = 399;
		this.viewSpace.bg = [];
		this.viewSpace.obstacles = [];
		this.viewSpace.items = [];
		this.score = 0;
		this.scoreDelay = 0;
		this.player.jump = false;
		this.direction = 1;
		this.carrot = false;
		this.poison = false;
		clearTimeout(this.itemTimer);
		this.speed = 10;
	};

	this.levelUp = function()
	{
		if(this.score && !(this.score % (this.leveler)))
		{
			if(!this.poison && !this.carrot) this.speed += 4;
			else this.speedTemp += 4;
			this.leveler += this.lAdder;
			this.lAdder += 50;
		}
	};

	this.scoreCounter = function()
	{
		this.scoreDelay++;
		if(!(this.scoreDelay % 30)) this.score = this.scoreDelay / 30;
	};

	this.highScoreReached = function()
	{
		if(this.score == this.highScore && this.score) return true;
		else return false;
	}

	this.generateItem = function()
	{
		if(this.poison || this.carrot) return;
		var number = Math.round((Math.random() * 10)) % 2;
		var type, src;
		if(number) type = "carrot";
		else type = "poison";
		if(type === "carrot") src = this.carrotImage;
		else src = this.poisonImage;
		var generate = Math.round(Math.random() * 100) % 100;
		//var generate = 9;
		if(generate < 20) this.viewSpace.items.push(new Item(src, type, [1200, 520]));
	};

	this.generateObstacle = function()
	{
		this.delayCounter += this.speed;
		if(this.delayCounter >= 5 * this.obstacleDelay / 8 && this.delayCounter < 5* this.obstacleDelay / 8 + 1) this.generateItem();
		if(this.delayCounter >= this.obstacleDelay)
		{
			var j, visibleObstacle = 0, layer = this.viewSpace.obstacles;
			for(j = 0; j < layer.length; j++)
			{
				if(layer[j].position[0] < 1200 && layer[j].position[0] > -layer[j].widthToDisplay) visibleObstacle++;
			}
			/*if(visibleObstacle < 5)
			{*/
				this.viewSpace.obstacles.push(new Rock(this.rockImage, [1200, 500]));
				//console.log(viewSpace[1]);
				this.delayCounter = 0;
				var number1 = Math.round(Math.random() * 100) % 100;
				this.obstacleDelay = (this.player.widthToDisplay + this.rockImage.width + number1);
				/*if(number1 < 35) number1 = 35;
				var number = number1 + Math.round(Math.random() * 100) % 100;
				this.obstacleDelay = number + Math.round(Math.random() * 10) % 10;*/
				visibleObstacle = 0;
		//	}
		}
	};

	this.generateCloud = function()
	{
		this.cloudDelayCounter++;
		if(this.cloudDelayCounter >= this.cloudDelay)
		{
				this.viewSpace.bg.push(new Cloud(this.cloudImage, 250, 125, [1200, 0]));
				//console.log(viewSpace[0]);
				this.cloudDelayCounter = 0;
				var number1 = Math.round(Math.random() * 100) % 100;
				if(number1 < this.speed * 4) number1 = this.speed * 4;
				var number = number1 + Math.round(Math.random() * 10) % 10;
				this.cloudDelay = number + Math.round(Math.random() * 10) % 10;
		}
	};

	this.generateTree = function()
	{
		this.cloudDelayCounter++;
		if(this.cloudDelayCounter >= this.cloudDelay)
		{
				this.viewSpace.bg.push(new Tree(this.treeImage, [1200, 100]));
				//console.log(viewSpace[0]);
				this.cloudDelayCounter = 0;
				var number1 = Math.round(Math.random() * 100) % 100;
				if(number1 < this.speed * 4) number1 = this.speed * 4;
				var number = number1 + Math.round(Math.random() * 10) % 10;
				this.cloudDelay = number + Math.round(Math.random() * 10) % 10;
		}
	};

	this.updateViewSpace = function()
	{
		var i, j, layer
		for(i in this.viewSpace)
		{
			layer = this.viewSpace[i];
			for(j in layer)
			{
				if(i === "obstacles" || i === "items")
				{
					//console.log(layer[j].position[0]);
					layer[j].position[0] -= this.speed;
					if(i === "obstacles") layer[j].pseudoPosition[0] -= this.speed;
				}
				else
				{
					layer[j].position[0] -= this.speed / 2;
				}

				if(layer[j].position[0] <= -layer[j].widthToDisplay)
				{
					layer.splice(j, 1);
				}
			}
		}
	};

	this.activateItemEffect = function()
	{
		if (this.carrot)
		{
			this.speedTemp = this.speed;
			this.chewA.currentTime = 0;
			this.chewA.play();
			if(/*this.player.y === 399 && */this.carrot && this.speed === this.speedTemp)
			{
				this.speed -= 5;
			}
			var thiz = this;
			this.itemTimer = setTimeout(function(){thiz.speed = thiz.speedTemp; thiz.speedTemp = 0; thiz.carrot = false}, 5000);
		}
		else if(this.poison)
		{
			this.speedTemp = this.speed;
			this.drinkA.currentTime = 0;
			this.drinkA.play();
			if(/*this.player.y === 399 && */this.poison && this.speed === this.speedTemp)
			{
				this.speed += 5;
			}
			var thiz = this;
			this.itemTimer = setTimeout(function(){thiz.speed = thiz.speedTemp; thiz.speedTemp = 0; thiz.poison = false}, 5000);
		}
	};

	this.checkCollision = function()
	{
		var layer = this.viewSpace.obstacles;
		for(var j in layer)
		{
			if((layer[j].pseudoPosition[0] <= (this.player.widthToDisplay - 65) && (layer[j].pseudoPosition[0] + layer[j].pseudoWidth >= 50)) && (layer[j].pseudoPosition[1]) <= (this.player.y + this.player.heightToDisplay - 25))
			{
				this.deathA.currentTime = 0;
				this.deathA.play();
				this.gameOver = true;
				window.cancelAnimationFrame(this.rafID);
			}
		}
		layer = this.viewSpace.items
		for(var j in layer)
		{
			if((layer[j].position[0] <= (this.player.widthToDisplay - 65) && (layer[j].position[0] + layer[j].widthToDisplay >= 50)) && (layer[j].position[1]) <= (this.player.y + this.player.heightToDisplay - 25))
			{
				if(layer[j].type === "carrot") this.carrot = true;
				else this.poison = true;
				this.activateItemEffect();
				layer.splice(j, 1);
			}
		}
	};

}

Model.prototype.add = function(name, item)
{
	this[name] = item;
}
