function createTree(gl, length, editModelMatrix, rotatingTriangle){
    for(var b = 0; b < 2; b++){
        for(var y = length, x = 0.0; y >= 0.0; y-=0.06, x += 0.005){
            var branchSize = length - y;
            if(branchSize > 0.6 * length){
                branchSize = 0.6 * length + 0.15;
            }
            else{
                branchSize = branchSize + 0.15;
            }
            Draw2Branches(gl, x, y, rotatingTriangle, branchSize, editModelMatrix, b);
        }
    }
    var n = initVertexTreeBuffer(gl, length);
    var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
    var u_modelMatrix = gl.getUniformLocation(gl.program, 'u_modelMatrix');
    gl.uniformMatrix4fv(u_modelMatrix, false, editModelMatrix.elements);
    gl.vertexAttrib4f(a_Color, 0.50, 0.29, 0.0, 1.0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    gl.disableVertexAttribArray(a_Position);
}
function initVertexTreeBuffer(gl, length){
    var vertices1 = [];
    var x = 0.0;
    for(var y = length; y >= 0.0; y-=0.06, x += 0.005){
        vertices1.push(x, y, -x, y);
    }
    var editLength = 0.6 * -length;
    vertices1.push(x, editLength, -x, editLength);
    var n = vertices1.length / 2.0;
    var vertices2 = new Float32Array(vertices1);
    var treeVertixBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, treeVertixBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices2, gl.STATIC_DRAW);
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);
    return n;
}
function Draw2Branches(gl, x, y, rotatingAngle, branchSize, editModelMatrix, b){
    var modelMatrix = new Matrix4();
    modelMatrix.set(editModelMatrix);
    modelMatrix.translate(x, y, 0.0);
    modelMatrix.rotate(-rotatingAngle, 0, 0, 1);
    if(b == 1){
        createBranch(gl, branchSize, modelMatrix);
    }
    else{
        createBranchLeafs(gl, branchSize, modelMatrix);
    }

    modelMatrix.set(editModelMatrix);
    modelMatrix.translate(-x, y, 0.0);
    modelMatrix.rotate(rotatingAngle, 0, 0, 1);
    modelMatrix.scale(-1.0, 1.0, 1.0);
    if(b == 1){
        createBranch(gl, branchSize, modelMatrix);
    }
    else{
        createBranchLeafs(gl, branchSize, modelMatrix);
    }
}