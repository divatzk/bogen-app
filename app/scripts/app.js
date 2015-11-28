'use strict';

/**
 * @ngdoc overview
 * @name bogenApp
 * @description
 * # bogenApp
 *
 * Main module of the application.
 */
angular
  .module('bogenApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'LocalStorageModule',
    'chart.js'
  ])
  .config(['localStorageServiceProvider', function(localStorageServiceProvider){
    localStorageServiceProvider.setPrefix('ls');
  }])
  .run(['$rootScope', function($rootScope) {
    $rootScope.$on("$routeChangeSuccess", function(event, currentRoute){
      switch(currentRoute.templateUrl) {
        case 'views/main.html':
          $rootScope.bodyClass = 'bg-image';
          break;
        default:
          $rootScope.bodyClass = '';
          break;
      }
    });
  }])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/Game', {
        templateUrl: 'views/game.html',
        controller: 'GameCtrl'
      })
      .when('/Game-Hunter-1', {
        templateUrl: 'views/game-hunter-1.html',
        controller: 'GameCtrl'
      })
      .when('/Game-Hunter-2', {
        templateUrl: 'views/game-hunter-2.html',
        controller: 'GameCtrl'
      })
      .when('/Results', {
        templateUrl: 'views/results.html',
        controller: 'ResultsCtrl'
      })
      .when('/Results/:index', {
        templateUrl: 'views/playerResults.html',
        controller: 'PlayerResultsCtrl'
      })
      .when('/Overview', {
        templateUrl: 'views/overview.html',
        controller: 'OverviewCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

