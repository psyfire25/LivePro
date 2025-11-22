"use client";

import { useWorkspaceRole } from "@/lib/auth/role";

export function UserRoleBadge() {
    const { role } = useWorkspaceRole();

    if (!role) return null;

    return (
        <span className="ui:text-xs ui:font-medium ui:bg-black/5 dark:ui:bg-white/10 ui:px-2 ui:py-1 ui:rounded-full ui:text-gray-600 dark:ui:text-gray-300">
            {role}
        </span>
    );
}
