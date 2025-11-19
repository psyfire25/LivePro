// Example: How to integrate notifications into your app
// File: apps/production/src/components/NotificationCenter.tsx

"use client";
import { useState, useEffect } from "react";
import { NotificationBell, NotificationDropdown, type Notification } from "@repo/ui";

export function NotificationCenter({ userId }: { userId: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch notifications
    useEffect(() => {
        if (!userId) return;

        const fetchNotifications = async () => {
            setIsLoading(true);
            try {
                // Fetch recent notifications
                const res = await fetch(`http://localhost:4000/api/notifications/user/${userId}?limit=10`);
                const data = await res.json();
                setNotifications(data);

                // Fetch unread count
                const countRes = await fetch(`http://localhost:4000/api/notifications/user/${userId}/count`);
                const count = await countRes.json();
                setUnreadCount(count);
            } catch (error) {
                console.error("Failed to fetch notifications:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNotifications();
    }, [userId]);

    // Mark as read handler
    const handleMarkAsRead = async (id: string) => {
        try {
            await fetch(`http://localhost:4000/api/notifications/${id}/read?userId=${userId}`, {
                method: "PATCH",
            });

            // Update local state
            setNotifications((prev) =>
                prev.map((n) => (n.id === id ? { ...n, read: true, readAt: new Date().toISOString() } : n))
            );
            setUnreadCount((prev) => Math.max(0, prev - 1));
        } catch (error) {
            console.error("Failed to mark notification as read:", error);
        }
    };

    // Mark all as read handler
    const handleMarkAllAsRead = async () => {
        try {
            await fetch(`http://localhost:4000/api/notifications/user/${userId}/mark-all-read`, {
                method: "PATCH",
            });

            // Update local state
            setNotifications((prev) => prev.map((n) => ({ ...n, read: true, readAt: new Date().toISOString() })));
            setUnreadCount(0);
        } catch (error) {
            console.error("Failed to mark all notifications as read:", error);
        }
    };

    // Notification click handler
    const handleNotificationClick = (notification: Notification) => {
        // Mark as read
        if (!notification.read) {
            handleMarkAsRead(notification.id);
        }

        // Navigate to action URL
        if (notification.actionUrl) {
            window.location.href = notification.actionUrl;
        }

        // Close dropdown
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <NotificationBell unreadCount={unreadCount} onClick={() => setIsOpen(!isOpen)} />
            <NotificationDropdown
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                notifications={notifications}
                onMarkAsRead={handleMarkAsRead}
                onMarkAllAsRead={handleMarkAllAsRead}
                onNotificationClick={handleNotificationClick}
                isLoading={isLoading}
            />
        </div>
    );
}
