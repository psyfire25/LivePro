"use client";

import { useState, useMemo } from "react";
import { Button, Gradient, Card } from "@repo/ui";
import { ExpenseForm } from "@/components/expense-form";
import { ExpenseList } from "@/components/expense-list";
import type { Expense } from "@/lib/types";
import { useSearch } from "@/components/search-provider";

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { query } = useSearch();

  // Filter expenses based on search query
  const filteredExpenses = useMemo(() => {
    if (!query.trim()) return expenses;

    const lowerQuery = query.toLowerCase();
    return expenses.filter((expense) => {
      return (
        expense.vendor.toLowerCase().includes(lowerQuery) ||
        expense.category.toLowerCase().includes(lowerQuery) ||
        expense.description.toLowerCase().includes(lowerQuery)
      );
    });
  }, [expenses, query]);

  const handleAddExpense = (data: Record<string, unknown>) => {
    const newExpense: Expense = {
      id: Math.random().toString(36).substring(7),
      category: data.category as Expense["category"],
      vendor: data.vendor as string,
      amount: Number(data.amount),
      date: data.date as string,
      description: data.description as string,
      createdAt: new Date().toISOString(),
    };

    setExpenses([newExpense, ...expenses]);
    setIsModalOpen(false);
  };

  return (
    <main className="ui:container ui:mx-auto ui:px-4 ui:py-8">
      <Gradient />

      <div className="ui:flex ui:items-center ui:justify-between ui:mb-8">
        <h1 className="ui:text-3xl ui:font-bold">Finance Dashboard</h1>
        <Button onClick={() => setIsModalOpen(true)}>Add Expense</Button>
      </div>

      <div className="ui:grid ui:grid-cols-1 md:ui:grid-cols-3 ui:gap-6 ui:mb-8">
        <Card title="Total Expenses" href="#">
          <div className="ui:text-3xl ui:font-bold ui:mt-2">
            ${expenses.reduce((sum, e) => sum + e.amount, 0).toFixed(2)}
          </div>
          <div className="ui:text-sm ui:opacity-70 ui:mt-1">
            {expenses.length} transactions
          </div>
        </Card>

        <Card title="Pending Items" href="#">
          <div className="ui:text-3xl ui:font-bold ui:mt-2">0</div>
          <div className="ui:text-sm ui:opacity-70 ui:mt-1">
            All caught up
          </div>
        </Card>

        <Card title="Budget Status" href="#">
          <div className="ui:text-3xl ui:font-bold ui:mt-2 ui:text-green-600">
            On Track
          </div>
          <div className="ui:text-sm ui:opacity-70 ui:mt-1">
            15% under budget
          </div>
        </Card>
      </div>

      <section className="lp-card">
        <div className="ui:flex ui:items-center ui:justify-between ui:mb-6">
          <h2 className="ui:text-xl ui:font-semibold">Recent Expenses</h2>
        </div>
        <ExpenseList expenses={filteredExpenses} />
      </section>

      <ExpenseForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddExpense}
      />
    </main>
  );
}
