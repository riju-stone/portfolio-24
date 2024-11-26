import * as THREE from "three";
import { extend, Object3DNode } from "@react-three/fiber";

import vertexShader from "../shaders/ripple/rippleV.vert";
import fragmentShader from "../shaders/ripple/rippleF.frag";

export class RippleShaderMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        tMap: { value: undefined },
        uTime: { value: 0 },
        uScreen: {
          value: new THREE.Vector2(
            window.innerWidth / 2,
            window.innerHeight / 2,
          ),
        },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uPower: { value: 0 },
        uCols: { value: 1.5 },
        uColor: { value: 1 },
        uStart: { value: 0.0 },
        uKey: { value: -2 },
        uPowers: { value: new Float32Array(10).fill(0) },
      },
      transparent: true,
      depthWrite: false,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });
  }

  get color() {
    return this.uniforms.uColor.value;
  }

  set color(v) {
    this.uniforms.uColor.value = v;
  }

  get texture() {
    return this.uniforms.tMap.value;
  }

  set texture(v) {
    this.uniforms.tMap.value = v;
  }

  get time() {
    return this.uniforms.uTime.value;
  }

  set time(v) {
    this.uniforms.uTime.value = v;
  }

  get mouse() {
    return this.uniforms.uMouse.value;
  }

  set mouse(v) {
    this.uniforms.uMouse.value = v;
  }

  get key() {
    return this.uniforms.uKey.value;
  }

  set key(v) {
    this.uniforms.uKey.value = v;
  }
}

extend({ RippleShaderMaterial });
