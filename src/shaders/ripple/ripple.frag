precision highp float;
precision highp int;

uniform sampler2D tMap;
uniform float uTime;
uniform vec2 uScreen;
uniform vec2 uMouse;

uniform float uPower;
uniform float uCols;
uniform float uColor;
uniform float uStart;
uniform float uKey;
uniform float uPowers[10];


varying vec2 vUv;
varying vec2 vUvR;

varying vec3 vPos;
varying float vId;
varying vec3 vIndex;


float ripple(float uv, float time, float prog) {
        float distance = length((uv ) + time  );
        return tan(distance * (prog) ) * (-.01);
      }

void main() {
    float time = abs(sin(uTime * 0.002));
    float time2 = (sin(uTime * 0.001));
    float time3 = abs( sin(uTime * 0.001) ) ;
    float rippleUV = 0.;
    float cols = uCols;
    float startshit = 0.;
    float halfv = (vUvR.y - 1.) * 7.; 
    float halfanim = 0.;
    vec3 tex = vec3(0.);

    float difIndex = 0.;

    float sumac = 0.;
    time3 = abs( sin(uTime * 0.0008) ) ;
    time2 = (sin(uTime * 0.0008));

    float mPos = 0.;
    float mPower = 0.;

    highp int index = int(vId);

    if(uKey == -2.){
      mPower = 1. - uStart;
      mPos = (uStart - 1.)*1. ;

      startshit =  (( (halfv * .001)) * uStart);
      sumac = (ripple(vUvR.y ,mPos, cols) * ( (.4  ) * ( 1. - mPower + (1. * uPower) ) ) );
      rippleUV = (vUv.x + (startshit)) + sumac;
      tex = texture2D(tMap, vec2(rippleUV, vUv.y) ).rgb;
    }
    else if(uKey != -1.){
      time2 = uMouse.x * -2. ;
      time3 = .0;
      halfanim = 1.;
          mPos = uPowers[index] * -2.;
          mPower = abs(uPowers[index] * (2. - abs(time2 * .5) ));
          sumac = (ripple(vUvR.y ,mPos, cols) * ( (.2 * (1. - mPower)  ) * ( 1. - mPower  ) ) );

          rippleUV = (vUv.x) + sumac;
          tex = texture2D(tMap, vec2(rippleUV, vUv.y) ).rgb;
    }
    else if(uKey ==  -1.){
          mPos = uPowers[index] * -2.;
          mPower = abs(uPowers[index] *(2. - abs(time2 * .5) ));
          sumac = (ripple(vUv.y ,mPos, cols) * ( (.2 * (1. - mPower)  ) * ( 1. - mPower  ) ) );
          rippleUV = (vUv.x) + sumac;
          tex = texture2D(tMap, vec2(rippleUV, vUv.y) ).rgb;
    }

    float signedDist = max(min(tex.r, tex.g), min(max(tex.r, tex.g), tex.b)) - 0.5;
    float d = fwidth(signedDist);
    float alpha = smoothstep(-d, d, signedDist);
    gl_FragColor.rgb = vec3(uColor);
    gl_FragColor.a = alpha * (1. - uStart * 1.9);
    if(uKey ==  -2.){
        gl_FragColor.a -= abs(sumac * 8.);
    }
    else{
        gl_FragColor.a -= abs(sumac * 8.);
    }
}
