var charangoModule = angular.module('app', []).
	controller("pageControl", function pageControl($scope){

		$scope.link = location.href;
	
		$scope.go = function(view){
			$scope.view = view;
			$scope.burger = false;
			var newSearch = "?" + 'view=' + view;
			window.history.pushState(null, null, newSearch);
			$scope.link = location.href;
		}
		
		$scope.getSearchObjects = function(){
			var search = location.search;
			if( search  == null || search == ""){
				return {view:"home"};
			}
			
			var searches = search.substring(1).split("&");
			
			var searchObjects = [];
			
			for(var i in searches){
				var splits = searches[i].split("=");
				var key = splits[0];
				var value = splits[1];
				searchObjects[key] = value;
			}	
			
			return searchObjects;
		}
		
		$scope.view = $scope.getSearchObjects().view;
	});
