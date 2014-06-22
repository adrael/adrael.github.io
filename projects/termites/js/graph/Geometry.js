var getPolygonsFromWall = function(wall) {
    var halfWidth = wall.boundingWidth / 2 + 3;
    var halfHeight = wall.boundingHeight / 2 + 3;
    var bottomLeft = [wall.x - halfWidth, wall.y - halfHeight];
    var bottomRight = [wall.x + halfWidth, wall.y - halfHeight];
    var topRight = [wall.x + halfWidth, wall.y + halfHeight];
    var topLeft = [wall.x - halfWidth, wall.y + halfHeight];
    return [bottomLeft, bottomRight, topRight, topLeft];
};

var isPointInWall = function(vertex, wall) {
    var vertices = getPolygonsFromWall(wall);
    var bottomLeft = vertices[0];
    var topRight = vertices[2];
    return vertex[0] >= bottomLeft[0] && vertex[0] <= topRight[0] &&
        vertex[1] >= bottomLeft[1] && vertex[1] <= topRight[1];
};

var doSegmentIntersectsWithWalls = function(segment, walls) {
    for (var i in walls) {
        var polygon = getPolygonsFromWall(walls[i]);
        if (doSegmentIntersectsPolygon(segment, polygon)) {
            return true;
        }
    }
    return false;
};

var doSegmentIntersectsPolygon = function(segment, polygon) {
    var numberOfVertices = polygon.length;
    if (numberOfVertices < 1) {
        return false;
    }
    for (var i=0; i < numberOfVertices; ++i) {
        var next = (i + 1) % numberOfVertices;
        var segmentOfPolygon = [polygon[i], polygon[next]];
        if (doSegmentsIntersect(segment, segmentOfPolygon)) {
            return true;
        }
    }
    return false;
};

var doSegmentsIntersect = function(segmentA, segmentB) {

    var boxA = getBoundingBox(segmentA);
    var boxB = getBoundingBox(segmentB);

    return areTheseBoundingBoxesColliding(boxA, boxB)
        && lineSegmentTouchesOrCrossesLine(segmentA, segmentB)
        && lineSegmentTouchesOrCrossesLine(segmentB, segmentA);
};

var areTheseBoundingBoxesColliding = function(boxA, boxB) {
    return boxA[1][0] >= boxB[0][0] && boxA[0][0] <= boxB[1][0] &&
        boxA[1][1] >= boxB[0][1] && boxA[0][1] <= boxB[1][1];
};

var getBoundingBox = function(segment) {
    var bottomLeft = [min(segment[0][0], segment[1][0]), min(segment[0][1], segment[1][1])];
    var topRight = [max(segment[0][0], segment[1][0]), max(segment[0][1], segment[1][1])];
    return [bottomLeft, topRight];
};

var max = function (a, b) {
    return (a > b) ? a : b;
};

var min = function (a, b) {
    return (a < b) ? a : b;
};

var lineSegmentTouchesOrCrossesLine = function(segmentA, segmentB) {
    var temp = isPointRightOfLine(segmentA, segmentB[1]);
    return isPointOnLine(segmentA, segmentB[0]) || isPointOnLine(segmentA, segmentB[1]) || (isPointRightOfLine(segmentA, segmentB[0]) ? !temp : temp);
};

var isPointOnLine = function(line, point) {
    var pointA = [line[1][0] - line[0][0], line[1][1] - line[0][1]];
    var pointB = [point[0] - line[0][0], point[1] - line[0][1]];
    return Math.abs(crossProduct(pointA, pointB)) < 0.000001;
};

var crossProduct = function(pointA, pointB) {
    return pointA[0] * pointB[1] - pointB[0] * pointA[1];
};

var isPointRightOfLine = function(segment, point) {
    var pointA = [segment[1][0] - segment[0][0], segment[1][1] - segment[0][1]];
    var pointB = [point[0] - segment[0][0], point[1] - segment[0][1]];
    return crossProduct(pointA, pointB) < 0;
};

var getBoundingBoxFromPolygon = function(polygons) {
    var minimum = polygons[0];
    var maximum = polygons[0];

    for (var p = 0, size = polygons.length; p < size; ++p) {
        minimum = [min(minimum[0], polygons[p][0]), min(minimum[1], polygons[p][1])];
        maximum = [max(maximum[0], polygons[p][0]), max(maximum[1], polygons[p][1])];
    }

    return [minimum, maximum];
};

var getVolumeOfBoundingBox = function(polygons) {
    return Math.abs(polygons[1][0] - polygons[0][0]) * Math.abs(polygons[1][1] - polygons[0][1]);
};

var getPolygonsFromVertices = function(vertices) {

    var polygons = [];
    for (var i = 0, size = vertices.length; i < size; ++i) {
        polygons.push([vertices[i].x, vertices[i].y]);
    }
    return polygons;
};

var getPathLength = function(vertices) {
    if (vertices.length < 2) {
        return 0;
    }
    var sum = 0;
    var deltaX, deltaY;
    for (var i = 0, size = vertices.length - 1; i < size; i++) {
        deltaX = vertices[i].x - vertices[i + 1].x;
        deltaY = vertices[i].y - vertices[i + 1].y;
        sum += Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    }
    return sum;
};