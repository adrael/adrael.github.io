/**
 * Created with IntelliJ IDEA.
 * User: eptwalabha
 * Date: 24/12/13
 * Time: 21:12
 */
function CanvasDisplay(canvas, x, y) {
    this.canvas = canvas;

    this.pixelNumber = {
        x : x,
        y : y
    };
    var pixelSize = {
        x : canvas.width / x,
        y : canvas.height / y
    };

    this.thickness = 0;
    this.pixels = [];
    this.lastMousePixelIndex = [];
    this.writeMode = true;

    /**
     *  Returns the index of the pixel where the point belong
     *	@param {object} point
     */
    this.pixelIndexAtPoint = function(point) {
        var pixelIndex = -1;
        var x = Math.floor(point.x / pixelSize.x);
        var y = Math.floor(point.y / pixelSize.y);
        if (x < this.canvas.width && y < this.canvas.height)
            pixelIndex = y * canvas.width + x;
        return pixelIndex;
    };

    /**
     *
     *	@param {{x: number, y: number}} point - ...
     *  @param {int} value.
     */
    this.setPixelValueAtPoint = function(point, value) {
        var x = Math.floor(point.x / pixelSize.x);
        var y = Math.floor(point.y / pixelSize.y);
        if (x < this.canvas.width && y < this.canvas.height)
            this.drawNeighboursPixels(x, y, value);
    };

    /**
     * Initialize the pixels table
     */
    this.resetCanvas = function () {

        this.pixels = [];

        for (var x = 0; x < this.pixelNumber.x; x++) {
            this.pixels[x] = [];
            for (var y = 0; y < this.pixelNumber.y; y++)
                this.pixels[x][y] = 0;
        }

        this.drawPixels();
    };

    /**
     * Returns a list of all the pixel's values.
     */
    this.getPixelsValue = function () {

        var posX, posY, input = [];
        for (var i = 0, size = this.pixelNumber.x * this.pixelNumber.y; i < size; i++) {
            posX = i % this.pixelNumber.x;
            posY = Math.floor(i / this.pixelNumber.x);
            input[i] = this.pixels[posX][posY];
        }
        return input;
    };

    /**
     * Copy the given matrix into the pixel matrix
     * @param newPixelsValues
     */
    this.setPixelsValuesFromList = function (newPixelsValues) {

        var i, posX, posY, size;
        for (i = 0, size = newPixelsValues.length; i < size; i++) {
            posX = i % this.pixelNumber.x;
            posY = Math.floor(i / this.pixelNumber.x);
            this.pixels[posX][posY] = newPixelsValues[i];
        }
    };

    /**
     * Set the pixel at position (x, y) the given value,<br>
     * If the pixels value goes below 0, it is then set to 0.
     * @param {int} x
     * @param {int} y
     * @param {int} value
     */
    this.drawNeighboursPixels = function(x, y, value) {

        if (this.pixels.length == 0)
            this.resetCanvas();

        var coeffValue = value / (2 * this.thickness);

        this.pixels[x][y] = this.writeMode ? value : 0.0;

        for (var x2 = x - this.thickness, xMax = x + this.thickness; x2 < xMax; x2++) {

            if (x2 < 0 || x2 >= this.pixelNumber.x)
                continue;

            for (var y2 = y - this.thickness, yMax = y + this.thickness; y2 < yMax; y2++) {

                if (y2 < 0 || y2 >= this.pixelNumber.y)
                    continue;

                var deltaX = x2 - x;
                var deltaY = y2 - y;
                var dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

                if (dist > this.thickness)
                    continue;

                if (this.writeMode) {
                    var reviewedValue = value - (dist * coeffValue);
                    if (reviewedValue > this.pixels[x2][y2])
                        this.pixels[x2][y2] = reviewedValue;
                } else {
                    this.pixels[x2][y2] = 0;
                }
            }
        }
    };

    /**
     *  Draw the pixel matrix on the canvas
     */
    this.drawPixels = function() {

        var context = this.canvas.getContext("2d");
        context.fillStyle = '#555';
//        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        context.rect(0, 0, this.canvas.width, this.canvas.height);
        context.fill();

        var alpha;
        for(var y = 0; y < this.pixelNumber.y; y++) {
            for(var x = 0; x < this.pixelNumber.x; x++) {
                context.beginPath();
                context.rect(x * pixelSize.x, y * pixelSize.y, pixelSize.x, pixelSize.y);

                alpha = 1 - (1 - this.pixels[x][y]) * 1.6;
                // couleur du pixel
                context.fillStyle = 'rgba(35, 255, 35, ' + alpha + ')';
                if (this.pixels[x][y] < 0.5)  context.fillStyle = '#555';

                context.fill();
            }
        }

        context.strokeStyle = 'rgba(100, 100, 100, 1)';
        var i, linePosition;
        for (i = 1; i < this.pixelNumber.y; i++) {
            linePosition = pixelSize.y * i;
            context.beginPath();
            context.moveTo(0, linePosition);
            context.lineTo(canvas.width, linePosition);
            context.stroke();
        }

        for (i = 1; i < this.pixelNumber.x; i++) {
            linePosition = pixelSize.x * i;
            context.beginPath();
            context.moveTo(linePosition, 0);
            context.lineTo(linePosition, canvas.height);
            context.stroke();
        }

    };

    /**
     *
     * @param {_events} e
     * @returns {{x: number, y: number}}
     */
    this.mouseCanvasPosition = function(e) {
        var rect = this.canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }
}
