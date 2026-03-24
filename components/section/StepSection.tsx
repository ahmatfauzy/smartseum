"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  ScanQrCode,
  BookOpenText,
  ArrowRight,
} from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: Globe,
    title: "Kunjungi SmartSeum",
    description:
      "Buka aplikasi SmartSeum di browser Anda. Temukan koleksi karya seni dan pajangan museum 3D yang telah dikurasi dari berbagai daerah di Indonesia.",
    color: "from-emerald-500 to-teal-400",
    bg: "bg-emerald-500/10 dark:bg-emerald-500/20",
    border: "border-emerald-500/30",
    iconColor: "text-emerald-500",
    mockup: <WebMockup />,
  },
  {
    number: "02",
    icon: ScanQrCode,
    title: "Scan QR Code Koleksi",
    description:
      "Arahkan kamera ke QR Code yang tertempel di samping setiap pajangan. Dalam hitungan detik, informasi lengkap dan model 3D akan terbuka secara otomatis.",
    color: "from-violet-500 to-purple-500",
    bg: "bg-violet-500/10 dark:bg-violet-500/20",
    border: "border-violet-500/30",
    iconColor: "text-violet-500",
    mockup: <QRMockup />,
  },
  {
    number: "03",
    icon: BookOpenText,
    title: "Jelajahi dalam 3D & Pelajari Sejarahnya",
    description:
      "Dialog interaktif menampilkan model 3D karya yang bisa diputar dan di-zoom, disertai narasi sejarah, penjelasan seniman, hingga era pembuatannya.",
    color: "from-cyan-500 to-blue-400",
    bg: "bg-cyan-500/10 dark:bg-cyan-500/20",
    border: "border-cyan-500/30",
    iconColor: "text-cyan-500",
    mockup: <PopupMockup />,
  },
];

const AUTO_ADVANCE_INTERVAL = 3500;

