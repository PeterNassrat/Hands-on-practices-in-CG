var VSHADER_SOURCE =`
attribute vec4 a_Position;
uniform vec2 u_sinBcosB;
void main(){
    gl_Position.x = a_Position.x * u_sinBcosB.y - a_Position.y * u_sinBcosB.x;
    gl_Position.y = a_Position.y * u_sinBcosB.y - a_Position.x * u_sinBcosB.x;
    gl_Position.z = a_Position.z;
    gl_Position.w = a_Position.w;
    gl_PointSize = 10.0;
}
`
var FSHADER_SOURCE =`
precision mediump float;
uniform vec4 u_FragColor;
void main(){
    gl_FragColor = u_FragColor;
}
`
var ANGLE = 90;
function main(){
    var canvas = document.getElementById('drawingArea');
    var gl = canvas.getContext('webgl');
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
    initVertexBuffers(gl);
    var u_sinBcosB = gl.getUniformLocation(gl.program, 'u_sinBcosB');
    var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    var radian = Math.PI * ANGLE / 180.0;
    var sin_cos = [];
    sin_cos.push(Math.sin(radian));
    sin_cos.push(Math.cos(radian));
    console.log(sin_cos[0]);
    console.log(sin_cos[1]);
    gl.uniform2f(u_sinBcosB, sin_cos[0], sin_cos[1]);
    gl.uniform4f(u_FragColor, 0.8, 0.9, 1.0, 1.0);
    gl.clearColor(0.3, 0.5, 0.7, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
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
    var vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);
}