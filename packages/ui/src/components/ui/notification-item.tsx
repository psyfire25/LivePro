"use client";
import React from "react";

export interface Notification {
    id: string;
    type: string;
    severity: "INFO" | "SUCCESS" | "WARNING" | "ERROR";
    title: string;
    message: string;
    actionUrl?: string | null;
    read: boolean;
    createdAt: Date | string;
}

export interface NotificationItemProps {
    notification: Notification;
    onMarkAsRead?: (id: string) => void;
    onDismiss?: (id: string) => void;
    onClick?: (notification: Notification) => void;
}

export function NotificationItem({
    notification,
    onMarkAsRead,
    onDismiss,
    onClick,
}: NotificationItemProps) {
    const severityColors = {
        INFO: "ui:text-blue-600 ui:bg-blue-50",
        SUCCESS: "ui:text-green-600 ui:bg-green-50",
        WARNING: "ui:text-yellow-600 ui:bg-yellow-50",
        ERROR: "ui:text-red-600 ui:bg-red-50",
    };

    const icons = {
        INFO: (
            <svg className="ui:w-5 ui:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        SUCCESS: (
            <svg className="ui:w-5 ui:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        WARNING: (
            <svg className="ui:w-5 ui:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        ),
        ERROR: (
            <svg className="ui:w-5 ui:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    };

    const formatTime = (date: Date | string) => {
        const d = typeof date === "string" ? new Date(date) : date;
        const now = new Date();
        const diffMs = now.getTime() - d.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMins < 1) return "just now";
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return d.toLocaleDateString();
    };

    return (
        <div
            className={`
        ui:group ui:relative ui:p-4
        ui:border-b ui:border-gray-200 last:ui:border-0
        hover:ui:bg-gray-50 ui:transition-colors
        ${!notification.read ? "ui:bg-blue-50/30" : ""}
        ${onClick ? "ui:cursor-pointer" : ""}
      `}
            onClick={() => onClick?.(notification)}
        >
            <div className="ui:flex ui:items-start ui:gap-3">
                {/* Icon */}
                <div
                    className={`
            ui:flex-shrink-0 ui:w-10 ui:h-10
            ui:rounded-full ui:flex ui:items-center ui:justify-center
            ${severityColors[notification.severity]}
          `}
                >
                    {icons[notification.severity]}
                </div>

                {/* Content */}
                <div className="ui:flex-1 ui:min-w-0">
                    <div className="ui:flex ui:items-start ui:justify-between ui:gap-2">
                        <div>
                            <p className="ui:text-sm ui:font-semibold ui:text-gray-900">
                                {notification.title}
                                {!notification.read && (
                                    <span className="ui:ml-2 ui:inline-block ui:w-2 ui:h-2 ui:bg-blue-500 ui:rounded-full" />
                                )}
                            </p>
                            <p className="ui:text-sm ui:text-gray-600 ui:mt-0.5">
                                {notification.message}
                            </p>
                            <p className="ui:text-xs ui:text-gray-400 ui:mt-1">
                                {formatTime(notification.createdAt)}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="ui:flex ui:gap-1 ui:opacity-0 group-hover:ui:opacity-100 ui:transition-opacity">
                            {!notification.read && onMarkAsRead && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onMarkAsRead(notification.id);
                                    }}
                                    className="ui:p-1 ui:rounded hover:ui:bg-gray-200 ui:transition-colors"
                                    title="Mark as read"
                                >
                                    <svg className="ui:w-4 ui:h-4 ui:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </button>
                            )}
                            {onDismiss && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDismiss(notification.id);
                                    }}
                                    className="ui:p-1 ui:rounded hover:ui:bg-gray-200 ui:transition-colors"
                                    title="Dismiss"
                                >
                                    <svg className="ui:w-4 ui:h-4 ui:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
