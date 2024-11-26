precision highp float;
precision highp int;

attribute float id;
attribute vec3 index;

uniform sampler2D tMap;
uniform float uTime;
uniform vec2 uMouse;
uniform float uPower;
uniform float uCols;
uniform int uLength;

varying vec2 vUv;
varying vec2 vUvR;

varying vec3 vPos;
varying vec3 vIndex;
varying float vId;

void main() {
    vUv = uv;
    vUvR = vec2(gl_VertexID << 1 & 2, gl_VertexID & 2);

    vPos = position;
    vId = id;
    vIndex = index;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
