"use client";

import React from "react";
import { QRCard } from "./QRCard";
import { QRItem, qrItems } from "@/datas/qrItems";

export const QRList = ({
  selectedQR,
  onSelectQR,
}: {
  selectedQR: QRItem | null;
  onSelectQR: (item: QRItem) => void;
}) => {
  return (
    <div className="absolute bottom-6 left-0 right-0 z-30">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center gap-4 overflow-x-auto pb-6 pt-4 snap-x snap-mandatory hide-scrollbars">
          {qrItems.map((item) => (
            <div key={item.id} className="snap-center first:pl-2 last:pr-2">
              <QRCard
                item={item}
                isSelected={selectedQR?.id === item.id}
                onClick={() => onSelectQR(item)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Basic gradient to hide scrollbar cutting off sharply */}
      <div className="absolute bottom-0 h-full w-4 sm:w-16 left-0 bg-gradient-to-r from-black/80 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 h-full w-4 sm:w-16 right-0 bg-gradient-to-l from-black/80 to-transparent pointer-events-none" />

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .hide-scrollbars::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbars {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `,
        }}
      />
    </div>
  );
};
