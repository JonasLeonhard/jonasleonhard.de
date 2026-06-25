uniform float uTime;
uniform float uAspect;
uniform vec2 uMouse;
uniform float galleryMix;
uniform float scrollMix;
uniform float opacity;
uniform vec3 uAccentColor;
uniform vec3 uForegroundColor;
uniform vec3 uBgColor;
varying vec2 vScreenUv;

const float SCALE_GRID_UNITS   = 50.0;
const float CLAMP_BUS_THICK    = 0.96;
const float CLAMP_DIAG_THICK   = 0.96;
const float CLAMP_CELL_THICK   = 0.96;

const float RUN_LENGTH_VERT    = 110.0;
const float RUN_LENGTH_HORIZ   = 90.0;
const float RUN_LENGTH_DIAG    = 60.0;

const float PROBABILITY_VERT   = 0.45;
const float PROBABILITY_HORIZ  = 0.35;
const float PROBABILITY_DIAG   = 0.12;

const float IMPACT_RAD_CURV    = 0.4;
const float IMPACT_RAD_HOVER   = 0.45;
const float FORCE_LIGHTNING    = 2.5;
const float AMPLIFY_GLOW_DARK  = 1.5;

const vec3 CYBER_BLUE_DEEP     = vec3(0.0, 0.35, 0.85);
const vec3 CYBER_BLUE_NEON     = vec3(0.0, 0.80, 1.0);
const vec3 CYBER_CYAN          = vec3(0.0, 1.0, 0.85);
const vec3 INK_SURGE_SAPPHIRE = vec3(0.0, 0.22, 0.65);

