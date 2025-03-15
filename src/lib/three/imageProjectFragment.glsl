uniform sampler2D imageCurrent;
uniform sampler2D imageNext;
uniform float mixRatio;
uniform float fadeIn;
uniform float fadeOut;
varying vec2 vUv;

void main() {
  vec4 texelCurrent = texture2D(imageCurrent, vUv);
  vec4 texelNext = texture2D(imageNext, vUv);

  // Base transition between images
  vec4 transitionColor = mix(texelCurrent, texelNext, mixRatio);

  // Calculate final opacity
  float opacity = fadeIn;

  if (fadeOut > 0.0) {
    opacity = 1.0 - fadeOut;
  }

  // Apply opacity
  gl_FragColor = vec4(transitionColor.rgb, transitionColor.a * opacity);
}
