"use client";

import { TalentProfile } from "@/lib/types";

interface TalentListProps {
    talents: TalentProfile[];
    onEdit?: (talent: TalentProfile) => void;
    onMessage?: (talent: TalentProfile) => void;
    onBook?: (talent: TalentProfile) => void;
}

export function TalentList({ talents, onEdit, onMessage, onBook }: TalentListProps) {
    if (talents.length === 0) {
        return (
            <div className="ui:text-center ui:py-12 ui:text-gray-500">
                <p>No talent profiles found. Add your first talent to get started.</p>
            </div>
        );
    }

    return (
        <div className="ui:grid ui:gap-4 md:ui:grid-cols-2 lg:ui:grid-cols-3">
            {talents.map((talent) => (
                <div
                    key={talent.id}
                    className="lp-card ui:p-6 ui:space-y-4 hover:ui:shadow-lg ui:transition-shadow"
                >
                    <div className="ui:flex ui:items-start ui:gap-4">
                        <div className="ui:w-16 ui:h-16 ui:rounded-full ui:bg-gradient-to-br ui:from-purple-500 ui:to-pink-500 ui:flex-shrink-0 ui:flex ui:items-center ui:justify-center ui:text-white ui:text-2xl ui:font-bold">
                            {talent.name.charAt(0)}
                        </div>
                        <div className="ui:flex-1 ui:min-w-0">
                            <h3 className="ui:font-semibold ui:text-lg ui:truncate">{talent.name}</h3>
                            <p className="ui:text-sm ui:text-gray-600 dark:ui:text-gray-400">{talent.specialty}</p>
                            <div className="ui:mt-2">
                                <span
                                    className={`ui:inline-flex ui:items-center ui:px-2 ui:py-1 ui:rounded-full ui:text-xs ui:font-medium ${talent.status === 'available'
                                            ? 'ui:bg-green-100 ui:text-green-800 dark:ui:bg-green-900/30 dark:ui:text-green-400'
                                            : talent.status === 'booked'
                                                ? 'ui:bg-blue-100 ui:text-blue-800 dark:ui:bg-blue-900/30 dark:ui:text-blue-400'
                                                : 'ui:bg-gray-100 ui:text-gray-800 dark:ui:bg-gray-800 dark:ui:text-gray-400'
                                        }`}
                                >
                                    {talent.status.charAt(0).toUpperCase() + talent.status.slice(1)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="ui:space-y-2 ui:text-sm">
                        <p className="ui:text-gray-600 dark:ui:text-gray-400 ui:line-clamp-2">{talent.bio}</p>
                        <div className="ui:flex ui:flex-wrap ui:gap-1">
                            {talent.skills.slice(0, 3).map((skill, idx) => (
                                <span
                                    key={idx}
                                    className="ui:px-2 ui:py-0.5 ui:bg-gray-100 dark:ui:bg-gray-800 ui:rounded ui:text-xs"
                                >
                                    {skill}
                                </span>
                            ))}
                            {talent.skills.length > 3 && (
                                <span className="ui:px-2 ui:py-0.5 ui:text-xs ui:text-gray-500">
                                    +{talent.skills.length - 3} more
                                </span>
                            )}
                        </div>
                        {talent.hourlyRate && (
                            <p className="ui:font-semibold ui:text-purple-600 dark:ui:text-purple-400">
                                ${talent.hourlyRate}/hr
                            </p>
                        )}
                    </div>

                    <div className="ui:flex ui:gap-2 ui:pt-2 ui:border-t ui:border-gray-200 dark:ui:border-gray-700">
                        {onEdit && (
                            <button
                                onClick={() => onEdit(talent)}
                                className="ui:flex-1 ui:px-3 ui:py-1.5 ui:bg-gray-100 dark:ui:bg-gray-800 hover:ui:bg-gray-200 dark:hover:ui:bg-gray-700 ui:rounded-md ui:text-sm ui:font-medium ui:transition-colors"
                            >
                                Edit
                            </button>
                        )}
                        {onMessage && (
                            <button
                                onClick={() => onMessage(talent)}
                                className="ui:flex-1 ui:px-3 ui:py-1.5 ui:bg-purple-100 dark:ui:bg-purple-900/30 hover:ui:bg-purple-200 dark:hover:ui:bg-purple-900/50 ui:text-purple-700 dark:ui:text-purple-300 ui:rounded-md ui:text-sm ui:font-medium ui:transition-colors"
                            >
                                Message
                            </button>
                        )}
                        {onBook && talent.status === 'available' && (
                            <button
                                onClick={() => onBook(talent)}
                                className="ui:flex-1 ui:px-3 ui:py-1.5 ui:bg-green-600 hover:ui:bg-green-700 ui:text-white ui:rounded-md ui:text-sm ui:font-medium ui:transition-colors"
                            >
                                Book
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
