"use client";

import { useEffect } from "react";
import { useSearch } from "./search-provider";

export function SearchHandler() {
    const { setQuery } = useSearch();

    useEffect(() => {
        setQuery("");
    }, [setQuery]);

    return null;
}
