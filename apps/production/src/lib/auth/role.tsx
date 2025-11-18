"use client";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { getMembership } from "@/lib/api/client";

export type Role = "DIRECTOR"|"MANAGER"|"LEAD"|"STAFF";
const rank: Record<Role, number> = { DIRECTOR:4, MANAGER:3, LEAD:2, STAFF:1 };
export function hasMinRole(current: Role, min: Role) { return rank[current] >= rank[min]; }

export function useWorkspaceId() {
  const sp = useSearchParams();
  return useMemo(() => sp.get('w') || (typeof window!=='undefined' ? localStorage.getItem('livepro.workspace') || '' : ''), [sp]);
}

export function useWorkspaceRole() {
  const { user } = useUser();
  const workspaceId = useWorkspaceId();
  const [role, setRole] = useState<Role>("STAFF");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!workspaceId || !user?.id) { setLoading(false); return; }
      try {
        const m = await getMembership(workspaceId, user.id);
        if (m?.role) setRole(m.role as Role);
      } finally { setLoading(false); }
    })();
  }, [workspaceId, user?.id]);

  return { workspaceId, role, loading };
}
