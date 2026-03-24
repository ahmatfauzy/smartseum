// ─── User Management – UI Constants ─────────────────────────────────────────
// Centralised colour/icon maps so every component stays in sync automatically.

import { CheckCircle2, Clock, Ban } from "lucide-react";
import type { UserRole, UserStatus } from "./types";

export const STATUS_COLOR: Record<UserStatus, string> = {
  active:  "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  pending: "text-amber-400  bg-amber-400/10  border-amber-400/20",
  banned:  "text-red-400    bg-red-400/10    border-red-400/20",
};

export const STATUS_LABEL: Record<UserStatus, string> = {
  active:  "Aktif",
  pending: "Pending",
  banned:  "Banned",
};

export const STATUS_ICON: Record<UserStatus, React.ReactNode> = {
  active:  <CheckCircle2 className="w-3 h-3" />,
  pending: <Clock        className="w-3 h-3" />,
  banned:  <Ban          className="w-3 h-3" />,
};

export const ROLE_COLOR: Record<UserRole, string> = {
  admin:    "text-blue-400   bg-blue-400/10   border-blue-400/20",
  uploader: "text-violet-400 bg-violet-400/10 border-violet-400/20",
};

export const ROLE_LABEL: Record<UserRole, string> = {
  admin:    "Admin",
  uploader: "Uploader",
};

/** Deterministic avatar background based on user ID */
const AVATAR_COLORS = [
  "bg-blue-600",
  "bg-violet-600",
  "bg-emerald-600",
  "bg-amber-600",
  "bg-rose-600",
  "bg-cyan-600",
];

export const avatarColor = (id: string): string =>
  AVATAR_COLORS[id.charCodeAt(0) % AVATAR_COLORS.length];

/** 1-2 letter initials from a full name */
export const initials = (name: string): string =>
  name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

/** Indonesian date format */
export const formatDate = (iso: string): string =>
  new Intl.DateTimeFormat("id-ID", {
    day:   "numeric",
    month: "short",
    year:  "numeric",
  }).format(new Date(iso));
