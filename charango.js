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
			
			if(canvas == null){
				return;
			}
			
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
			
			linkString += "&label=" + $scope.customChord.label.replace(/ /g,"_");
			
			return linkString;
		}
		
		$scope.chords = [
			{"name":"A","notes":[2,1,0,0,0]},
			{"name":"B","notes":[4,3,2,2,2]},
			{"name":"C","notes":[0,0,0,3,0]},
			{"name":"D","notes":[2,2,2,5,2]},
			{"name":"E","notes":[1,4,0,2,0]},
			{"name":"F","notes":[2,0,1,0,1]},
			{"name":"G","notes":[0,2,3,2,3]},
			{"name":"Am","notes":[2,0,0,0,0]},
			{"name":"Bm","notes":[4,2,2,2,2]},
			{"name":"Cm","notes":[0,3,3,3,3]},
			{"name":"Dm","notes":[2,5,5,5,5]},
			{"name":"Em","notes":[0,4,3,2,0]},
			{"name":"Fm","notes":[1,5,4,3,1]},
			{"name":"Gm","notes":[0,2,3,1,3]},
			{"name":"A7","notes":[0,1,0,0,0]},
			{"name":"B7","notes":[2,3,2,2,2]},
			{"name":"C7","notes":[0,0,0,1,0]},
			{"name":"D7","notes":[2,2,2,3,2]},
			{"name":"E7","notes":[1,2,0,2,0]},
			{"name":"F7","notes":[2,3,1,0,1]},
			{"name":"G7","notes":[0,2,3,2,1]},
			{"name":"Am7","notes":[0,0,0,0,0]},
			{"name":"Bm7","notes":[2,2,2,2,2]},
			{"name":"Cm7","notes":[0,3,3,1,3]},
			{"name":"Dm7","notes":[5,5,5,5,5]},
			{"name":"Em7","notes":[0,2,3,2,0]},
			{"name":"Fm7","notes":[1,3,4,3,1]},
			{"name":"Gm7","notes":[0,2,3,1,1]},
			{"name":"Amaj7","notes":[1,1,0,0,0]},
			{"name":"Bmaj7","notes":[3,3,2,2,2]},
			{"name":"Cmaj7","notes":[0,0,0,2,0]},
			{"name":"Dmaj7","notes":[2,2,2,4,2]},
			{"name":"Emaj7","notes":[1,3,0,2,0]},
			{"name":"Fmaj7","notes":[2,0,1,0,0]},
			{"name":"Gmaj7","notes":[0,2,3,2,2]},
			{"name":"Asus4","notes":[2,2,0,0,0]},
			{"name":"Bsus4","notes":[4,4,2,2,2]},
			{"name":"Csus4","notes":[0,0,0,3,1]},
			{"name":"Dsus4","notes":[0,2,2,5,2]},
			{"name":"Esus4","notes":[4,4,4,0,0]},
			{"name":"Fsus4","notes":[2,0,1,1,1]},
			{"name":"Gsus4","notes":[0,3,3,2,3]},
			{"name":"Asus2","notes":[4,4,0,0,0]},
			{"name":"Bsus2","notes":[6,6,2,2,2]},
			{"name":"Csus2","notes":[0,2,3,3,3]},
			{"name":"Dsus2","notes":[2,4,5,5,0]},
			{"name":"Esus2","notes":[4,4,0,2,2]},
			{"name":"Fsus2","notes":[2,0,1,3,3]},
			{"name":"Gsus2","notes":[0,2,3,0,3]},
			{"name":"A9","notes":[0,1,5,2,0]},
			{"name":"B9","notes":[2,3,2,4,2]},
			{"name":"C9","notes":[0,2,0,1,0]},
			{"name":"D9","notes":[2,4,2,3,2]},
			{"name":"E9","notes":[1,2,0,2,2]},
			{"name":"F9","notes":[2,3,1,0,3]},
			{"name":"G9","notes":[0,2,5,2,1]},
			{"name":"Aadd9","notes":[2,1,0,2,0]},
			{"name":"Badd9","notes":[4,3,2,4,2]},
			{"name":"Cadd9","notes":[0,2,0,3,0]},
			{"name":"Dadd9","notes":[2,4,2,5,2]},
			{"name":"Eadd9","notes":[1,4,0,2,2]},
			{"name":"Fadd9","notes":[0,0,1,0,1]},
			{"name":"Gadd9","notes":[0,2,3,0,3]},
			{"name":"Amadd9","notes":[4,0,0,0,0]},
			{"name":"Bmadd9","notes":[4,2,2,4,2]},
			{"name":"Cmadd9","notes":[5,3,3,5,3]},
			{"name":"Dmadd9","notes":[2,5,5,5,0]},
			{"name":"Emadd9","notes":[0,4,3,2,2]},
			{"name":"Fmadd9","notes":[0,5,4,3,1]},
			{"name":"Gmadd9","notes":[0,2,3,0,6]},
			{"name":"A#/Bb","notes":[3,2,1,1,1]},
			{"name":"C#/Db","notes":[1,1,1,4,1]},
			{"name":"D#/Eb","notes":[3,3,3,6,3]},
			{"name":"F#/Gb","notes":[3,1,2,1,2]},
			{"name":"G#/Ab","notes":[1,3,4,3,4]},
			{"name":"A#m/Bbm","notes":[3,1,1,1,1]},
			{"name":"C#m/Dbm","notes":[1,4,4,4,4]},
			{"name":"D#m/Ebm","notes":[3,6,6,6,6]},
			{"name":"F#m/Gbm","notes":[2,1,2,0,2]},
			{"name":"G#m/Abm","notes":[1,3,4,2,4]},
			{"name":"A#7/Bb7","notes":[1,2,1,1,1]},
			{"name":"C#7/Db7","notes":[1,1,1,2,1]},
			{"name":"D#7/Eb7","notes":[3,3,3,4,3]},
			{"name":"F#7/Gb7","notes":[3,1,2,1,0]},
			{"name":"G#7/Ab7","notes":[5,3,4,3,4]},
			{"name":"A#m7/Bbm7","notes":[1,1,1,1,1]},
			{"name":"C#m7/Dbm7","notes":[4,4,4,4,4]},
			{"name":"D#m7/Ebm7","notes":[6,6,6,6,6]},
			{"name":"F#m7/Gbm7","notes":[2,1,2,0,0]},
			{"name":"G#m7/Abm7","notes":[4,3,4,2,2]},
			{"name":"A#maj7/Bbmaj7","notes":[2,2,1,1,1]},
			{"name":"C#maj7/Dbmaj7","notes":[1,1,1,3,1]},
			{"name":"D#maj7/Ebmaj7","notes":[3,3,3,5,3]},
			{"name":"F#maj7/Gbmaj7","notes":[3,1,2,1,1]},
			{"name":"G#maj7/Abmaj7","notes":[0,3,4,3,4]},
			{"name":"A#sus4/Bbsus4","notes":[3,3,1,1,1]},
			{"name":"C#sus4/Dbsus4","notes":[1,1,1,4,2]},
			{"name":"D#sus4/Ebsus4","notes":[3,3,3,6,4]},
			{"name":"F#sus4/Gbsus4","notes":[3,1,2,2,2]},
			{"name":"G#sus4/Absus4","notes":[1,3,4,3,0]},
			{"name":"A#sus2/Bbsus2","notes":[5,5,1,1,1]},
			{"name":"C#sus2/Dbsus2","notes":[1,3,4,4,4]},
			{"name":"D#sus2/Ebsus2","notes":[3,5,6,6,6]},
			{"name":"F#sus2/Gbsus2","notes":[3,1,2,4,4]},
			{"name":"G#sus2/Absus2","notes":[1,3,4,1,4]},
			{"name":"A#9/Bb9","notes":[1,2,1,3,1]},
			{"name":"C#9/Db9","notes":[1,3,1,2,1]},
			{"name":"D#9/Eb9","notes":[0,1,1,1,1]},
			{"name":"F#9/Gb9","notes":[1,1,0,1,0]},
			{"name":"G#9/Ab9","notes":[2,2,1,2,1]},
			{"name":"A#add9/Bbadd9","notes":[3,2,1,3,1]},
			{"name":"C#add9/Dbadd9","notes":[1,3,1,4,1]},
			{"name":"D#add9/Ebadd9","notes":[3,5,3,6,3]},
			{"name":"F#add9/Gbadd9","notes":[1,1,2,1,2]},
			{"name":"G#add9/Abadd9","notes":[1,3,4,1,4]},
			{"name":"A#madd9/Bbmadd9","notes":[3,1,1,3,1]},
			{"name":"C#madd9/Dbmadd9","notes":[6,4,4,6,4]},
			{"name":"D#madd9/Ebmadd9","notes":[3,3,2,1,1]},
			{"name":"F#madd9/Gbmadd9","notes":[1,1,2,0,2]},
			{"name":"G#madd9/Abmadd9","notes":[1,3,4,1,6]}
		]
		
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
