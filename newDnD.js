angular.module('News', ['ui.router'])
.factory('postFactory', [function(){
  var o = {
    posts: []
  };
  return o;
}])
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
      .state('posts', {
        url: '/posts/{id}',
        templateUrl: '/posts.html',
        controller: 'PostCtrl'
      });
    $urlRouterProvider.otherwise('home');
}])
  .controller('MainCtrl', [
  '$scope',
  '$http',
  'postFactory',
  'monsterFactory',
  function($scope, $http, postFactory, monsterFactory){
    $scope.posts = postFactory.posts;
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

    $scope.addPost = function(){
      if($scope.formContent === '') { return; }
      $scope.posts.push({
        title: $scope.formContent,
        upvotes: 0,
        comments: []
      });
      $scope.title = '';
    };

    $scope.addMonster = function(){
      console.log("win?");
      $scope.monsters.push({
        name: $scope.thing.name,
        quantity: 1,
        comments: []
      });
      $scope.title = '';
    };

    $scope.incrementUpvotes = function(post) {
      post.upvotes += 1;
    };
  }
  ])
  .controller('PostCtrl', [
    '$scope',
    '$stateParams',
    'postFactory', 
    function($scope, $stateParams, postFactory){
      $scope.post = postFactory.posts[$stateParams.id];
      $scope.addComment = function(){
        if($scope.body === '') { return; }
        $scope.post.comments.push({
          body: $scope.body,
          upvotes: 0
        });
        $scope.body = '';
      };
    $scope.incrementUpvotes = function(comment){
      comment.upvotes += 1; 
    };
  }]);