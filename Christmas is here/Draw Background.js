function createBackground(gl, editModelMatrix) {
  var u_modelMatrix = gl.getUniformLocation(gl.program, 'u_modelMatrix');
  gl.uniformMatrix4fv(u_modelMatrix, false, editModelMatrix.elements);
  var n = initVertexBuffers(gl);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, n[0]);
  gl.drawArrays(gl.TRIANGLE_STRIP, n[0], n[1] - n[0]);
  var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  gl.disableVertexAttribArray(a_Color);
  gl.disableVertexAttribArray(a_Position);

}

function initVertexBuffers(gl) {
  var vertices1 = [];
  for(var x = -1.0; x <= 1.0; x+= 0.1){
    vertices1.push(x, 1.0, 1.0, 1.0, 1.0);
    vertices1.push(x, -0.25, 0.7, 1.0, 1.0);
  }
  var n1 = vertices1.length / 5;
  for(var x = -1.0; x <= 1.0; x+= 0.1){
    vertices1.push(x, -0.25, 0.0, 1.0, 0.8);
    vertices1.push(x, -1.0, 0.0, 1.0, 0.0);
  }
  var n2 = vertices1.length / 5;
  var verticesColors = new Float32Array(vertices1);
  // Create a buffer object
  var vertexColorBuffer = gl.createBuffer();  
  if (!vertexColorBuffer) {
    console.log('Failed to create the buffer object');
    return false;
  }

  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);

  var FSIZE = verticesColors.BYTES_PER_ELEMENT;
  //Get the storage location of a_Position, assign and enable buffer
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return -1;
  }
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 5, 0);
  gl.enableVertexAttribArray(a_Position);  // Enable the assignment of the buffer object

  // Get the storage location of a_Position, assign buffer and enable
  var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
  if(a_Color < 0) {
    console.log('Failed to get the storage location of a_Color');
    return -1;
  }
  gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 5, FSIZE * 2);
  gl.enableVertexAttribArray(a_Color);  // Enable the assignment of the buffer object

  // Unbind the buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  var ns = [n1, n2];
  return ns;
}