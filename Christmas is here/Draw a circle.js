function createACircle(gl, circleSize, editModelMatrix){
    var colors = [[1.0, 0.0, 0.0, 1.0], [1.0, 0.5, 0.0, 1.0], [1.0, 1.0, 0.0, 1.0], [0.0, 1.0, 0.0, 1.0],
    [0.0, 1.0, 1.0, 1.0], [0.0, 0.0, 1.0, 1.0], [0.5, 0.0, 1.0, 1.0]];
    var n;
    n = initCircleVertexBuffers(gl, circleSize);
    var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
    var u_modelMatrix = gl.getUniformLocation(gl.program, 'u_modelMatrix');
    gl.uniformMatrix4fv(u_modelMatrix, false, editModelMatrix.elements);
    var colorsLength = colors.length, cnt = 0;
    for(var i = 0; i <= n - 3; i+=3, cnt++){
        cnt%=colorsLength;
        var color = colors[cnt];
        gl.vertexAttrib4f(a_Color, color[0], color[1], color[2], color[3]);
        gl.drawArrays(gl.TRIANGLES, i, 3);
    }
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    gl.disableVertexAttribArray(a_Position);
}
function initCircleVertexBuffers(gl, radius){
    var vertices1 = [];
    var check = 1;
    for(var angle = 0.0;; angle+=51.4){
        if(angle < 360.0){
            var xy = getVertixCordinates(angle, radius);
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
            var xy = getVertixCordinates(360.0, radius);
            vertices1.push(xy[0], xy[1]);
            break;
        }
    }
    var n = vertices1.length / 2.0;
    var vertices2 = new Float32Array(vertices1);
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices2, gl.STATIC_DRAW);
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);
    return n;
}
function getVertixCordinates(angle, r){
    var xy = [];
    var radian = Math.PI * angle / 180.0;
    var cosB = Math.cos(radian), sinB = Math.sin(radian);
    xy.push(r * cosB);
    xy.push(r * sinB);
    return xy;
}