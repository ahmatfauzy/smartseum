// ─── UserTableRow – a single row in the user management table ───────────────

import { Trash2, Eye } from "lucide-react";
import type { AdminUser, ActionLoading, UserRole, UserStatus } from "../types";
import { UserAvatar }            from "./UserAvatar";
import { ROLE_COLOR, STATUS_COLOR, formatDate } from "../constants";

interface Props {
  user:          AdminUser;
  actionLoading: ActionLoading;
  onPatch:       (id: string, payload: Partial<{ role: UserRole; status: UserStatus }>, field: "role" | "status") => void;
  onDelete:      (id: string, name: string) => void;
  onViewDetail:  (user: AdminUser) => void;
}

/** Tiny inline spinner */
function InlineSpinner() {
  return (
    <div className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 border border-current/40 border-t-current rounded-full animate-spin" />
  );
}

export function UserTableRow({ user, actionLoading, onPatch, onDelete, onViewDetail }: Props) {
  const isActing   = actionLoading?.id === user.id;
  const actingRole = isActing && actionLoading?.field === "role";
  const actingStatus = isActing && actionLoading?.field === "status";
  const actingDelete = isActing && actionLoading?.field === "delete";

  return (
    <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 items-center px-5 py-3.5 hover:bg-neutral-50 dark:hover:bg-white/2 transition-colors group">

      {/* Identity */}
      <div className="flex items-center gap-3 min-w-0">
        <UserAvatar id={user.id} name={user.name} image={user.image} />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-neutral-900 dark:text-white/85 truncate">{user.name}</p>
          <p className="text-[11px] text-neutral-500 dark:text-white/30 truncate">{user.email}</p>
        </div>
      </div>

      {/* Join date */}
      <span className="hidden sm:block text-xs text-neutral-400 dark:text-white/35">
        {formatDate(user.createdAt)}
      </span>

      {/* Role selector */}
      <div className="relative">
        <select
          value={user.role}
          disabled={actingRole}
          onChange={(e) => onPatch(user.id, { role: e.target.value as UserRole }, "role")}
          className={`w-full text-xs font-semibold px-2.5 py-1 rounded-lg border cursor-pointer focus:outline-none appearance-none transition-all bg-transparent ${ROLE_COLOR[user.role]}`}
        >
          <option value="admin"    className="bg-white text-neutral-900 dark:bg-[#1a1a1a] dark:text-white">Admin</option>
          <option value="uploader" className="bg-white text-neutral-900 dark:bg-[#1a1a1a] dark:text-white">Uploader</option>
        </select>
        {actingRole && <InlineSpinner />}
      </div>

      {/* Status selector */}
      <div className="relative">
        <select
          value={user.status}
          disabled={actingStatus}
          onChange={(e) => onPatch(user.id, { status: e.target.value as UserStatus }, "status")}
          className={`w-full text-xs font-semibold px-2.5 py-1 rounded-lg border cursor-pointer focus:outline-none appearance-none transition-all bg-transparent ${STATUS_COLOR[user.status]}`}
        >
          <option value="active"  className="bg-white text-neutral-900 dark:bg-[#1a1a1a] dark:text-white">Aktif</option>
          <option value="pending" className="bg-white text-neutral-900 dark:bg-[#1a1a1a] dark:text-white">Pending</option>
          <option value="banned"  className="bg-white text-neutral-900 dark:bg-[#1a1a1a] dark:text-white">Banned</option>
        </select>
        {actingStatus && <InlineSpinner />}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        {/* View detail */}
        <button
          onClick={() => onViewDetail(user)}
          className="opacity-0 group-hover:opacity-100 w-7 h-7 flex items-center justify-center rounded-lg text-neutral-400 dark:text-white/30 hover:text-blue-500 hover:bg-blue-50 dark:hover:text-blue-400 dark:hover:bg-blue-400/10 transition-all"
          title="Lihat detail"
        >
          <Eye className="w-3.5 h-3.5" />
        </button>

        {/* Delete */}
        <button
          onClick={() => onDelete(user.id, user.name)}
          disabled={actingDelete}
          className="opacity-0 group-hover:opacity-100 w-7 h-7 flex items-center justify-center rounded-lg text-neutral-400 dark:text-white/30 hover:text-red-500 hover:bg-red-50 dark:hover:text-red-400 dark:hover:bg-red-400/10 transition-all disabled:opacity-30"
          title="Hapus pengguna"
        >
          {actingDelete
            ? <div className="w-3.5 h-3.5 border border-red-500/40 border-t-red-500 dark:border-red-400/40 dark:border-t-red-400 rounded-full animate-spin" />
            : <Trash2 className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
}
