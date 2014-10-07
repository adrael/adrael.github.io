/**
 * @author Raphaël MARQUES
 *
 * @file The application's run file.
 * @module app-run
 */

/**
 * app-run IIFE declaration.
 * @name IIFE
 * @function
 */
(function () {

    'use strict';

    // Module declaration
    angular
        .module('adraelGithubIO')
        .run(run);

    // Dependency injection
    run.$inject = ['$log'];

    /**
     * Provides the run configuration for the application.
     * @name run
     * @function
     */
    function run($log) {

        $log.debug('Launching application...');

    }

})();