export default function StepSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length);
    }, AUTO_ADVANCE_INTERVAL);
  };

  useEffect(() => {
    if (!isPaused) startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  const handleStepClick = (i: number) => {
    setActiveStep(i);
    setIsPaused(true);
    // resume auto-advance after 8s of manual interaction
    setTimeout(() => setIsPaused(false), 8000);
  };

  const step = STEPS[activeStep];

  return (
    <section className="w-full bg-transparent transition-colors py-24 px-6 md:px-12 lg:px-24 overflow-hidden relative">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16 space-y-4"
      >
        <p className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-widest">
          Cara Kerja
        </p>
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-black dark:text-white max-w-2xl mx-auto leading-tight">
          Belajar Sejarah Jadi Semakin{" "}
          <span className="italic font-light">Menarik</span>
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-base leading-relaxed">
          Hanya dengan tiga langkah sederhana, Anda sudah bisa menikmati
          pengalaman museum interaktif dari mana saja.
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
        {/* Step list (left) */}
        <div className="flex flex-col gap-2 lg:w-[42%] w-full">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const isActive = activeStep === i;
            return (
              <motion.button
                key={i}
                onClick={() => handleStepClick(i)}
                className={`text-left rounded-2xl border p-5 transition-all duration-300 cursor-pointer w-full ${
                  isActive
                    ? `${s.bg} ${s.border}`
                    : "border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600"
                }`}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${isActive ? s.bg : "bg-gray-100 dark:bg-gray-800"} transition-colors`}
                  >
                    <Icon
                      className={`w-5 h-5 ${isActive ? s.iconColor : "text-gray-400 dark:text-gray-500"} transition-colors`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-xs font-bold tabular-nums ${isActive ? s.iconColor : "text-gray-300 dark:text-gray-600"}`}
                      >
                        {s.number}
                      </span>
                      <span
                        className={`text-sm font-semibold truncate ${isActive ? "text-black dark:text-white" : "text-gray-500 dark:text-gray-400"}`}
                      >
                        {s.title}
                      </span>
                    </div>
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.p
                          key={`desc-${i}`}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35 }}
                          className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed overflow-hidden"
                        >
                          {s.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                  {isActive && (
                    <ArrowRight
                      className={`w-4 h-4 shrink-0 mt-3 ${s.iconColor}`}
                    />
                  )}
                </div>
                {/* Progress bar */}
                {isActive && !isPaused && (
                  <div className="mt-4 h-0.5 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
                    <motion.div
                      key={`bar-${i}`}
                      className={`h-full bg-linear-to-r ${s.color} rounded-full`}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{
                        duration: AUTO_ADVANCE_INTERVAL / 1000,
                        ease: "linear",
                      }}
                    />
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Visual mockup (right) */}
        <div className="flex-1 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="w-full"
            >
              {step.mockup}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Mockup Components ─────────────────────────────── */

function WebMockup() {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 overflow-hidden shadow-sm">
      {/* browser chrome */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
        <span className="w-3 h-3 rounded-full bg-red-400" />
        <span className="w-3 h-3 rounded-full bg-yellow-400" />
        <span className="w-3 h-3 rounded-full bg-green-400" />
        <div className="ml-3 flex-1 bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1 text-xs text-gray-400 dark:text-gray-500">
          smartseum.app
        </div>
      </div>
      {/* Fake page */}
      <div className="p-6 space-y-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-full w-1/3" />
        <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-lg w-3/4" />
        <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-lg w-2/3" />
        <div className="grid grid-cols-3 gap-3 pt-2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="aspect-square rounded-xl bg-blue-100 dark:bg-blue-900/30"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function QRMockup() {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 overflow-hidden shadow-sm">
      {/* Phone "viewfinder" */}
      <div className="p-6 flex flex-col items-center gap-4">
        <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">
          Arahkan kamera ke QR Code
        </p>
        {/* camera viewfinder */}
        <div className="relative w-52 h-52 rounded-2xl overflow-hidden border-2 border-violet-500/40 bg-black flex items-center justify-center">
          {/* corner markers */}
          {["top-left", "top-right", "bottom-left", "bottom-right"].map(
            (pos) => {
              const [v, h] = pos.split("-");
              return (
                <div
                  key={pos}
                  className={`absolute ${v === "top" ? "top-2" : "bottom-2"} ${h === "left" ? "left-2" : "right-2"} w-5 h-5 border-2 border-violet-400`}
                  style={{
                    borderRight: h === "left" ? "none" : undefined,
                    borderLeft: h === "right" ? "none" : undefined,
                    borderBottom: v === "top" ? "none" : undefined,
                    borderTop: v === "bottom" ? "none" : undefined,
                  }}
                />
              );
            }
          )}
          {/* QR grid */}
          <div className="grid grid-cols-5 gap-1 p-2 opacity-60">
            {[...Array(25)].map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-sm"
                style={{
                  backgroundColor:
                    [0, 1, 2, 5, 10, 12, 14, 17, 18, 20, 21, 22, 24].includes(
                      i
                    )
                      ? "#c4b5fd"
                      : "#1f1f2e",
                }}
              />
            ))}
          </div>
          {/* scanning beam */}
          <motion.div
            className="absolute left-0 right-0 h-0.5 bg-violet-400/70 shadow-[0_0_8px_2px_rgba(167,139,250,0.5)]"
            initial={{ top: "10%" }}
            animate={{ top: ["10%", "90%", "10%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </div>
        {/* success pulse */}
        <motion.div
          className="flex items-center gap-2 text-violet-500 text-sm font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ delay: 1.5, duration: 1.5, repeat: Infinity }}
        >
          <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
          QR Terdeteksi…
        </motion.div>
      </div>
    </div>
  );
}

function PopupMockup() {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 overflow-hidden shadow-sm">
      <div className="p-6 space-y-4">
        {/* Dialog header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="h-3 w-20 rounded bg-amber-400/40" />
            <div className="h-5 w-40 rounded-lg bg-gray-200 dark:bg-gray-800" />
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm font-medium">
            ✕
          </div>
        </div>

        {/* 3D model placeholder (spinning box illusion) */}
        <div className="w-full h-40 rounded-xl bg-linear-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/20 flex items-center justify-center relative overflow-hidden">
          <motion.div
            className="w-20 h-20 border-2 border-emerald-400 relative"
            style={{ transformStyle: "preserve-3d" }}
            animate={{ rotateY: 360, rotateX: 15 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute inset-0 border-2 border-emerald-300/50 rotate-45" />
          </motion.div>
          <div className="absolute bottom-2 text-center w-full text-emerald-400 text-xs opacity-60 tracking-wider">
            Model 3D Interaktif
          </div>
        </div>

        {/* Info rows */}
        <div className="space-y-2">
          {["Nama Karya", "Asal Daerah", "Tahun Pembuatan", "Seniman"].map(
            (label, i) => (
              <motion.div
                key={label}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 + 0.3 }}
              >
                <div className="h-2 w-2 rounded-full bg-emerald-400 shrink-0" />
                <div className="flex justify-between w-full">
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {label}
                  </span>
                  <div className="h-3 w-24 rounded bg-gray-200 dark:bg-gray-700" />
                </div>
              </motion.div>
            )
          )}
        </div>

        {/* CTA button */}
        <motion.div
          className="w-full h-10 rounded-full bg-linear-to-r from-emerald-500 to-teal-400 flex items-center justify-center text-white text-sm font-medium gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Baca Selengkapnya <ArrowRight className="w-4 h-4" />
        </motion.div>
      </div>
    </div>
  );
}
