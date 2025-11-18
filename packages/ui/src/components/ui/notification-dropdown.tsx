import React, { useEffect, useRef } from "react";
import { NotificationItem, type Notification } from "./notification-item";

export interface NotificationDropdownProps {
    /** Whether dropdown is open */
    isOpen: boolean;
    /** Callback to close dropdown */
    onClose: () => void;
    /** Array of notifications to display */
    notifications: Notification[];
    /** Callback when a notification is marked as read */
    onMarkAsRead?: (id: string) => void;
    /** Callback when mark all as read is clicked */
    onMarkAllAsRead?: () => void;
    /** Callback when a notification is clicked */
    onNotificationClick?: (notification: Notification) => void;
    /** Loading state */
    isLoading?: boolean;
}

export function NotificationDropdown({
    isOpen,
    onClose,
    notifications,
    onMarkAsRead,
    onMarkAllAsRead,
    onNotificationClick,
    isLoading = false,
}: NotificationDropdownProps) {
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, onClose]);

    // Close on escape
    useEffect(() => {
        if (!isOpen) return;

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const unreadCount = notifications.filter((n) => !n.read).length;

    return (
        <div
            ref={dropdownRef}
            className="
        ui:absolute ui:top-full ui:right-0 ui:mt-2
        ui:w-[400px] ui:max-w-[calc(100vw-2rem)]
        ui:bg-white ui:rounded-lg ui:shadow-xl
        ui:border ui:border-gray-200
        ui:overflow-hidden ui:z-50
      "
            style={{
                animation: "dropdownSlideIn 0.2s ease-out",
            }}
        >
            {/* Header */}
            <div className="ui:px-4 ui:py-3 ui:border-b ui:border-gray-200 ui:bg-gray-50">
                <div className="ui:flex ui:items-center ui:justify-between">
                    <h3 className="ui:text-sm ui:font-semibold ui:text-gray-900">
                        Notifications
                        {unreadCount > 0 && (
                            <span className="ui:ml-2 ui:text-xs ui:text-gray-500">
                                ({unreadCount} unread)
                            </span>
                        )}
                    </h3>
                    {unreadCount > 0 && onMarkAllAsRead && (
                        <button
                            onClick={onMarkAllAsRead}
                            className="ui:text-xs ui:text-blue-600 hover:ui:text-blue-700 ui:font-medium"
                        >
                            Mark all as read
                        </button>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="ui:max-h-[500px] ui:overflow-y-auto">
                {isLoading ? (
                    <div className="ui:p-8 ui:text-center">
                        <div className="ui:inline-block ui:w-8 ui:h-8 ui:border-4 ui:border-gray-200 ui:border-t-blue-500 ui:rounded-full ui:animate-spin" />
                        <p className="ui:text-sm ui:text-gray-500 ui:mt-4">Loading...</p>
                    </div>
                ) : notifications.length === 0 ? (
                    <div className="ui:p-8 ui:text-center">
                        <svg
                            className="ui:w-12 ui:h-12 ui:mx-auto ui:text-gray-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                            />
                        </svg>
                        <p className="ui:text-sm ui:text-gray-500 ui:mt-4">
                            No notifications yet
                        </p>
                    </div>
                ) : (
                    <>
                        {notifications.map((notification) => (
                            <NotificationItem
                                key={notification.id}
                                notification={notification}
                                onMarkAsRead={onMarkAsRead}
                                onClick={onNotificationClick}
                            />
                        ))}
                    </>
                )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
                <div className="ui:px-4 ui:py-3 ui:border-t ui:border-gray-200 ui:bg-gray-50 ui:text-center">
                    <a
                        href="/notifications"
                        className="ui:text-sm ui:text-blue-600 hover:ui:text-blue-700 ui:font-medium"
                        onClick={onClose}
                    >
                        View all notifications
                    </a>
                </div>
            )}

            {/* Inline animations */}
            <style>{`
        @keyframes dropdownSlideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </div>
    );
}
