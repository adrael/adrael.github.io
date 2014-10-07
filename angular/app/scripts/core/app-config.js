/**
 * @author Raphaël MARQUES
 *
 * @file The application's configuration file.
 * @module app-config
 */

/**
 * app-config IIFE declaration.
 * @name IIFE
 * @function
 */
(function () {

    'use strict';

    // Module declaration
    angular
        .module('adraelGithubIO')
        .config(config);

    // Dependency injection
    config.$inject = ['$logProvider', 'Constants'];

    /**
     * Provides all the configuration the application needs.
     * @name config
     * @param {Object} $logProvider The AngularJS $logProvider object
     * @param {Object} Constants The application's constants object
     * @function
     */
    function config($logProvider, Constants) {

        $logProvider.debugEnabled(Constants.DEBUG);

    }

})();
