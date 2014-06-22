function GeneticAlgorithm(queen) {
    this.generation = -1;
    this.population = [];
    this.dimension = {width: 0, height: 0};
    this.graph = new Graph();
    this.fitnessThreshold = 0;
    this.populationSize = 10;
    this.DNASize = 20;
    this.commonVertices = [];
    this.queen = queen;
}

GeneticAlgorithm.prototype.setFixedVertices = function(vertices) {
    this.commonVertices = vertices;
};

GeneticAlgorithm.prototype.addNewEntity = function () {
    this.population.push(new Graph());
};

GeneticAlgorithm.prototype.makeRandomGeneration = function () {

    for (var i = 0; i < this.populationSize; i++) {
        var graph = new Graph();
        graph.randomize(this.DNASize, this.commonVertices, this.queen.knownWalls, this.dimension);
        this.computeGraphFitness(graph);
        this.population.push(graph);
    }
};

GeneticAlgorithm.prototype.setPopulationSize = function (populationSize) {
    this.populationSize = populationSize;
};

GeneticAlgorithm.prototype.setDNASize = function(DNASize) {
    this.DNASize = DNASize;
};

GeneticAlgorithm.prototype.processNextGeneration = function() {

    if (this.generation == -1) {
        this.makeRandomGeneration();
        this.orderPopulation();
        this.generation = 0;
        return this.population;
    }

    for (var i = 0; i < this.populationSize; i++) {

        // combinaison
        if (Math.random() < 0.10) {
            var partner = Math.round(Math.random() * this.populationSize / 2);
            if (partner != i) {
                var children = GeneticAlgorithm.combineGraph(this.population[i], this.population[partner]);
                children[0].setConnections(this.queen.knownWalls);
                children[1].setConnections(this.queen.knownWalls);
                this.computeGraphFitness(children[0]);
                this.computeGraphFitness(children[1]);
                this.population.push(children[0]);
                this.population.push(children[1]);
            }
        }

        // mutation
        if (Math.random() < 0.1) {
            this.alterGraphDNA(this.population[i]);
            this.population[i].setConnections(this.queen.knownWalls);
            this.computeGraphFitness(this.population[i]);
        }
    }

    // sometime a fex random entities are inserted in the population
    for (var i = 0, size = Math.random() * 5; i < size; i++) {
        var graph = new Graph();
        graph.randomize(this.DNASize, this.commonVertices, this.queen.knownWalls, this.dimension);
        this.computeGraphFitness(graph);
        this.population.push(graph);
    }

    // classement
    this.orderPopulation();

    while (this.population.length > this.populationSize) {
        this.population.pop();
    }
    this.generation++;
    return this.population;
};

GeneticAlgorithm.prototype.orderPopulation = function() {
    quickSort(this.population);
};

GeneticAlgorithm.prototype.setWorldDimension = function(width, height) {
    this.dimension.width = width;
    this.dimension.height = height;
};

GeneticAlgorithm.prototype.setFitnessThreshold = function(fitnessThreshold) {
    this.fitnessThreshold = fitnessThreshold;
};

GeneticAlgorithm.combineGraph = function(graphA, graphB) {

    var adnA = graphA.vertices;
    var adnB = graphB.vertices;
    var newGraphA = new Graph();
    var newGraphB = new Graph();
    var pivot = Math.round((min(adnA.length, adnB.length) - 2) * Math.random()) + 1;

    for (var i = 0, size = adnA.length; i < size; i++) {
        if (i < pivot) {
            newGraphA.vertices.push(new Vertex(adnA[i].x, adnA[i].y));
            newGraphB.vertices.push(new Vertex(adnB[i].x, adnB[i].y));
        } else {
            newGraphA.vertices.push(new Vertex(adnB[i].x, adnB[i].y));
            newGraphB.vertices.push(new Vertex(adnA[i].x, adnA[i].y));
        }
    }

    return [newGraphA, newGraphB];
};

GeneticAlgorithm.prototype.generateRandomGraph = function() {

    var knownWoodHeap = this.queen.knownWoodHeaps;
    var knownWalls = this.queen.knownWalls;

    var graph = new Graph();
    for (var i in knownWoodHeap) {
        graph.vertices.push(new Vertex(knownWoodHeap[i].x, knownWoodHeap[i].y));
    }

    while (graph.vertices.length < this.DNASize) {
        var vertex = new Vertex(Math.random() * this.dimension.width, Math.random() * this.dimension.height);

        var collide = false;
        for (var j in knownWalls) {
            if (isPointInWall(vertex, knownWalls[j])) {
                collide = true;
                break;
            }
        }
        if (!collide) {
            graph.vertices.push(new Vertex())
        }
    }

    return graph;
};

GeneticAlgorithm.prototype.alterGraphDNA = function(graph, random) {

    if (random === undefined) {
        random = Math;
    }

    for (var i = 0, size = graph.vertices.length; i < size; i++) {
        if (random.random() > 0.75) {
            continue;
        }
        var newVertex = new Vertex(0, 0);
        var valid;
        do {
            if (random.random() < 0.8) {
                newVertex.x = graph.vertices[i].x + (random.random() - 0.5) * 5;
                newVertex.y = graph.vertices[i].y + (random.random() - 0.5) * 5;
            } else {
                newVertex.x = random.random() * this.dimension.width;
                newVertex.y = random.random() * this.dimension.height;
            }
            valid = newVertex.x > 0 && newVertex.x < this.dimension.width &&
                newVertex.y > 0 && newVertex.y < this.dimension.height &&
                !isPointInWall(newVertex, this.queen.knownWalls);
        } while (!valid);

        graph.vertices[i].x = newVertex.x;
        graph.vertices[i].y = newVertex.y;
    }
};

GeneticAlgorithm.prototype.getAllPathsFrom = function(graph, origin) {

    var aStart = new AStar();
    aStart.vertices = graph.vertices;
    var paths = [];
    for (var i = 0, size = graph.vertices.length; i < size; ++i) {
        var path = aStart.getPathFromTo(origin, graph.vertices[i]);
        if (path.length > 0) {
            paths.push(path);
        }
    }
    return paths;
};

GeneticAlgorithm.prototype.getAveragePathLength = function(paths) {
    var sum = 0;
    for (var i = 0, size = paths.length; i < size; i++) {
        sum += getPathLength(paths[i]);
    }
    return sum / paths.length;
};

GeneticAlgorithm.prototype.computeGraphFitness = function(graph) {

    graph.paths = [];
    var origin = graph.getVertexAt(this.queen.x, this.queen.y);
    var polygons = getPolygonsFromVertices(graph.vertices);
    var area = getVolumeOfBoundingBox(getBoundingBoxFromPolygon(polygons));
    var totalArea = this.dimension.width * this.dimension.height;
    var paths = this.getAllPathsFrom(graph, origin);
    var nbrPath = paths.length;
    var avgLength = this.getAveragePathLength(paths);
    var avgDelta = graph.getAverageDistanceFrom(origin);
    if (avgDelta == 0 || totalArea == 0) {
        graph.fitness = 0;
    } else {
//        console.log("nbrPath = " + nbrPath + "; (area / totalArea) = " + (area / totalArea) + "; (avgDelta / avgLength) = " + (avgDelta / avgLength) + ";");
        graph.fitness = (nbrPath * 100 + (area / totalArea) * 100) * (avgLength / avgDelta) * (nbrPath / graph.vertices.length);
    }
};