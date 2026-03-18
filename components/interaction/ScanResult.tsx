"use client";

import React from "react";
import { motion } from "framer-motion";
import { QRItem } from "@/datas/qrItems";
import Link from "next/link";
import { ArrowRight, Maximize, MapPin, Calendar } from "lucide-react";

export const ScanResult = ({
  item,
  onReset,
}: {
  item: QRItem | null;
  onReset: () => void;
}) => {
  if (!item) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="absolute bottom-0 w-full z-40 p-6 pointer-events-none flex flex-col items-center"
    >
      <div className="w-full max-w-sm sm:max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 pointer-events-auto shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
        
        {/* Header Action */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-white/60 text-xs font-semibold tracking-widest uppercase">
            Objek Ditemukan
          </span>
          <button 
            onClick={onReset}
            className="bg-black/40 hover:bg-black/60 text-white/90 p-2 rounded-full transition-colors flex items-center justify-center border border-white/10"
          >
            <Maximize className="w-4 h-4" />
          </button>
        </div>

        {/* Info */}
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-4">
          {item.name}
        </h2>

        <div className="flex flex-col gap-2 mb-6 text-sm text-white/80">
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-white/50" />
            <span>{item.origin || "Tidak diketahui"}</span>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-white/50" />
            <span>{item.year || "Tidak diketahui"}</span>
          </div>
        </div>

        <p className="text-white/70 text-sm mb-8 leading-relaxed line-clamp-2">
          {item.description}
        </p>
        
        {/* Button */}
        <Link
          href={`/artifact/${item.id}`}
          className="group w-full flex flex-row items-center justify-center gap-3 bg-white text-black font-semibold px-8 py-3.5 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
        >
          Detail Penjelasan
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};
