uniform float time;
uniform float scrollY;
uniform float fadeoutProgress;
attribute float bloomOpacity;
attribute float lineIndex;
varying float vBloomOpacity;
varying float vLineIndex;
varying float vDistanceFromCenter;
varying vec2 vOriginalPosition;
const float PI2 = 6.283185307179586;

// Stable random function
float random(float n) {
    return fract(sin(n * 789.54) * 43758.5453123);
}

vec2 snapToGrid(vec2 position, float cellSize) {
    return floor(position / cellSize + 0.5) * cellSize;
}

void main() {
    float scrollFactor = max(0.0, (scrollY - 400.0) / 10000.0);
    float t = mod(time + lineIndex * 100.0, PI2);
    vec3 newPosition = position;
    float radius = length(position.xy);
    float angle = atan(position.y, position.x);
    float tunnelRadius = 10.0;

    vec3 tunnelPosition = vec3(
        tunnelRadius * cos(angle),
        tunnelRadius * sin(angle),
        radius * 20.0
    );

    newPosition = mix(position, tunnelPosition, scrollFactor);

    if(scrollFactor > 0.0) {
        float rotationAngle = scrollFactor * 2.0;
        float cosRot = cos(rotationAngle);
        float sinRot = sin(rotationAngle);
        vec2 rotated = vec2(
            newPosition.x * cosRot - newPosition.y * sinRot,
            newPosition.x * sinRot + newPosition.y * cosRot
        );
        newPosition.xy = rotated;
    }

    float wave = sin(t + radius * 2.0) * (1.0 - scrollFactor) * 0.2;
    newPosition.xy += normalize(newPosition.xy) * wave;

    vDistanceFromCenter = length(newPosition.xy);
    vOriginalPosition = newPosition.xy;

    if (fadeoutProgress > 0.0) {
        float particleRandom = random(lineIndex);

        // Start with a fine grid that gets progressively larger
        float baseGridSize = 0.2; // Base size of grid cells
        float maxGridSize = 2.0;  // Maximum size of grid cells
        float gridSize = mix(baseGridSize, maxGridSize, fadeoutProgress);

        // Snap to grid with slight randomness in timing
        float snapProgress = smoothstep(0.0, 0.8, fadeoutProgress - particleRandom * 0.2);
        vec2 snappedPos = snapToGrid(newPosition.xy, gridSize);

        // Add slight random offset to final grid position to break uniformity
        vec2 randomOffset = vec2(
            random(lineIndex * 1.234) * 100.0,
            random(lineIndex * 5.678) * 100.0
        ) * gridSize * 0.2;

        // Mix between original and snapped position
        newPosition.xy = mix(
            newPosition.xy,
            snappedPos + randomOffset,
            snapProgress
        );

        // Add subtle z-depth variation
        float zOffset = random(lineIndex) * fadeoutProgress * 400.0;
        newPosition.z += zOffset;

        // Fade out particles that are further from their original positions
        float distanceFromOriginal = length(newPosition.xy - vOriginalPosition);
        float fadeOutFactor = smoothstep(0.0, gridSize * 2.0, distanceFromOriginal);
        vBloomOpacity = bloomOpacity * (1.0 - fadeOutFactor) * (1.0 - fadeoutProgress);
    } else {
        vBloomOpacity = bloomOpacity;
    }

    // Keep original point size behavior
    float depth = (newPosition.z + 20.0) / 40.0;
    float finalPointSize = mix(100.0, 20.0, depth * scrollFactor);
    gl_PointSize = finalPointSize;

    vLineIndex = lineIndex;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
