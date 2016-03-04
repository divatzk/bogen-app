'use strict';
angular.module('bogenApp')
  .service('PlayerService',function(localStorageService){

    this.getGameType = function(){
      return localStorageService.get('gameType');
    }

    this.getUniqueId = function(){
      return localStorageService.get('uniqueId');
    }

    this.getPlayers = function(){
      return localStorageService.get('players');
    }

    this.createPlayer = function (name) {
      var player = {
        name: name,
        targets: [{ arrow_1: 0, arrow_2: 0, arrow_3: 0 }]
      };
      return player;
    }

    this.getPlayerResult = function(player){
      return getPlayerResult(player);
    }

    function getPlayerResult(player){
      var count = 0;
      angular.forEach(player.targets, function (counts) {
        count = count + counts.arrow_1 + counts.arrow_2 + counts.arrow_3;
      });
      return count;
    }

    function getEmptyTargets(player){
      var count = 0;
      angular.forEach(player.targets, function (target) {
        if (target.arrow_1 == 0 && target.arrow_2 == 0 && target.arrow_3 == 0){
          count = count +1;
        }
      });
      return count;
    }

    this.getResults = function(){
      var tmp = [];
      var index = 0;
      angular.forEach(this.getPlayers(), function (player) {
        tmp.push({'name': player.name, 'count': getPlayerResult(player), 'nuller': getEmptyTargets(player), 'targets': player.targets.length, 'index' : index});
        index++;
      });
      return tmp;
    };

    this.sortResults = function(tmp){
      return tmp.sort(function(a, b){
        //return a.count < b.count;
        return b.count - a.count;
      });
    };

    this.isActiveGame = function(){
      if (this.getPlayers().length == 0){
        return false;
      }
      var count = 0;
      angular.forEach(this.getPlayers(), function (player) {
        count = count + getPlayerResult(player);
      });
      return count > 0;
    }

    this.getProgressStep = function(target){
      var players = this.getPlayers();
      var count = 0;
      angular.forEach(players, function (player) {
        if (player.targets[target-1].arrow_1 +  player.targets[target-1].arrow_2 + player.targets[target-1].arrow_3 > 0){
          count = count +1;
        }
      });
      return count == 0 ? 0 : count/players.length*100;
    }

    this.getPlayerChartData = function(player){
      var tmp = {}
      var labels = [];
      var data = [];
      var count = 0;
      angular.forEach(player.targets, function(target){
        count = count + 1;
        labels.push(count);
        data.push(target.arrow_1 + target.arrow_2 + target.arrow_3);
      });
      tmp.data = data;
      tmp.labels = labels;
      return tmp;
    }

    this.generateUniqueId = function() {
      return Math.random().toString(36).slice(-15);
    }

  });
