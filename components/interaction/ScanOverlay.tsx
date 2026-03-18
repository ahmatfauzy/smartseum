"use client";

import React from "react";
import { motion } from "framer-motion";
import { QRItem } from "@/datas/qrItems";

export const ScanOverlay = ({
  isScanning,
  selectedQR,
}: {
  isScanning: boolean;
  selectedQR: QRItem | null;
}) => {
  if (!isScanning) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-20 flex items-center justify-center backdrop-blur-sm bg-black/40 pointer-events-none"
    >
      <div className="relative w-64 h-64 border-2 border-white/20 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.1)]">
        {/* Animated Scanning Line */}
        <motion.div
          className="absolute top-0 left-0 w-full h-1 bg-white shadow-[0_0_15px_rgba(255,255,255,1)] rounded-full"
          animate={{
            y: ["0%", "256px", "0%"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Corner Brackets */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-white rounded-tl-xl" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-white rounded-tr-xl" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-white rounded-bl-xl" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-white rounded-br-xl" />
      </div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute bottom-1/4 text-white text-sm tracking-widest font-medium uppercase"
      >
        Scanning Object...
      </motion.p>
    </motion.div>
  );
};
