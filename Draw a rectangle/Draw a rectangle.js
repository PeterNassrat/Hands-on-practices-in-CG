var VSHADER_SOURCE =`
attribute vec4 a_Position;
void main(){
    gl_Position = a_Position;
}
`
var FSHADER_SOURCE =`
void main(){
    gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
}
`
function main(){
    var canvas = document.getElementById('drawingArea');
    var gl = canvas.getContext('webgl');
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
    var n = initVertexBuffers(gl);
    gl.clearColor(0.0, 0.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
}
function initVertexBuffers(gl){
    var vertices = new Float32Array([-0.5, 0.5, 0.5, 0.5, -0.5, -0.5, 0.5, -0.5]);
    var n = 4;
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);
    return n;
}