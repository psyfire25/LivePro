"use client";
import React, { useState } from "react";

export interface NotificationBellProps {
  /** Number of unread notifications */
  unreadCount: number;
  /** Callback when bell is clicked */
  onClick?: () => void;
  /** Custom className */
  className?: string;
}

export function NotificationBell({
  unreadCount,
  onClick,
  className = "",
}: NotificationBellProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  React.useEffect(() => {
    if (unreadCount > 0) {
      setIsAnimating(true);
      const timeout = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [unreadCount]);

  return (
    <button
      onClick={onClick}
      className={`
        ui:relative ui:inline-flex ui:items-center ui:justify-center
        ui:w-10 ui:h-10 ui:rounded-full
        hover:ui:bg-gray-100 ui:transition-colors
        ${className}
      `}
      aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ""}`}
    >
      {/* Bell Icon */}
      <svg
        className={`ui:w-6 ui:h-6 ui:text-gray-600 ${isAnimating ? "ui-bell-ring" : ""}`}
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

      {/* Badge */}
      {unreadCount > 0 && (
        <span
          className="
            ui:absolute ui:top-1 ui:right-1
            ui:flex ui:items-center ui:justify-center
            ui:min-w-[18px] ui:h-[18px] ui:px-1
            ui:bg-red-500 ui:text-white
            ui:text-[10px] ui:font-bold
            ui:rounded-full ui:ring-2 ui:ring-white
          "
          style={{
            animation: isAnimating ? "badgePulse 0.5s ease-out" : undefined,
          }}
        >
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}

      {/* Inline animations */}
      <style>{`
        @keyframes badgePulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
        }

        .ui-bell-ring {
          animation: bellRing 0.5s ease-in-out;
        }

        @keyframes bellRing {
          0%, 100% {
            transform: rotate(0deg);
          }
          10%, 30%, 50%, 70% {
            transform: rotate(-10deg);
          }
          20%, 40%, 60%, 80% {
            transform: rotate(10deg);
          }
        }
      `}</style>
    </button>
  );
}
