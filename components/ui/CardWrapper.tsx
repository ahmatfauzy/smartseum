"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import Barcode from "@/public/assets/qrcode.png";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Scan, Sparkles } from "lucide-react";

type Card = {
  image: string | StaticImageData;
  title: string;
  description: string;
  href: string;
};

const CardWrapper = ({ image, title, description, href }: Card) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 300, damping: 30 });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative bg-white/5 dark:bg-black/20 border border-black/10 dark:border-white/10 backdrop-blur-md rounded-[2rem] p-4 transition-colors hover:border-emerald-500/50 shadow-2xl overflow-visible"
    >
      {/* Visual Header / Image Area */}
      <div className="relative w-full aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-gray-100 dark:bg-neutral-900 shadow-inner" style={{ transform: "translateZ(20px)" }}>
        <Image 
          src={image} 
          alt={title} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100" 
        />
        
        {/* Glowing Scan Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-emerald-500/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Digital Grid Overlay (Visible on Hover) */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-0 group-hover:opacity-30 transition-opacity" />

        {/* Floating Scan Beam */}
        <motion.div 
          className="absolute left-0 right-0 h-px bg-emerald-400 z-10 shadow-[0_0_15px_rgba(52,211,153,0.8)] opacity-0 group-hover:opacity-100"
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        {/* QR Badge */}
        <div className="absolute top-4 right-4 w-14 h-14 bg-white/90 dark:bg-black/60 backdrop-blur-md p-1.5 rounded-xl border border-white/20 shadow-xl overflow-hidden group-hover:border-emerald-500/50 transition-colors">
          <Image src={Barcode} alt="QR Code" fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0" />
        </div>

        {/* AR Badge */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1.5 bg-black/60 backdrop-blur-md text-white rounded-full text-[10px] font-bold tracking-widest uppercase border border-white/10">
          <Scan className="w-3 h-3 text-emerald-400" />
          AR Support
        </div>
      </div>

      {/* Content Area */}
      <div className="pt-6 pb-2 px-2" style={{ transform: "translateZ(30px)" }}>
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-emerald-500 transition-colors">
            {title}
          </h3>
          <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Sparkles className="w-4 h-4 text-emerald-500" />
          </div>
        </div>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 font-light leading-relaxed mb-6 line-clamp-2">
          {description}
        </p>

        <Link
          href={href}
          className="group/btn relative w-full h-12 flex items-center justify-center overflow-hidden rounded-xl bg-black dark:bg-white text-white dark:text-black font-bold text-sm transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
        >
          <span className="relative z-10 flex items-center gap-2">
            Launch Simulation
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </span>
          {/* Button Hover Glow */}
          <div className="absolute inset-0 bg-emerald-500 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
        </Link>
      </div>
    </motion.div>
  );
};

export default CardWrapper;
