'use strict';
angular.module('bogenApp')
  .controller('PlayerResultsCtrl', function ($scope, $location, localStorageService, PlayerService, $routeParams) {

    $scope.players = PlayerService.getPlayers();
    $scope.results = PlayerService.sortResults(PlayerService.getResults());

    $scope.player = $scope.players[$routeParams.index];

    $scope.result = PlayerService.getPlayerResult($scope.player);

    $scope.backResults = function(){
      $location.path('/Results');
    };

    $scope.prev = function(){
      var index = $routeParams.index == 0 ? $scope.players.length - 1 : parseInt($routeParams.index) - 1;
      $location.path('/Results/' + index);
    };

    $scope.next = function(){
      var index = $routeParams.index == $scope.players.length - 1 ? 0 : parseInt($routeParams.index) + 1;
      $location.path('/Results/' + index);
    }

    var chartData = PlayerService.getPlayerChartData($scope.player);
    $scope.options = {bezierCurve : false, responsive: true, showTooltips: false, scaleOverride : true,
      scaleSteps : 1,
      //scaleStepWidth : Math.max.apply(null, chartData.data),
      scaleStepWidth : 22,
      scaleStartValue : 0 }
    $scope.labels = chartData.labels;
    $scope.data = [];
    $scope.data.push(chartData.data);

  });
