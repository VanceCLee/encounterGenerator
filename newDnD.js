angular.module('News', ['ui.router'])
.factory('monsterFactory',[function(){
  var o = {
    monsters: []
  };
  return o;
}])
.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '/home.html',
        controller: 'MainCtrl'
      })
      .state('monster', {
        url: '/monster/{id}',
        templateUrl: '/monster.html',
        controller: 'MonsterCtrl'
      });
    $urlRouterProvider.otherwise('home');
}])
  .controller('MainCtrl', [
  '$scope',
  '$http',
  'monsterFactory',
  function($scope, $http, monsterFactory){
    $scope.monsters = monsterFactory.monsters;
    
    $scope.generateEncounter = function() {
         var encounterLvl = $scope.formPlayers * $scope.formAvgLvl;
              var hardnessIntervalBot = 0;
              var hardnessIntervalTop = 0;
              var randomMonster = Math.floor(Math.random() * 325);
              var myurl= "http://www.dnd5eapi.co/api/monsters/" + randomMonster ;
              $http({
            method: 'GET',
            url: myurl
          }).then(function successCallBack(response) {
            var stringResponce=JSON.stringify(response);
            var responceObject = JSON.parse(stringResponce);
            console.log(responceObject.data);
            $scope.thing = responceObject.data;
            $scope.randomMonster = responceObject.data.name;
            $scope.addMonster();
          }, function errorCallback(response) {
            var errorResponce = "The servers are currently down. =(";
            $scope.randomMonster = errorResponce.name;
          });
        };
    
    $scope.difficulties = ["Easy", "Medium", "Hard"];

    $scope.addMonster = function(){
      $scope.monsters.push({
        name: $scope.thing.name,
        quantity: 1,
        strength: $scope.thing.strength,
        dexterity: $scope.thing.dexterity,
        constitution: $scope.thing.constitution,
        intelligence: $scope.thing.intelligence,
        wisdom: $scope.thing.wisdom,
        charisma: $scope.thing.charisma,

        constitutionSave: $scope.thing.constitution_save,
        intelligenceSave: $scope.thing.intelligence_save,
        wisdomSave: $scope.thing.wisdom_save,
      });
    };

  }])
  .controller('MonsterCtrl', [
    '$scope',
    '$stateParams',
    'monsterFactory',
    function($scope, $stateParams, monsterFactory){
      $scope.monster = monsterFactory.monsters[$stateParams.id];
  }]);