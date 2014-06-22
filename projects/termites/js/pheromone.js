Pheromone.prototype = new Agent();
Pheromone.prototype.constructor = Pheromone;

function Pheromone(queen) {
	Agent.call(this);
    this.setQueen(queen);
}

Pheromone.prototype.setWoodHeap = function(woodHeap) {
	this.woodHeap = woodHeap;
};

Pheromone.prototype.getWoodHeap = function() {
	return this.woodHeap;
};

Pheromone.prototype.setQueen = function(queen) {
    this.queen = queen;
};

Pheromone.prototype.getQueen = function() {
    return this.queen;
};

Pheromone.prototype.update = function(dt) {
};

Pheromone.prototype.draw = function(context) {
	if(GLOBAL_DRAW_UMBILICAL) {
		context.strokeStyle="rgba(255, 0, 0, .4)";
		context.beginPath();
		context.moveTo(this.woodHeap.x, this.woodHeap.y);
		context.lineTo(this.queen.x, this.queen.y);
		context.stroke();
	}

};