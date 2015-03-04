var logs = [];

var charangoModule = angular.module('app', []).
	controller("pageControl", function pageControl($scope, $timeout){

		$scope.link = location.href;
	
		$scope.go = function(view){
			$scope.view = view;
			$scope.burger = false;
			var newSearch = "?" + 'view=' + view;
			window.history.pushState(null, null, newSearch);
			$scope.link = location.href;
			
			if(view=="chords"){
				$scope.drawAllChords();
			}
		}
		
		$scope.searchNote = "";
		
		$scope.searchType = "";
		
		$scope.getSearchText = function(){
			return $scope.searchNote + $scope.searchType;
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
				if(notes[i].value == 0){
					ctx.stroke();
				}
				else{
					ctx.fill();
				}
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
		
		$scope.chords = [
			{name:"A", notes:[2,1,0,0,0]},
			{name:"Am", notes:[2,0,0,0,0]},
			{name:"A#/Bb", notes:[3,2,1,1,1]},
			{name:"A#m/Bbm", notes:[3,1,1,1,1]},
			{name:"B", notes:[4,3,2,2,2]},
			{name:"Bm", notes:[4,2,2,2,2]},
			{name:"C", notes:[0,0,0,3,0]},
			{name:"Cm", notes:[0,3,3,3,3]},
			{name:"C#/Db", notes:[1,1,1,4,1]},
			{name:"C#m/Dbm", notes:[1,4,4,4,4]},
			{name:"D", notes:[2,2,2,5,2]},
			{name:"Dm", notes:[2,5,5,5,5]},
			{name:"D#/Eb", notes:[3,3,3,6,3]},
			{name:"D#m/Ebm", notes:[3,6,6,6,6]},
			{name:"E", notes:[1,4,0,2,0]},
			{name:"Em", notes:[0,4,3,2,0]},
			{name:"F", notes:[2,0,1,0,1]},
			{name:"Fm", notes:[1,5,4,3,1],
			{name:"F#/Gb", notes:[3,1,2,1,2]},
			{name:"F#m/Gbm", notes:[2,1,2,0,2]},
			{name:"G", notes:[0,2,3,2,3]},
			{name:"Gm", notes:[0,2,3,1,3]},
			{name:"G#/Ab", notes:[1,3,4,3,4]},
			{name:"G#m/Abm", notes:[1,3,4,2,4]}
		];
		
		$scope.drawAllChords = function(){
			try{
				for(var i in $scope.chords){
					var notes = [];
					for(var j in $scope.chords[i].notes){
						notes.push({value: $scope.chords[i].notes[j]});
					}
				
					$scope.drawChord($scope.chords[i].name, notes)
				}
			}
			catch(e)
			{
				logs.push(e);
			}
		}
		
		$scope.waitDrawAll = function(){
			$timeout(function(){$scope.go("chords")}, 100);
		}
		
		if($scope.view=="chords"){
			$scope.waitDrawAll();
		}
	});
