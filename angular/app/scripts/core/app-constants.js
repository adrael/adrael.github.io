/**
 * @author Raphaël MARQUES
 *
 * @file The application's constants file.
 * @module app-constants
 */

/**
 * app-constants IIFE declaration.
 * @name IIFE
 * @function
 */
(function () {

    'use strict';

    /**
     * Provides all the constants the application needs.
     * @name constant
     * @var
     */
    var constants =
    {
        DEBUG: false
    };

    // Module declaration
    angular
        .module('adraelGithubIO')
        .constant('Constants', constants);

})();
