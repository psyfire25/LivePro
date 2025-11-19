"use client";
import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { ToastContainer } from "./toast-container";
import type { ToastVariant } from "./toast";

interface ToastData {
    id: string;
    variant: ToastVariant;
    message: string;
    title?: string;
    duration?: number;
}

interface ToastContextValue {
    /** Show a success toast */
    success: (message: string, title?: string, duration?: number) => void;
    /** Show an error toast */
    error: (message: string, title?: string, duration?: number) => void;
    /** Show a warning toast */
    warning: (message: string, title?: string, duration?: number) => void;
    /** Show an info toast */
    info: (message: string, title?: string, duration?: number) => void;
    /** Dismiss a specific toast */
    dismiss: (id: string) => void;
    /** Dismiss all toasts */
    dismissAll: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within ToastProvider");
    }
    return context;
}

interface ToastProviderProps {
    children: ReactNode;
    /** Maximum number of toasts to show at once */
    maxToasts?: number;
    /** Position of toast container */
    position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";
}

export function ToastProvider({
    children,
    maxToasts = 5,
    position = "bottom-right",
}: ToastProviderProps) {
    const [toasts, setToasts] = useState<ToastData[]>([]);

    const addToast = useCallback(
        (variant: ToastVariant, message: string, title?: string, duration = 5000) => {
            const id = `toast-${Date.now()}-${Math.random()}`;
            const newToast: ToastData = { id, variant, message, title, duration };

            setToasts((prev) => {
                // Limit number of toasts
                const updated = [...prev, newToast];
                return updated.slice(-maxToasts);
            });

            return id;
        },
        [maxToasts]
    );

    const dismiss = useCallback((id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const dismissAll = useCallback(() => {
        setToasts([]);
    }, []);

    const value: ToastContextValue = {
        success: (message, title, duration) => addToast("success", message, title, duration),
        error: (message, title, duration) => addToast("error", message, title, duration),
        warning: (message, title, duration) => addToast("warning", message, title, duration),
        info: (message, title, duration) => addToast("info", message, title, duration),
        dismiss,
        dismissAll,
    };

    return (
        <ToastContext.Provider value={value}>
            {children}
            <ToastContainer toasts={toasts} onDismiss={dismiss} position={position} />
        </ToastContext.Provider>
    );
}
