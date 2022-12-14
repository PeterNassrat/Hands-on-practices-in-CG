var VSHADER_SOURCE=`
attribute vec4 a_Position;
attribute float a_PointSize;
void main(){
    gl_Position = a_Position;
    gl_PointSize = a_PointSize;
}
`
var FSHADER_SOURCE=`
precision mediump float;
uniform vec4 u_FragColor;
void main(){
    gl_FragColor = u_FragColor;
}
`
function main(){
    alert("Please click onside the canvas more than 30 click");
    var canvas = document.getElementById('drawingArea');
    var gl = canvas.getContext('webgl');
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
    var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    canvas.onmousedown = function(ev){
        click(ev, gl, canvas, a_Position, a_PointSize, u_FragColor);
    }
    gl.clearColor(0.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
}
var points = [];
var colors = [];
function click(ev, gl, canvas, a_Position, a_PointSize, u_FragColor){
    var x = ev.clientX;
    var y = ev.clientY;
    var rec = ev.target.getBoundingClientRect();
    x = ((x - rec.left) - canvas.width/2)/(canvas.width/2);
    y = (canvas.height/2 - (y - rec.top))/(canvas.height/2);
    points.push([x, y]);
    if(x >= 0 && y >= 0){
        colors.push([1.0, 0.0, 0.0, 1.0]);
    }
    else if(x >= 0 && y < 0){
        colors.push([0.0, 1.0, 0.0, 1.0]);
    }
    else if(x < 0 && y >= 0){
        colors.push([0.0, 0.0, 1.0, 1.0]);
    }
    else {
        colors.push([1.0, 1.0, 1.0, 1.0]);
    }
    gl.clear(gl.COLOR_BUFFER_BIT);
    var len = points.length;
    var check = 1;
    for(var i = 0, size = 5.0; i < len; i++){
        var xy = points[i];
        var rgba = colors[i];
        gl.vertexAttrib2f(a_Position, xy[0], xy[1]);
        gl.vertexAttrib1f(a_PointSize, size);
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        gl.drawArrays(gl.POINTS, 0, 1);
        if(check == 1){
            size+=0.5;
            if(size == 20.0)check = 0;
        }
        else{
            size-=0.5;
            if(size == 5.0)check = 1;
        }
    }
}