"use client";

import React from "react";

export const Lighting = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" shadow-mapSize={[1024, 1024]} castShadow />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#00ffff" />
      <spotLight position={[0, 10, 0]} intensity={1.5} penumbra={1} color="#ff00ff" />
    </>
  );
};
