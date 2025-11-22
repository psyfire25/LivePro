"use client";

import { AdminShell } from "@repo/ui";
import { useSearch } from "./search-provider";
import { ReactNode } from "react";

export function ShellWrapper({
    children,
    rightSlot
}: {
    children: ReactNode;
    rightSlot: ReactNode;
}) {
    const { setQuery } = useSearch();

    return (
        <AdminShell onSearch={setQuery} rightSlot={rightSlot}>
            {children}
        </AdminShell>
    );
}
