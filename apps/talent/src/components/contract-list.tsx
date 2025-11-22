"use client";

import { Contract } from "@/lib/types";

interface ContractListProps {
    contracts: Contract[];
    onView?: (contract: Contract) => void;
}

export function ContractList({ contracts, onView }: ContractListProps) {
    if (contracts.length === 0) {
        return (
            <div className="ui:text-center ui:py-12 ui:text-gray-500">
                <p>No contracts found.</p>
            </div>
        );
    }

    return (
        <div className="ui:space-y-3">
            {contracts.map((contract) => (
                <div
                    key={contract.id}
                    onClick={() => onView?.(contract)}
                    className={`lp-card ui:p-4 ui:space-y-3 ${onView ? 'ui:cursor-pointer hover:ui:shadow-lg' : ''
                        } ui:transition-shadow`}
                >
                    <div className="ui:flex ui:justify-between ui:items-start">
                        <div className="ui:flex-1">
                            <h4 className="ui:font-semibold ui:text-lg">{contract.title}</h4>
                            <p className="ui:text-sm ui:text-gray-600 dark:ui:text-gray-400">
                                {contract.talentName}
                            </p>
                        </div>
                        <span
                            className={`ui:px-2 ui:py-1 ui:rounded-full ui:text-xs ui:font-medium ${contract.status === 'active'
                                    ? 'ui:bg-green-100 ui:text-green-800 dark:ui:bg-green-900/30 dark:ui:text-green-400'
                                    : contract.status === 'pending'
                                        ? 'ui:bg-yellow-100 ui:text-yellow-800 dark:ui:bg-yellow-900/30 dark:ui:text-yellow-400'
                                        : contract.status === 'draft'
                                            ? 'ui:bg-gray-100 ui:text-gray-800 dark:ui:bg-gray-800 dark:ui:text-gray-400'
                                            : contract.status === 'completed'
                                                ? 'ui:bg-blue-100 ui:text-blue-800 dark:ui:bg-blue-900/30 dark:ui:text-blue-400'
                                                : 'ui:bg-red-100 ui:text-red-800 dark:ui:bg-red-900/30 dark:ui:text-red-400'
                                }`}
                        >
                            {contract.status}
                        </span>
                    </div>

                    <p className="ui:text-sm ui:text-gray-600 dark:ui:text-gray-400 ui:line-clamp-2">
                        {contract.description}
                    </p>

                    <div className="ui:grid ui:grid-cols-2 md:ui:grid-cols-4 ui:gap-4 ui:text-sm">
                        <div>
                            <p className="ui:text-gray-500 dark:ui:text-gray-400">Start Date</p>
                            <p className="ui:font-medium">
                                {new Date(contract.startDate).toLocaleDateString()}
                            </p>
                        </div>
                        <div>
                            <p className="ui:text-gray-500 dark:ui:text-gray-400">End Date</p>
                            <p className="ui:font-medium">
                                {new Date(contract.endDate).toLocaleDateString()}
                            </p>
                        </div>
                        <div>
                            <p className="ui:text-gray-500 dark:ui:text-gray-400">Payment</p>
                            <p className="ui:font-medium ui:text-purple-600 dark:ui:text-purple-400">
                                ${contract.paymentAmount.toLocaleString()}
                            </p>
                        </div>
                        <div>
                            <p className="ui:text-gray-500 dark:ui:text-gray-400">Signatures</p>
                            <p className="ui:font-medium">
                                {contract.signedByTalent && contract.signedByManager ? (
                                    <span className="ui:text-green-600 dark:ui:text-green-400">✓ Both</span>
                                ) : contract.signedByManager ? (
                                    <span className="ui:text-yellow-600 dark:ui:text-yellow-400">⏳ Pending Talent</span>
                                ) : contract.signedByTalent ? (
                                    <span className="ui:text-yellow-600 dark:ui:text-yellow-400">⏳ Pending Manager</span>
                                ) : (
                                    <span className="ui:text-gray-600 dark:ui:text-gray-400">✗ Unsigned</span>
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
