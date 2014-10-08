/*!
 * perceptron.js
 * https://github.com/Adrael/GHaLDoS/blob/master/perceptron.js
 * 
 *
 * Copyright (C) 2013
 */

'use strict';

/**
 * Constructor for Perceptron
 *
 * @param {int} input
 * @param {int} output
 */
function Perceptron(input, output) {

    this.nbrOfInput = input;
    this.nbrOfOutput = output;
    this.activationThreshold = 0.001;
    this.trainingRate = 0.001;
    this.weight = [];
    this.activation = [];
    this.processedNumbers = [];
    this.trainingReport = [];
    this.floorValue = 0;

    /**
     * Initialize all weight to O and reset the activation
     */
    this.initializePerceptron = function () {

        this.weight = [];
        for (var x = 0; x < this.nbrOfInput; x++) {
            this.weight[x] = [];
            for (var y = 0; y < this.nbrOfOutput; y++)
                this.weight[x][y] = 0.0;
        }

        this.resetActivation();
    };

    this.resetActivation = function () {

        // les sorties sont initialisées à 0
        for (var i = 0; i < this.nbrOfOutput; i++)
            this.activation[i] = 0.0;
    };

    /**
     * @param {Array} input
     * @param {int} value
     */
    this.learnInput = function (input, value) {

        this.processInput(input);

        for (var o = 0; o < this.nbrOfOutput; o++) {

            var A = (o == value) ? 1 : this.floorValue;
            var O = (this.activation[o] >= this.activationThreshold) ? 1 : this.floorValue;
            var delta = A - O;

            for (var i = 0; i < this.nbrOfInput; i++) {

                var E = input[i];
                this.weight[i][o] += this.trainingRate * delta * E;
            }
        }
    };

    /**
     *
     *	@param {Array} input
     */
    this.processInput = function(input) {

        this.resetActivation();

        for (var x = 0; x < this.nbrOfInput; x++) {
            for (var y = 0; y < this.nbrOfOutput; y++)
                this.activation[y] += this.weight[x][y] * input[x];
        }

        this.processedNumbers = [];

        for (var i = 0; i < this.nbrOfOutput; i++) {
            if (this.activation[i] >= this.activationThreshold)
                this.processedNumbers.push(i);
        }
    };

    /**
     * Each node of the nbrOfInput needs to be structured this way:<br>
     * inputs[x] = {
     *   'id' : unique,
     *   'number' : the number to learn,
     *   'table' : Array() list of nbrOfInput value}
     * @param {Array} inputs
     */
    this.learnAllInput = function (inputs) {

        var MAX_ATTEMPT = 20;
        var nbrElementAApprendre = inputs.length;
        var number, id;
        var table;
        var allCorrect = 0;
        var attempt = 0;
        this.trainingReport = [];

        while (allCorrect < nbrElementAApprendre && attempt < MAX_ATTEMPT) {

            allCorrect = 0;

            for (var i = 0; i < nbrElementAApprendre; i++) {

                number = inputs[i]['number'];
                id = inputs[i]['id'];
                table = inputs[i]['table'];
                this.processInput(table);

                if (this.processedNumbers.length != 1 || this.processedNumbers[0] != number) {
                    this.learnInput(table, number);
                } else {
                    allCorrect++;
                }
            }

            this.trainingReport.push([allCorrect / nbrElementAApprendre]);
            attempt++;
        }

        if (attempt >= MAX_ATTEMPT)
            console.log("echec de l'apprentissage après " + MAX_ATTEMPT + " tentatives!");
    };
}