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
      $scope.monsters.length = 0;
      var encounterLvl = $scope.formPlayers * $scope.formAvgLvl;
      if($scope.formDifficulty == 'Easy') {
          encounterLvl *= 2;
      } else if($scope.formDifficulty == 'Medium') {
          encounterLvl *= 4;
      }else {
          encounterLvl *= 8;
      }
      $scope.hardnessIntervalBot = encounterLvl*.75;
      $scope.hardnessIntervalTop = encounterLvl*1.25;
      $scope.currentHardness = 0;
      getMonsters();
    };

    function getMonsters() {
      var randomMonster = Math.floor(Math.random() * 325);
      var myurl= "http://www.dnd5eapi.co/api/monsters/" + randomMonster ;
      $http({
          method: 'GET',
          url: myurl
      }).then(function successCallBack(response) {
          var stringResponce=JSON.stringify(response);
          var responceObject = JSON.parse(stringResponce);
          console.log(responceObject.data);
          var givenMonster = responceObject.data;
          $scope.randomMonster = responceObject.data.name;
          $scope.pushMonster(givenMonster);
      }, function errorCallback(response) {
          var errorResponce = "The servers are currently down. =(";
          $scope.randomMonster = errorResponce.name;
      });
    }
    
    $scope.difficulties = ["Easy", "Medium", "Hard"];

    $scope.pushMonster = function (givenMonster) {
      console.log("sanity");
      console.log(givenMonster);
      if ((givenMonster.challenge_rating + $scope.currentHardness) < $scope.hardnessIntervalTop) {
        $scope.currentHardness += givenMonster.challenge_rating;
        console.log(givenMonster.challenge_rating);
        console.log($scope.currentHardness);
        $scope.monsters.push({
          name: givenMonster.name,
          quantity: 1,
          strength: givenMonster.strength,
          dexterity: givenMonster.dexterity,
          constitution: givenMonster.constitution,
          intelligence: givenMonster.intelligence,
          wisdom: givenMonster.wisdom,
          charisma: givenMonster.charisma,

          constitutionSave: givenMonster.constitution_save,
          intelligenceSave: givenMonster.intelligence_save,
          wisdomSave: givenMonster.wisdom_save,

          size: givenMonster.size,
          type: givenMonster.type,
          subtype: givenMonster.subtype,
          alignment: givenMonster.alignment,

          armor: givenMonster.armor,
          hitPoints: givenMonster.hit_points,

          senses: givenMonster.senses,
          languages: givenMonster.languages,

          specialAbilities: givenMonster.special_abilities,
          actions: givenMonster.actions,
          legendaryActions: givenMonster.legendary_actions
        });
      }
      if ($scope.currentHardness < $scope.hardnessIntervalBot) {
        getMonsters();
      }
    };
}])
  .controller('MonsterCtrl', [
    '$scope',
    '$stateParams',
    'monsterFactory',
    function($scope, $stateParams, monsterFactory){
      $scope.monster = monsterFactory.monsters[$stateParams.id];
  }]);