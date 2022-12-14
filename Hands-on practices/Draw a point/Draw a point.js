var VSHADER_SOURCE =
`void main(){
	gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
	gl_PointSize = 10.0;
}`

var FSHADER_SOURCE =
`void main(){
	gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}`

function main(){
	var canvas = document.getElementById('drawingArea');
	var gl = canvas.getContext('webgl');
	initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.POINTS, 0, 1);
}

function initShaders(gl, vshader_source, fshader_source){
	var program = createProgram(gl, vshader_source, fshader_source);
	gl.useProgram(program);
	gl.program = program;
}

function createProgram(gl, vshader_source, fshader_source){
	var vertexShader = loadShader(gl, gl.VERTEX_SHADER, vshader_source);
	var fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshader_source);
	var program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);
	return program;
}

function loadShader(gl, type, source){
	var shader = gl.createShader(type);
	gl.shaderSource(shader, source);
	gl.compileShader(shader);
	return shader;
}