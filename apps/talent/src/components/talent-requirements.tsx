"use client";

import { useState } from "react";
import type { Requirement } from "@/lib/types";

interface TalentRequirementsProps {
    requirements: {
        technical: Requirement[];
        rider: Requirement[];
        travel: Requirement[];
        accommodation: Requirement[];
        other: Requirement[];
    };
}

export function TalentRequirements({ requirements }: TalentRequirementsProps) {
    const [activeTab, setActiveTab] = useState<'technical' | 'rider' | 'travel' | 'accommodation' | 'other'>('technical');
    const [editMode, setEditMode] = useState(false);

    const tabs = [
        { id: 'technical' as const, label: 'Technical', icon: '🎛️' },
        { id: 'rider' as const, label: 'Rider', icon: '🍽️' },
        { id: 'travel' as const, label: 'Travel', icon: '✈️' },
        { id: 'accommodation' as const, label: 'Accommodation', icon: '🏨' },
        { id: 'other' as const, label: 'Other', icon: '📝' },
    ];

    const currentRequirements = requirements[activeTab];

    return (
        <div className="ui:space-y-6">
            <div className="ui:flex ui:items-center ui:justify-between">
                <div>
                    <h2 className="ui:text-3xl ui:font-bold">My Requirements</h2>
                    <p className="ui:text-gray-600 dark:ui:text-gray-400 ui:mt-1">
                        Manage your technical requirements and preferences
                    </p>
                </div>
                <button
                    onClick={() => setEditMode(!editMode)}
                    className="ui:px-4 ui:py-2 ui:bg-purple-600 hover:ui:bg-purple-700 ui:text-white ui:rounded-md ui:transition-colors"
                >
                    {editMode ? 'Done Editing' : 'Edit Requirements'}
                </button>
            </div>

            {/* Tabs */}
            <div className="ui:flex ui:gap-2 ui:border-b ui:border-gray-200 dark:ui:border-gray-800">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`ui:px-4 ui:py-2 ui:font-medium ui:transition-colors ui:border-b-2 ${activeTab === tab.id
                            ? 'ui:border-purple-600 ui:text-purple-600'
                            : 'ui:border-transparent ui:text-gray-600 dark:ui:text-gray-400 hover:ui:text-gray-900 dark:hover:ui:text-gray-200'
                            }`}
                    >
                        <span className="ui:mr-2">{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Requirements List */}
            <div className="ui:space-y-3">
                {currentRequirements.length === 0 ? (
                    <div className="lp-card ui:p-8 ui:text-center">
                        <p className="ui:text-6xl ui:mb-4">{tabs.find(t => t.id === activeTab)?.icon}</p>
                        <p className="ui:text-gray-600 dark:ui:text-gray-400">
                            No {activeTab} requirements added yet.
                        </p>
                        {editMode && (
                            <button className="ui:mt-4 ui:px-4 ui:py-2 ui:bg-purple-600 hover:ui:bg-purple-700 ui:text-white ui:rounded-md ui:transition-colors">
                                Add Requirement
                            </button>
                        )}
                    </div>
                ) : (
                    currentRequirements.map((req) => (
                        <div key={req.id} className="lp-card ui:p-4">
                            <div className="ui:flex ui:justify-between ui:items-start">
                                <div className="ui:flex-1">
                                    <div className="ui:flex ui:items-center ui:gap-2">
                                        <h4 className="ui:font-semibold">{req.title}</h4>
                                        <span
                                            className={`ui:px-2 ui:py-0.5 ui:rounded-full ui:text-xs ui:font-medium ${req.priority === 'high'
                                                ? 'ui:bg-red-100 ui:text-red-800 dark:ui:bg-red-900/30 dark:ui:text-red-400'
                                                : req.priority === 'medium'
                                                    ? 'ui:bg-yellow-100 ui:text-yellow-800 dark:ui:bg-yellow-900/30 dark:ui:text-yellow-400'
                                                    : 'ui:bg-gray-100 ui:text-gray-800 dark:ui:bg-gray-800 dark:ui:text-gray-400'
                                                }`}
                                        >
                                            {req.priority}
                                        </span>
                                    </div>
                                    <p className="ui:text-sm ui:text-gray-600 dark:ui:text-gray-400 ui:mt-1">
                                        {req.description}
                                    </p>
                                </div>
                                {editMode && (
                                    <div className="ui:flex ui:gap-2 ui:ml-4">
                                        <button className="ui:px-3 ui:py-1 ui:text-sm ui:text-blue-600 dark:ui:text-blue-400 hover:ui:bg-blue-50 dark:hover:ui:bg-blue-900/20 ui:rounded">
                                            Edit
                                        </button>
                                        <button className="ui:px-3 ui:py-1 ui:text-sm ui:text-red-600 dark:ui:text-red-400 hover:ui:bg-red-50 dark:hover:ui:bg-red-900/20 ui:rounded">
                                            Remove
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {editMode && currentRequirements.length > 0 && (
                <button className="ui:w-full ui:px-4 ui:py-2 ui:bg-purple-100 dark:ui:bg-purple-900/30 hover:ui:bg-purple-200 dark:hover:ui:bg-purple-900/50 ui:text-purple-700 dark:ui:text-purple-300 ui:rounded-md ui:transition-colors ui:font-medium">
                    + Add {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Requirement
                </button>
            )}
        </div>
    );
}
