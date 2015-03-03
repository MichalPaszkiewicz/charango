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
		
		$scope.customChord = { 
			strings: [{tuning: "g", value: 0},{tuning: "c", value: 0},{tuning: "e", value: 0},{tuning: "a", value: 0},{tuning: "e", value: 0}],
			label: "Custom chord"
		};
		
		var initialiseCustomChord = function(){
			var searchObjects = $scope.getSearchObjects();
			var chord = searchObjects.chord;
			if(chord == null || chord == undefined){
				return;
			}
			
			var notes = chord.split("+");
			for(var i = 0; i < 5; i++){
				$scope.customChord.strings[i].value=~~notes[i];
			}
			
			$scope.customChord.label = searchObjects.label;
		}
		initialiseCustomChord();
		
		$scope.drawChord = function(id, notes){
			var canvas = document.getElementById(id);
			var ctx = canvas.getContext("2d");
			
			ctx.clearRect(0,0,canvas.width, canvas.height);
			
			ctx.beginPath();
			for(var i = 0; i < 5; i++){
				ctx.moveTo(i*50 + 20,40);
				ctx.lineTo(i*50 + 20,300);
				ctx.moveTo(i*50 + 30,40);
				ctx.lineTo(i*50 + 30,300);
				ctx.stroke();
				
				var yPos = notes[i].value * 40 + 20;
				
				ctx.beginPath();
				ctx.arc(i*50 + 25,yPos,10,0,2*Math.PI);
				ctx.fill();
			}
			
			for(var i = 0; i < 7; i++){
				var yPos = 40 + 40*i;
				ctx.moveTo(20, yPos);
				ctx.lineTo(230, yPos);
				ctx.stroke();
			}
		}
		
		$scope.customChordLink = function(){
			$scope.drawChord("custom-chord", $scope.customChord.strings);
			var linkString = location.host + location.pathname;
			linkString += "?view=custom&chord=";
			for( var string in $scope.customChord.strings){
				linkString += $scope.customChord.strings[string].value + "+";
			}
			
			linkString += "&label=" + $scope.customChord.label;
			
			return linkString;
		}
	});
