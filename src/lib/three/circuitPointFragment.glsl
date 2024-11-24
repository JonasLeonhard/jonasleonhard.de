uniform float time;
varying float vBloomOpacity;
varying float vLineIndex;
varying float vDistanceFromCenter;
varying vec2 vOriginalPosition;
const float CENTER_SIZE = 0.05;
const float BLOOM_FALLOFF = 1.5;

const vec3 COLOR_1 = vec3(0.0, 0.749, 1.0);
const vec3 COLOR_2 = vec3(0.615, 0.204, 1.0);
const vec3 COLOR_3 = vec3(0.224, 1.0, 0.078);
const vec3 COLOR_4 = vec3(1.0, 0.412, 0.706);
const vec3 COLOR_5 = vec3(0.0, 1.0, 1.0);

vec3 getGradientColor(float t) {
    t = fract(t);
    if(t < 0.2) {
        return mix(COLOR_1, COLOR_2, t * 5.0);
    } else if(t < 0.4) {
        return mix(COLOR_2, COLOR_3, (t - 0.2) * 5.0);
    } else if(t < 0.6) {
        return mix(COLOR_3, COLOR_4, (t - 0.4) * 5.0);
    } else if(t < 0.8) {
        return mix(COLOR_4, COLOR_5, (t - 0.6) * 5.0);
    } else {
        return mix(COLOR_5, COLOR_1, (t - 0.8) * 5.0);
    }
}

void main() {
    vec2 cUv = 2.0 * vec2(gl_PointCoord.x, 1.0 - gl_PointCoord.y) - 1.0;
    float distanceFromCenter = length(cUv);

    // bloom effect
    float alpha = (1.0 - smoothstep(0.0, 1.0, distanceFromCenter * BLOOM_FALLOFF))
                 * (CENTER_SIZE * vBloomOpacity) / distanceFromCenter;

    alpha = clamp(alpha * vBloomOpacity, 0.0, 1.0);

    // color calculation
    float angle = atan(cUv.y, cUv.x) / (2.0 * 3.14159) + 0.5;
    float colorT = fract(angle + time * 0.05);

    vec3 finalColor = getGradientColor(colorT);
    gl_FragColor = vec4(finalColor, alpha);
}
