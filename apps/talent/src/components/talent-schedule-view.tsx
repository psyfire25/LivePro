"use client";

import { BookingCalendar } from "./booking-calendar";
import type { Booking } from "@/lib/types";

interface TalentScheduleViewProps {
    bookings: Booking[];
}

export function TalentScheduleView({ bookings }: TalentScheduleViewProps) {
    // Filter to only confirmed and in-progress bookings for talent view
    const confirmedBookings = bookings.filter(
        (b) => b.status === 'confirmed' || b.status === 'in-progress' || b.status === 'completed'
    );

    return (
        <div className="ui:space-y-6">
            <div className="ui:flex ui:items-center ui:justify-between">
                <div>
                    <h2 className="ui:text-3xl ui:font-bold">My Schedule</h2>
                    <p className="ui:text-gray-600 dark:ui:text-gray-400 ui:mt-1">
                        Your confirmed bookings and events
                    </p>
                </div>
                <div className="ui:text-right">
                    <p className="ui:text-sm ui:text-gray-500 dark:ui:text-gray-400">Total Events</p>
                    <p className="ui:text-3xl ui:font-bold ui:bg-gradient-to-r ui:from-purple-600 ui:to-pink-600 ui:bg-clip-text ui:text-transparent">
                        {confirmedBookings.length}
                    </p>
                </div>
            </div>

            <BookingCalendar bookings={confirmedBookings} />
        </div>
    );
}
