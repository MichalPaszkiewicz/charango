var drawCharangoTuning = function(selector){
	var canvas = document.getElementById(selector);
	var renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.CANVAS);
	var ctx = renderer.getContext();
	var stave = new Vex.Flow.Stave(10, 0, 250);
	stave.addClef("treble").setContext(ctx).draw();
	
	var notes = [
		new Vex.Flow.StaveNote({ keys: ["g/4", "g/4"], duration: "q" }),

		new Vex.Flow.StaveNote({ keys: ["c/5", "c/5"], duration: "q" }),

		// A quarter-note rest. Note that the key (b/4) specifies the vertical
		// position of the rest.
		new Vex.Flow.StaveNote({ keys: ["e/5", "e/4"], duration: "q" }),

		new Vex.Flow.StaveNote({ keys: ["a/4", "a/4"], duration: "q" }),
		
		new Vex.Flow.StaveNote({ keys: ["e/5", "e/5"], duration: "q" })
	];
	
	// Create a voice in 4/4
	var voice = new Vex.Flow.Voice({
		num_beats: 5,
		beat_value: 4,
		resolution: Vex.Flow.RESOLUTION
	});
	
	// Add notes to voice
	voice.addTickables(notes);
	
	// Format and justify the notes to 500 pixels
	var formatter = new Vex.Flow.Formatter().
    joinVoices([voice]).format([voice], 200);
	
	// Render voice
	voice.draw(ctx, stave);

}