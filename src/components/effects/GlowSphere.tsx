"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

function AnimatedSphere({ mouse }: { mouse: { x: number; y: number } }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.15 + mouse.y * 0.3;
    ref.current.rotation.y = state.clock.elapsedTime * 0.2 + mouse.x * 0.3;
  });

  return (
    <Sphere ref={ref} args={[1.4, 64, 64]} scale={1.2}>
      <MeshDistortMaterial
        color="#00d4ff"
        attach="material"
        distort={0.35}
        speed={2}
        roughness={0.1}
        metalness={0.9}
        emissive="#0a1628"
        emissiveIntensity={0.4}
      />
    </Sphere>
  );
}

export function GlowSphere({
  mouse,
  className = "",
}: {
  mouse: { x: number; y: number };
  className?: string;
}) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#00d4ff" />
        <pointLight position={[-10, -5, 5]} intensity={0.8} color="#a855f7" />
        <AnimatedSphere mouse={mouse} />
      </Canvas>
    </div>
  );
}
