uniform sampler2D texCurrent;
uniform sampler2D texNext;
uniform float scrollMix;
uniform sampler2D galleryFrom;
uniform sampler2D galleryTo;
uniform float galleryMix;
uniform float opacity;
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform vec3 uAccentColor;
varying vec2 vUv;

float noise(vec2 co) {
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    vec2 uv = vUv;
    vec2 affectedUv = uv;

    float imageAspect = 1.0;
    float canvasAspect = uResolution.x / uResolution.y;
    if (canvasAspect > imageAspect) {
        affectedUv.y = 0.5 + (affectedUv.y - 0.5) * (imageAspect / canvasAspect);
    } else {
        affectedUv.x = 0.5 + (affectedUv.x - 0.5) * (canvasAspect / imageAspect);
    }

    float timeStep = floor(uTime * 15.0) / 15.0;
    float transitionWave = sin(galleryMix * 3.14159265);
    float rowSlice = step(0.95, noise(vec2(floor(affectedUv.y * 60.0), timeStep)));
    vec2 finalSampleUv = clamp(affectedUv + vec2((rowSlice * transitionWave * 0.04) + (sin(scrollMix * 3.1415) * rowSlice * 0.02), 0.0), 0.001, 0.999);

    float totalCa = 0.004 + (transitionWave * 0.012);
    vec3 colorBuffer = vec3(
        mix(texture2D(galleryFrom, finalSampleUv + vec2(totalCa, 0.0)), texture2D(galleryTo, finalSampleUv + vec2(totalCa, 0.0)), galleryMix).r,
        mix(texture2D(galleryFrom, finalSampleUv), texture2D(galleryTo, finalSampleUv), galleryMix).g,
        mix(texture2D(galleryFrom, finalSampleUv - vec2(totalCa, 0.0)), texture2D(galleryTo, finalSampleUv - vec2(totalCa, 0.0)), galleryMix).b
    );
    vec3 nextProj = texture2D(texNext, finalSampleUv).rgb;
    vec3 finalWorkColor = mix(colorBuffer, nextProj, scrollMix);

    float fineGridLines = sin(uv.y * 400.0) * cos(uv.x * 400.0);
    finalWorkColor.rgb += fineGridLines * 0.03;

    float outerFrameMask = smoothstep(0.497, 0.493, max(abs(uv.x - 0.5), abs(uv.y - 0.5)));
    finalWorkColor = mix(uAccentColor, finalWorkColor, outerFrameMask);

    gl_FragColor = vec4(finalWorkColor, opacity);
}
