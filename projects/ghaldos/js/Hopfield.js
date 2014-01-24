/**
 * User: Eptwalabha
 * Date: 28/12/13
 * Time: 11:07
 */
function Hopfield (input) {

    this.nbrInput = input;
    this.weight = [];
    this.floorValue = -1;


    /**
     * Initialize all weight to O and reset the activation
     */
    this.initializeHopfield = function () {

        this.weight = this.zero_matrix(this.nbrInput, this.nbrInput);

        this.resetActivation();
    };

    this.process = function (inputs) {

        /*
         - on récupère la matrice des entrées
         - on l'inverse
         - on multiplie l'inverse par la matrice des entrées
         - on multiplie le résultat par le taux d'apprentissage
         - on additionne à la matrice des poids
         */
    };

    this.learn = function (inputs) {

        /*
        - on récupère la matrice des entrées
        - on la multiplie par la matrice des poids
        - on passe à 1 les valeurs > 0 et à -1 les autres
        - on compare avec la mattrice des entées.
            - si égal = on arrête
            - sinon on utilisa la sortue comm entrée et on recommence
        - Sécuriser l'algo avec un nombre de boucles maximal
         */

    };

    this.input_matrix = function () {
        var result = zero_matrix(1, PIXEL_COUNT);
        for (var row = 0; row < GRID_HEIGHT; row++) {
            for (var col = 0; col < GRID_WIDTH; col++) {
                var pixelIndex = row * GRID_WIDTH + col;
                result[0][pixelIndex] = (pixels[col][row] == PIXEL_ON) ? 1 : this.floorValue;
            }
        }

        return result;
    };

    this.zero_matrix = function (rows, cols) {
        var result = [];
        for (var x = 0; x < rows; x++) {
            result[x] = [];
            for (var y = 0; y < cols; y++) {
                result[x][y] = 0;
            }
        }

        return result;
    };

    this.matrix_copy = function (m) {
        var result = [];
        for (var x = 0; x < m.length; x++) {
            result[x] = [];
            for (var y = 0; y < m[x].length; y++) {
                result[x][y] = m[x][y];
            }
        }
        return result;
    };

    this.matrix_equals = function (m1, m2) {

        if (m1.length != m2.length) {
            return false;
        }
        if (m1[0].length != m2[0].length) {
            return false;
        }

        for (var x = 0; x < m1.length; x++) {
            for (var y = 0; y < m1[x].length; y++) {
                if (m1[x][y] != m2[x][y]) {
                    return false;
                }
            }
        }

        return true;
    };

    this.matrix_multiply = function (m1, m2) {
        var result = this.zero_matrix(m1.length, m2[0].length);
        for (var i = 0;i < m1.length;i++) {
            for (var j = 0;j < m2[0].length ;j++) {
                for (var k = 0;k < m1[i].length;k++) {
                    result[i][j] += m1[i][k] * m2[k][j];
                }
            }
        }

        return result;
    };

    this.matrix_scalar_multiply = function (m, scalar) {
        var result = this.matrix_copy(m);
        for (var x = 0; x < m.length; x++) {
            result[x] = [];
            for (var y = 0; y < m[x].length; y++) {
                result[x][y] = m[x][y] * scalar;
            }
        }

        return result;
    };

    this.matrix_add = function (m1, m2) {
        var result = this.matrix_copy(m1);
        for (var x = 0; x < m2.length; x++) {
            for (var y = 0; y < m2[x].length; y++) {
                result[x][y] += m2[x][y];
            }
        }

        return result;
    };

    this.matrix_invert = function (m) {
        var result = this.zero_matrix(m[0].length, m.length);
        for (var x = 0; x < m.length; x++) {
            for (var y = 0; y < m[x].length; y++) {
                result[y][x] += m[x][y];
            }
        }

        return result;
    };

    this.matrix_log = function (name, m) {
        var lines = [];
        for (var x = 0; x < m.length; x++) {
            lines[x] = "\t"+m[x].join(",");
        }
        console.log(name + " =\n" + lines.join("\n"));
    };

}