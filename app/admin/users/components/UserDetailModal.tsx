// ─── UserDetailModal – read-only detail panel for a single user ──────────────

import { X, Mail, Calendar, ShieldCheck, Activity } from "lucide-react";
import type { AdminUser } from "../types";
import { UserAvatar } from "./UserAvatar";
import {
  STATUS_COLOR, STATUS_LABEL, STATUS_ICON,
  ROLE_COLOR,   ROLE_LABEL,
  formatDate,
} from "../constants";

interface Props {
  user:    AdminUser;
  onClose: () => void;
}

function DetailRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-neutral-100 dark:border-white/5 last:border-0">
      <div className="mt-0.5 text-neutral-400 dark:text-white/25 w-4 shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] text-neutral-400 dark:text-white/30 font-medium uppercase tracking-wider mb-0.5">{label}</p>
        <div className="text-sm text-neutral-800 dark:text-white/80 font-medium break-all">{value}</div>
      </div>
    </div>
  );
}

export function UserDetailModal({ user, onClose }: Props) {
  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-sm bg-white dark:bg-[#141414] border border-neutral-200 dark:border-white/8 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100 dark:border-white/5">
          <p className="text-sm font-semibold text-neutral-800 dark:text-white/80">Detail Pengguna</p>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 dark:text-white/30 dark:hover:text-white/70 dark:hover:bg-white/6 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Avatar + name */}
        <div className="flex flex-col items-center gap-3 px-5 pt-6 pb-4">
          <UserAvatar id={user.id} name={user.name} image={user.image} size="md" />
          <div className="text-center">
            <p className="font-semibold text-neutral-900 dark:text-white">{user.name}</p>
            <p className="text-xs text-neutral-500 dark:text-white/35 mt-0.5">{user.email}</p>
          </div>
          {/* Badges */}
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${ROLE_COLOR[user.role]}`}>
              {ROLE_LABEL[user.role]}
            </span>
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${STATUS_COLOR[user.status]}`}>
              {STATUS_ICON[user.status]}
              {STATUS_LABEL[user.status]}
            </span>
          </div>
        </div>

        {/* Detail rows */}
        <div className="px-5 pb-5">
          <DetailRow icon={<Mail      className="w-4 h-4" />} label="Email"      value={user.email} />
          <DetailRow icon={<ShieldCheck className="w-4 h-4" />} label="Role"    value={ROLE_LABEL[user.role]} />
          <DetailRow icon={<Activity  className="w-4 h-4" />} label="Status"    value={STATUS_LABEL[user.status]} />
          <DetailRow icon={<Calendar  className="w-4 h-4" />} label="Bergabung" value={formatDate(user.createdAt)} />
        </div>
      </div>
    </div>
  );
}
