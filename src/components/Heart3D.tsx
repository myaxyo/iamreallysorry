"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function HeartMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const elapsed = useRef(0);

  useFrame((_, delta) => {
    if (meshRef.current) {
      elapsed.current += delta;
      // Beating animation
      const scale = 1 + Math.sin(elapsed.current * 2) * 0.1;
      meshRef.current.scale.set(scale, scale, scale);
      meshRef.current.rotation.y += 0.01;
    }
  });

  // Create heart shape
  const heartShape = new THREE.Shape();
  const x = 0,
    y = 0;
  heartShape.moveTo(x + 0.5, y + 0.5);
  heartShape.bezierCurveTo(x + 0.5, y + 0.5, x + 0.4, y, x, y);
  heartShape.bezierCurveTo(x - 0.6, y, x - 0.6, y + 0.7, x - 0.6, y + 0.7);
  heartShape.bezierCurveTo(x - 0.6, y + 1.1, x - 0.35, y + 1.54, x + 0.5, y + 1.9);
  heartShape.bezierCurveTo(x + 1.35, y + 1.54, x + 1.6, y + 1.1, x + 1.6, y + 0.7);
  heartShape.bezierCurveTo(x + 1.6, y + 0.7, x + 1.6, y, x + 1.0, y);
  heartShape.bezierCurveTo(x + 0.7, y, x + 0.5, y + 0.5, x + 0.5, y + 0.5);

  const extrudeSettings = {
    depth: 0.4,
    bevelEnabled: true,
    bevelSegments: 8,
    steps: 2,
    bevelSize: 0.1,
    bevelThickness: 0.1,
  };

  return (
    <mesh ref={meshRef} position={[0, -0.5, 0]} rotation={[Math.PI, 0, 0]}>
      <extrudeGeometry args={[heartShape, extrudeSettings]} />
      <meshStandardMaterial color="#ff1744" metalness={0.3} roughness={0.4} />
    </mesh>
  );
}

function FloatingParticles() {
  const groupRef = useRef<THREE.Group>(null);
  const elapsed = useRef(0);

  useFrame((_, delta) => {
    if (groupRef.current) {
      elapsed.current += delta;
      groupRef.current.rotation.y = elapsed.current * 0.2;
    }
  });

  const particles = Array.from({ length: 20 }, (_, i) => ({
    position: [
      (Math.random() - 0.5) * 6,
      (Math.random() - 0.5) * 6,
      (Math.random() - 0.5) * 6,
    ] as [number, number, number],
    scale: Math.random() * 0.08 + 0.02,
    key: i,
  }));

  return (
    <group ref={groupRef}>
      {particles.map((p) => (
        <mesh key={p.key} position={p.position}>
          <sphereGeometry args={[p.scale, 8, 8]} />
          <meshStandardMaterial
            color="#ff6b9d"
            emissive="#ff1744"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function Heart3D() {
  return (
    <div className="w-full h-[300px] md:h-[500px]">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }} frameloop="always">
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ff6b9d" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff1744" />
        <spotLight
          position={[0, 5, 5]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          color="#ffffff"
        />
        <HeartMesh />
        <FloatingParticles />
      </Canvas>
    </div>
  );
}
