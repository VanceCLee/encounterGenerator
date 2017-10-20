angular.module('News', ['ui.router'])
.factory('postFactory', [function(){
  var o = {
    posts: []
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
  'postFactory',
  function($scope, postFactory){
    $scope.posts = postFactory.posts;

    $scope.monsters = [];
    
    $scope.generateEncounter = function() {
     if($scope.formContent === '') {return;}
     var difficultySelected = $scope.formDifficulty;
      var encounterLvl = $scope.formPlayers * $scope.formAvgLvl; 
        var hardnessIntervalBot = 0;
        var hardnessIntervalTop = 0;
        var randomMonster = Math.floor(Math.random() * 300);
        if (true){};

        console.log($scope.formDifficulty);
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