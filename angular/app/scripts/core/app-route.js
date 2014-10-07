/**
 * @author Raphaël MARQUES
 *
 * @file The application's routes configuration file.
 * @module app-route
 */

/**
 * route-config IIFE declaration.
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
    config.$inject = ['$routeProvider'];

    /**
     * Provides all the routes the application needs.
     * @name config
     * @param {Object} $routeProvider The AngularJS $routeProvider object
     * @function
     */
    function config($routeProvider) {

        $routeProvider
            .when('/', {

                templateUrl: 'views/home.html'

            })

            .when('/projects', {

                templateUrl: 'views/projects.html',
                controller: 'Projects',
                controllerAs: 'projects'

            })

            .when('/about', {

                templateUrl: 'views/about.html'

            })

            .when('/contact', {

                templateUrl: 'views/contact.html'

            })

            .otherwise({
                redirectTo: '/'
            });

    }

})();
