Vertex = function(x, y){
    this.x = x;
    this.y = y;
    this.neighbours = [];
    this.heuristic = null;
    this.parent = null;
    this.G = 0;
    this.F = -1;
};

Vertex.prototype.setPosition = function (x, y){
    this.x = x;
    this.y = y;
};