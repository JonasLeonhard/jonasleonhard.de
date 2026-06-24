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
    vec2 mouseDistVec = screenUv - uMouse;
    mouseDistVec.x *= aspect; 
    float distToMouse = length(mouseDistVec);

    float lensRadius = 0.72;
    vec2 dynamicRefraction = vec2(0.0);

    if (distToMouse < lensRadius) {
        float lensForce = smoothstep(lensRadius, 0.0, distToMouse);
        dynamicRefraction = normalize(mouseDistVec) * sin(lensForce * 3.14159265) * 0.012;
    }

    vec2 interactiveScreenUv = screenUv + dynamicRefraction;
    vec2 interactiveP = p + dynamicRefraction;

    // 3. OBJECT-FIT COVER TRANSFORMATIONS FOR VIEWPORT
    float videoAspect = 16.0 / 9.0; // Enforce native texture landscape scale properties
    vec2 aspectCorrectedUv = interactiveScreenUv;

    if (aspect > videoAspect) {
        // Desktop / Wide displays
        aspectCorrectedUv.y = 0.5 + (aspectCorrectedUv.y - 0.5) * (videoAspect / aspect);
    } else {
        // Portrait Mobile Formats (Locks textures without horizontal/vertical distortion squishing)
        aspectCorrectedUv.x = 0.5 + (aspectCorrectedUv.x - 0.5) * (aspect / videoAspect);
    }

    // 4. CYLINDRICAL MONITOR CURVE MATH
    float curveStrength = 1.8;
    float curveFactor = p.x * p.x * curveStrength;

    vec2 uvVideo = aspectCorrectedUv;
    uvVideo.y += (screenUv.y - 0.5) * curveFactor * 2.0;
    uvVideo.x += (screenUv.x - 0.5) * curveFactor * 0.5;
    uvVideo = clamp(uvVideo, 0.001, 0.999);

    // 5. GENERATE EDGE-TO-EDGE CYLINDRICAL TECH GRID
    vec2 uvGrid = interactiveP;
    uvGrid.x *= aspect;
    uvGrid.y += uvGrid.y * (p.x * p.x * curveStrength * 1.5);

    float gridDensity = 32.0;
    vec2 gridLines = abs(sin(uvGrid * 3.14159265 * gridDensity));
    vec2 gridPattern = smoothstep(0.990, 1.0, gridLines);
    float gridCombined = max(gridPattern.x, gridPattern.y);

    float isLightMode = step(0.5, (uBgColor.r + uBgColor.g + uBgColor.b) / 3.0);
    vec3 lineBaseColor = mix(vec3(1.0), vec3(0.75), isLightMode);

    float gridBreathing = 0.04 + 0.008 * sin(time * 0.8);
    vec3 finalGridColor = lineBaseColor * gridCombined * gridBreathing * fadeIn;

    // 6. SAMPLE PROJECT VIDEO TRACKS
    vec4 vidCurr = texture2D(videoCurrent, uvVideo);
    vec4 vidNext = texture2D(videoNext, uvVideo);
    vec4 mixedVid = mix(vidCurr, vidNext, mixRatio);

    float luminance = dot(mixedVid.rgb, vec3(0.2126, 0.7152, 0.0722));
    vec3 slateTint = vec3(luminance) * vec3(0.45, 0.48, 0.55);
    vec3 illuminatedVideo = mix(mixedVid.rgb, slateTint, 0.60) * 1.4;

    // 7. PANORAMIC HORIZONTAL WIDESCREEN MASK
    float edgeFeatherWidth = 0.38;
    float horizontalMask = smoothstep(0.5, 0.5 - edgeFeatherWidth, abs(p.x));
    float videoMask = horizontalMask * fadeIn;

    // 8. COMPOSITE INFRASTRUCTURE LAYERS
    vec3 compositeColor = mix(uBgColor, illuminatedVideo, videoMask * 0.55);
    compositeColor += finalGridColor * (1.0 - videoMask * 0.3);

    vec3 finalColor = mix(compositeColor, uBgColor, fadeOut);

    gl_FragColor = vec4(finalColor, 1.0);
}
