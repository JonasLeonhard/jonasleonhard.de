uniform float time;
varying float vBloomOpacity;
varying float vLineIndex;

const float CENTER_SIZE = 0.05;
const float BLOOM_FALLOFF = 1.5;
const vec3 BASE_COLOR = vec3(1.0, 0.717647, 0.192157); // Pre-calculated RGB values

void main() {
    float delay = 0.025 * vLineIndex;
    float effectiveTime = time - delay;

    if (effectiveTime <= 0.0) {
        discard;
    }

    vec2 cUv = 2.0 * vec2(gl_PointCoord.x, 1.0 - gl_PointCoord.y) - 1.0;
    float distanceFromCenter = length(cUv);

    float alpha = (1.0 - smoothstep(0.0, 1.0, distanceFromCenter * BLOOM_FALLOFF))
                 * (CENTER_SIZE * vBloomOpacity) / distanceFromCenter;

    alpha = clamp(alpha * vBloomOpacity, 0.0, 1.0);

    gl_FragColor = vec4(BASE_COLOR, alpha);
}
