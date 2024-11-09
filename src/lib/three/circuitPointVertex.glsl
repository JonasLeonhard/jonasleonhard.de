uniform float time;
attribute float bloomOpacity;
attribute float lineIndex;
varying float vBloomOpacity;
varying float vLineIndex;

const float PI2 = 6.283185307179586;

void main() {
    // Optimize sin calculation by using a normalized range
    float t = mod(time + lineIndex * 100.0, PI2);
    vBloomOpacity = bloomOpacity * sin(t);
    vLineIndex = lineIndex;

    gl_PointSize = 100.0;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
