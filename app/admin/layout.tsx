/**
 * Admin Layout (Server Component)
 *
 * Responsibilities:
 *  - Server-side session guard (belt-and-suspenders on top of middleware)
 *  - Render the sidebar + topbar shell
 *
 * The actual sidebar/topbar are Client Components imported via the
 * AdminShell wrapper so we can keep useState there.
 */

import { auth } from "@/lib/auth";
import { AdminShell } from "@/components/admin/AdminShell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Pass down the user data to the client component shell
  return <AdminShell user={session?.user || null}>{children}</AdminShell>;
}

