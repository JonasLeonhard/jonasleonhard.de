uniform sampler2D videoCurrent;
uniform sampler2D videoNext;
uniform float mixRatio;
uniform float time;
uniform float fadeIn;
uniform float fadeOut;
uniform vec2 uMouse;
uniform vec2 uResolution;
uniform vec3 uBgColor;
varying vec2 vUv;

void main() {
    // 1. SET UP VIEWPORT SPACE
    vec2 screenUv = gl_FragCoord.xy / uResolution;
    float aspect = uResolution.x / uResolution.y;

    vec2 p = screenUv - 0.5;

    // 2. CHANNELS INTERACTIVE GLASS REFRACTION LENS
    // The mouse creates a dynamic physical index of refraction across the coordinates
    vec2 mouseDistVec = screenUv - uMouse;
    mouseDistVec.x *= aspect; // Aspect-correct interaction spacing
    float distToMouse = length(mouseDistVec);

    float lensRadius = 0.72;
    vec2 dynamicRefraction = vec2(0.0);

    if (distToMouse < lensRadius) {
        // Create a sharp optical refraction wave profile
        float lensForce = smoothstep(lensRadius, 0.0, distToMouse);
        dynamicRefraction = normalize(mouseDistVec) * sin(lensForce * 3.14159265) * 0.012;
    }

    // Apply local glass ripple refraction directly into the sampling coordinate pipeline
    vec2 interactiveScreenUv = screenUv + dynamicRefraction;
    vec2 interactiveP = p + dynamicRefraction;

    // 3. CYLINDRICAL MONITOR CURVE MATH
    // Bends coordinates strictly along the horizontal viewport horizon line.
    // This creates an elegant widescreen studio panel rather than a circular bubble.
    float curveStrength = 1.8;
    float curveFactor = p.x * p.x * curveStrength;

    vec2 uvVideo = interactiveScreenUv;
    uvVideo.y += (screenUv.y - 0.5) * curveFactor * 2.0;
    uvVideo.x += (screenUv.x - 0.5) * curveFactor * 0.5;
    uvVideo = clamp(uvVideo, 0.001, 0.999);

    // 4. GENERATE EDGE-TO-EDGE CYLINDRICAL TECH GRID
    vec2 uvGrid = interactiveP;
    uvGrid.x *= aspect;
    uvGrid.y += uvGrid.y * (p.x * p.x * curveStrength * 1.5); // Curves the grid lines symmetrically

    float gridDensity = 32.0;
    vec2 gridLines = abs(sin(uvGrid * 3.14159265 * gridDensity));
    vec2 gridPattern = smoothstep(0.990, 1.0, gridLines); // Crisp 1px lines
    float gridCombined = max(gridPattern.x, gridPattern.y);

    // Auto-swap grid contrast colors for pristine visibility in Light & Dark modes
    float isLightMode = step(0.5, (uBgColor.r + uBgColor.g + uBgColor.b) / 3.0);
    vec3 lineBaseColor = mix(vec3(1.0), vec3(0.75), isLightMode);

    float gridBreathing = 0.04 + 0.008 * sin(time * 0.8);
    vec3 finalGridColor = lineBaseColor * gridCombined * gridBreathing * fadeIn;

    // 5. SAMPLE PROJECT VIDEO TRACKS
    vec4 vidCurr = texture2D(videoCurrent, uvVideo);
    vec4 vidNext = texture2D(videoNext, uvVideo);
    vec4 mixedVid = mix(vidCurr, vidNext, mixRatio);

    // Premium desaturated digital slate color grade profile
    float luminance = dot(mixedVid.rgb, vec3(0.2126, 0.7152, 0.0722));
    vec3 slateTint = vec3(luminance) * vec3(0.45, 0.48, 0.55);
    vec3 illuminatedVideo = mix(mixedVid.rgb, slateTint, 0.60) * 1.4;

    // 6. PANORAMIC HORIZONTAL WIDESCREEN MASK
    // Drops the floating circle concept entirely. The video fills the full vertical viewport height,
    // feathering away softly only as it reaches the left and right browser margins.
    float edgeFeatherWidth = 0.38;
    float horizontalMask = smoothstep(0.5, 0.5 - edgeFeatherWidth, abs(p.x));
    float videoMask = horizontalMask * fadeIn;

    // 7. COMPOSITE INFRASTRUCTURE LAYERS
    vec3 compositeColor = mix(uBgColor, illuminatedVideo, videoMask * 0.55);
    compositeColor += finalGridColor * (1.0 - videoMask * 0.3);

    // Handle clean page section exit fade animations
    vec3 finalColor = mix(compositeColor, uBgColor, fadeOut);

    gl_FragColor = vec4(finalColor, 1.0);
}
