#ifdef GL_ES
precision mediump float;
#endif

#extension GL_OES_standard_derivatives : enable

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

uniform sampler2D iChannel0;
uniform sampler2D iChannel1;
uniform sampler2D iChannel2;

varying vec2 fragCoord;

void main( void ) {
  vec2 vUv = 2.0 * fragCoord.xy/resolution;
  vec3 gradientFactor = vec3(pow(vUv.y * 1.7, 0.75) * 0.5 + 0.2) * vec3(0.9, 0.9, 1.1);
  float scattering = 0.2;
  float wavespeed = 0.15;
  float intensity = 0.4;
  vec3 colorNoise = texture2D(iChannel1, vec2(vUv.x, vUv.y - time * 0.15) * 0.35).rgb * 0.2;
  float displacement = max((length(texture2D(iChannel1, vec2(vUv.x * cos(cos(time) * 0.3) - 0.15, vUv.y * cos(sin(time) * 0.35) * 0.85 - time * 0.35) * 20.0 * scattering * wavespeed + colorNoise.r)) * intensity) - 0.1, 0.0);
  vec3 colorFoam = (1.0 - texture2D(iChannel1, vec2(vUv.x, vUv.y - time * 0.2)).rgb) * displacement;
  vec3 foam = texture2D(iChannel2, vec2(vUv.x, vUv.y - time * 0.25) + displacement).rgb * 0.05;
  vec3 color = texture2D(iChannel0, vec2(vUv.x, vUv.y - time * 0.25) + displacement).rgb * displacement + 0.4;
  gl_FragColor = vec4( color * gradientFactor + colorFoam * colorFoam + foam, 1.0 );
}
