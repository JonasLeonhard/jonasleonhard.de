varying vec2 vScreenUv;
void main() {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  vScreenUv = gl_Position.xy / gl_Position.w * 0.5 + 0.5;
}
