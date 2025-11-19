import React, { useState } from "react";
import { NotificationItem, type Notification } from "./notification-item";

export interface NotificationListProps {
    /** Array of notifications */
    notifications: Notification[];
    /** Callback when a notification is marked as read */
    onMarkAsRead?: (id: string) => void;
    /** Callback when a notification is deleted */
    onDelete?: (id: string) => void;
    /** Callback when a notification is clicked */
    onNotificationClick?: (notification: Notification) => void;
    /** Callback to load more notifications */
    onLoadMore?: () => void;
    /** Whether more notifications are available */
    hasMore?: boolean;
    /** Loading state */
    isLoading?: boolean;
    /** Empty state message */
    emptyMessage?: string;
}

export function NotificationList({
    notifications,
    onMarkAsRead,
    onDelete,
    onNotificationClick,
    onLoadMore,
    hasMore = false,
    isLoading = false,
    emptyMessage = "No notifications yet",
}: NotificationListProps) {
    const [filter, setFilter] = useState<"all" | "unread">("all");

    const filteredNotifications =
        filter === "unread"
            ? notifications.filter((n) => !n.read)
            : notifications;

    const unreadCount = notifications.filter((n) => !n.read).length;

    return (
        <div className="ui:w-full ui:max-w-4xl ui:mx-auto">
            {/* Header */}
            <div className="ui:mb-6">
                <h1 className="ui:text-2xl ui:font-bold ui:text-gray-900 ui:mb-2">
                    Notifications
                </h1>
                {unreadCount > 0 && (
                    <p className="ui:text-sm ui:text-gray-600">
                        You have {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
                    </p>
                )}
            </div>

            {/* Filters */}
            <div className="ui:flex ui:gap-2 ui:mb-4">
                <button
                    onClick={() => setFilter("all")}
                    className={`
            ui:px-4 ui:py-2 ui:rounded-md ui:text-sm ui:font-medium
            ui:transition-colors
            ${filter === "all"
                            ? "ui:bg-blue-600 ui:text-white"
                            : "ui:bg-gray-100 ui:text-gray-700 hover:ui:bg-gray-200"
                        }
          `}
                >
                    All ({notifications.length})
                </button>
                <button
                    onClick={() => setFilter("unread")}
                    className={`
            ui:px-4 ui:py-2 ui:rounded-md ui:text-sm ui:font-medium
            ui:transition-colors
            ${filter === "unread"
                            ? "ui:bg-blue-600 ui:text-white"
                            : "ui:bg-gray-100 ui:text-gray-700 hover:ui:bg-gray-200"
                        }
          `}
                >
                    Unread ({unreadCount})
                </button>
            </div>

            {/* List */}
            <div className="ui:bg-white ui:rounded-lg ui:shadow-sm ui:border ui:border-gray-200 ui:overflow-hidden">
                {isLoading && notifications.length === 0 ? (
                    <div className="ui:p-12 ui:text-center">
                        <div className="ui:inline-block ui:w-8 ui:h-8 ui:border-4 ui:border-gray-200 ui:border-t-blue-500 ui:rounded-full ui:animate-spin" />
                        <p className="ui:text-sm ui:text-gray-500 ui:mt-4">Loading notifications...</p>
                    </div>
                ) : filteredNotifications.length === 0 ? (
                    <div className="ui:p-12 ui:text-center">
                        <svg
                            className="ui:w-16 ui:h-16 ui:mx-auto ui:text-gray-300"
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
                        <p className="ui:text-gray-500 ui:mt-4">{emptyMessage}</p>
                    </div>
                ) : (
                    <>
                        {filteredNotifications.map((notification) => (
                            <NotificationItem
                                key={notification.id}
                                notification={notification}
                                onMarkAsRead={onMarkAsRead}
                                onDismiss={onDelete}
                                onClick={onNotificationClick}
                            />
                        ))}
                    </>
                )}

                {/* Load More */}
                {hasMore && !isLoading && (
                    <div className="ui:p-4 ui:border-t ui:border-gray-200 ui:text-center">
                        <button
                            onClick={onLoadMore}
                            className="ui:text-sm ui:text-blue-600 hover:ui:text-blue-700 ui:font-medium"
                        >
                            Load more
                        </button>
                    </div>
                )}

                {/* Loading more indicator */}
                {isLoading && notifications.length > 0 && (
                    <div className="ui:p-4 ui:border-t ui:border-gray-200 ui:text-center">
                        <div className="ui:inline-block ui:w-5 ui:h-5 ui:border-2 ui:border-gray-200 ui:border-t-blue-500 ui:rounded-full ui:animate-spin" />
                    </div>
                )}
            </div>
        </div>
    );
}
