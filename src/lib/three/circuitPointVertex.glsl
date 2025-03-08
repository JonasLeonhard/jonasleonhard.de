uniform float time;
uniform float scrollY;
uniform float fadeoutProgress;
uniform sampler2D mouseTrailCanvasTexture;
attribute float opacity;
attribute float lineIndex;
varying float vOpacity;
varying float vLineIndex;
varying vec2 vOriginalPosition;
varying float vMouseTrail;

float random(float n) {
    return fract(sin(n * 789.54) * 43758.5453123);
}

vec2 snapToGrid(vec2 position, float cellSize) {
    return floor(position / cellSize + 0.5) * cellSize;
}

void main() {
    vec3 newPosition = position;
    vOriginalPosition = position.xy;

    // we need the projectedPosition to sample the mouseTrailCanvasTexture
    vec4 projectedPosition = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vec3 ndc = projectedPosition.xyz / projectedPosition.w; // (Normalized Device Coordinates)
    vec2 uv = vec2(ndc.x * 0.5 + 0.5, ndc.y * 0.5 + 0.5); // UV coordinates (from -1,1 to 0,1 range)
    float mouseTrail = texture2D(mouseTrailCanvasTexture, uv).r;
    vMouseTrail = mouseTrail;

    // Apply displacement along the view direction
    vec3 viewDirection = normalize(vec3(modelViewMatrix[0][2], modelViewMatrix[1][2], modelViewMatrix[2][2]));
    newPosition += viewDirection * mouseTrail * 50.0;

    // Handle fadeout animation
    if (fadeoutProgress > 0.0) {
        float particleRandom = random(lineIndex);
        float baseGridSize = 0.2;
        float maxGridSize = 2.0;
        float gridSize = mix(baseGridSize, maxGridSize, fadeoutProgress);
        float snapProgress = smoothstep(0.0, 0.8, fadeoutProgress - particleRandom * 0.2);
        vec2 snappedPos = snapToGrid(position.xy, gridSize);
        vec2 randomOffset = vec2(
            random(lineIndex * 1.234) * 100.0,
            random(lineIndex * 5.678) * 100.0
        ) * gridSize * 0.2;
        newPosition.xy = mix(
            position.xy,
            snappedPos + randomOffset,
            snapProgress
        );
        float zOffset = random(lineIndex) * fadeoutProgress * 400.0;
        newPosition.z += zOffset;
        float distanceFromOriginal = length(newPosition.xy - vOriginalPosition);
        float fadeOutFactor = smoothstep(0.0, gridSize * 2.0, distanceFromOriginal);
        float sinFade = sin(time + lineIndex * 0.2) * 0.5 + 1.0;
        vOpacity = opacity * sinFade * (1.0 - fadeOutFactor) * (1.0 - fadeoutProgress);
    } else {
        float sinFade = sin(time + lineIndex * 0.2) * 0.5 + 1.0;
        vOpacity = opacity * sinFade;
    }

    vLineIndex = lineIndex;
    gl_PointSize = 50.0;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
