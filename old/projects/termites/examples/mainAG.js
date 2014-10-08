
var world = null;
var canvasElement = null;
var canvasContext = null;
var speed = 1;
var geneticAlgorithm = null;
var graphs = null;
var queen = null;
var aStar = new AStar();
var mainLoop = null;
var lastUpdate = Date.now();
var dt = 0;
var wallList = [];
var mouseVertex = [0, 0];

function updateTime() {
    var now = Date.now();
    dt = now - lastUpdate;
    lastUpdate = now;
}

function update() {
    updateTime();
    world.update(dt * speed);
    canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);

    aStar.setGraph(graphs[0]);
    var closestVertex = getClosestVertex(graphs[0].vertices, mouseVertex[0], mouseVertex[1]);
    var start = getClosestVertex(graphs[0].vertices, queen.vertex.x, queen.vertex.y);
    var path = aStar.getPathFromTo(start, closestVertex);
    world.draw(canvasContext);
    graphs[0].draw(canvasContext);
}

function getClosestVertex(vertices, mouseX, mouseY) {

    var index = 0;
    var dist = -1;
    var newDist, deltaX, deltaY;

    for (var i in vertices) {
        var vertex = vertices[i];
        deltaX = vertex.x - mouseX;
        deltaY = vertex.y - mouseY;
        newDist = deltaX * deltaX + deltaY * deltaY;
        if (dist == -1 || newDist < dist) {
            dist = newDist;
            index = i;
        }
    }

    return vertices[index];
}

function init() {

    canvasElement = document.getElementById("canvas");
    canvasContext = this.canvasElement.getContext("2d");

    world = new World(canvasElement.width, canvasElement.height);

    for(var i = 0; i < 6; i++) {
        var wall = new Wall();
        world.addAgent(wall);
        wall.moveTo(canvasElement.width * Math.random(), canvasElement.height * Math.random());
        wallList.push(wall);
    }

    queen = new Queen({power: 100, x: (canvasElement.width / 2), y: (canvasElement.height / 2)});
    queen.knownWalls = wallList;

    geneticAlgorithm = new GeneticAlgorithm(queen);
    geneticAlgorithm.setWorldDimension(canvasElement.width, canvasElement.height);
    geneticAlgorithm.setFixedVertices([new Vertex(queen.x, queen.y)]);
    geneticAlgorithm.setPopulationSize(20);
    geneticAlgorithm.setDNASize(40);

    nextGeneration();

    var fps = 120;
    mainLoop = setInterval(update, 1000 / fps);
}

function nextGeneration(nbr) {

    var time = new Date().getTime();
    for (var x = 0; x < nbr; x++) {
        graphs = geneticAlgorithm.processNextGeneration();
    }
    graphs = geneticAlgorithm.processNextGeneration();
    console.log("time to process generation n°" + geneticAlgorithm.generation + " = " + (new Date().getTime() - time) + "ms");

    for (var i = 0, size = graphs.length; i < size; i++)
        console.log(" fitness score entity n° " + i + "= " + graphs[i].fitness);
    console.log(graphs[0]);

}
