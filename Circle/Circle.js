var VSHADER_SOURCE =`
attribute vec4 a_Position;
attribute vec4 a_Color;
uniform mat4 u_modelMatrix;
varying vec4 v_Color;
void main(){
    gl_Position = u_modelMatrix * a_Position;
    v_Color = a_Color;
}
`;
var FSHADER_SOURCE=`
precision mediump float;
varying vec4 v_Color;
void main(){
   gl_FragColor = v_Color; 
}
`;
var ANGLE_SEC = 45.0;
function main(){
    var canvas = document.getElementById('drawingArea');
    var gl = canvas.getContext('webgl');
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
    var n = initVertexBuffer(gl);
    currentAngle = 0.0;
    var tick = function(){
        currentAngle = getCAngle(currentAngle);
        draw(gl, currentAngle, n);
        requestAnimationFrame(tick);
    }
    tick();
}
function initVertexBuffer(gl){
    var vertices = [];
    var colors = [[1.0, 0.0, 0.0], [0.0, 1.0, 0.0], [0.0, 0.0, 1.0]];
    for(var angle = 0; angle < 360; angle++){
        var xy1 = getCoord(angle);
        var xy2 = getCoord(angle+1);
        var color = colors[Math.round(angle / 30) % 3];
        vertices.push(0.0, 0.0, color[0], color[1], color[2]);
        vertices.push(xy1[0], xy1[1], color[0], color[1], color[2]);
        vertices.push(xy2[0], xy2[1], color[0], color[1], color[2]);
    }
    var bVertices = new Float32Array(vertices);
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, bVertices, gl.STATIC_DRAW);
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 5 * 4, 0);
    gl.enableVertexAttribArray(a_Position);
    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, 5 * 4, 2 * 4);
    gl.enableVertexAttribArray(a_Color); 
    return bVertices.length / 5.0;
}
function getCoord(angle){
    var radian = Math.PI * angle / 180.0;
    var x = 1.0 * Math.cos(radian);
    var y = 1.0 * Math.sin(radian);
    var xy = [x, y];
    return xy;
}
function draw(gl, currentAngle, n){
    var modleMatrix = new Matrix4();
    modleMatrix.setRotate(currentAngle, 0, 0, 1);
    modleMatrix.translate(0.5, 0.5, 0.0);
    modleMatrix.scale(0.25, 0.25, 0.25);
    modleMatrix.rotate(currentAngle, 0, 0, 1);
    gl.clearColor(0.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    var u_modelMatrix = gl.getUniformLocation(gl.program, 'u_modelMatrix');
    gl.uniformMatrix4fv(u_modelMatrix, false, modleMatrix.elements);
    for(var i = 0; i < n; i+=3){
        gl.drawArrays(gl.TRIANGLES, i, 3);
    }
}
var lastT = Date.now();
function getCAngle(angle){
    var elapsed = Date.now() - lastT;
    lastT = Date.now();
    var currentAngle = (angle + ANGLE_SEC * elapsed / 1000.0) % 360;
    return currentAngle;
}