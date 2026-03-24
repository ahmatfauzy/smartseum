// ─── useUsers – custom hook for user management data & mutations ────────────

import { useEffect, useState, useCallback } from "react";
import type { AdminUser, ActionLoading, ToastState, UserRole, UserStatus } from "../types";

/**
 * Encapsulates all API interactions for the Admin Users page.
 * Returns data, loading states, and action handlers.
 */
export function useUsers() {
  const [users, setUsers]               = useState<AdminUser[]>([]);
  const [loading, setLoading]           = useState(true);
  const [actionLoading, setActionLoading] = useState<ActionLoading>(null);
  const [toast, setToast]               = useState<ToastState>(null);

  // ── Toast helper ──────────────────────────────────────────────────────────
  const showToast = useCallback((type: "ok" | "err", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  }, []);

  // ── Fetch all users ───────────────────────────────────────────────────────
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res  = await fetch("/api/admin/users");
      const data = await res.json();
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        showToast("err", data.error ?? "Gagal memuat pengguna");
      }
    } catch {
      showToast("err", "Koneksi gagal");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  // ── Update role or status ─────────────────────────────────────────────────
  const patchUser = useCallback(
    async (id: string, payload: Partial<{ role: UserRole; status: UserStatus }>, field: "role" | "status") => {
      setActionLoading({ id, field });
      try {
        const res  = await fetch(`/api/admin/users/${id}`, {
          method:  "PATCH",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify(payload),
        });
        const data = await res.json();
        if (res.ok) {
          setUsers((prev) => prev.map((u) => u.id === id ? { ...u, ...payload } : u));
          showToast("ok", "Berhasil diperbarui");
        } else {
          showToast("err", data.error ?? "Gagal memperbarui");
        }
      } catch {
        showToast("err", "Koneksi gagal");
      } finally {
        setActionLoading(null);
      }
    },
    [showToast],
  );

  // ── Delete user ───────────────────────────────────────────────────────────
  const deleteUser = useCallback(
    async (id: string, name: string) => {
      if (!confirm(`Hapus pengguna "${name}"? Tindakan ini tidak bisa dibatalkan.`)) return;
      setActionLoading({ id, field: "delete" });
      try {
        const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
        if (res.ok) {
          setUsers((prev) => prev.filter((u) => u.id !== id));
          showToast("ok", "Pengguna dihapus");
        } else {
          const data = await res.json();
          showToast("err", data.error ?? "Gagal menghapus");
        }
      } catch {
        showToast("err", "Koneksi gagal");
      } finally {
        setActionLoading(null);
      }
    },
    [showToast],
  );

  return {
    users,
    loading,
    actionLoading,
    toast,
    patchUser,
    deleteUser,
    refetch: fetchUsers,
  };
}
