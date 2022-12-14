var VSHADER_SOURCE =`
attribute vec4 a_Position;
void main(){
    gl_Position = a_Position;
}
`
var FSHADER_SOURCE =`
void main(){
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}
`
function main(){
    var canvas = document.getElementById('drawingArea');
    var gl = canvas.getContext('webgl');
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
    initVertexBuffers(gl);
    gl.clearColor(0.76, 0.54, 0.51, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.drawArrays(gl.TRIANGLE_STRIP, 3, 5);
    gl.drawArrays(gl.TRIANGLE_STRIP, 8, 5);
}
function initShaders(gl, vshader, fshader){
    var program = createProgram(gl, vshader, fshader);
    gl.useProgram(program);
    gl.program = program;
}
function createProgram(gl, vshader, fshader){
    var vertexShader = loadShader(gl, gl.VERTEX_SHADER, vshader);
    var fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshader);
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
function initVertexBuffers(gl){
    var vertices = new Float32Array([
    -0.25, 0.25, -0.75, 0.25, -0.5, 0.75,
    0.25, 0.25, 0.75, 0.25, 0.25, 0.5, 0.75, 0.5, 0.5, 0.75,
    -0.3, -0.75, -0.2, -0.25, 0.0, -0.75, 0.2, -0.25, 0.3, -0.75]);
    console.log(vertices.length);
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);
}