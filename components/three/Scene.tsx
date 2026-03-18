"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Lighting } from "./Lighting";
import { Controls } from "./Controls";
import { ModelViewer } from "./ModelViewer";
import { QRItem } from "@/datas/qrItems";

export const Scene = ({ selectedQR }: { selectedQR: QRItem | null }) => {
  if (!selectedQR) return null;

  return (
    <div className="absolute inset-0 z-10 pointer-events-auto cursor-grab active:cursor-grabbing pb-32">
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <Lighting />
          
          <ModelViewer modelId={selectedQR.id} />
          
          <Controls />
          {/* Subtle environment reflection for premium look */}
          <Environment preset="city" background={false} blur={0.5} />
        </Suspense>
      </Canvas>
    </div>
  );
};
