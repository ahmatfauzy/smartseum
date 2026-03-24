"use client";

import React from "react";

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full bg-white dark:bg-black transition-colors overflow-x-hidden">
      {/* Shared Grid Overlay (Fixed to follow scroll slightly or stay fixed) */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0" />
      
      {/* Persistent Background Glows - Adjusted for better global coverage */}
      <div className="fixed top-[-5%] right-[-5%] w-[600px] h-[600px] bg-emerald-500/10 dark:bg-emerald-500/5 blur-[120px] rounded-full animate-pulse pointer-events-none z-0" />
      <div className="fixed bottom-[-5%] left-[-5%] w-[500px] h-[500px] bg-violet-600/10 dark:bg-violet-600/5 blur-[120px] rounded-full animate-pulse delay-700 pointer-events-none z-0" />
      
      {/* Extra floating subtle glow in the middle */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 blur-[150px] rounded-full pointer-events-none z-0 opacity-50" />

      <div className="relative z-10 w-full flex flex-col">
        {children}
      </div>
    </div>
  );
}
