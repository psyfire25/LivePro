"use client";

import type { Expense } from "@/lib/types";

type ExpenseListProps = {
    expenses: Expense[];
};

const categoryLabels: Record<string, string> = {
    talent: "Talent",
    production: "Production",
    staffing: "Staffing",
    venue: "Venue",
    marketing: "Marketing",
    other: "Other",
};

export function ExpenseList({ expenses }: ExpenseListProps) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    if (expenses.length === 0) {
        return (
            <div className="ui:text-center ui:py-12 ui:text-gray-500">
                <p className="ui:text-lg">No expenses recorded yet</p>
                <p className="ui:text-sm ui:mt-2">Click &quot;Add Expense&quot; to get started</p>
            </div>
        );
    }

    return (
        <div className="ui:overflow-x-auto">
            <table className="ui:w-full ui:border-collapse">
                <thead>
                    <tr className="ui:border-b ui:border-black/10 dark:ui:border-white/10">
                        <th className="ui:text-left ui:p-3 ui:text-sm ui:font-medium ui:text-gray-500">
                            Category
                        </th>
                        <th className="ui:text-left ui:p-3 ui:text-sm ui:font-medium ui:text-gray-500">
                            Vendor
                        </th>
                        <th className="ui:text-left ui:p-3 ui:text-sm ui:font-medium ui:text-gray-500">
                            Description
                        </th>
                        <th className="ui:text-right ui:p-3 ui:text-sm ui:font-medium ui:text-gray-500">
                            Amount
                        </th>
                        <th className="ui:text-left ui:p-3 ui:text-sm ui:font-medium ui:text-gray-500">
                            Date
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense) => (
                        <tr
                            key={expense.id}
                            className="ui:border-b ui:border-black/5 dark:ui:border-white/5 hover:ui:bg-black/5 dark:hover:ui:bg-white/5"
                        >
                            <td className="ui:p-3">
                                <span className="ui:inline-block ui:px-2 ui:py-1 ui:text-xs ui:font-medium ui:rounded-full ui:bg-black/10 dark:ui:bg-white/10">
                                    {categoryLabels[expense.category] || expense.category}
                                </span>
                            </td>
                            <td className="ui:p-3 ui:font-medium">{expense.vendor}</td>
                            <td className="ui:p-3 ui:text-sm ui:text-gray-600 dark:ui:text-gray-400">
                                {expense.description}
                            </td>
                            <td className="ui:p-3 ui:text-right ui:font-semibold">
                                {formatCurrency(expense.amount)}
                            </td>
                            <td className="ui:p-3 ui:text-sm ui:text-gray-600 dark:ui:text-gray-400">
                                {formatDate(expense.date)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
