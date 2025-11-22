"use client";

import { useState } from "react";
import { Button, Card, Gradient } from "@repo/ui";
import { ExpenseForm } from "@/components/expense-form";
import { ExpenseList } from "@/components/expense-list";
import type { Expense } from "@/lib/types";

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <main className="ui:min-h-screen ui:p-8 ui:space-y-8">
      <section className="ui:relative ui:overflow-hidden lp-card lp-card-lg lp-hero-bg ui:min-h-[200px] ui:flex ui:flex-col ui:justify-center">
        <Gradient className="ui:opacity-30" conic />
        <div className="ui:relative ui:z-10 ui:flex ui:justify-between ui:items-end">
          <div>
            <h1 className="ui:text-4xl ui:font-bold ui:tracking-tight">Finance</h1>
            <p className="ui:mt-2 ui:text-lg ui:opacity-80">
              Track expenses, manage budgets, and handle settlements.
            </p>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>Add Expense</Button>
        </div>
      </section>

      <div className="ui:grid ui:gap-6 sm:ui:grid-cols-3">
        <Card title="Total Expenses" href="#">
          <div className="ui:text-3xl ui:font-bold ui:mt-2">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(totalExpenses)}
          </div>
          <div className="ui:text-sm ui:opacity-70 ui:mt-1">
            {expenses.length} items recorded
          </div>
        </Card>

        <Card title="Pending Approvals" href="#">
          <div className="ui:text-3xl ui:font-bold ui:mt-2">$0.00</div>
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
        <ExpenseList expenses={expenses} />
      </section>

      <ExpenseForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddExpense}
      />
    </main>
  );
}
