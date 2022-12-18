var VSHADER_SOURCE =`
attribute vec4 a_Position;
attribute vec4 a_Color;
uniform mat4 u_modelMatrix;
varying vec4 v_Color;
void main(){
    gl_Position = u_modelMatrix * a_Position;
    v_Color = a_Color;
}
`
var FSHADER_SOURCE =`
precision mediump float;
varying vec4 v_Color;
void main(){
    gl_FragColor = v_Color;
}
`
var ANGLE_STEP = 150.0;
function main(){
    var canvas = document.getElementById('drawingArea');

    var currentAngle1 = 0.0;
    var currentAngle2 = 0.0;
    var tick = function() {
        var angles = [currentAngle1, currentAngle2];
        var angles = animate(angles);
        currentAngle1 = angles[0];
        currentAngle2 = angles[1];
        draw(canvas, currentAngle1, currentAngle2);
        requestAnimationFrame(tick, canvas);
      };
    tick();

}
function draw(canvas, currentAngle1, currentAngle2){
    var gl = canvas.getContext('webgl');
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

    editModelMatrix = new Matrix4();
    editModelMatrix.setIdentity();
    createBackground(gl, editModelMatrix);
    editModelMatrix.setScale(0.5, 1.0, 1.0);
    createTree(gl, 0.75, editModelMatrix, 60.0);
    editModelMatrix.setTranslate(0.0, 0.75, 1.0);
    editModelMatrix.scale(0.5, 1.0, 1.0);
    editModelMatrix.rotate(currentAngle1, 0, 0, 1);
    createAStar(gl, 0.15, editModelMatrix);

    editModelMatrix.setTranslate(0.7, -0.1, 0.0);
    editModelMatrix.scale(0.5, 1.0, 1.0);
    createTree(gl, 0.25, editModelMatrix, 60.0);
    editModelMatrix.setTranslate(0.7, 0.17, 0.0);
    editModelMatrix.scale(0.5, 1.0, 1.0);
    editModelMatrix.rotate(currentAngle1, 0, 0, 1);
    createAStar(gl, 0.115, editModelMatrix);
     editModelMatrix.setTranslate(0.74, 0.03, 0.0);
    editModelMatrix.scale(0.5, 1.0, 1.0);
    editModelMatrix.rotate(currentAngle2, 0, 0, 1);
    createAStar(gl, 0.04, editModelMatrix);
     editModelMatrix.setTranslate(0.66, 0.03, 0.0);
    editModelMatrix.scale(0.5, 1.0, 1.0);
    editModelMatrix.rotate(currentAngle2, 0, 0, 1);
    createACircle(gl, 0.03, editModelMatrix);
     editModelMatrix.setTranslate(0.76, -0.1, 0.0);
    editModelMatrix.scale(0.5, 1.0, 1.0);
    editModelMatrix.rotate(currentAngle2, 0, 0, 1);
    createACircle(gl, 0.03, editModelMatrix);
     editModelMatrix.setTranslate(0.64, 0.-0.1, 0.0);
    editModelMatrix.scale(0.5, 1.0, 1.0);
    editModelMatrix.rotate(currentAngle2, 0, 0, 1);
    createAStar(gl, 0.04, editModelMatrix);
     editModelMatrix.setTranslate(0.62, 0.-0.2, 0.0);
    editModelMatrix.scale(0.5, 1.0, 1.0);
    editModelMatrix.rotate(currentAngle2, 0, 0, 1);
    createACircle(gl, 0.03, editModelMatrix);
     editModelMatrix.setTranslate(0.78, 0.-0.2, 0.0);
    editModelMatrix.scale(0.5, 1.0, 1.0);
    editModelMatrix.rotate(currentAngle2, 0, 0, 1);
    createAStar(gl, 0.04, editModelMatrix);

    editModelMatrix.setTranslate(-0.7, -0.1, 0.0);
    editModelMatrix.scale(0.5, 1.0, 1.0);
    createTree(gl, 0.25, editModelMatrix, 60.0);
    editModelMatrix.setTranslate(-0.7, 0.17, 0.0);
    editModelMatrix.scale(0.5, 1.0, 1.0);
    editModelMatrix.rotate(currentAngle1, 0, 0, 1);
    createAStar(gl, 0.115, editModelMatrix);
    editModelMatrix.setTranslate(-0.74, 0.03, 0.0);
    editModelMatrix.scale(0.5, 1.0, 1.0);
    editModelMatrix.rotate(currentAngle2, 0, 0, 1);
    createAStar(gl, 0.04, editModelMatrix);
     editModelMatrix.setTranslate(-0.66, 0.03, 0.0);
    editModelMatrix.scale(0.5, 1.0, 1.0);
    editModelMatrix.rotate(currentAngle2, 0, 0, 1);
    createACircle(gl, 0.03, editModelMatrix);
     editModelMatrix.setTranslate(-0.76, -0.1, 0.0);
    editModelMatrix.scale(0.5, 1.0, 1.0);
    editModelMatrix.rotate(currentAngle2, 0, 0, 1);
    createACircle(gl, 0.03, editModelMatrix);
     editModelMatrix.setTranslate(-0.64, 0.-0.1, 0.0);
    editModelMatrix.scale(0.5, 1.0, 1.0);
    editModelMatrix.rotate(currentAngle2, 0, 0, 1);
    createAStar(gl, 0.04, editModelMatrix);
     editModelMatrix.setTranslate(-0.62, 0.-0.2, 0.0);
    editModelMatrix.scale(0.5, 1.0, 1.0);
    editModelMatrix.rotate(currentAngle2, 0, 0, 1);
    createACircle(gl, 0.03, editModelMatrix);
     editModelMatrix.setTranslate(-0.78, 0.-0.2, 0.0);
    editModelMatrix.scale(0.5, 1.0, 1.0);
    editModelMatrix.rotate(currentAngle2, 0, 0, 1);
    createAStar(gl, 0.04, editModelMatrix);

    drawDecoration(gl, currentAngle2);

}
function drawDecoration(gl, rotationAngle){
    var modelMatrix = new Matrix4();
    for(var y = 0.6, x = -0.05; y >= -0.2; y-=0.1, x-=0.03){
        for(var i = x, cnt = 0; i <= -1*x; i+=0.05, cnt++){
            if(i >= 0.05 || i <= -0.05){
                cnt = Math.round(cnt);
                if(cnt % 2 != 0){
                    modelMatrix.setTranslate(i, y, 0.0);
                    modelMatrix.scale(0.5, 1.0, 1.0);
                    modelMatrix.rotate(rotationAngle, 0, 0, 1);
                    createAStar(gl, 0.05, modelMatrix);
                }
                else{
                    modelMatrix.setTranslate(i, y, 0.0);
                    modelMatrix.scale(0.5, 1.0, 1.0);
                    modelMatrix.rotate(rotationAngle, 0, 0, 1);
                    createACircle(gl, 0.04, modelMatrix);
                }
            }
        }
    }
}
var g_last = Date.now();
function animate(angle) {
  // Calculate the elapsed time
  var now = Date.now();
  var elapsed = now - g_last;
  g_last = now;
  // Update the current rotation angle (adjusted by the elapsed time)
  var newAngle = [];
  newAngle.push((angle[0] + (ANGLE_STEP * elapsed) / 1000.0) % 360);
  newAngle.push((angle[1] + (ANGLE_STEP * 0.1 * elapsed) / 1000.0) % 360);
  return newAngle;
}