/**
 * @author Raphaël MARQUES
 *
 * @file The Main controller's file.
 * @module Main
 */

/**
 * Main IIFE declaration.
 * @name IIFE
 * @function
 */
(function () {

    'use strict';

    // Module declaration
    angular
        .module('adraelGithubIO')
        .controller('Main', Main);

    // Dependency injection
    Main.$inject = ['$log', 'MainLogic'];

    /**
     * The Main controller aims to manage the Application.
     * @name Main
     * @param {Object} $log The AngularJS's $log object
     * @param {Object} MainLogic The MainLogic object
     * @function
     */
    function Main($log, MainLogic) {

        $log.debug('Loading Main Controller...');

        var vm = this;

        vm.menu =
            [
                {
                    name: 'Home',
                    link: '#/'
                },

                {
                    name: 'Projects',
                    link: '#/projects'
                },

                {
                    name: 'About',
                    link: '#/about'
                },

                {
                    name: 'Contact',
                    link: '#/contact'
                }
            ];

        vm.isCurrentRoute = MainLogic.isCurrentRoute;
        vm.getCurrentRouteName = MainLogic.getCurrentRouteName;

        return vm;

    }

})();