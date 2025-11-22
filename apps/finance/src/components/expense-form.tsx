"use client";

import { FormModal, Input } from "@repo/ui";


type ExpenseFormProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Record<string, unknown>) => void;
};

export function ExpenseForm({ isOpen, onClose, onSubmit }: ExpenseFormProps) {
    return (
        <FormModal
            isOpen={isOpen}
            onClose={onClose}
            title="Record Expense"
            onSubmit={onSubmit}
            submitText="Add Expense"
            size="lg"
        >
            <div className="ui:space-y-4">
                <div>
                    <label
                        htmlFor="category"
                        className="ui:block ui:text-sm ui:font-medium ui:text-gray-500 ui:mb-1"
                    >
                        Category
                    </label>
                    <select
                        id="category"
                        name="category"
                        required
                        className="ui:w-full ui:h-9 ui:rounded-md ui:border ui:border-black/15 dark:ui:border-white/15 ui:bg-transparent ui:px-3 ui:py-2 ui:text-sm ui:focus-visible:ui:outline-none ui:focus-visible:ui:ring-2 ui:focus-visible:ui:ring-black/20 dark:ui:focus-visible:ui:ring-white/20"
                    >
                        <option value="">Select category...</option>
                        <option value="talent">Talent</option>
                        <option value="production">Production</option>
                        <option value="staffing">Staffing</option>
                        <option value="venue">Venue</option>
                        <option value="marketing">Marketing</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div>
                    <label
                        htmlFor="vendor"
                        className="ui:block ui:text-sm ui:font-medium ui:text-gray-500 ui:mb-1"
                    >
                        Vendor
                    </label>
                    <Input
                        type="text"
                        id="vendor"
                        name="vendor"
                        placeholder="Vendor name"
                        required
                    />
                </div>

                <div className="ui:grid ui:grid-cols-2 ui:gap-4">
                    <div>
                        <label
                            htmlFor="amount"
                            className="ui:block ui:text-sm ui:font-medium ui:text-gray-500 ui:mb-1"
                        >
                            Amount
                        </label>
                        <Input
                            type="number"
                            id="amount"
                            name="amount"
                            placeholder="0.00"
                            step="0.01"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="date"
                            className="ui:block ui:text-sm ui:font-medium ui:text-gray-500 ui:mb-1"
                        >
                            Date
                        </label>
                        <Input type="date" id="date" name="date" required />
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="description"
                        className="ui:block ui:text-sm ui:font-medium ui:text-gray-500 ui:mb-1"
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows={3}
                        className="ui:w-full ui:rounded-md ui:border ui:border-black/15 dark:ui:border-white/15 ui:bg-transparent ui:px-3 ui:py-2 ui:text-sm ui:focus-visible:ui:outline-none ui:focus-visible:ui:ring-2 ui:focus-visible:ui:ring-black/20 dark:ui:focus-visible:ui:ring-white/20"
                        placeholder="Expense details..."
                        required
                    />
                </div>
            </div>
        </FormModal>
    );
}
