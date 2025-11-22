"use client";

import { useState } from "react";
import { Modal } from "@repo/ui";
import type { TalentProfile } from "@/lib/types";

interface TalentFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Partial<TalentProfile>) => void;
    initialData?: TalentProfile;
}

export function TalentForm({ isOpen, onClose, onSubmit, initialData }: TalentFormProps) {
    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        email: initialData?.email || "",
        phone: initialData?.phone || "",
        specialty: initialData?.specialty || "",
        bio: initialData?.bio || "",
        hourlyRate: initialData?.hourlyRate || "",
        skills: initialData?.skills?.join(", ") || "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            hourlyRate: formData.hourlyRate ? Number(formData.hourlyRate) : undefined,
            skills: formData.skills.split(",").map(s => s.trim()).filter(Boolean),
        });
        setFormData({
            name: "",
            email: "",
            phone: "",
            specialty: "",
            bio: "",
            hourlyRate: "",
            skills: "",
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Edit Talent" : "Add New Talent"}>
            <form onSubmit={handleSubmit} className="ui:space-y-4">
                <div>
                    <label className="ui:block ui:text-sm ui:font-medium ui:mb-1">
                        Name *
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="ui:w-full ui:px-3 ui:py-2 ui:border ui:border-gray-300 dark:ui:border-gray-700 ui:rounded-md ui:bg-white dark:ui:bg-gray-900 focus:ui:outline-none focus:ui:ring-2 focus:ui:ring-purple-500"
                    />
                </div>

                <div className="ui:grid ui:grid-cols-2 ui:gap-4">
                    <div>
                        <label className="ui:block ui:text-sm ui:font-medium ui:mb-1">
                            Email *
                        </label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="ui:w-full ui:px-3 ui:py-2 ui:border ui:border-gray-300 dark:ui:border-gray-700 ui:rounded-md ui:bg-white dark:ui:bg-gray-900 focus:ui:outline-none focus:ui:ring-2 focus:ui:ring-purple-500"
                        />
                    </div>
                    <div>
                        <label className="ui:block ui:text-sm ui:font-medium ui:mb-1">
                            Phone
                        </label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="ui:w-full ui:px-3 ui:py-2 ui:border ui:border-gray-300 dark:ui:border-gray-700 ui:rounded-md ui:bg-white dark:ui:bg-gray-900 focus:ui:outline-none focus:ui:ring-2 focus:ui:ring-purple-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="ui:block ui:text-sm ui:font-medium ui:mb-1">
                        Specialty *
                    </label>
                    <input
                        type="text"
                        required
                        placeholder="e.g., DJ, Vocalist, Guitarist"
                        value={formData.specialty}
                        onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                        className="ui:w-full ui:px-3 ui:py-2 ui:border ui:border-gray-300 dark:ui:border-gray-700 ui:rounded-md ui:bg-white dark:ui:bg-gray-900 focus:ui:outline-none focus:ui:ring-2 focus:ui:ring-purple-500"
                    />
                </div>

                <div>
                    <label className="ui:block ui:text-sm ui:font-medium ui:mb-1">
                        Bio *
                    </label>
                    <textarea
                        required
                        rows={3}
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        className="ui:w-full ui:px-3 ui:py-2 ui:border ui:border-gray-300 dark:ui:border-gray-700 ui:rounded-md ui:bg-white dark:ui:bg-gray-900 focus:ui:outline-none focus:ui:ring-2 focus:ui:ring-purple-500"
                    />
                </div>

                <div>
                    <label className="ui:block ui:text-sm ui:font-medium ui:mb-1">
                        Skills (comma-separated)
                    </label>
                    <input
                        type="text"
                        placeholder="e.g., House Music, Techno, Live Mixing"
                        value={formData.skills}
                        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                        className="ui:w-full ui:px-3 ui:py-2 ui:border ui:border-gray-300 dark:ui:border-gray-700 ui:rounded-md ui:bg-white dark:ui:bg-gray-900 focus:ui:outline-none focus:ui:ring-2 focus:ui:ring-purple-500"
                    />
                </div>

                <div>
                    <label className="ui:block ui:text-sm ui:font-medium ui:mb-1">
                        Hourly Rate ($)
                    </label>
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.hourlyRate}
                        onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                        className="ui:w-full ui:px-3 ui:py-2 ui:border ui:border-gray-300 dark:ui:border-gray-700 ui:rounded-md ui:bg-white dark:ui:bg-gray-900 focus:ui:outline-none focus:ui:ring-2 focus:ui:ring-purple-500"
                    />
                </div>

                <div className="ui:flex ui:gap-3 ui:pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="ui:flex-1 ui:px-4 ui:py-2 ui:border ui:border-gray-300 dark:ui:border-gray-700 ui:rounded-md hover:ui:bg-gray-50 dark:hover:ui:bg-gray-800 ui:transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="ui:flex-1 ui:px-4 ui:py-2 ui:bg-purple-600 hover:ui:bg-purple-700 ui:text-white ui:rounded-md ui:transition-colors"
                    >
                        {initialData ? "Update" : "Add"} Talent
                    </button>
                </div>
            </form>
        </Modal>
    );
}
