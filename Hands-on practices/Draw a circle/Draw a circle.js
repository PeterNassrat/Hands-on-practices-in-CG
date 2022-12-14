var VSHADER_SOURCE =`
attribute vec4 a_Position;
void main(){
    gl_Position = a_Position;
}
`
var FSHADER_SOURCE =`
precision mediump float;
uniform vec4 u_FragColor;
void main(){
    gl_FragColor = u_FragColor;
}
`
var colors = [[1.0, 0.0, 0.0, 1.0], [1.0, 0.5, 0.0, 1.0], [1.0, 1.0, 0.0, 1.0], [0.0, 1.0, 0.0, 1.0],
[0.0, 1.0, 1.0, 1.0], [0.0, 0.0, 1.0, 1.0], [0.5, 0.0, 1.0, 1.0]];
function main(){
    var canvas = document.getElementById('drawingArea');
    var gl = canvas.getContext('webgl');
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
    var n = initVertexBuffers(gl);
    var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    var colorsLength = colors.length, cnt = 0;
    for(var i = 0; i <= n - 3; i+=3, cnt++){
        cnt%=colorsLength;
        var color = colors[cnt];
        gl.uniform4f(u_FragColor, color[0], color[1], color[2], color[3]);
        gl.drawArrays(gl.TRIANGLES, i, 3);
    }
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
    var vertices1 = [];
    var check = 1;
    for(var angle = 0.0;; angle+=0.01){
        if(angle < 360.0){
            var xy = getVertixCordinates(angle);
            if(check == 1){
                check = 0;
            }
            else {
                vertices1.push(xy[0], xy[1]);
            }
            vertices1.push(0.0, 0.0);
            vertices1.push(xy[0], xy[1]);
        }
        else{
            var xy = getVertixCordinates(360.0);
            vertices1.push(xy[0], xy[1]);
            break;
        }
    }
    var vertices2 = new Float32Array(vertices1);
    var n = vertices2.length / 2;
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices2, gl.STATIC_DRAW);
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);
    return n;
}
function getVertixCordinates(angle){
    var xy = [];
    var radian = Math.PI * angle / 180.0;
    var cosB = Math.cos(radian), sinB = Math.sin(radian);
    xy.push(1.0 * cosB);
    xy.push(1.0 * sinB);
    return xy;
}