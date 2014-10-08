Termite.prototype = new Agent();
Termite.prototype.constructor = Termite;

function Termite() {
	Agent.call(this);
	this.typeId = "termite";

    this.collideTypes = ["wood_heap"];
    this.contactTypes = ["termite", "wood_heap", "pheromone_heap", "pheromone_nest"];

    this.destination = {};
    this.nextChange = 20;

    this.takeARandomDirection();

    this.caryingWood = false;
}

Termite.prototype.update = function(dt) {

    this.moveBy(this.destination, this.speed * dt / 1000);
    this.nextChange -= dt;
    this.memoryTick -= dt;

    if (this.nextChange <= 0)
        this.takeARandomDirection();

};

Termite.prototype.takeARandomDirection = function () {

    this.destination = {
        x : Math.random() * 200 - 100,
        y : Math.random() * 200 - 100
    };

    this.speed = Math.random() * 150 + 150;
    this.nextChange = Math.random() * 800 + 200

};

Termite.prototype.draw = function(context) {
    context.fillStyle = this.caryingWood ? "rgba(0, 255, 0, 1)" : "rgba(255, 255, 255, 1)";
    context.strokeStyle="#001";
    context.beginPath();
    context.arc(this.x, this.y, 2, 0, 2*Math.PI);
    context.fill();
    context.stroke();
};

Termite.prototype.processCollision = function(collidedAgent) {

    if (collidedAgent == null) {
        this.takeARandomDirection();
        return;
    }

    var typeCollidedAgent = collidedAgent.typeId;

    if (typeCollidedAgent == "wood_heap") {
        this.woodCollisionStrategy(collidedAgent);
        this.takeARandomDirection();
    }
};

Termite.prototype.woodCollisionStrategy = function(collidedAgent) {
    if (this.caryingWood)
        collidedAgent.addWood();
    else
        collidedAgent.takeWood();

    this.caryingWood = !this.caryingWood;
    this.pheromoneLeft = 10;
};

Termite.prototype.processPerception = function(perceivedAgent) {
};
