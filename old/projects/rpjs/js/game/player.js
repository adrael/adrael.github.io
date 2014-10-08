var DIRECTION = {
	DOWN:  0,
	LEFT:  1,
	RIGHT: 2,
	UP:    3
};

var REQUEST = {
	MOVE_MAP_UP:    20,
	MOVE_MAP_DOWN:  21,
	MOVE_MAP_RIGHT: 22,
	MOVE_MAP_LEFT:  23
};

var ERROR = {
	END_OF_MAP: 30,
	ANIMATION_STILL_IN_PROGRESS: 31
};

var SETTINGS = {
	ANIMATION_TIMING: 1, // 4
	MOVING_TIME: 4 // 15
};

function Player(location, x, y, direction) {
	this.state = {
		x: x,
		y: y,
		direction: direction
	}

	this.animationState = -1;

	this.image = new Image();
	this.image.playerReference = this;
	this.image.onload = function() {
		if(!this.complete) {
			throw new Error("Cannot load sprite: " + location);
		}

		this.playerReference.width = this.width / 4;
		this.playerReference.height = this.height / 4;
	}

	this.image.src = "./sprites/" + location;
}

Player.prototype.getState = function() {
	return this.state;
};

Player.prototype.setState = function(state) {
	this.state = state;
};

Player.prototype.draw = function(context) {
	var frame = 0, xShift = 0, yShift = 0;

	if(this.animationState >= SETTINGS.MOVING_TIME) {
		this.animationState = -1;

	} else if(this.animationState >= 0) {
		frame = Math.floor(this.animationState / SETTINGS.ANIMATION_TIMING);
		if(frame > 3) {
			frame %= 4;
		}
		
		var pixelsLeft = TILESET_SIZE - (TILESET_SIZE * (this.animationState / SETTINGS.MOVING_TIME));
		
		if(this.state.direction === DIRECTION.UP) {
			yShift = pixelsLeft;

		} else if(this.state.direction === DIRECTION.DOWN) {
			yShift = -pixelsLeft;

		} else if(this.state.direction === DIRECTION.LEFT) {
			xShift = pixelsLeft;

		} else if(this.state.direction === DIRECTION.RIGHT) {
			xShift = -pixelsLeft;
		}
		
		++this.animationState;
	}
	
	context.drawImage(
		this.image, 
		this.width * frame,
		this.state.direction * this.height,
		this.width,
		this.height,
		(this.state.x * TILESET_SIZE) - (this.width / 2) + 16 + xShift,
		(this.state.y * TILESET_SIZE) - this.height + 24 + yShift,
		this.width,
		this.height
	);
};

Player.prototype.getNextCoordinates = function(direction) {
	var coord = {x: this.state.x, y: this.state.y};

	switch(direction) {

		case DIRECTION.DOWN: 
			++coord.y;
			break;

		case DIRECTION.LEFT: 
			--coord.x;
			break;

		case DIRECTION.RIGHT: 
			++coord.x;
			break;

		case DIRECTION.UP: 
			--coord.y;
			break;
	}

	return coord;
};

Player.prototype.move = function(direction, map, canvas) {
	if(this.animationState >= 0) {
		return ERROR.ANIMATION_STILL_IN_PROGRESS;
	}

	this.state.direction = direction;

	var nextCase = this.getNextCoordinates(direction);
	console.log(nextCase.y, map.getFullHeight());
	if(nextCase.x <= 0 || nextCase.y <= 0 || nextCase.x >= map.getFullWidth() || nextCase.y >= map.getFullHeight()) {
		return ERROR.END_OF_MAP;
	}

	this.animationState = 1;
	
	if(nextCase.x !== this.state.x && (direction === DIRECTION.RIGHT || direction === DIRECTION.LEFT)) {
		this.state.x = nextCase.x;
		if(nextCase.x >= map.getDisplayedWidth(canvas.width)) {
			return REQUEST.MOVE_MAP_RIGHT;

		} else if(nextCase.x <= map.getDisplayedWidth(canvas.width)) {
			return REQUEST.MOVE_MAP_LEFT;
		}
	}

	if(nextCase.y !== this.state.y && (direction === DIRECTION.UP || direction === DIRECTION.DOWN)) {
		this.state.y = nextCase.y;
		if(nextCase.y >= map.getDisplayedHeight(canvas.height)) {
			--this.state.y;
			return REQUEST.MOVE_MAP_DOWN;
		
		} else if(nextCase.y <= map.getDisplayedHeight(canvas.height)) {
			return REQUEST.MOVE_MAP_UP;
		}
	}
};