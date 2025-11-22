export type ExpenseCategory =
    | "talent"
    | "production"
    | "staffing"
    | "venue"
    | "marketing"
    | "other";

export type Expense = {
    id: string;
    category: ExpenseCategory;
    vendor: string;
    amount: number;
    date: string;
    description: string;
    createdAt: string;
};
