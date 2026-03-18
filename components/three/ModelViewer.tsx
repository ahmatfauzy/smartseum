"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float } from "@react-three/drei";

export const ModelViewer = ({ modelId }: { modelId: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Animate the rotation slightly
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float
      speed={2} 
      rotationIntensity={1} 
      floatIntensity={2} 
      floatingRange={[-0.2, 0.2]} 
    >
      {/* 
        This is a placeholder primitive shape that we render 
        if the user hasn't provided their own large .glb yet. 
        Different shapes based on modelId string value length/content.
      */}
      <mesh ref={meshRef} castShadow receiveShadow>
        {modelId === "qr-1" ? (
          <icosahedronGeometry args={[1.5, 0]} />
        ) : modelId === "qr-2" ? (
          <torusKnotGeometry args={[1, 0.3, 100, 16]} />
        ) : (
          <octahedronGeometry args={[1.5, 0]} />
        )}
        
        <meshPhysicalMaterial 
          color={modelId === "qr-1" ? "#ff2a2a" : modelId === "qr-2" ? "#2a2aff" : "#ffcc00"}
          roughness={0.1}
          metalness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transmission={0.9} 
          thickness={0.5} 
          transparent
        />
      </mesh>
    </Float>
  );
};
