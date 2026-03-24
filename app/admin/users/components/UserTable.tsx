// ─── UserTable – the full table with header, rows, empty/loading states ──────

import { Users, ShieldCheck } from "lucide-react";
import type { AdminUser, ActionLoading, UserRole, UserStatus } from "../types";
import { UserTableRow } from "./UserTableRow";

interface Props {
  users:         AdminUser[];
  allCount:      number;
  loading:       boolean;
  actionLoading: ActionLoading;
  onPatch:       (id: string, payload: Partial<{ role: UserRole; status: UserStatus }>, field: "role" | "status") => void;
  onDelete:      (id: string, name: string) => void;
  onViewDetail:  (user: AdminUser) => void;
}

export function UserTable({
  users,
  allCount,
  loading,
  actionLoading,
  onPatch,
  onDelete,
  onViewDetail,
}: Props) {
  return (
    <div className="bg-white dark:bg-white/4 border border-neutral-200 dark:border-white/6 rounded-2xl overflow-hidden shadow-sm dark:shadow-none">

      {/* Column headers */}
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-5 py-3 border-b border-neutral-200 dark:border-white/5 text-[11px] font-semibold uppercase tracking-widest text-neutral-400 dark:text-white/25">
        <span>Pengguna</span>
        <span className="hidden sm:block">Bergabung</span>
        <span>Role</span>
        <span>Status</span>
        <span />
      </div>

      {/* Body */}
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-6 h-6 border-2 border-neutral-200 dark:border-white/10 border-t-blue-500 rounded-full animate-spin" />
        </div>
      ) : users.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-neutral-400 dark:text-white/25">
          <Users className="w-10 h-10 opacity-30" />
          <p className="text-sm font-medium">
            {allCount === 0 ? "Belum ada pengguna" : "Tidak ada yang cocok dengan filter"}
          </p>
        </div>
      ) : (
        <div className="divide-y divide-neutral-100 dark:divide-white/4">
          {users.map((user) => (
            <UserTableRow
              key={user.id}
              user={user}
              actionLoading={actionLoading}
              onPatch={onPatch}
              onDelete={onDelete}
              onViewDetail={onViewDetail}
            />
          ))}
        </div>
      )}

      {/* Footer */}
      {!loading && users.length > 0 && (
        <div className="px-5 py-3 border-t border-neutral-100 dark:border-white/5 flex items-center justify-between">
          <p className="text-[11px] text-neutral-500 dark:text-white/40">
            Menampilkan {users.length} dari {allCount} pengguna
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 dark:text-white/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            Data langsung dari database
          </div>
        </div>
      )}
    </div>
  );
}
