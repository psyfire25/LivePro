"use client";

import { Gradient, Card, Button } from "@repo/ui";
import type { TalentProfile, Booking, Contract } from "@/lib/types";

interface TalentDashboardProps {
    profile: TalentProfile;
    upcomingBookings: Booking[];
    activeContracts: Contract[];
    unreadMessages: number;
    onEditProfile: () => void;
    onViewSchedule: () => void;
    onEditRequirements: () => void;
}

export function TalentDashboard({
    profile,
    upcomingBookings,
    activeContracts,
    unreadMessages,
    onEditProfile,
    onViewSchedule,
    onEditRequirements,
}: TalentDashboardProps) {
    const nextBooking = upcomingBookings[0];

    return (
        <div className="ui:space-y-8">
            {/* Hero Section */}
            <section className="ui:relative ui:overflow-hidden lp-card lp-card-lg lp-hero-bg ui:min-h-[300px] ui:flex ui:flex-col ui:justify-center">
                <Gradient className="ui:opacity-30" conic />
                <div className="ui:relative ui:z-10">
                    <div className="ui:flex ui:items-center ui:gap-6">
                        <div className="ui:w-20 ui:h-20 ui:rounded-full ui:bg-gradient-to-br ui:from-purple-500 ui:to-pink-500 ui:flex-shrink-0 ui:flex ui:items-center ui:justify-center ui:text-white ui:text-4xl ui:font-bold ui:shadow-lg">
                            {profile.name.charAt(0)}
                        </div>
                        <div>
                            <h1 className="ui:text-5xl ui:font-bold ui:tracking-tight">
                                Welcome back, {profile.name.split(' ')[0]}
                            </h1>
                            <p className="ui:mt-2 ui:text-xl ui:opacity-80">
                                {profile.specialty} • {profile.status === 'available' ? '✅ Available' : profile.status === 'booked' ? '📅 Booked' : '⏸️ Unavailable'}
                            </p>
                        </div>
                    </div>
                    <div className="ui:mt-8 ui:flex ui:gap-4">
                        <Button onClick={onViewSchedule}>View Schedule</Button>
                        <Button variant="outline" className="ui:bg-white/50 ui:backdrop-blur-sm hover:ui:bg-white/80" onClick={onEditProfile}>
                            Edit Profile
                        </Button>
                        <Button variant="outline" className="ui:bg-white/50 ui:backdrop-blur-sm hover:ui:bg-white/80" onClick={onEditRequirements}>
                            Requirements
                        </Button>
                    </div>
                </div>
            </section>

            {/* Stats Cards */}
            <div className="ui:grid ui:gap-6 md:ui:grid-cols-2 lg:ui:grid-cols-4">
                <Card
                    title="Upcoming Bookings"
                    href="#"
                >
                    <div className="ui:text-4xl ui:font-bold ui:mt-2 ui:bg-gradient-to-r ui:from-purple-600 ui:to-pink-600 ui:bg-clip-text ui:text-transparent">
                        {upcomingBookings.length}
                    </div>
                    <div className="ui:text-sm ui:opacity-70 ui:mt-1">
                        {upcomingBookings.length === 1 ? 'event scheduled' : 'events scheduled'}
                    </div>
                </Card>

                <Card
                    title="Active Contracts"
                    href="#"
                >
                    <div className="ui:text-4xl ui:font-bold ui:mt-2 ui:bg-gradient-to-r ui:from-green-600 ui:to-emerald-600 ui:bg-clip-text ui:text-transparent">
                        {activeContracts.length}
                    </div>
                    <div className="ui:text-sm ui:opacity-70 ui:mt-1">
                        Active agreements
                    </div>
                </Card>

                <Card
                    title="Messages"
                    href="#"
                >
                    <div className="ui:text-4xl ui:font-bold ui:mt-2 ui:bg-gradient-to-r ui:from-blue-600 ui:to-cyan-600 ui:bg-clip-text ui:text-transparent">
                        {unreadMessages}
                    </div>
                    <div className="ui:text-sm ui:opacity-70 ui:mt-1">
                        {unreadMessages === 1 ? 'new message' : 'new messages'}
                    </div>
                </Card>

                <Card
                    title="Profile Status"
                    href="#"
                >
                    <div className="ui:text-4xl ui:font-bold ui:mt-2 ui:bg-gradient-to-r ui:from-orange-600 ui:to-red-600 ui:bg-clip-text ui:text-transparent">
                        {profile.skills.length}
                    </div>
                    <div className="ui:text-sm ui:opacity-70 ui:mt-1">
                        Skills listed
                    </div>
                </Card>
            </div>

            {/* Next Booking or Empty State */}
            {nextBooking ? (
                <section className="lp-card ui:p-6">
                    <h2 className="ui:text-2xl ui:font-bold ui:mb-4 ui:flex ui:items-center ui:gap-2">
                        <span>🎯</span>
                        <span>Next Up</span>
                    </h2>
                    <div className="ui:bg-gradient-to-r ui:from-purple-50 ui:to-pink-50 dark:ui:from-purple-950/30 dark:ui:to-pink-950/30 ui:rounded-lg ui:p-6 ui:border ui:border-purple-200 dark:ui:border-purple-800">
                        <div className="ui:flex ui:justify-between ui:items-start ui:mb-4">
                            <div>
                                <h3 className="ui:text-2xl ui:font-bold">{nextBooking.eventName}</h3>
                                <p className="ui:text-gray-600 dark:ui:text-gray-400 ui:mt-1">
                                    📍 {nextBooking.eventLocation}
                                </p>
                            </div>
                            <span className="ui:px-3 ui:py-1 ui:bg-purple-600 ui:text-white ui:rounded-full ui:text-sm ui:font-medium">
                                {nextBooking.status}
                            </span>
                        </div>
                        <div className="ui:grid ui:grid-cols-2 ui:gap-4 ui:text-sm">
                            <div>
                                <p className="ui:text-gray-500 dark:ui:text-gray-400">Date & Time</p>
                                <p className="ui:font-semibold ui:mt-1">
                                    {new Date(nextBooking.startDateTime).toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </p>
                                <p className="ui:text-purple-600 dark:ui:text-purple-400 ui:font-medium">
                                    {new Date(nextBooking.startDateTime).toLocaleTimeString('en-US', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}{' '}
                                    -{' '}
                                    {new Date(nextBooking.endDateTime).toLocaleTimeString('en-US', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </p>
                            </div>
                            {nextBooking.description && (
                                <div>
                                    <p className="ui:text-gray-500 dark:ui:text-gray-400">Details</p>
                                    <p className="ui:mt-1">{nextBooking.description}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            ) : (
                <section className="lp-card ui:p-6 ui:text-center">
                    <div className="ui:text-6xl ui:mb-4">📅</div>
                    <h3 className="ui:text-xl ui:font-semibold ui:mb-2">No Upcoming Bookings</h3>
                    <p className="ui:text-gray-600 dark:ui:text-gray-400">
                        Your schedule is clear. New bookings will appear here.
                    </p>
                </section>
            )}

            {/* Quick Actions */}
            <section className="ui:grid ui:gap-6 md:ui:grid-cols-2">
                <Card title="My Schedule" href="#">
                    View all your upcoming and past bookings in one place.
                </Card>
                <Card title="Messages" href="#">
                    Check messages from your management team.
                </Card>
                <Card title="Profile & Bio" href="#">
                    Keep your profile updated with latest skills and availability.
                </Card>
                <Card title="Requirements" href="#">
                    Manage your technical requirements, rider, and preferences.
                </Card>
            </section>
        </div>
    );
}
