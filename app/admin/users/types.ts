// ─── User Management – Shared Types ────────────────────────────────────────

export type UserRole   = "admin" | "uploader";
export type UserStatus = "pending" | "active" | "banned";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
}

/** Which field is currently being mutated for a given user id */
export type ActionLoading = { id: string; field: "role" | "status" | "delete" } | null;

export type ToastState = { type: "ok" | "err"; msg: string } | null;

export type FilterStatus = UserStatus | "all";
export type FilterRole   = UserRole   | "all";
