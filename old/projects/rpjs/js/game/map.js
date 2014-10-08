function Map(source) {
	var XHR = getXMLHttpRequest();
	XHR.open("GET", "./maps/" + source + ".json", false);
	XHR.send(null);

	if(XHR.readyState !== 4 || (XHR.status !== 200 && XHR.status !== 0)) {
		throw new Error(XHR.status + " Cannot load map: " + source + ".json");
	}

	var mapData = JSON.parse(XHR.responseText);
	this.tileset = new Tileset(mapData.tileset);
	this.field = mapData.field;
}

Map.prototype.getFullHeight = function() {
	return this.field.length;
};

Map.prototype.getFullWidth = function() {
	return this.field[0].length;
};

Map.prototype.getDisplayedHeight = function(canvas_height) {
	return (canvas_height / TILESET_SIZE);
};

Map.prototype.getDisplayedWidth = function(canvas_width) {
	return (canvas_width / TILESET_SIZE);
};

Map.prototype.draw = function(canvas_height, context, line, column) {
	if(!line || line < 0) {
		line = 0;
	}

	if(!column || column < 0) {
		column = 0;
	}

	for(var i = line, fieldHeight = this.getFullHeight(); i < fieldHeight; ++i)
	{
		var currentLine = this.field[i];
		for(var j = column, lineLength = currentLine.length; j < lineLength; ++j)
		{
			this.tileset.draw(currentLine[j], context, (j - column) * 32, (i - line) * 32);
		}
	}
};