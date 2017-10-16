angular.module('DnD', [])
    .controller('MainCtrl', [
    '$scope',
    function($scope){
    	$scope.monsters = [];

      	$scope.generateEncounter = function() {
      		var encounterLvl = $scope.formPlayers * $scope.formAvgLvl;
      		var hardnessIntervalBot = 0;
      		var hardnessIntervalTop = 0;
      		if (true){};

      	};

      	$scope.difficulties = ["Easy", "Medium", "Hard"];


      $scope.test = 'Hello world!';
      $scope.posts = [
	    'Post 1',
	    'Post 2',
	    'Post 3',
	    'Post 4',
	    'Post 5'
	  ];



	  $scope.posts = [
	    {title:'Post 1', upvotes:5},
	    {title:'Post 2', upvotes:6},
	    {title:'Post 3', upvotes:1},
	    {title:'Post 4', upvotes:4},
	    {title:'Post 5', upvotes:3}
	  ];
	  $scope.addPost = function() {
	    $scope.posts.push({title:$scope.formContent,upvotes:0});
	    $scope.formContent='';
	  };
	  $scope.incrementUpvotes = function(post) {
	    post.upvotes += 1;
	  };
    }
 	]);