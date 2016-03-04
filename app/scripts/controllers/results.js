'use strict';
angular.module('bogenApp')
  .controller('ResultsCtrl', function ($scope, $location, localStorageService, PlayerService, GameService) {

    $scope.players = PlayerService.getPlayers();
    $scope.unsortedResults = PlayerService.getResults();
    $scope.results = PlayerService.sortResults($scope.unsortedResults);
    $scope.gameType = PlayerService.getGameType();
    $scope.uid = PlayerService.getUniqueId();

    $scope.back = function(){
      $location.path(PlayerService.getGameType());
    };

    $scope.start = function(){
      $location.path('/');
    };

    $scope.saveResults = function(){
      GameService.addGame($scope.players, $scope.uid, $scope.gameType);
    };

    $scope.details = function(index){
      $location.path('/Results/' + index);
    };

    $scope.getAverageCount = function(result){
      return (result.count/result.targets).toFixed(2);
    }

  });
