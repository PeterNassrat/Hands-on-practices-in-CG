function createAStar(gl, starSize, editModelMatrix){
    var n = initStarVertexBuffer(gl, starSize);
    var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
    var u_modelMatrix = gl.getUniformLocation(gl.program, 'u_modelMatrix');
    var modelMatrix = new Matrix4();
    modelMatrix.set(editModelMatrix);
    modelMatrix.rotate(90, 0, 0, 1);
    gl.vertexAttrib4f(a_Color, 1.0, 1.0, 0.0, 1.0);
    gl.uniformMatrix4fv(u_modelMatrix, false, modelMatrix.elements);
    for(var i = 0; i <= n - 3; i+=6){
        gl.drawArrays(gl.TRIANGLES, i, 3);
    }
    gl.vertexAttrib4f(a_Color, 0.8, 0.8, 0.0, 1.0);
    for(var i = 3; i <= n - 3; i += 6){
        gl.drawArrays(gl.TRIANGLES, i, 3);
    }
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    gl.disableVertexAttribArray(a_Position);
}
function initStarVertexBuffer(gl, starSize){
    var vertices1 = [
    0.0, 0.0, starSize, 0.0, starSize / 4.0, starSize / 4.0,
    0.0, 0.0, starSize / 4.0, starSize / 4.0, 0.0, starSize,
    0.0, 0.0, 0.0, starSize, -starSize / 4.0, starSize / 4.0,
    0.0, 0.0, -starSize / 4.0, starSize / 4.0, -starSize, 0.0,
    0.0, 0.0, -starSize, 0.0, -starSize / 4.0, -starSize / 4.0,
    0.0, 0.0, -starSize / 4.0, -starSize / 4.0, 0.0, -starSize,
    0.0, 0.0, 0.0, -starSize, starSize / 4.0, -starSize / 4.0,
    0.0, 0.0, starSize / 4.0, -starSize / 4.0, starSize, 0.0,
    ];
    var n = vertices1.length / 2.0;
    var vertices2 = new Float32Array(vertices1);
    var starVertixBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, starVertixBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices2, gl.STATIC_DRAW);
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);
    return n;
}