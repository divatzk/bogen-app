'use strict';
angular.module('bogenApp')
  .service('GameService',function($http, $location){

    this.getGames = function(){
      return $http.get('/api/games');
    }

    this.addGame = function(data, uid , type){
      var data = { data : data, uid : uid, type : type }
      $http.post('/api/games', data).success(function (data, status, headers, config) {
        console.log('Game added');
        $location.path('/Overview');
      }).error(function (data, status, headers, config) {
        console.log('ERROR: ' + status);
      });
    }
  });
