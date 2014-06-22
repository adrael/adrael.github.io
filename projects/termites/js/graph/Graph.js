Graph = function(){
    this.vertices = [];
    this.fitness = 0;
    this.paths = [];
};

Graph.prototype.addVertex = function(vertex) {
    this.vertices.push(vertex);
};

Graph.prototype.randomizeVertices = function(nbr, width, height, walls) {
    this.vertices = [];
    for (var i = 0; i < nbr; i++) {
        var noCollide, vertex;
        do {
            noCollide = true;
            vertex = new Vertex(width * Math.random(), height * Math.random());
            for (var k = 0, size2 = walls.length; k < size2; k++) {
                if (isPointInWall([vertex.x, vertex.y], walls[k])) {
                    noCollide = false;
                    break;
                }
            }
        } while(!noCollide);

        this.vertices.push(vertex);
    }
};

Graph.prototype.randomize = function(nbr, fixedVertices, walls, dimension) {
    if (nbr - fixedVertices.length > 0) {
        this.randomizeVertices(nbr - fixedVertices.length, dimension.width, dimension.height, walls);
    }
    for (var i = 0, size = fixedVertices.length; i < size; i++) {
        this.vertices.push(new Vertex(fixedVertices[i].x, fixedVertices[i].y));
    }
    this.setConnections(walls);
};

Graph.prototype.draw = function(context) {

    var vertex, neighbor;
    for (var i in this.vertices) {
        vertex = this.vertices[i];

        context.strokeStyle="#00F";
        context.globalAlpha = 0.1;

        for (var j in vertex.neighbours) {
            neighbor = vertex.neighbours[j];
            context.beginPath();
            context.moveTo(vertex.x, vertex.y);
            context.lineTo(neighbor.x, neighbor.y);
            context.stroke();
        }

        context.strokeStyle="#F00";
        context.globalAlpha = 1;
        context.beginPath();
        context.arc(vertex.x, vertex.y, 4, 0, 2*Math.PI);
        context.stroke();
    }
};

Graph.prototype.hasVertex = function(position) {
    for (var i = 0, size = this.vertices.length; i < size; i++) {
        var vertex = this.vertices[i];
        if (vertex.x == position[0] && vertex.y == position[1]) {
            return true;
        }
    }
    return false;
};

Graph.prototype.setConnections = function(walls) {

    for (var vertex in this.vertices) {
        this.vertices[vertex].neighbours = [];
    }

    var cursor = 0;
    for (var i = 0, size = this.vertices.length; i < size; i++) {
        cursor++;
        var pointA = [this.vertices[i].x, this.vertices[i].y];
        for (var j = cursor; j < size; j++) {
            var pointB = [this.vertices[j].x, this.vertices[j].y];
            if (!doSegmentIntersectsWithWalls([pointA, pointB], walls)) {
                this.vertices[i].neighbours.push(this.vertices[j]);
                this.vertices[j].neighbours.push(this.vertices[i]);
            }
        }
    }
};

Graph.prototype.getAverageDistanceFrom = function(origin) {
    var sum = 0;
    var size = this.vertices.length;
    if (size == 0) {
        return 0;
    }

    var deltaX, deltaY;
    for (var i = 0; i < size; ++i) {
        deltaX = origin.x - this.vertices[i].x;
        deltaY = origin.y - this.vertices[i].y;
//        sum += Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        sum += Math.abs(deltaX) + Math.abs(deltaY);
    }
    return sum / size;
};

Graph.prototype.savePathFromTo = function(from, to, path) {
    this.paths.push({from : from, to : to, path : path});
};

Graph.prototype.getPathFromTo = function(from, to) {

    for (var i = 0, size = this.paths.length; i < size; i++) {
        var path = this.paths[i];
        if (path.from == from && path.to == to) {
            return path.path;
        }
    }
};

Graph.prototype.getVertexAt = function(x, y) {
    var index, min = -1;
    for (var i = 0, size = this.vertices.length; i < size; i++) {
        var distance = Graph.getSquareDist(this.vertices[i].x, this.vertices[i].y, x, y);
        if (min == -1 || distance < min) {
            min = distance;
            index = i;
        }
    }
    return this.vertices[index];
};

Graph.getSquareDist = function(x1, y1, x2, y2) {
    var deltaX = x1 - x2;
    var deltaY = y1 - y2;
    return deltaX * deltaX + deltaY * deltaY;
};