var TILESET_SIZE = 32;

function Tileset(location) {
	this.image = new Image();
	this.image.tilesetReference = this;
	
	this.image.onload = function() {
		if(!this.complete) {
			throw new Error("Cannot load tileset: " + location);
		}

		this.tilesetReference.width = this.width / TILESET_SIZE;
	}

	this.image.src = "./tilesets/" + location;
}

Tileset.prototype.draw = function(number, context, x, y) {
	var xTileSrc = number % this.width;
	var yTileSrc = Math.ceil(number / this.width);
	
	if(xTileSrc === 0) {
		xTileSrc = this.width;
	}

	var xSrc = (xTileSrc - 1) * TILESET_SIZE;
	var ySrc = (yTileSrc - 1) * TILESET_SIZE;

	context.drawImage(this.image, xSrc, ySrc, TILESET_SIZE, TILESET_SIZE, x, y, TILESET_SIZE, TILESET_SIZE);

	// DEBUG ONLY
	//context.fillStyle = "red";
	//context.rect(x, y, 32, 32);
	//context.stroke();
	//context.fillStyle = "blue";
	//context.font = "bold 18px Arial";
	//context.fillText(x/32, x+8, y-8);
};