uniform sampler2D imageCurrent;
uniform sampler2D imageNext;
uniform float mixRatio;
uniform float fadeIn;
uniform float fadeOut;
varying vec2 vUv;

float pseudoRandom(vec2 co) {
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    vec2 uv = vUv;
    float transitionGlitch = sin(mixRatio * 3.14159265);
    
    // Clean horizontal chromatic split maps active ONLY during project transitions
    float sliceLine = step(0.95, pseudoRandom(vec2(floor(uv.y * 50.0), transitionGlitch * 2.0)));
    float chromaticOffset = sliceLine * transitionGlitch * 0.03;
    
    vec4 currR = texture2D(imageCurrent, vec2(uv.x + chromaticOffset, uv.y));
    vec4 currG = texture2D(imageCurrent, uv);
    vec4 currB = texture2D(imageCurrent, vec2(uv.x - chromaticOffset, uv.y));
    
    vec4 nextR = texture2D(imageNext, vec2(uv.x + chromaticOffset, uv.y));
    vec4 nextG = texture2D(imageNext, uv);
    vec4 nextB = texture2D(imageNext, vec2(uv.x - chromaticOffset, uv.y));
    
    vec4 finalCurrent = vec4(currR.r, currG.g, currB.b, currG.a);
    vec4 finalNext = vec4(nextR.r, nextG.g, nextB.b, nextG.a);
    
    // Variable names synchronized cleanly here:
    vec4 blendedColor = mix(finalCurrent, finalNext, mixRatio);
    float finalAlpha = blendedColor.a * fadeIn * (1.0 - fadeOut);
    
    gl_FragColor = vec4(blendedColor.rgb, finalAlpha);
}
