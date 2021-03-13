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

    vec4 colorOutput = vec4( 0.0 );
    vec2 elapsed = time * vec2(0.0, -0.55);
    vec2 uv = ( vUv + 1.0 + elapsed ) * 0.075;

    for( int i = 1; i <= 4; i++ ) {
        float f = float( i );

        float divis = pow( 2.0, f );
        float uvPow = pow( 2.0, f - 1.0 );

        vec4 computed = texture2D(
        iChannel2, uvPow * ( displacement * uv + vec2( 0.1, 0.0 ) + ( time * 0.001 ) )
        ) / divis;
        computed += texture2D(
        iChannel2, uvPow * ( displacement * uv + vec2( 0.1 ) )
        ) / divis;
        computed += texture2D(
        iChannel2, uvPow * ( displacement * uv + vec2( 0.0, 0.1 ) + ( time * 0.001 ) )
        ) / divis;

        computed *= 0.25;

        colorOutput += computed;
    }

    colorOutput = max( colorOutput - ( 1.0 - 0.65 ), 0.0 );
    colorOutput = vec4( 1.0 - pow( ( 0.5 ), colorOutput.r * 255.0 ) );
    vec3 foam = colorOutput.rgb * 0.05;

    vec3 color = texture2D(iChannel0, vec2(vUv.x, vUv.y - time * 0.25) + displacement).rgb * displacement + 0.4;
    gl_FragColor = vec4( color * gradientFactor + colorFoam * colorFoam + foam, 1.0 );
}