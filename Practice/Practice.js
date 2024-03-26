var vshader_source = `
attribute vec4 a_Position;
attribute vec4 a_Color;
uniform mat4 u_modelMatrix;
varying vec4 v_Color;
void main(){
    gl_Position = u_modelMatrix * a_Position;
    v_Color = a_Color;
}
`
var fshader_source =`
precision mediump float;
varying vec4 v_Color;
void main(){
    gl_FragColor = v_Color;
}
`
var ANGLE_SEC = 45.0;
function main(){
    var canvas = document.getElementById('drawingArea');
    var gl = canvas.getContext('webgl');
    console.log(initShaders(gl, vshader_source, fshader_source));
    var n = initVertexBuffer(gl);
    var currentAngle = 0.0;
    var tick = function(){
        currentAngle = getCAngle(currentAngle);
        drawTriangle(gl, currentAngle, n);
        requestAnimationFrame(tick, canvas);
    }
    tick();
}
function initVertexBuffer(gl){
    var vertices = new Float32Array([
         0.0, 0.5, 1.0, 0.0, 0.0,
        -0.5, -0.5, 0.0, 1.0, 0.0,
         0.5, -0.5, 0.0, 0.0, 1.0
    ]);
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
    var FSIZE = vertices.BYTES_PER_ELEMENT;
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 5 *FSIZE, 0);
    gl.enableVertexAttribArray(a_Position);
    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, 5 * FSIZE, 2 * FSIZE);
    gl.enableVertexAttribArray(a_Color);
    //gl.bindBuffer(gl.ARRAY_BUFFER, null);
    var n = vertices.length / 5.0;
    return n;
}
var gl_last = Date.now();
function getCAngle(angle){
    var now = Date.now();
    var elapsed = gl_last - now;
    gl_last = now;
    var currentAngle = (angle + ANGLE_SEC * elapsed / 1000.0) % 360;
    return currentAngle;
}
function drawTriangle(gl, currentAngle, n){
    var modelMatrix = new Matrix4();
    modelMatrix.rotate(currentAngle, 0, 0, 1);
    var u_modelMatrix = gl.getUniformLocation(gl.program, 'u_modelMatrix');
    gl.uniformMatrix4fv(u_modelMatrix, false, modelMatrix.elements);
    gl.drawArrays(gl.TRIANGLES, 0, n);
}