float rand(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

float drawDataBitmask(vec2 uv, float seed) {
vec2 p = clamp(uv, 0.05, 0.95);
float customBarsWidth = step(0.3, fract(p.x * 6.0 + sin(seed * 0.5))) * step(0.25, p.y) * step(p.y, 0.75);
float innerEmptySlot = step(0.45, p.x) * step(p.x, 0.55);
  return clamp(customBarsWidth - innerEmptySlot, 0.0, 1.0);
}

float drawLogicWaveform(vec2 uv, float seed) {
vec2 p = uv;
float stepLine = step(0.5, sin(p.x * 3.1415 + seed));
float normalizedStepHeight = mix(0.3, 0.7, stepLine);
  return step(normalizedStepHeight - 0.04, p.y) * step(p.y, normalizedStepHeight + 0.04);
}

void main() {
  vec2 screenUv = vScreenUv;

  vec2 ndc = screenUv * 2.0 - 1.0;
  float lensRadiusSq = ndc.x * ndc.x + ndc.y * ndc.y;
  vec2 distortedNdc = ndc * (1.0 + IMPACT_RAD_CURV * lensRadiusSq);
  screenUv = (distortedNdc + 1.0) * 0.5;

  float isLightMode = step(0.5, (uBgColor.r + uBgColor.g + uBgColor.b) / 3.0);

  vec2 cursorDiff = screenUv - uMouse;
  cursorDiff.x *= uAspect;
  float distanceToCursor = length(cursorDiff);

  float cursorAngle = atan(cursorDiff.y, cursorDiff.x);
  float discreteSpikeNoise = rand(vec2(floor(cursorAngle * 24.0), floor(uTime * 14.0))) * 0.14;

  float interactionActivity = sin(galleryMix * 3.1415) + sin(scrollMix * 3.1415);
  float globalCrackleLine = step(0.84, sin(screenUv.y * 14.0 + screenUv.x * 6.0 - uTime * 8.0 + discreteSpikeNoise * 3.5));
  float globalSurgeWave = globalCrackleLine * discreteSpikeNoise * (0.02 + interactionActivity * 3.2);
  float staticHoverForce = smoothstep(IMPACT_RAD_HOVER, 0.0, distanceToCursor);

  vec2 busUv = screenUv * vec2(SCALE_GRID_UNITS * uAspect, SCALE_GRID_UNITS);
  vec2 busFraction = fract(busUv);
  vec2 busIndex = floor(busUv);

  float vertSegment = floor(busIndex.y / RUN_LENGTH_VERT);
  float horizSegment = floor(busIndex.x / RUN_LENGTH_HORIZ);
  float diagId = busIndex.x - busIndex.y;
  float diagSegment = floor((busIndex.x + busIndex.y) / (RUN_LENGTH_DIAG * 2.0));

  float circuitWireX = step(CLAMP_BUS_THICK, busFraction.x) * step(rand(vec2(busIndex.x, vertSegment)), PROBABILITY_VERT);
  float circuitWireY = step(CLAMP_BUS_THICK, busFraction.y) * step(rand(vec2(horizSegment, busIndex.y)), PROBABILITY_HORIZ);
  float diagonalTrace = step(CLAMP_DIAG_THICK, 1.0 - abs(busFraction.x - busFraction.y)) * step(rand(vec2(diagId, diagSegment)), PROBABILITY_DIAG);
  float coreSiliconBusses = clamp(circuitWireX + circuitWireY + diagonalTrace, 0.0, 1.0);

  vec2 transistorGrid = screenUv * vec2((SCALE_GRID_UNITS + 5.0) * uAspect, SCALE_GRID_UNITS + 5.0);
  vec2 localGateUv = fract(transistorGrid);
  vec2 gateIdx = floor(transistorGrid);

  float cellSelector = rand(gateIdx);
  float telemetryPatternLayer = 0.0;
  float localCellTimeMultiplier = uTime * 0.12 + (uTime * 0.18 * staticHoverForce);

  if (cellSelector < 0.22) {
    telemetryPatternLayer = drawDataBitmask(localGateUv, localCellTimeMultiplier + rand(gateIdx)) * step(rand(gateIdx * 1.5), 0.35);
    coreSiliconBusses = 0.0;
  } else if (cellSelector > 0.82) {
    telemetryPatternLayer = drawLogicWaveform(localGateUv, localCellTimeMultiplier * 2.0 + rand(gateIdx)) * step(rand(gateIdx * 2.5), 0.3);
    coreSiliconBusses = 0.0;
  }

  float mixT = fract(gateIdx.x * 0.02 + gateIdx.y * 0.015 + uTime * 0.012);
  vec3 dynamicBlueSpectrum = mix(CYBER_BLUE_DEEP, mix(CYBER_BLUE_NEON, CYBER_CYAN, step(0.5, mixT)), mixT);

  float lumaValue = dot(dynamicBlueSpectrum, vec3(0.2126, 0.7152, 0.0722));
  float baselineShimmer = (0.5 + 0.5 * sin(uTime * 3.0 + gateIdx.x * 0.5)) * rand(gateIdx + floor(uTime * 6.0));
  vec3 grayscaleBaseColor = vec3(lumaValue * (0.5 + baselineShimmer * 0.35));

  float activationMixer = clamp(staticHoverForce + (globalSurgeWave * FORCE_LIGHTNING), 0.0, 1.0);
  vec3 processingColorProfile = mix(grayscaleBaseColor, dynamicBlueSpectrum * 1.65, activationMixer);
  vec3 activeCircuitColor = mix(processingColorProfile, uAccentColor * 1.2, staticHoverForce * 0.3);

  vec3 compositeColor = uBgColor;
  vec3 lightModeLineColor = mix(uForegroundColor * 0.16, vec3(0.0, 0.25, 0.70), clamp(globalSurgeWave * 5.0, 0.0, 1.0));
  vec3 linesContrastShade = mix(activeCircuitColor * 2.2, lightModeLineColor, isLightMode);
  compositeColor = mix(compositeColor, linesContrastShade, coreSiliconBusses * 0.38);

  float activePatternMask = max(step(CLAMP_CELL_THICK, localGateUv.x) * step(CLAMP_CELL_THICK, localGateUv.y), telemetryPatternLayer);

  vec3 finalPatternElement;
  if (isLightMode > 0.5) {
    vec3 passiveInk = mix(uBgColor, uForegroundColor * 0.38, mix(0.12, 0.48, baselineShimmer));
    finalPatternElement = mix(passiveInk, INK_SURGE_SAPPHIRE, clamp(globalSurgeWave * 4.5 + staticHoverForce * 0.6, 0.0, 1.0));
  } else {
    float glowPower = (AMPLIFY_GLOW_DARK + globalSurgeWave * 5.5 + staticHoverForce * 1.10);
    finalPatternElement = mix(activeCircuitColor, activeCircuitColor * 1.8, isLightMode) * glowPower;
  }

  compositeColor = mix(compositeColor, finalPatternElement, activePatternMask);

  float globalAlphaMultiplier = mix(0.72, 0.45, isLightMode);
  gl_FragColor = vec4(compositeColor, opacity * globalAlphaMultiplier);
}
