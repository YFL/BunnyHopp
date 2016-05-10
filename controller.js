function Controller()
{
	this.model;
	this.view;
	this.addModel = function(model)
	{
		this.model = model;
	}
	this.addView = function(view)
	{
		this.view = view;
	}
	this.gameLoop = function()
	{
		this.model.rafID = window.requestAnimationFrame(this.gameLoop.bind(this));
		this.model.checkCollision();
		if(this.model.gameOver) this.view.drawButton("replay");
		this.model.generateObstacle();
		this.model.generateCloud();
		this.model.generateTree();
		this.model.updateViewSpace();
		if(!this.model.carrot && !this.model.poison) this.view.drawViewSpace(this.model.viewSpace);
		else if(this.model.carrot) this.view.drawViewSpace(this.model.viewSpace, "carrot");
		else if(this.model.poison) this.view.drawViewSpace(this.model.viewSpace, "posion");
		this.model.scoreCounter();
		if(this.model.poison)this.view.printScore(this.model.score, "white");
		else this.view.printScore(this.model.score, "black");
		this.highScoreReached();
		this.model.player.update(this.model.speed);
		this.model.player.jumping(this.model.speed);
		this.view.drawPlayer(this.model.player);
		this.model.levelUp();
	}
	this.keyDownHandle = function(event)
	{
		if(event.keyCode == 32)
		{
			if(!this.model.isPaused && this.model.isStarted)
			{
				this.model.player.jump = true;
				this.model.jumpA.currentTime = 0;
				console.log(pInfo.y);
				if(this.model.player.y > 389) this.model.jumpA.play();
			}
			this.model.player.keyUp = false;
			console.log("pressed");
		}

		if(event.keyCode === 27)
		{
			this.pauseGame();
		}
	}
	this.keyUpHandle = function(event)
	{
		if(event.keyCode === 32) this.model.player.keyUp = true;
	}

	this.pauseGame = function()
	{
		this.model.isPaused = true;
		window.cancelAnimationFrame(this.model.rafID);
		this.view.drawButton("continue");
	}
	this.highScoreReached = function()
	{
		if (this.model.highScore && this.model.score > this.model.highScore && this.model.score < this.model.highScore + 4)
		{
			this.view.printHighScoreReached();
		}
	}
}
