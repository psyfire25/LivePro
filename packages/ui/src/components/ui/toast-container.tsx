import React from "react";
import { Toast, type ToastProps } from "./toast";

interface ToastContainerProps {
    /** Array of active toasts */
    toasts: Omit<ToastProps, "onDismiss">[];
    /** Callback when a toast is dismissed */
    onDismiss: (id: string) => void;
    /** Position of toast container */
    position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";
}

export function ToastContainer({
    toasts,
    onDismiss,
    position = "bottom-right",
}: ToastContainerProps) {
    const positionClasses = {
        "top-right": "ui:top-0 ui:right-0",
        "top-left": "ui:top-0 ui:left-0",
        "bottom-right": "ui:bottom-0 ui:right-0",
        "bottom-left": "ui:bottom-0 ui:left-0",
        "top-center": "ui:top-0 ui:left-1/2 ui:-translate-x-1/2",
        "bottom-center": "ui:bottom-0 ui:left-1/2 ui:-translate-x-1/2",
    };

    return (
        <div
            className={`ui:fixed ui:z-50 ui:p-4 ui:pointer-events-none ${positionClasses[position]}`}
            aria-live="polite"
            aria-atomic="true"
        >
            <div className="ui:flex ui:flex-col ui:gap-2 ui:max-w-md">
                {toasts.map((toast) => (
                    <Toast key={toast.id} {...toast} onDismiss={onDismiss} />
                ))}
            </div>
        </div>
    );
}
