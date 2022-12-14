var VSHADER_SOURCE =`
attribute vec4 a_Position;
void main(){
    gl_Position = a_Position;
    gl_PointSize = 10.0;
}
`
var FSHADER_SOURCE = `
void main(){
    gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
}
`
function main(){
    alert("Please click onside the canvas");
    var canvas = document.getElementById('drawingArea');
    var gl = canvas.getContext('webgl');
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    canvas.onmousedown = function(ev){
        click(ev, gl, canvas, a_Position);
    }
    gl.clearColor(0.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
}
var g_points = [];
function click(ev, gl, canvas, a_Position){
    var x = ev.clientX;
    var y = ev.clientY;
    var rec = ev.target.getBoundingClientRect();
    x = ((x - rec.left) - canvas.width/2)/(canvas.width/2);
    y = (canvas.height/2 - (y - rec.top))/(canvas.height/2);
    g_points.push([x, y]);
    gl.clear(gl.COLOR_BUFFER_BIT);
    var length = g_points.length;
    for(var i = 0; i < length; i++){
        var xy = g_points[i];
        gl.vertexAttrib2f(a_Position, xy[0], xy[1]);
        gl.drawArrays(gl.POINTS, 0, 1);
    }
}