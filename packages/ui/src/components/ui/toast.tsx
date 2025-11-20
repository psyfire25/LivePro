import React from "react";

export type ToastVariant = "success" | "error" | "warning" | "info";

export interface ToastProps {
    /** Unique identifier */
    id: string;
    /** Toast type/variant */
    variant: ToastVariant;
    /** Main message */
    message: string;
    /** Optional title */
    title?: string;
    /** Auto-dismiss duration in ms (0 = no auto-dismiss) */
    duration?: number;
    /** Callback when dismissed */
    onDismiss: (id: string) => void;
}

export function Toast({
    id,
    variant,
    message,
    title,
    duration = 5000,
    onDismiss,
}: ToastProps) {
    const [isPaused, setIsPaused] = React.useState(false);
    const [progress, setProgress] = React.useState(100);

    React.useEffect(() => {
        if (duration === 0) return;

        const startTime = Date.now();
        const interval = setInterval(() => {
            if (!isPaused) {
                const elapsed = Date.now() - startTime;
                const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
                setProgress(remaining);

                if (remaining === 0) {
                    onDismiss(id);
                }
            }
        }, 50);

        return () => clearInterval(interval);
    }, [id, duration, isPaused, onDismiss]);

    // Variant styles
    const variantClasses = {
        success: "ui:bg-green-50 ui:border-green-200",
        error: "ui:bg-red-50 ui:border-red-200",
        warning: "ui:bg-yellow-50 ui:border-yellow-200",
        info: "ui:bg-blue-50 ui:border-blue-200",
    };

    const iconColors = {
        success: "ui:text-green-600",
        error: "ui:text-red-600",
        warning: "ui:text-yellow-600",
        info: "ui:text-blue-600",
    };

    const progressColors = {
        success: "ui:bg-green-500",
        error: "ui:bg-red-500",
        warning: "ui:bg-yellow-500",
        info: "ui:bg-blue-500",
    };

    // Icons
    const icons = {
        success: (
            <svg className="ui:w-5 ui:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
        ),
        error: (
            <svg className="ui:w-5 ui:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        ),
        warning: (
            <svg className="ui:w-5 ui:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        ),
        info: (
            <svg className="ui:w-5 ui:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    };

    return (
        <div
            className={`
        ui:relative ui:w-full ui:max-w-sm ui:pointer-events-auto
        ui:rounded-lg ui:border ui:shadow-lg
        ui:overflow-hidden
        ${variantClasses[variant]}
      `}
            style={{
                animation: "toastSlideIn 0.3s ease-out",
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            role="alert"
        >
            <div className="ui:p-4 ui:flex ui:items-start ui:gap-3">
                {/* Icon */}
                <div className={`ui:flex-shrink-0 ${iconColors[variant]}`}>
                    {icons[variant]}
                </div>

                {/* Content */}
                <div className="ui:flex-1 ui:min-w-0">
                    {title && (
                        <p className="ui:text-sm ui:font-semibold ui:text-gray-900 ui:mb-1">
                            {title}
                        </p>
                    )}
                    <p className="ui:text-sm ui:text-gray-300">{message}</p>
                </div>

                {/* Close button */}
                <button
                    onClick={() => onDismiss(id)}
                    className="ui:flex-shrink-0 ui:inline-flex ui:items-center ui:justify-center ui:w-6 ui:h-6 ui:rounded-md ui:text-gray-400 hover:ui:text-gray-600 ui:transition-colors"
                    aria-label="Dismiss"
                >
                    <svg className="ui:w-4 ui:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Progress bar */}
            {duration > 0 && (
                <div className="ui:h-1 ui:bg-gray-200/50">
                    <div
                        className={`ui:h-full ui:transition-all ui:duration-75 ${progressColors[variant]}`}
                        style={{ width: `${progress}%` }}
                    />
                </div>
            )}

            {/* Inline animations */}
            <style>{`
        @keyframes toastSlideIn {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
        </div>
    );
}
