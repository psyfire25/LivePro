"use client";
import React, { type ReactNode, useEffect, useRef } from "react";

export interface ModalProps {
    /** Whether the modal is open */
    isOpen: boolean;
    /** Callback when modal should close */
    onClose: () => void;
    /** Modal title */
    title?: string;
    /** Modal content */
    children: ReactNode;
    /** Optional footer content (actions, buttons, etc.) */
    footer?: ReactNode;
    /** Size variant */
    size?: "sm" | "md" | "lg" | "xl" | "full";
    /** Whether clicking outside closes the modal */
    closeOnBackdropClick?: boolean;
    /** Whether pressing ESC closes the modal */
    closeOnEsc?: boolean;
    /** Custom className for the modal content */
    className?: string;
    /** Show close button in header */
    showCloseButton?: boolean;
    /** Center content vertically */
    centered?: boolean;
}

export function Modal({
    isOpen,
    onClose,
    title,
    children,
    footer,
    size = "md",
    closeOnBackdropClick = true,
    closeOnEsc = true,
    className = "",
    showCloseButton = true,
    centered = true,
}: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    // Handle ESC key
    useEffect(() => {
        if (!isOpen || !closeOnEsc) return;

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [isOpen, closeOnEsc, onClose]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // Handle backdrop click
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (closeOnBackdropClick && e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    // Size classes
    const sizeClasses = {
        sm: "ui:max-w-sm",
        md: "ui:max-w-md",
        lg: "ui:max-w-lg",
        xl: "ui:max-w-xl",
        full: "ui:max-w-full ui:mx-4",
    };

    return (
        <div
            className={`ui:fixed ui:inset-0 ui:z-50 ui:flex ui:p-4 ${centered ? "ui:items-center ui:justify-center" : "ui:items-start ui:justify-center ui:pt-20"
                }`}
            style={{
                animation: "modalFadeIn 0.2s ease-out",
            }}
        >
            {/* Backdrop */}
            <div
                className="ui:absolute ui:inset-0 ui:bg-black/50 ui:backdrop-blur-sm"
                onClick={handleBackdropClick}
                style={{
                    animation: "backdropFadeIn 0.2s ease-out",
                }}
            />

            {/* Modal Content */}
            <div
                ref={modalRef}
                className={`
          ui:relative ui:w-full ${sizeClasses[size]}
          ui:rounded-lg ui:shadow-2xl
          ui:flex ui:flex-col ui:max-h-[90vh]
          ${className}
        `}
                style={{
                    animation: "modalSlideIn 0.3s ease-out",
                    background: "var(--lp-card-bg)",
                    color: "var(--lp-card-fg)",
                }}
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? "modal-title" : undefined}
            >
                {/* Header */}
                {(title || showCloseButton) && (
                    <div className="ui:flex ui:items-center ui:justify-between ui:px-6 ui:py-4 ui:border-b" style={{ borderColor: 'var(--lp-card-border)' }}>
                        {title && (
                            <h2
                                id="modal-title"
                                className="ui:text-xl ui:font-semibold"
                            >
                                {title}
                            </h2>
                        )}
                        {showCloseButton && (
                            <button
                                onClick={onClose}
                                className="ui:ml-auto ui:inline-flex ui:items-center ui:justify-center ui:w-8 ui:h-8 ui:rounded-md hover:ui:bg-gray-100 dark:hover:ui:bg-slate-800 ui:transition-colors"
                                aria-label="Close modal"
                                style={{ color: 'var(--lp-card-fg)' }}
                            >
                                <svg
                                    className="ui:w-5 ui:h-5"
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
                )}

                {/* Body */}
                <div className="ui:flex-1 ui:overflow-y-auto ui:px-6 ui:py-4 ui:bg-transparent">
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div className="ui:px-6 ui:py-4 ui:border-t" style={{ borderColor: 'var(--lp-card-border)', background: 'var(--lp-card-bg)' }}>
                        {footer}
                    </div>
                )}
            </div>

            {/* Inline animations */}
            <style>{`
        @keyframes backdropFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
        </div>
    );
}
