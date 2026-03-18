"use client";

import React from "react";
import { OrbitControls } from "@react-three/drei";

export const Controls = () => {
  return (
    <OrbitControls
      enablePan={false}
      enableZoom={false}
      minPolarAngle={Math.PI / 4}
      maxPolarAngle={Math.PI / 1.5}
      autoRotate
      autoRotateSpeed={1.5}
      makeDefault
    />
  );
};
