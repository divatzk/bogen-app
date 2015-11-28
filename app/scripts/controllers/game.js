'use strict';
angular.module('bogenApp')
  .controller('GameCtrl', function ($scope, $location, localStorageService, PlayerService, $swipe) {

    //TODO: DOM manipulation + swipe in directive

    $scope.players = (PlayerService.getPlayers());

    if ($scope.players.length == 0){
      $location.path('/');
    }

    $scope.target = $scope.players[0].targets.length;

    var startX = 0;

    $swipe.bind($('table.game'), {
      'start': function(coord){
        startX = coord.x;
        $('table.game').addClass('move');
      },
      'move': function(coord) {
        if (coord.x > startX + 20){
          $('table.game').addClass('left');
        } else if (coord.x < startX - 20) {
          $('table.game').addClass('right');
        }
      },
      'end': function() {
        $('table.game').removeClass('move left right');
      },
      'cancel': function(){
        $('table.game').removeClass('move left right');
      }
    });

      $scope.select = function(count, clicked, arrow){
        if (arrow == 1){
          if ($scope.players[$scope.playerIndex].targets[$scope.target-1].arrow_1 == count && clicked) {
            $scope.players[$scope.playerIndex].targets[$scope.target-1].arrow_1 = 0;
            $scope.selectedIndex = 0;
          } else {
            $scope.selectedIndex = count;
            $scope.players[$scope.playerIndex].targets[$scope.target - 1].arrow_1 = $scope.selectedIndex;
          }

        } else if (arrow == 2) {
          if ($scope.players[$scope.playerIndex].targets[$scope.target-1].arrow_2 == count && clicked) {
            $scope.players[$scope.playerIndex].targets[$scope.target-1].arrow_2 = 0;
            $scope.selectedIndex_2 = 0;
          } else {
            $scope.selectedIndex_2 = count;
            $scope.players[$scope.playerIndex].targets[$scope.target - 1].arrow_2 = $scope.selectedIndex_2;
          }
        } else {
          if ($scope.players[$scope.playerIndex].targets[$scope.target-1].arrow_3 == count && clicked) {
            $scope.players[$scope.playerIndex].targets[$scope.target-1].arrow_3 = 0;
            $scope.selectedIndex_3 = 0;
          } else {
            $scope.selectedIndex_3 = count;
            $scope.players[$scope.playerIndex].targets[$scope.target - 1].arrow_3 = $scope.selectedIndex_3;
          }
        }
    };

    $scope.setActivePlayer = function(){
      $scope.activePlayer = $scope.players[$scope.playerIndex];
      $scope.selectedIndex = $scope.players[$scope.playerIndex].targets[$scope.target-1].arrow_1;
      $scope.selectedIndex_2 = $scope.players[$scope.playerIndex].targets[$scope.target-1].arrow_2;
      $scope.selectedIndex_3 = $scope.players[$scope.playerIndex].targets[$scope.target-1].arrow_3;
      $scope.select($scope.selectedIndex, false, 1);
      $scope.select($scope.selectedIndex_2, false, 2);
      $scope.select($scope.selectedIndex_3, false, 3);
    };

    $scope.setProgress = function(){
      $('.progress').css('width', PlayerService.getProgressStep($scope.target) + '%');
    }

    $scope.init = function(){
      $scope.playerIndex = 0;
      $scope.selectedIndex = 0;
      $scope.selectedIndex_2 = 0;
      $scope.selectedIndex_3 = 0;
      $scope.setActivePlayer();
      //$scope.setProgress();
    };

    $scope.init();

    $scope.nextPlayer = function(){
      if ($scope.playerIndex < $scope.players.length -1){
        $scope.playerIndex = $scope.playerIndex + 1;
      } else {
        $scope.playerIndex = 0;
      }
      $scope.setActivePlayer();
    };

    $scope.prevPlayer = function(){
      if ($scope.playerIndex > 0){
        $scope.playerIndex = $scope.playerIndex - 1;
      } else {
        $scope.playerIndex = $scope.players.length -1;
      }
      $scope.setActivePlayer();
    };

    $scope.$watch('players', function () {
      localStorageService.set('players', $scope.players);
      $scope.setProgress();
    }, true);

    $scope.nextTarget = function(){
      if ($scope.target == $scope.players[0].targets.length) {
        angular.forEach($scope.players, function (player) {
          player.targets.push({arrow_1: 0, arrow_2: 0, arrow_3: 0});
        });
      }
      $scope.target = $scope.target + 1;
      $scope.init();
    };

    $scope.prevTarget = function(){
      $scope.target = $scope.target - 1;
      $scope.init();
    };

    $scope.showResults = function(){
      $location.path('/Results');
    };

  });
