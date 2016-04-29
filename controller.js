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
		this.model.rafID = window.requestAnimationFrame(this.gameLoop);
		this.model.checkCollision();
		this.model.generateObstacle();
		this.model.generateCloud();
		this.model.generateTree();
		this.model.updateViewSpace();
		this.view.drawViewSpace();
		this.model.scoreCounter();
		this.view.printScore();
		this.model.highScoreReached();
		this.model.player.update();
		this.view.drawPlayer();
		this.model.levelUp();
	}
	this.keyDownHandle = function(event)
	{
		if(event.keyCode == 32)
		{
			if(!this.model.isPaused && this.model.isStarted)
			{
				this.model.jump = true;
				this.model.jumpA.currentTime = 0;
				console.log(pInfo.y);
				if(this.model.player.y > 389) this.model.jumpA.play();
			}
			this.model.keyUp = false;
			console.log("pressed");
		}

		if(event.keyCode === 27)
		{
			this.model.pauseGame();
		}
	}
	this.keyUpHandle = function(event)
	{
		if(event.keyCode === 32) this.model.keyUp = true;
	}
}
