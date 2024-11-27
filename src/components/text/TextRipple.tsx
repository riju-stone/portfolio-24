"use client";

import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { PerspectiveCamera, Text } from "@react-three/drei";
import { Canvas, createPortal, useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import "../../materials/ripple.ts";

function CustomTextComponent({ text }) {
  const matRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  const initAnim = () => {
    const gs = gsap.timeline({ paused: true });

    gs.fromTo(
      matRef.current.uniforms.uStart,
      { value: 1 },
      { value: 0, duration: 0.8, ease: "power4.inOut" },
      0,
    );
    gs.fromTo(
      matRef.current.uniforms.uPower,
      { value: 0.5 },
      { value: 0, duration: 2, ease: "power2.inOut" },
      0,
    );
    gs.set(matRef.current.uniforms.uKey, { value: -1 }, ">");
    return gs;
  };

  const [scene, target, camera] = useMemo(() => {
    const scene = new THREE.Scene();
    const target = new THREE.WebGLRenderTarget(
      window.innerWidth * 2,
      window.innerHeight * 2,
    );
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);

    camera.position.z = 20;
    return [scene, target, camera];
  }, []);

  useFrame(({ gl, clock }) => {
    gl.setRenderTarget(target);
    gl.render(scene, camera);
    gl.setRenderTarget(null);

    if (matRef.current) {
      matRef.current.uniforms.uTime.value = clock.getElapsedTime();
      matRef.current.uniforms.uMouse.value = mouse.current;
    }
  });

  useEffect(() => {
    const gs = initAnim();
    gs.play();
  });

  return (
    <group position={[0, 0, 0]}>
      {createPortal(
        <Text
          font="/fonts/pp_nikkei/PPNikkeiMaru-Regular.otf"
          fontSize={2.5}
          textAlign="left"
        >
          {text}
        </Text>,
        scene,
      )}
      <mesh>
        <planeGeometry attach="geometry" args={[40, 40, 10, 1]} />
        <rippleShaderMaterial
          ref={matRef}
          attach="material"
          texture={target.texture}
          map={target.texture}
        />
      </mesh>
    </group>
  );
}

function TextRippleComponent({ text }) {
  return (
    <Canvas>
      <PerspectiveCamera
        makeDefault
        fov={45}
        aspect={1.6}
        near={0.1}
        position={[0, 0, 8]}
      />
      <ambientLight intensity={1} />
      <CustomTextComponent text={text} />
    </Canvas>
  );
}

export default TextRippleComponent;
