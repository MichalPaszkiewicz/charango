var createVex = function(selector){
	var canvas = document.getElementById(selector);
	var renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.CANVAS);
	var ctx = renderer.getContext();
	var stave = new Vex.Flow.Stave(10, 0, 650);
	stave.addClef("treble").setContext(ctx).draw();
}
