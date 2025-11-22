"use client";

import { Booking } from "@/lib/types";

interface BookingCalendarProps {
    bookings: Booking[];
    onBookingClick?: (booking: Booking) => void;
}

export function BookingCalendar({ bookings, onBookingClick }: BookingCalendarProps) {
    // Group bookings by date
    const bookingsByDate: { [key: string]: Booking[] } = {};
    bookings.forEach((booking) => {
        const dateKey = new Date(booking.startDateTime).toISOString().split('T')[0];
        if (!bookingsByDate[dateKey]) {
            bookingsByDate[dateKey] = [];
        }
        bookingsByDate[dateKey].push(booking);
    });

    const sortedDates = Object.keys(bookingsByDate).sort();

    return (
        <div className="ui:space-y-6">
            {sortedDates.length === 0 ? (
                <div className="ui:text-center ui:py-12 ui:text-gray-500">
                    <p>No bookings scheduled.</p>
                </div>
            ) : (
                sortedDates.map((date) => (
                    <div key={date} className="ui:space-y-3">
                        <h3 className="ui:font-semibold ui:text-lg ui:flex ui:items-center ui:gap-2">
                            <span className="ui:text-purple-600 dark:ui:text-purple-400">
                                {new Date(date).toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </span>
                            <span className="ui:text-sm ui:text-gray-500 ui:font-normal">
                                ({bookingsByDate[date].length} {bookingsByDate[date].length === 1 ? 'booking' : 'bookings'})
                            </span>
                        </h3>
                        <div className="ui:grid ui:gap-3 md:ui:grid-cols-2">
                            {bookingsByDate[date].map((booking) => {
                                const startTime = new Date(booking.startDateTime).toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                });
                                const endTime = new Date(booking.endDateTime).toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                });

                                return (
                                    <div
                                        key={booking.id}
                                        onClick={() => onBookingClick?.(booking)}
                                        className={`lp-card ui:p-4 ui:space-y-2 ${onBookingClick ? 'ui:cursor-pointer hover:ui:shadow-lg' : ''
                                            } ui:transition-shadow ui:border-l-4 ${booking.status === 'confirmed'
                                                ? 'ui:border-green-500'
                                                : booking.status === 'pending'
                                                    ? 'ui:border-yellow-500'
                                                    : booking.status === 'in-progress'
                                                        ? 'ui:border-blue-500'
                                                        : booking.status === 'completed'
                                                            ? 'ui:border-gray-400'
                                                            : 'ui:border-red-500'
                                            }`}
                                    >
                                        <div className="ui:flex ui:justify-between ui:items-start">
                                            <div className="ui:flex-1">
                                                <h4 className="ui:font-semibold">{booking.eventName}</h4>
                                                <p className="ui:text-sm ui:text-gray-600 dark:ui:text-gray-400">
                                                    {booking.talentName}
                                                </p>
                                            </div>
                                            <span
                                                className={`ui:px-2 ui:py-1 ui:rounded-full ui:text-xs ui:font-medium ${booking.status === 'confirmed'
                                                        ? 'ui:bg-green-100 ui:text-green-800 dark:ui:bg-green-900/30 dark:ui:text-green-400'
                                                        : booking.status === 'pending'
                                                            ? 'ui:bg-yellow-100 ui:text-yellow-800 dark:ui:bg-yellow-900/30 dark:ui:text-yellow-400'
                                                            : booking.status === 'in-progress'
                                                                ? 'ui:bg-blue-100 ui:text-blue-800 dark:ui:bg-blue-900/30 dark:ui:text-blue-400'
                                                                : booking.status === 'completed'
                                                                    ? 'ui:bg-gray-100 ui:text-gray-800 dark:ui:bg-gray-800 dark:ui:text-gray-400'
                                                                    : 'ui:bg-red-100 ui:text-red-800 dark:ui:bg-red-900/30 dark:ui:text-red-400'
                                                    }`}
                                            >
                                                {booking.status}
                                            </span>
                                        </div>
                                        <div className="ui:flex ui:items-center ui:gap-2 ui:text-sm ui:text-gray-600 dark:ui:text-gray-400">
                                            <span>🕐</span>
                                            <span>{startTime} - {endTime}</span>
                                        </div>
                                        <div className="ui:flex ui:items-center ui:gap-2 ui:text-sm ui:text-gray-600 dark:ui:text-gray-400">
                                            <span>📍</span>
                                            <span>{booking.eventLocation}</span>
                                        </div>
                                        {booking.description && (
                                            <p className="ui:text-sm ui:text-gray-600 dark:ui:text-gray-400 ui:line-clamp-2">
                                                {booking.description}
                                            </p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
