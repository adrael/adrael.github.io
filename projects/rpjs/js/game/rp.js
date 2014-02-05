function RPJS(data) {
	
	if(!data) {
		data = {
			canvas: null,
			context: null,
			width: 0,
			height: 0,
			map: null,
			player: null,
			currentLine: 0,
			currentColumn: 0,
			players: new Array()
		};
	}

	this.setData(data);
}

RPJS.prototype.getData = function() {
	return this.data;
};

RPJS.prototype.setData = function(data) {
	this.data = data;
};

RPJS.prototype.setSize = function(width, height) {
	this.data.width = width;
	this.data.height = height;
};

RPJS.prototype.setCanvas = function(canvas) {
	this.data.canvas = canvas;
	this.data.context = canvas.getContext("2d")
};

RPJS.prototype.setMap = function(map) {
	this.data.map = map;
};

RPJS.prototype.addPlayer = function(player) {
	this.data.players.push(player);
};

RPJS.prototype.setMainPlayer = function(player) {
	this.addPlayer(player);
	this.data.player = player;
};

RPJS.prototype.setPlayers = function(players) {
	this.data.players = players;
};

RPJS.prototype.setup = function() {
	this.data.canvas.width  = this.data.width;
	this.data.canvas.height = this.data.height;

	this.data.canvas.style.marginTop = "-" + this.data.height / 2 + "px";
	this.data.canvas.style.marginLeft = "-" + this.data.width / 2 + "px";

	var self = this;
	
	setInterval(function() {
		self.updateMap();
	}, 40);

	window.onkeydown = function(event) {
		var e = event || window.event;
		var key = e.which || e.keyCode;
		
		switch(key) {

			case 38 : case 122 : case 119 : case 90 : case 87 : // Flèche haut, z, w, Z, W
				switch(self.data.player.move(DIRECTION.UP, self.data.map, self.data.canvas)) {
					case ERROR.END_OF_MAP: case ERROR.ANIMATION_STILL_IN_PROGRESS:
					break;

					case REQUEST.MOVE_MAP_UP:
						console.log("request up");
						--self.data.currentLine;
					break;
				}

				break;

			case 40 : case 115 : case 83 : // Flèche bas, s, S
				switch(self.data.player.move(DIRECTION.DOWN, self.data.map, self.data.canvas)) {
					case ERROR.END_OF_MAP: case ERROR.ANIMATION_STILL_IN_PROGRESS:
					break;

					case REQUEST.MOVE_MAP_DOWN:
						++self.data.currentLine;
					break;
				}

				break;

			case 37 : case 113 : case 97 : case 81 : case 65 : // Flèche gauche, q, a, Q, A
				self.data.player.move(DIRECTION.LEFT, self.data.map, self.data.canvas);
				break;

			case 39 : case 100 : case 68 : // Flèche droite, d, D
				self.data.player.move(DIRECTION.RIGHT, self.data.map, self.data.canvas);
				break;

			default : 
				return true;
		}
		
		return false;
	}
};

RPJS.prototype.updateMap = function() {
	this.data.context.clearRect(0, 0, this.data.canvas.width, this.data.canvas.height);
	this.data.map.draw(this.data.canvas.height, this.data.context, this.data.currentLine, this.data.currentColumn);

	for(var i = 0, playersLength = this.data.players.length; i < playersLength; ++i) {
		this.data.players[i].draw(this.data.context);
	}
};