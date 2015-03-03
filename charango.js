var charangoModule = angular.module('app', []).
	controller("pageControl", function pageControl($scope){
		$scope.view = "home";
	
		$scope.go = function(view){
			$scope.view = view;
			$scope.burger = false;
		}
	});
