var Chord = function(tuning){
	this.tuning = [];
	
}

var GuitarChord = function(){
	
}
GuitarChord.prototype = new Chord(["e","a","d","g","b","e"]);

var CharangoChord = function(){
	
}
CharangoChord.prototype = new Chord(["g","c","e","a","e"]);
