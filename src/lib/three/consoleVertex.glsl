uniform float uTime;
varying vec2 vUv;
void main() {
  vUv = uv;
  vec3 pos = position;
  pos.z += sin(uv.x * 2.0 + uTime * 0.5) * cos(uv.y * 2.0 + uTime * 0.4) * 1.5;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
