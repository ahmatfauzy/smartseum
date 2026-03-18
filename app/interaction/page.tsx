"use client";

import React, { useState, useEffect } from "react";
import { CameraPreview } from "@/components/interaction/CameraPreview";
import { QRList } from "@/components/interaction/QRList";
import { ScanOverlay } from "@/components/interaction/ScanOverlay";
import { ScanResult } from "@/components/interaction/ScanResult";
import { Scene } from "@/components/three/Scene";
import { QRItem } from "@/datas/qrItems";

export default function InteractionPage() {
  const [selectedQR, setSelectedQR] = useState<QRItem | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleSelectQR = (qr: QRItem) => {
    if (isScanning || showResult) return;

    setIsScanning(true);
    
    setTimeout(() => {
      setSelectedQR(qr);
      setIsScanning(false);
      setShowResult(true);
    }, 1500);
  };

  const handleReset = () => {
    setSelectedQR(null);
    setShowResult(false);
    setIsScanning(false);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <main className="relative w-full h-screen bg-black overflow-hidden font-sans">
      {/* 1. Underlying Camera Feed / Background 
          When scanning finishes (showResult is true), we freeze the camera by passing isPaused. */}
      <CameraPreview isPaused={showResult} />

      {/* 2. Scanning Effect Overlay */}
      <ScanOverlay isScanning={isScanning} selectedQR={selectedQR} />

      {/* 3. The 3D Scene appears after successful scan */}
      {showResult && <Scene selectedQR={selectedQR} />}

      {/* 4. The QR List at the bottom (disabled visually while evaluating a QR) */}
      <div className={`transition-opacity duration-500 ${isScanning || showResult ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <QRList selectedQR={null} onSelectQR={handleSelectQR} />
      </div>

      {/* 5. Result Interface at bottom (Object name & Action button) */}
      {showResult && (
        <ScanResult item={selectedQR} onReset={handleReset} />
      )}
    </main>
  );
}
