WoodHeap.prototype = Agent.prototype;
WoodHeap.prototype.constructor = WoodHeap;

function WoodHeap() {
	Agent.call(this);
	this.typeId = "wood_heap";

	this.woodCount = Math.random() * 90 + 10;
	this.contactTypes = ["wood_heap", "wall"];

    this.identifier = Math.random() * 1000;

    this.queen = null;
    this.pheromone = null;

    this.updateRadius();
    this.vertex = new Vertex(this.x, this.y);
}

WoodHeap.prototype.setWoodVolume = function(woodVolume) {
    this.woodCount = woodVolume;
    if(this.woodCount <= 0) {
		this.dead = true;
	}

	if(this.queen) {
		this.queen.setPower(this.woodCount);
	}
};

WoodHeap.prototype.updateRadius = function() {
	this.boundingRadius = Math.sqrt(this.woodCount * 4);
};

WoodHeap.prototype.update = function(dt) {
	this.updateRadius();
};

WoodHeap.prototype.addWood = function() {
	this.setWoodVolume(++this.woodCount);
};

WoodHeap.prototype.takeWood = function() {
	this.setWoodVolume(--this.woodCount);
};

WoodHeap.prototype.hasQueen = function() {
	return (this.queen !== null && this.queen !== undefined);
};


WoodHeap.prototype.setQueen = function(queen) {
	this.queen = queen;
};

WoodHeap.prototype.draw = function(context) {
    context.fillStyle = (this.hasQueen() ? "rgba(0, 255, 0, 0.3)" : (this.hasPheromone() ? "rgba(255, 255, 0, 0.3)" : "rgba(210, 105, 30, 0.3)"));
    context.strokeStyle="#000";
    context.beginPath();
    context.arc(this.x, this.y, this.boundingRadius, 0, 2*Math.PI);
    context.fill();
    context.stroke();

    context.fillStyle="rgba(0, 0, 0, 1)";
    context.strokeStyle="#000";
    context.beginPath();
    context.fillText("" + this.woodCount, this.x, this.y - 20);
    context.stroke();
};

WoodHeap.prototype.processCollision = function(collidedAgent) {
	if(collidedAgent && collidedAgent.typeId == "wood_heap") {
		if(this.woodCount > collidedAgent.woodCount) {
			collidedAgent.takeWood();
			this.addWood();
		}
	} else if(collidedAgent && collidedAgent.typeId == "wall") {
        this.takeWood();
    }
};

WoodHeap.prototype.getQueen = function() {
	return this.queen;
};

WoodHeap.prototype.killQueen = function() {
	this.queen.dead = true;
	this.queen = null;
};

WoodHeap.prototype.killPheromone = function() {
	this.pheromone.dead = true;
	this.pheromone = null;
};

WoodHeap.prototype.hasPheromone = function() {
	return (this.pheromone !== null && this.pheromone !== undefined);
};

WoodHeap.prototype.setPheromone = function(pheromone) {
	if(this.hasPheromone()) {
		this.killPheromone();
	}

	this.pheromone = pheromone;
	this.pheromone.setWoodHeap(this);
};

WoodHeap.prototype.getPheromone = function() {
	return this.pheromone;
};

WoodHeap.prototype.destroy = function() {
	if(this.hasQueen()) {
		this.killQueen();
	}

	if(this.hasPheromone()) {
		this.killPheromone();
	}
};