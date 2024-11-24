"use client";

import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { PerspectiveCamera, Text } from "@react-three/drei";
import { Canvas, createPortal, useFrame } from "@react-three/fiber";
import "../../materials/ripple";

function CustomTextComponent({ text }) {
  const matRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  const [scene, target, camera] = useMemo(() => {
    const scene = new THREE.Scene();
    const target = new THREE.WebGLRenderTarget(
      window.innerWidth * 2,
      window.innerHeight * 2,
    );
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);

    camera.position.z = 20;
    return [scene, target, camera];
  }, []);

  useFrame(({ gl, clock }) => {
    gl.setRenderTarget(target);
    gl.render(scene, camera);
    gl.setRenderTarget(null);

    matRef.current.uniforms.uTime.value = clock.getElapsedTime();
    matRef.current.uniforms.uMouse.value = mouse.current;
  });

  return (
    <group>
      {createPortal(
        <Text font="/fonts/pp_nikkei/PPNikkeiMaru-Regular.otf" fontSize={1}>
          {text}
        </Text>,
        scene,
      )}
      <mesh>
        <planeGeometry attach="geometry" args={[50, 50, 70, 1]} />
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
        aspect={1}
        near={0.1}
        position={[0, 0, 10]}
      />
      <ambientLight intensity={1} />
      <CustomTextComponent text={text} />
    </Canvas>
  );
}

export default TextRippleComponent;
