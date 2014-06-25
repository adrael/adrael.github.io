var GLOBAL_CONSTANT_ID = 0;
var GLOBAL_DRAW_UMBILICAL = true;
var GLOBAL_DRAW_PATHS = true;
var world = null;
var DEBUG = false;

function debug (msg, important) {
	if(DEBUG || important) {
		var caller_line = (new Error).stack.split("\n")[2];
		var index = caller_line.indexOf("at ");
		var clean = caller_line.slice(index+2, caller_line.length);

		var lineNumberIndex = clean.indexOf('.js:');
		var lineNumberClean = clean.slice(lineNumberIndex, clean.length);
		var lineNumber = lineNumberClean.split(':')[1];

		var fileName = clean.split('/');
		fileName = fileName[fileName.length - 1].split(':')[0];
		
		console.log(fileName, 'at line', lineNumber, ':', msg);
	}
}