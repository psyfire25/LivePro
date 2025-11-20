"use client";
import { Modal, Button } from "@repo/ui";
import { useState } from "react";

/**
 * Confirm Dialog Modal
 * Use for destructive actions or important confirmations
 */
export function useConfirmDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const [config, setConfig] = useState<{
        title: string;
        message: string;
        confirmText?: string;
        cancelText?: string;
        variant?: "danger" | "primary";
        onConfirm: () => void | Promise<void>;
    } | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const confirm = (options: typeof config) => {
        setConfig(options);
        setIsOpen(true);
    };

    const handleConfirm = async () => {
        if (!config) return;

        setIsLoading(true);
        try {
            await config.onConfirm();
            setIsOpen(false);
        } catch (error) {
            console.error("Confirmation action failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const ConfirmDialog = () => {
        if (!config) return null;

        return (
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title={config.title}
                size="sm"
                footer={
                    <div className="ui:flex ui:gap-3 ui:justify-end">
                        <Button
                            variant="ghost"
                            onClick={() => setIsOpen(false)}
                            disabled={isLoading}
                        >
                            {config.cancelText || "Cancel"}
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleConfirm}
                            disabled={isLoading}
                            className={
                                config.variant === "danger"
                                    ? "ui:bg-red-600 hover:ui:bg-red-700"
                                    : ""
                            }
                        >
                            {isLoading ? "Processing..." : config.confirmText || "Confirm"}
                        </Button>
                    </div>
                }
            >
                <p className="ui:text-gray-700">{config.message}</p>
            </Modal>
        );
    };

    return { confirm, ConfirmDialog };
}

/**
 * Form Modal
 * Use for creating or editing entities
 */
interface FormModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    onSubmit: (data: Record<string, unknown>) => void | Promise<void>;
    children: React.ReactNode;
    submitText?: string;
    size?: "sm" | "md" | "lg" | "xl";
}

export function FormModal({
    isOpen,
    onClose,
    title,
    onSubmit,
    children,
    submitText = "Save",
    size = "md",
}: FormModalProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const formData = new FormData(e.target as HTMLFormElement);
            const data = Object.fromEntries(formData.entries());
            await onSubmit(data);
            onClose();
        } catch (error) {
            console.error("Form submission failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            size={size}
            footer={
                <div className="ui:flex ui:gap-3 ui:justify-end">
                    <Button variant="ghost" onClick={onClose} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        form="modal-form"
                        variant="primary"
                        disabled={isLoading}
                    >
                        {isLoading ? "Saving..." : submitText}
                    </Button>
                </div>
            }
        >
            <form id="modal-form" onSubmit={handleSubmit} className="ui:space-y-4">
                {children}
            </form>
        </Modal>
    );
}

/**
 * Info Modal
 * Use for displaying information or help text
 */
interface InfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    size?: "sm" | "md" | "lg";
}

export function InfoModal({
    isOpen,
    onClose,
    title,
    children,
    size = "md",
}: InfoModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            size={size}
            footer={
                <Button variant="primary" onClick={onClose}>
                    Got it
                </Button>
            }
        >
            {children}
        </Modal>
    );
}

/**
 * Selection Modal
 * Use for selecting from a list of options
 */
interface SelectionModalProps<T> {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    items: T[];
    onSelect: (item: T) => void;
    renderItem: (item: T) => React.ReactNode;
    keyExtractor: (item: T) => string;
    searchable?: boolean;
    size?: "sm" | "md" | "lg";
}

export function SelectionModal<T>({
    isOpen,
    onClose,
    title,
    items,
    onSelect,
    renderItem,
    keyExtractor,
    searchable = false,
    size = "md",
}: SelectionModalProps<T>) {
    const [search, setSearch] = useState("");

    const filteredItems = searchable
        ? items.filter((item) =>
            renderItem(item)?.toString().toLowerCase().includes(search.toLowerCase())
        )
        : items;

    const handleSelect = (item: T) => {
        onSelect(item);
        onClose();
        setSearch("");
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title} size={size}>
            <div className="ui:space-y-4">
                {searchable && (
                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="ui:w-full ui:px-3 ui:py-2 ui:border ui:border-gray-300 dark:ui:border-gray-600 ui:bg-white dark:ui:bg-slate-900 ui:text-black dark:ui:text-white ui:rounded-md focus:ui:outline-none focus:ui:ring-2 focus:ui:ring-blue-500 dark:focus:ui:ring-blue-400"
                    />
                )}
                <div className="ui:space-y-2 ui:max-h-96 ui:overflow-y-auto">
                    {filteredItems.length === 0 ? (
                        <p className="ui:text-gray-500 dark:ui:text-gray-400 ui:text-center ui:py-8">
                            No items found
                        </p>
                    ) : (
                        filteredItems.map((item) => (
                            <button
                                key={keyExtractor(item)}
                                onClick={() => handleSelect(item)}
                                className="ui:w-full ui:text-left ui:px-4 ui:py-3 ui:rounded-md ui:border ui:border-gray-200 dark:ui:border-gray-700 hover:ui:bg-gray-50 dark:hover:ui:bg-slate-800 hover:ui:border-gray-300 dark:hover:ui:border-gray-600 ui:text-black dark:ui:text-white ui:transition-colors"
                            >
                                {renderItem(item)}
                            </button>
                        ))
                    )}
                </div>
            </div>
        </Modal>
    );
}
