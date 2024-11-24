uniform float time;
varying float vBloomOpacity;
varying float vLineIndex;

const float CENTER_SIZE = 0.05;
const float BLOOM_FALLOFF = 1.5;

// Define our color palette
const vec3 COLOR_1 = vec3(0.0, 0.749, 1.0);   // Electric Blue
const vec3 COLOR_2 = vec3(0.615, 0.204, 1.0);  // Plasma Purple
const vec3 COLOR_3 = vec3(0.224, 1.0, 0.078);  // Neon Green
const vec3 COLOR_4 = vec3(1.0, 0.412, 0.706);  // Hot Pink
const vec3 COLOR_5 = vec3(0.0, 1.0, 1.0);      // Cyan

vec3 getGradientColor(float t) {
    t = fract(t); // Ensure t is in [0,1]

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
    float delay = 0.025 * vLineIndex;
    float effectiveTime = time - delay;

    if (effectiveTime <= 0.0) {
        discard;
    }

    vec2 cUv = 2.0 * vec2(gl_PointCoord.x, 1.0 - gl_PointCoord.y) - 1.0;
    float distanceFromCenter = length(cUv);

    // Calculate base alpha for the bloom effect
    float alpha = (1.0 - smoothstep(0.0, 1.0, distanceFromCenter * BLOOM_FALLOFF))
                 * (CENTER_SIZE * vBloomOpacity) / distanceFromCenter;
    alpha = clamp(alpha * vBloomOpacity, 0.0, 1.0);

    // Create a rotating gradient based on angle and time
    float angle = atan(cUv.y, cUv.x) / (2.0 * 3.14159) + 0.5;
    float colorT = fract(angle + effectiveTime * 0.1); // Adjust the 0.1 to control rotation speed

    // Get the color from our gradient function
    vec3 finalColor = getGradientColor(colorT);

    gl_FragColor = vec4(finalColor, alpha);
}
