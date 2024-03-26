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
    alert("Please Click on the face");
    var skin_colors = [[0.76, 0.54, 0.51, 1.0], [0.92, 0.73, 0.7, 1.0], [0.81, 0.63, 0.64, 1.0], [0.62, 0.39, 0.36, 1.0],
    [0.31, 0.19, 0.2, 1.0], [0.34, 0.18, 0.16, 1.0]];
    var canvas = document.getElementById('drawingArea');
    var gl = canvas.getContext('webgl');
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
    initVertexBuffers(gl);
    var cnt = 1;
    canvas.onmousedown = function(ev){
        click(ev, gl, skin_colors, cnt);
        cnt++;
        cnt%=6;
    }
    gl.clearColor(0.76, 0.54, 0.51, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.drawArrays(gl.TRIANGLE_STRIP, 3, 5);
    gl.drawArrays(gl.TRIANGLE_STRIP, 8, 4);
    gl.drawArrays(gl.TRIANGLE_STRIP, 12, 4);
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
    -0.2, -0.25, -0.25, -0.45, 0.25, -0.45, 0.2, -0.25,
    -0.3, -0.7, -0.25, -0.5, 0.3, -0.7, 0.25, -0.5]);
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);
}
function click(ev, gl, skin_colors, cnt){
    var rgba = skin_colors[cnt];
    gl.clearColor(rgba[0], rgba[1], rgba[2], rgba[3]);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.drawArrays(gl.TRIANGLE_STRIP, 3, 5);
    gl.drawArrays(gl.TRIANGLE_STRIP, 8, 4);
    gl.drawArrays(gl.TRIANGLE_STRIP, 12, 4);
}