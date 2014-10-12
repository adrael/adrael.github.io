/**
 * @author Raphaël MARQUES
 *
 * @file The Projects controller\'s file.
 * @module Main
 */

/**
 * Projects IIFE declaration.
 * @name IIFE
 * @function
 */
(function () {

  'use strict';

  // Module declaration
  angular
    .module('adraelGithubIO')
    .controller('Projects', Projects);

  // Dependency injection
  Projects.$inject = ['$log', '$sce'];

  /**
   * The Projects controller aims to manage the Application.
   * @name Projects
   * @param {Object} $log The AngularJS's $log object
   * @param {Object} $sce The AngularJS's $sce object
   * @function
   */
  function Projects($log, $sce) {

    $log.debug('Loading Projects Controller...');

    var vm = this;

    vm.isGrid = false;

    vm.isLeft = isLeft;
    vm.changeDisplay = changeDisplay;

    vm.projects = [
      {
        title: 'Protect It!',
        titleMuted: 'Protect It!',
        titleLeft: $sce.trustAsHtml(' &mdash; It\'ll blow your mind.'),
        img: 'protectit.png',
        imgBig: 'protectit_big.png',
        urlAccess: 'http://securite.developpez.com/defis/generateur-mot-de-passe/protect-it/',
        urlGit: 'https://github.com/Adrael/ProtectIt',
        text: $sce.trustAsHtml('\'Protect It\' is a web-based solution created for a Developpez.com project. ' +
        'The goal of this application is to help create safe and secure passwords, while remembering ' +
        'them without having to write them down somewhere. &mdash; Award-winning at developpez.com')
      },

      {
        title: 'Diap.',
        titleMuted: 'Diap.',
        titleLeft: $sce.trustAsHtml(' &mdash; What\'s up?'),
        img: 'diap.png',
        imgBig: 'diap_big.png',
        urlAccess: 'http://rawgit.com/Adrael/Diap/master/index.html#/',
        urlGit: 'https://github.com/Adrael/Diap',
        text: $sce.trustAsHtml('If you ever heard of ' +
        '<a href=\"https://github.com/hakimel/reveal.js\" target=\"_blank\" class=\"clearLink\">Reveal.' +
        'js</a>, then you\'ll be glad to use "Diap". It\'s Reveal.js with a lot of improvements. ' +
        'Now you can do whatever you always wanted to do, easily. Take a look, and don\'t hesistate to ' +
        'give me your feedback!<br>')
      },

      {
        title: 'EPSI Courses',
        titleMuted: 'EPSI Courses.',
        titleLeft: $sce.trustAsHtml(' &mdash; Exactly.'),
        img: 'epsicourses.png',
        imgBig: 'epsicourses_big.png',
        urlAccess: 'http://rawgit.com/Adrael/EPSICourses/master/index.html#/',
        urlGit: 'https://github.com/Adrael/EPSICourses',
        text: $sce.trustAsHtml('Made with Diap. \'EPSI Courses\' intend to give access to all of the fourth ' +
        'year students of the EPSI Engineering School to the courses materials. Made by a student for ' +
        'the students.<br><br>')
      },

      {
        title: 'GHaLDoS',
        titleMuted: 'GHaLDoS!',
        titleLeft: $sce.trustAsHtml(' &mdash; Run Forrest.'),
        img: 'ghaldos.png',
        imgBig: 'ghaldos_big.png',
        urlAccess: 'http://rawgit.com/Adrael/GHaLDoS/master/index.html',
        urlGit: 'https://github.com/Adrael/GHaLDoS',
        text: $sce.trustAsHtml('An amazing Perceptron 2.0 made by two students from EPSI Bordeaux. ' +
        'Recognition. Ammunition. Demolition.<br>')
      },

      {
        title: 'CryptoJSLogin',
        titleMuted: 'CryptoJSLogin',
        titleLeft: $sce.trustAsHtml(' &mdash; The safer the better.'),
        img: 'cryptojslogin.png',
        imgBig: 'cryptojslogin_big.png',
        urlAccess: 'http://rawgit.com/Adrael/CryptoJSLogin/master/index.html',
        urlGit: 'https://github.com/Adrael/CryptoJSLogin',
        text: $sce.trustAsHtml('Ever dreamed of a beautiful and nevertheless secured way of log in somewhere?' +
        ' Now with CryptoJSLogin thanks to crypto-js and Bootstrap, you got it.<br>')
      },

      {
        title: 'RPJS [Paused]',
        titleMuted: 'RPJS',
        titleLeft: $sce.trustAsHtml(' &mdash; Knowledge is power. [Paused]'),
        img: 'rpjs.png',
        imgBig: 'rpjs_big.png',
        urlAccess: 'http://rawgit.com/Adrael/rpjs/master/index.html',
        urlGit: 'https://github.com/Adrael/rpjs',
        text: $sce.trustAsHtml('Right bottom left up right bottom left up. Wait, I\'ve seen this place ' +
        'already!<br><br>')
      },

      {
        title: 'IMADS',
        titleMuted: 'IMADS',
        titleLeft: $sce.trustAsHtml(' &mdash; Because power is never enough.'),
        img: 'imads.png',
        imgBig: 'imads_big.png',
        urlAccess: 'http://rawgit.com/Adrael/jarvis/master/Jarvis2.0/index.html',
        urlGit: 'https://github.com/Adrael/jarvis/tree/master/Jarvis2.0',
        text: $sce.trustAsHtml('Experiments on Experts Systems learned at school. Enjoy the Iron Man Armor ' +
        'Diagnostic System!!<br><br>')
      },

      {
        title: 'J.A.R.V.I.S',
        titleMuted: 'J.A.R.V.I.S',
        titleLeft: $sce.trustAsHtml(' &mdash; IMADS you say? Too mainstream.'),
        img: 'jarvis.png',
        imgBig: 'jarvis_big.png',
        urlAccess: 'http://rawgit.com/Adrael/jarvis/master/Jarvis3.0/index.html',
        urlGit: 'https://github.com/Adrael/jarvis/tree/master/Jarvis3.0',
        text: $sce.trustAsHtml('Improvements of the experiments on Experts Systems learned at school. ' +
        'Level up, suit up, we\'ve got some bad guys\' asses to kick-off!<br>')
      },

      {
        title: 'Termites',
        titleMuted: 'Termites',
        titleLeft: $sce.trustAsHtml(' &mdash; *Crunch* *Crunch* Wot? Am bosy eatun wod!'),
        img: 'termites.png',
        imgBig: 'termites_big.png',
        urlAccess: 'http://rawgit.com/Eptwalabha/termites-projet-ia/master/src/index.html',
        urlGit: 'https://github.com/Eptwalabha/termites-projet-ia',
        text: $sce.trustAsHtml('Experiments on Multi-Agent Systems + AStar pathfinding + Genetic Algorithm ' +
        'learned at school. Sounds awesome? That\'s because it is.<br>')
      },

      {
        title: 'FindOnCraig',
        titleMuted: 'FindOnCraig',
        titleLeft: $sce.trustAsHtml(' &mdash; Looking for something?'),
        img: 'foc.png',
        imgBig: 'foc_big.png',
        urlAccess: 'http://findoncraig.com',
        urlGit: '',
        text: $sce.trustAsHtml('Ever dreamed of finding stuff on all Craigslist\'s websites? ' +
        'Dreaming is over.<br><br>')
      },

      {
        title: 'goalmap',
        titleMuted: 'goalmap',
        titleLeft: $sce.trustAsHtml(' &mdash; Set, Track, Reach'),
        img: 'goalmap.png',
        imgBig: 'goalmap_big.png',
        urlAccess: 'http://www.goalmap.com',
        urlGit: '',
        text: $sce.trustAsHtml('The platform to set, track and reach all your goals. ' +
        'It\'s free, it\'s easy, and you\'ll love it!<br><br>')
      },

      {
        title: 'Thesis Searcher',
        titleMuted: 'Thesis Searcher',
        titleLeft: $sce.trustAsHtml(' &mdash; The Google of the thesis'),
        img: 'thesis-searcher.png',
        imgBig: 'thesis-searcher_big.png',
        urlAccess: 'http://rawgit.com/r0mdau/thesis-searcher/master/views/index.html#/home',
        urlGit: 'https://github.com/r0mdau/thesis-searcher',
        text: $sce.trustAsHtml('PDF Search engine made with ElasticSearch and NodeJS<br><br>')
      },

      {
        title: 'Visualizor',
        titleMuted: 'Visualizor',
        titleLeft: $sce.trustAsHtml(' &mdash; It\'s your music coming to life.'),
        img: 'visualizor.png',
        imgBig: 'visualizor_big.png',
        urlAccess: 'https://rawgit.com/Adrael/Visualizor/master/index.html',
        urlGit: 'https://github.com/Adrael/Visualizor',
        text: $sce.trustAsHtml('Your music used to talked to you too, right? Now you can see it being alive!<br><br>')
      }
    ];

    return vm;

    /**
     * Verify if the image at the index should be displayed on left.
     * @name isLeft
     * @param {Integer} index The index to check
     * @return {Boolean} The fact that the image at the index should be displayed on left or not
     * @function
     */
    function isLeft(index) {

      return index % 2 !== 0;

    }

    /**
     * Switch display between list and grid and vice versa.
     * @name changeDisplay
     * @param {Boolean} isGrid Grid or list
     * @function
     */
    function changeDisplay(isGrid) {

      vm.isGrid = isGrid;

    }

  }

})();
