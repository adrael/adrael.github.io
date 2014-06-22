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

    this.pheromoneLeft = 0;
    this.nextTrace = 0;
    this.pheromoneMemoryHeap = 0;
    this.pheromoneMemoryNest = 0;

    this.memoryTick = 300;
    this.cariingWood = false;
    this.innactiveTime = 0;
}

Termite.prototype.update = function(dt) {

    this.moveBy(this.destination, this.speed * dt / 1000);
    this.nextChange -= dt;

    this.innactiveTime -= dt;

    this.memoryTick -= dt;
    if (this.nextChange <= 0)
        this.takeARandomDirection();

    if (this.pheromoneLeft > 0) {
        this.nextTrace -= dt;
        if (this.nextTrace <= 0)
            this.generatePheromone()
    }

    if (this.memoryTick <= 0)
        this.memoryLoss();

};

Termite.prototype.memoryLoss = function () {

    this.pheromoneMemoryHeap -= this.pheromoneMemoryHeap > 0 ? 1 : 0;
    this.pheromoneMemoryNest -= this.pheromoneMemoryNest > 0 ? 1 : 0;

    this.memoryTick += 300;
};

Termite.prototype.generatePheromone = function () {

    var pheromone = new Pheromone(this.cariingWood, this.pheromoneLeft, 200 * this.pheromoneLeft);
    pheromone.moveTo(this.x, this.y);
    this.world.addAgent(pheromone);

    this.pheromoneLeft--;
    this.nextTrace += 100;
};

Termite.prototype.takeARandomDirection = function () {

    this.destination = {
        x : Math.random() * 200 - 100,
        y : Math.random() * 200 - 100
    };

    this.speed = Math.random() * 150 + 150;
    this.nextChange = Math.random() * 800 + 200

};

Termite.prototype.goToPheromone = function (pheromone) {

    var pheromoneType = pheromone.typeId;
    if (pheromoneType == "pheromone_heap" && pheromone.power <= this.pheromoneMemoryHeap)
        return;
    if (pheromoneType == "pheromone_nest" && pheromone.power <= this.pheromoneMemoryNest)
        return;

    var destinationX = (pheromone.x - this.x) * 2;
    var destinationY = (pheromone.y - this.y) * 2;

    this.destination = {
        x : destinationX,
        y : destinationY
    };

    if (pheromone.typeId == "pheromone_heap")
        this.pheromoneMemoryHeap = pheromone.power;
    else
        this.pheromoneMemoryNest = pheromone.power;

    this.speed = Math.random() * 150 + 150;
    this.nextChange = Math.random() * 500 + 200;

};

Termite.prototype.draw = function(context) {
    context.fillStyle = this.cariingWood ? "rgba(255, 0, 0, 1)" : "rgba(255, 255, 255, 1)";
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
        this.takeARandomDirection();
        this.woodCollisionStrategy(collidedAgent);
    }

    if (typeCollidedAgent == "pheromone_heap" || typeCollidedAgent == "pheromone_nest") {
        this.pheromonesStrategy(collidedAgent);
    }
};

Termite.prototype.pheromonesStrategy = function(pheromone) {

    var typePheromone = pheromone.typeId;

    if (this.cariingWood && typePheromone == "pheromone_nest" ||
        !this.cariingWood && typePheromone == "pheromone_heap")
        this.goToPheromone(pheromone);
};

Termite.prototype.woodCollisionStrategy = function(collidedAgent) {

    if (this.innactiveTime > 0)
        return;

    if (this.cariingWood)
        collidedAgent.addWood();
    else
        collidedAgent.takeWood();

    this.pheromoneMemoryHeap = 0;
    this.pheromoneMemoryNest = 0;

    this.cariingWood = !this.cariingWood;
    this.pheromoneLeft = 20;
    this.innactiveTime = 50;
};

Termite.prototype.processPerception = function(perceivedAgent) {
};
