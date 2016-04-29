window.addEventListener("load", function()
{
	
	var model = new Model();
	var view = new View();
	var controller = new Controller();
	window.addEventListener("keydown", keyDownHandle, true);
	window.addEventListener("keyup", keyUpHandle, true);
});
