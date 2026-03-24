// ─── UserFilters – search + status/role dropdowns ───────────────────────────

import { Search, ChevronDown, RefreshCw } from "lucide-react";
import type { FilterRole, FilterStatus } from "../types";

interface Props {
  search:        string;
  filterStatus:  FilterStatus;
  filterRole:    FilterRole;
  loading:       boolean;
  onSearch:      (v: string) => void;
  onStatusChange: (v: FilterStatus) => void;
  onRoleChange:  (v: FilterRole) => void;
  onRefresh:     () => void;
}

/** Shared styling for filter <select> elements */
const SELECT_CLASS =
  "h-9 pl-3 pr-8 rounded-xl border border-neutral-200 dark:border-white/8 " +
  "bg-white dark:bg-white/4 text-sm text-neutral-600 dark:text-white/70 " +
  "focus:outline-none focus:ring-2 focus:ring-blue-500/30 appearance-none " +
  "cursor-pointer shadow-sm dark:shadow-none";

export function UserFilters({
  search,
  filterStatus,
  filterRole,
  loading,
  onSearch,
  onStatusChange,
  onRoleChange,
  onRefresh,
}: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">

      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 dark:text-white/25" />
        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Cari nama atau email…"
          className="
            w-full h-9 pl-9 pr-4 rounded-xl
            border border-neutral-200 dark:border-white/8
            bg-white dark:bg-white/4
            text-sm text-neutral-900 dark:text-white
            placeholder:text-neutral-400 dark:placeholder:text-white/25
            focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/40
            transition-all shadow-sm dark:shadow-none
          "
        />
      </div>

      {/* Status filter */}
      <div className="relative">
        <select
          value={filterStatus}
          onChange={(e) => onStatusChange(e.target.value as FilterStatus)}
          className={SELECT_CLASS}
        >
          <option value="all">Semua Status</option>
          <option value="active">Aktif</option>
          <option value="pending">Pending</option>
          <option value="banned">Banned</option>
        </select>
        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 dark:text-white/30 pointer-events-none" />
      </div>

      {/* Role filter */}
      <div className="relative">
        <select
          value={filterRole}
          onChange={(e) => onRoleChange(e.target.value as FilterRole)}
          className={SELECT_CLASS}
        >
          <option value="all">Semua Role</option>
          <option value="admin">Admin</option>
          <option value="uploader">Uploader</option>
        </select>
        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 dark:text-white/30 pointer-events-none" />
      </div>

      {/* Refresh */}
      <button
        onClick={onRefresh}
        disabled={loading}
        title="Muat ulang data"
        className="
          h-9 w-9 flex items-center justify-center rounded-xl shrink-0
          border border-neutral-200 dark:border-white/8
          bg-white dark:bg-white/4
          text-neutral-500 dark:text-white/40
          hover:text-neutral-900 dark:hover:text-white
          hover:bg-neutral-50 dark:hover:bg-white/8
          disabled:opacity-40 disabled:cursor-not-allowed
          transition-all shadow-sm dark:shadow-none
        "
      >
        <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
      </button>
    </div>
  );
}
