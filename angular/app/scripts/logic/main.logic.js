/**
 * @author Raphaël MARQUES
 *
 * @file The MainLogic handler file.
 * @module MainLogic
 */

/**
 * MainLogic IIFE declaration.
 * @name IIFE
 * @function
 */
(function () {

    'use strict';

    // Module declaration
    angular
        .module('adraelGithubIO')
        .service('MainLogic', MainLogic);

    // Dependency injection
    MainLogic.$inject = ['$log', '$location'];

    /**
     * The MainLogic manage the Main controller.
     * @name MainLogic
     * @param {Object} $log The AngularJS's $log object
     * @param {Object} $location The AngularJS's $location object
     * @return {Object} The factory
     * @function
     */
    function MainLogic($log, $location) {

        $log.debug('Loading Main Logic...');

        var factory =
        {
            isCurrentRoute: isCurrentRoute,
            getCurrentRouteName: getCurrentRouteName
        };

        return factory;

        /**
         * Retrieve the current route name.
         * @name getCurrentRouteName
         * @return {String} The current route name
         * @function
         */
        function getCurrentRouteName() {

            var routeNames =
            {
                '/': 'Home',
                '/about': 'About',
                '/contact': 'Contact',
                '/projects': 'Projects'
            };

            return routeNames[$location.path()];

        }

        /**
         * VVerify if the given route is the current route.
         * @name isCurrentRoute
         * @param {String} route The route to be verified
         * @return {Boolean} The fact that the given route is the current route or not
         * @function
         */
        function isCurrentRoute(route) {

            return route === '#' + $location.path();

        }

    }

})();