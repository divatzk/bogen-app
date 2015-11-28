'use strict';
angular.module('bogenApp')
  .controller('MainCtrl', function ($scope, $location, localStorageService, PlayerService, $rootScope) {

    $scope.players = PlayerService.getPlayers() || [];
    $scope.gameType = PlayerService.getGameType();
    $scope.startText = 'Spiel starten';

    $scope.$watch('players', function () {
      localStorageService.set('players', $scope.players);
    }, true);

    $scope.$watch('gameType', function () {
      localStorageService.set('gameType', $scope.gameType);
    }, true);


    $scope.addPlayer = function () {
      $scope.players.push(PlayerService.createPlayer($scope.player));
      $scope.player = '';
    };

    $scope.getPlayer = function(index){
      return PlayerService.getPlayers()[index];
    };

    $scope.getPlayerName = function(index){
      return this.getPlayer(index).name;
    };

    $scope.removePlayer = function(player){
      $scope.players.splice($.inArray(player, $scope.players), 1);
    };

    $scope.newGame = function(){
      localStorageService.set('uniqueId', null);
      $scope.players = [];
    };

    $scope.hasPlayers = function(){
      return $scope.players.length > 0 && $scope.gameType != null;
    };

    $scope.startGame = function(){
      if (PlayerService.getUniqueId() == null){
        localStorageService.set('uniqueId', PlayerService.generateUniqueId());
      }
      $location.path($scope.gameType);
    };

    $scope.toOverview = function(){
      $location.path('/Overview');
    }

    $scope.showAddForm = function(){
      if (PlayerService.isActiveGame()){
        $scope.startText = 'Spiel fortsetzen';
        return false;
      }
      $scope.startText = 'Spiel starten';
      return true;
    };

  });
