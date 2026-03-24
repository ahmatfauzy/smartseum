// ─── UserStatsBar – 4 quick-stat cards ──────────────────────────────────────

import { Users, UserCheck, Clock, Ban } from "lucide-react";
import type { AdminUser } from "../types";

interface Props {
  users:   AdminUser[];
  loading: boolean;
}

interface Stat {
  label: string;
  value: number;
  icon:  React.ReactNode;
  color: string;
  bg:    string;
}

function StatCard({ stat, loading }: { stat: Stat; loading: boolean }) {
  return (
    <div className="bg-white dark:bg-white/4 border border-neutral-200 dark:border-white/6 rounded-2xl p-4 flex items-center gap-3 shadow-sm dark:shadow-none">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${stat.color} ${stat.bg}`}>
        {stat.icon}
      </div>
      <div>
        <p className="text-xl font-bold text-neutral-900 dark:text-white tabular-nums">
          {loading ? "—" : stat.value}
        </p>
        <p className="text-[11px] text-neutral-500 font-medium">{stat.label}</p>
      </div>
    </div>
  );
}

export function UserStatsBar({ users, loading }: Props) {
  const stats: Stat[] = [
    {
      label: "Total",
      value: users.length,
      icon:  <Users     className="w-4 h-4" />,
      color: "text-neutral-500 dark:text-white/60",
      bg:    "bg-neutral-100 dark:bg-white/5",
    },
    {
      label: "Aktif",
      value: users.filter((u) => u.status === "active").length,
      icon:  <UserCheck className="w-4 h-4" />,
      color: "text-emerald-500 dark:text-emerald-400",
      bg:    "bg-emerald-500/10 dark:bg-emerald-400/8",
    },
    {
      label: "Pending",
      value: users.filter((u) => u.status === "pending").length,
      icon:  <Clock     className="w-4 h-4" />,
      color: "text-amber-500 dark:text-amber-400",
      bg:    "bg-amber-500/10 dark:bg-amber-400/8",
    },
    {
      label: "Banned",
      value: users.filter((u) => u.status === "banned").length,
      icon:  <Ban       className="w-4 h-4" />,
      color: "text-red-500 dark:text-red-400",
      bg:    "bg-red-500/10 dark:bg-red-400/8",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {stats.map((s) => (
        <StatCard key={s.label} stat={s} loading={loading} />
      ))}
    </div>
  );
}
