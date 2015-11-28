'use strict';
angular.module('bogenApp')
  .controller('OverviewCtrl', function ($scope, PlayerService, GameService, $location) {

    $scope.players = PlayerService.getPlayers();
    $scope.results = PlayerService.sortResults(PlayerService.getResults());

    $scope.back = function(){
      $location.path('/');
    };


    GameService.getGames().success(function(data){
      $scope.games = data.game;
    }).error(function(){
      alert('Es ist ein Fehler aufgetreten');
    });


    $scope.formateDate = function(date){
      return new Date(date).toLocaleDateString();
    };

    $scope.sum = function(data){
      var sum = 0;
      data.forEach(function(arrows){
        for (var val in arrows){
          sum = sum + parseInt(arrows[val]);
        }
      });
      return sum;
    };

  });
