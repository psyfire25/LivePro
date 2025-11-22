"use client";

import { useSearch } from "./search-provider";
import type { ReactNode } from "react";

export function SearchHandler({ children }: { children: (onSearch: (query: string) => void) => ReactNode }) {
    const { setQuery } = useSearch();

    return <>{children(setQuery)}</>;
}
