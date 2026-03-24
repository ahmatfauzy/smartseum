// ─── UserToast – dismissable toast notification ──────────────────────────────

import { CheckCircle2, AlertCircle } from "lucide-react";
import type { ToastState } from "../types";

interface Props {
  toast: ToastState;
}

export function UserToast({ toast }: Props) {
  if (!toast) return null;

  const isOk = toast.type === "ok";

  return (
    <div
      className={`
        fixed top-5 right-5 z-50
        flex items-center gap-2.5 px-4 py-3
        rounded-xl shadow-2xl border
        text-sm font-medium
        animate-in slide-in-from-top-2 duration-200
        ${isOk
          ? "bg-[#1a1a1a] border-emerald-500/30 text-emerald-400"
          : "bg-[#1a1a1a] border-red-500/30    text-red-400"}
      `}
    >
      {isOk
        ? <CheckCircle2 className="w-4 h-4" />
        : <AlertCircle  className="w-4 h-4" />}
      {toast.msg}
    </div>
  );
}
