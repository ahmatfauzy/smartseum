import React from "react";
import { motion } from "framer-motion";
import { QRItem } from "@/datas/qrItems";
import { Scan } from "lucide-react";

export const QRCard = ({
  item,
  isSelected,
  onClick,
}: {
  item: QRItem;
  isSelected: boolean;
  onClick: () => void;
}) => {
  return (
    <motion.button
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative flex-shrink-0 w-32 h-40 sm:w-40 sm:h-48 rounded-2xl overflow-hidden transition-all duration-300 border flex justify-center items-center ${
        isSelected
          ? "border-white bg-white/20 shadow-[0_0_15px_rgba(255,255,255,0.3)]"
          : "border-white/10 bg-black/40 hover:bg-black/60 hover:border-white/30"
      } backdrop-blur-md`}
    >
      <div className="absolute top-3 left-3 opacity-30">
        <Scan className="w-5 h-5 text-white" />
      </div>

      <div className="flex flex-col items-center gap-3 px-4 text-center mt-4">
        <h3 className="text-white text-sm sm:text-base font-semibold leading-tight line-clamp-2">
          {item.name}
        </h3>
        <p className="text-white/60 text-[10px] sm:text-xs line-clamp-3">
          {item.description}
        </p>
      </div>

      {isSelected && (
        <div className="absolute inset-0 bg-white/5 pointer-events-none" />
      )}
    </motion.button>
  );
};
