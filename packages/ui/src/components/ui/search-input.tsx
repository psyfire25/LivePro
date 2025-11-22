"use client";
import { useEffect, useState, useRef, useCallback } from "react";

export interface SearchInputProps {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    className?: string;
    debounceMs?: number;
    autoFocus?: boolean;
}

export function SearchInput({
    value: controlledValue,
    onChange,
    placeholder = "Search... (⌘K)",
    className = "",
    debounceMs = 300,
    autoFocus = false,
}: SearchInputProps) {
    const [internalValue, setInternalValue] = useState(controlledValue || "");
    const inputRef = useRef<HTMLInputElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

    // Sync with controlled value if provided
    useEffect(() => {
        if (controlledValue !== undefined) {
            setInternalValue(controlledValue);
        }
    }, [controlledValue]);

    // Debounced onChange callback
    const debouncedOnChange = useCallback(
        (newValue: string) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                onChange?.(newValue);
            }, debounceMs);
        },
        [onChange, debounceMs]
    );

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInternalValue(newValue);
        debouncedOnChange(newValue);
    };

    // Clear search
    const handleClear = () => {
        setInternalValue("");
        onChange?.("");
        inputRef.current?.focus();
    };

    // Keyboard shortcut handler (⌘K or Ctrl+K)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                inputRef.current?.focus();
                inputRef.current?.select();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Auto focus
    useEffect(() => {
        if (autoFocus && inputRef.current) {
            inputRef.current.focus();
        }
    }, [autoFocus]);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <div className={`ui:relative ui:max-w-md ui:w-full ${className}`}>
            <span className="ui:absolute ui:left-3 ui:top-1/2 -ui:translate-y-1/2 ui:text-gray-400">
                🔍
            </span>
            <input
                ref={inputRef}
                type="text"
                placeholder={placeholder}
                value={internalValue}
                onChange={handleChange}
                className="ui:w-full ui:pl-9 ui:pr-9 ui:py-1.5 ui:bg-gray-100 dark:ui:bg-gray-900 ui:border-none ui:rounded-md ui:text-sm focus:ui:ring-2 focus:ui:ring-black/5 dark:focus:ui:ring-white/10 ui:outline-none"
            />
            {internalValue && (
                <button
                    onClick={handleClear}
                    className="ui:absolute ui:right-3 ui:top-1/2 -ui:translate-y-1/2 ui:text-gray-400 hover:ui:text-gray-600 dark:hover:ui:text-gray-300 ui:transition-colors"
                    aria-label="Clear search"
                >
                    <svg
                        className="ui:w-4 ui:h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            )}
        </div>
    );
}
