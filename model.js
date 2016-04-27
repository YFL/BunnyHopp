//canvas
var canvas
//2d canvas context
var ctx
//images and sound
var playerImage;
var groundImage;
var rockImage;
var cloudImage;
var treeImage;
var carrotImage;
var poisonImage;
var newGame;
var retry;
var cont;
var jumpA;
var chewA;
var drinkA;
var deathA;
var player;

//delay bitween two obstacles
var obstacleDelay = 60;
//counting up to delay
var delayCounter = 0;
//delay of clouds
var cloudDelay = 60;
//counting up to delay
var cloudDelayCounter = 0;
//score counter
var score = 0;
//score delay counter
var scoreDelay = 0;
//highScore holder
var highScore = 0;
//allow jump or not
var jump = false;
//going up or down
var direction = 1;
//is key pressed or not
var keyUp = 0;
//speed of the game
var speed = 10 ;
//store speed when speed effecting item is collected
var speedTemp;
//used to increase speed if level is hit
var leveler = 50;
//next level count helper
var lAdder = 100;
//if carrot is picked up
var carrot = false;
//if poison is picked up
var poison = false;
//if game is paused
var isPaused = false;
//if game is started
var isStarted = false;
// used to clear item Timer on death
var itemTimer;
//requestAnimationFrame id
var rafID;

//function to increase speed when level is hit
var levelUp = function()
{
	if(score != 0 && !(score % (leveler)))
	{
		if(!poison && !carrot) speed += 4;
		else speedTemp += 4;
		leveler += lAdder;
		lAdder += 50;
	}
}

//function to increase score every half second
var scoreCounter = function()
{
	scoreDelay++;
	if(!(scoreDelay % 30)) score = scoreDelay / 30;
}

//function to pause game and show continue button
var pauseGame = function()
{
	isPaused = true;
	window.cancelAnimationFrame(rafID);
	cont.setAttribute("hidden", "false");
	$("#continue").css("display", "block");

}

//function to alert if high score was reached
var highScoreReached = function()
{
	if (highScore != 0 && score > highScore && score < highScore + 4)
	{
		ctx.beginPath();
		var gradient = ctx.createLinearGradient(0, 0, 300, 0);
		gradient.addColorStop(0, "red");
		gradient.addColorStop(0.17, "orange");
		gradient.addColorStop(0.34, "yellow");
		gradient.addColorStop(0.51, "green");
		gradient.addColorStop(0.68, "blue");
		gradient.addColorStop(0.95, "indigo");
		gradient.addColorStop(1, "violet");
		ctx.fillStyle = gradient;
		ctx.font = "50px Georgia";
		ctx.fillText("New High Score", 475, 200, 300);
		ctx.closePath();
	}
}

//function to generate items when the time has come :)
var generateItem = function()
{
	if(poison || carrot) return;
	var number = Math.round((Math.random() * 10)) % 2;
	var type;
	if(number) type = "carrot"
	else type = "poison"
	var generate = Math.round(Math.random() * 100) % 100;
	//var generate = 9;
	console.log("generate: " + generate);
	var item = new Item()
	if(generate < 20) viewSpace[items].push(item(type, [1200, 520]));
}

//function to generate obstacle when the time has come
var generateObstacle = function()
{
	delayCounter++;
	if(delayCounter == 5 * obstacleDelay / 8) generateItem();
	if(delayCounter >= obstacleDelay)
	{
		var i = 0, visibleObstacle = 0;
		for(i; i < viewSpace[2].length; i++)
		{
			var item = viewSpace[2][i];
			if(item.position[0] < 1200 && item.position[0] > -item.widthToDisplay) visibleObstacle++;
		}
		if(visibleObstacle < 5)
		{
			viewSpace[2].push(rock([1200, 500]));
			//console.log(viewSpace[1]);
			delayCounter = 0;
			var number1 = Math.round(Math.random() * 100) % 100;
			if(number1 < 35) number1 = 35;
			var number = number1 + Math.round(Math.random() * 100) % 100;
			obstacleDelay = number + Math.round(Math.random() * 10) % 10;
			visibleObstacle = 0;
		}
	}
};

//function to generate clouds
var generateCloud = function()
{
	cloudDelayCounter++;
	if(cloudDelayCounter >= cloudDelay)
	{
			viewSpace[1].push(cloud(250, 125, [1200, 0]));
			//console.log(viewSpace[0]);
			cloudDelayCounter = 0;
			var number1 = Math.round(Math.random() * 100) % 100;
			if(number1 < speed * 4) number1 = speed * 4;
			var number = number1 + Math.round(Math.random() * 10) % 10;
			cloudDelay = number + Math.round(Math.random() * 10) % 10;
	}
}

//function to generate trees
var generateTree = function()
{
	cloudDelayCounter++;
	if(cloudDelayCounter >= cloudDelay)
	{
			viewSpace[1].push(tree([1200, 100]));
			//console.log(viewSpace[0]);
			cloudDelayCounter = 0;
			var number1 = Math.round(Math.random() * 100) % 100;
			if(number1 < speed * 4) number1 = speed * 4;
			var number = number1 + Math.round(Math.random() * 10) % 10;
			cloudDelay = number + Math.round(Math.random() * 10) % 10;
	}
}

//function to check collisions and react
/*var checkCollision = function()
{

}
*/


//function to initialize game settings at restart
var init = function()
{
	player.ticks = 0;
	player.sXPos = 0;
	player.sYPos = 0;
	player.widthToDisplay = 300;
	player.heightToDisplay = 201;
	player.x = 0;
	player.y = 399;
	viewSpace = [
		[],
		[],
		[],
		[]
	];
	score = 0;
	scoreDelay = 0;
	jump = false;
	carrot = false;
	poison = false;
	clearTimeout(itemTimer);
	speed = 10;
}

//function to update viewSpace (move the objects on the screen)
var updateViewSpace = function()
{
	for(var i = 0; i < 4; i++)
	{
		var layer = viewSpace[i];
		for(var j = 0; j < layer.length; j++)
		{
			console.log(i + ", " + j);
			if(i == 2 || i == 3)
			{
				//console.log(layer[j].position[0]);
				layer[j].position[0] -= speed;
				if(i == 2) layer[j].pseudoPosition[0] -= speed;
			}
			if(i == 1)
			{
				console.log(j);
				layer[j].position[0] -= speed / 2;
			}
			if(layer === 0)
			{
				if(layer[j].position[0] < 0) layer[0].push(ground());
			}

			if(layer[j].position[0] <= -layer[j].widthToDisplay) layer.splice(j, 1);
		}
	}
};
