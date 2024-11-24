uniform float time;
uniform float scrollY;
attribute float bloomOpacity;
attribute float lineIndex;
varying float vBloomOpacity;
varying float vLineIndex;
const float PI2 = 6.283185307179586;

void main() {
    float scrollFactor = scrollY / 10000.0;
    float t = mod(time + lineIndex * 100.0, PI2);

    // Start with original 2D position
    vec3 newPosition = position;

    // Calculate angle and radius from center for cylindrical transformation
    float radius = length(position.xy);
    float angle = atan(position.y, position.x);

    // Calculate the tunnel radius - this will determine how wide the tunnel is
    float tunnelRadius = 10.0;

    // Transform from 2D to tunnel
    // As scrollFactor increases, we'll gradually convert the position to cylindrical coordinates
    vec3 tunnelPosition = vec3(
        tunnelRadius * cos(angle),  // X coordinate on cylinder
        tunnelRadius * sin(angle),  // Y coordinate on cylinder
        radius * 20.0              // Z depth based on original radius
    );

    // Interpolate between flat and tunnel positions
    newPosition = mix(position, tunnelPosition, scrollFactor);

    // Add some rotation to the tunnel during scroll
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

    // Add some wave motion to make it more dynamic
    float wave = sin(t + radius * 2.0) * (1.0 - scrollFactor) * 0.2;
    newPosition.xy += normalize(newPosition.xy) * wave;

    // Adjust point size based on Z depth
    float depth = (newPosition.z + 20.0) / 40.0; // Normalize depth value
    gl_PointSize = mix(100.0, 20.0, depth * scrollFactor);

    // Adjust bloom opacity based on depth
    vBloomOpacity = bloomOpacity * (1.0 - depth * scrollFactor * 0.5);
    vLineIndex = lineIndex;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
