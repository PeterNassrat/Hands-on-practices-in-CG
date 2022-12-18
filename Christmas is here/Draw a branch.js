function createBranch(gl, branchSize, editModelMatrix){
    var modelMatrix = new Matrix4();
    var n = initRootVertexBuffer(gl, branchSize);
    var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
    var u_modelMatrix = gl.getUniformLocation(gl.program, 'u_modelMatrix');
    modelMatrix.set(editModelMatrix);
    modelMatrix.rotate(-90, 0, 0, 1);
    modelMatrix.translate(-branchSize, 0.0, 0.0);
    gl.uniformMatrix4fv(u_modelMatrix, false, modelMatrix.elements);
    gl.vertexAttrib4f(a_Color, 0.55, 0.29, 0.0, 1.0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    gl.disableVertexAttribArray(a_Position);
}
function createBranchLeafs(gl, branchSize, editModelMatrix){
    var modelMatrix = new Matrix4();
    modelMatrix.set(editModelMatrix);
    modelMatrix.rotate(-90, 0, 0, 1);
    modelMatrix.translate(-branchSize, 0.0, 0.0);
    var idx = 1;
    var leafColors = [[0.0, 0.85, 0.0, 1.0], [0.0, 0.65, 0.0, 1.0]];
    for(var angle = 3.0; angle <= 70; angle+=1.0){
        var leafDegrees = (70 - angle) * 1 / 3;
        var xy = getVertexCordinates(angle, branchSize);
        modelMatrix.set(editModelMatrix);
        modelMatrix.rotate(-90, 0, 0, 1);
        modelMatrix.translate(-branchSize, 0.0, 0.0);
        modelMatrix.translate(xy[0], xy[1], 0.0);
        modelMatrix.rotate(angle, 0, 0, 1);
        createLeaf(gl, branchSize, leafDegrees, modelMatrix, leafColors[idx]);
        if(idx == 0)idx=1;
        else idx = 0;
    }
    if(idx == 1)idx = 0;
    var subValue = branchSize * 0.01;
    var sumValue = subValue / 50.0;
    for(var angle = 3.0, x = 1.0 * sumValue; angle <= 70; angle+=1.0){
        var leafDegrees = (70 - angle) * 1 / 3;
        var xy;
        if(angle <= 20){
            xy = getVertexCordinates(angle, branchSize - subValue);
        }
        else{
            xy = getVertexCordinates(angle, branchSize - subValue + x);
            x += 1.0 * sumValue;
        }
        modelMatrix.set(editModelMatrix);
        modelMatrix.rotate(-90, 0, 0, 1);
        modelMatrix.translate(-branchSize, 0.0, 0.0);
        modelMatrix.translate(xy[0], xy[1], 0.0);
        modelMatrix.rotate(angle, 0, 0, 1);
        modelMatrix.scale(-1.0, 1.0, 1.0);
        createLeaf(gl, branchSize, leafDegrees, modelMatrix, leafColors[idx]);
        if(idx == 0)idx=1;
        else idx = 0;
    }
}
function initRootVertexBuffer(gl, branchSize){
    var vertices1 = [];
    var subValue = branchSize * 0.02;
    var sumValue = subValue / 50.0;
    for(var angle = 0, x = 5.0 * sumValue; angle <= 70; angle+=5){
        var vertex1 = getVertexCordinates(angle, branchSize), vertex2;
        if(angle <= 20){
            vertex2 = getVertexCordinates(angle, branchSize - subValue);
        }
        else{
            vertex2 = getVertexCordinates(angle, branchSize - subValue + x);
            x += 5.0 * sumValue;
        }
        vertices1.push(vertex1[0], vertex1[1]);
        vertices1.push(vertex2[0], vertex2[1]);
    }
    var n = vertices1.length / 2.0;
    var vertices2 = new Float32Array(vertices1);
    var rootVertixBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, rootVertixBuffer);
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