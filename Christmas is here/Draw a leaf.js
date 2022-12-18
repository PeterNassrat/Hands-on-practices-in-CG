function createLeaf(gl, leafSize, degrees, editModelMatrix, leafColor){
    var n = initLeafVertexBuffer(gl, leafSize, degrees);
    var u_modelMatrix = gl.getUniformLocation(gl.program, 'u_modelMatrix');
    var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
    var modelMatrix = new Matrix4();
    modelMatrix.set(editModelMatrix);
    modelMatrix.rotate(-90, 0, 0, 1);
    modelMatrix.translate(-leafSize, 0.0, 0.0);
    gl.uniformMatrix4fv(u_modelMatrix, false, modelMatrix.elements);
    gl.vertexAttrib4f(a_Color, leafColor[0], leafColor[1], leafColor[2], leafColor[3]);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    gl.disableVertexAttribArray(a_Position);
}
function initLeafVertexBuffer(gl, leafSize, degrees){
    var vertices1 = [];
    var subValue;
    if(leafSize >= 0.0 && leafSize <= 0.5)subValue = leafSize * 0.05;
    else if(leafSize > 0.5 && leafSize <= 0.8)subValue = leafSize * 0.03;
    else if(leafSize > 0.8 && leafSize <= 0.95)subValue = leafSize * 0.02;
    else subValue = leafSize * 0.01;
    var sumValue = subValue / (0.8 * degrees);
    for(var angle = 0.0, x = sumValue; angle <= degrees; angle++){
        var vertex1 = getVertexCordinates(angle, leafSize), vertex2;
        if(angle <= 0.5 * degrees){
            vertex2 = getVertexCordinates(angle, leafSize - subValue);
        }
        else{
            vertex2 = getVertexCordinates(angle, leafSize - subValue + x);
            x += sumValue;
        }
        vertices1.push(vertex1[0], vertex1[1]);
        vertices1.push(vertex2[0], vertex2[1]);
    }
    var n = vertices1.length / 2.0;
    var vertices2 = new Float32Array(vertices1);
    var leafVertixBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, leafVertixBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices2, gl.STATIC_DRAW);
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);
    return n;
}
function getVertexCordinates(angle, r){
    var xy = [];
    var radian = Math.PI * angle / 180.0;
    var cosB = Math.cos(radian), sinB = Math.sin(radian);
    xy.push(r * cosB);
    xy.push(r * sinB);
    return xy;
}