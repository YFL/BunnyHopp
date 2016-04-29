function Model()
{
	this.items = [];
}

Model.prototype.add = function(item)
{
	this.items.push(item);
}

Model.prototype.delete = function(item)
{
	var elem = this.items.indexOf(item);
	delete this.items[elem];
}
