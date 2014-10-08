function AStar() {
    this.vertices = [];
    this.openList = [];
    this.closedList = [];
    this.graph = null;
}

AStar.prototype.setHeuristic = function(vertex) {
    for (var i in this.vertices) {
        this.vertices[i].parent = null;
        var deltaX = vertex.x - this.vertices[i].x;
        var deltaY = vertex.y - this.vertices[i].y;
        this.vertices[i].F = -1;
        this.vertices[i].G = 0;
//        this.vertices[i].heuristic = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
//        // Manhattan heuristic
        this.vertices[i].heuristic = Math.abs(deltaX) + Math.abs(deltaY);
    }
};

AStar.prototype.setGraph = function(graph) {
    this.graph = graph;
};

AStar.prototype.getPathFromTo = function(start, goal) {
    console.log("coucou Astar");

    if (this.graph !== undefined && this.graph !== null) {
        var savedPath = this.graph.getPathFromTo(start, goal);
        if (savedPath !== undefined) {
            return savedPath;
        }
    }

    if (start == goal) {
        return [start];
    }
    this.setHeuristic(goal);
    this.openList = [start];
    this.closedList = [];
    start.F = start.heuristic;
    start.G = 0;
    var shortestDistance = -1;

    while (this.openList.length > 0) {
        var vertex = this.getNextVertexToCheck();

        if (shortestDistance != -1 && vertex.G > shortestDistance) {
            break;
        }

        this.moveFromOpenToClosedList(vertex);
        var neighbours = this.getVertexNeighbours(vertex);
        for (var i in neighbours) {
            var neighbor = neighbours[i];
            var G = this.computeG(vertex, neighbor);
            var F = G + neighbor.heuristic;
            if (!this.isVertexInOpenList(neighbor) || neighbor.F == -1 || F < neighbor.F) {
                neighbor.F = F;
                neighbor.G = G;
                neighbor.parent = vertex;
                if (!this.isVertexInOpenList(neighbor)) {
                    this.openList.push(neighbor);
                }
            }
            if (neighbor == goal) {
                if (shortestDistance == -1 || shortestDistance > G) {
                    shortestDistance = G;
                }
            }
        }
    }

    var finalPath = [];
    if (shortestDistance != -1) {
        finalPath = this.rebuildPath(goal);
    }

    if (this.graph !== undefined && this.graph !== null) {
        this.graph.savePathFromTo(start, goal, finalPath);
    }

    return finalPath;
};

AStar.prototype.computeG = function(parent, children) {
    var deltaX = parent.x - children.x;
    var deltaY = parent.y - children.y;
    return parent.G + Math.sqrt(deltaX * deltaX + deltaY * deltaY);
};

AStar.prototype.isVertexInClosedList = function(vertex) {
    return this.closedList.indexOf(vertex) != -1;
};

AStar.prototype.isVertexInOpenList = function(vertex) {
    return this.openList.indexOf(vertex) != -1;
};

AStar.prototype.getVertexNeighbours = function(vertex) {
    var nextVerticesToCheck = [];

    for (var i in  vertex.neighbours) {
        var neighbor = vertex.neighbours[i];
        if (!this.isVertexInClosedList(neighbor)) {
            nextVerticesToCheck.push(neighbor);
        }
    }
    return nextVerticesToCheck;
};

AStar.prototype.getNextVertexToCheck = function() {
    if (this.openList.length == 0) {
        return null;
    }

    var lowerScore = this.openList[0].F;
    var index = 0;

    for (var i in this.openList) {
        var score = this.openList[i].F;
        if (score < lowerScore) {
            lowerScore = score;
            index = i;
        }
    }

    return this.openList[index];
};

AStar.prototype.rebuildPath = function(vertex) {
    if (vertex === undefined) {
        return [];
    }
    if (vertex.parent === undefined || vertex.parent == null) {
        return [vertex];
    }
    var path = this.rebuildPath(vertex.parent);
    path.push(vertex);
    return path;
};

AStar.prototype.moveFromOpenToClosedList = function(vertex) {
    var index = this.openList.indexOf(vertex);
    if (index == -1) {
        return;
    }
    this.openList.splice(index, 1);
    this.closedList.push(vertex);
};