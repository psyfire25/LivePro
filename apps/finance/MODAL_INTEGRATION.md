# Modal Integration Examples for Finance App

This document provides practical examples of using the Modal component in the Finance app.

## Common Use Cases

### 1. Create Budget

```tsx
"use client";
import { useState } from "react";
import { FormModal, Button, Input } from "@repo/ui";

export function CreateBudgetButton({ eventId }: { eventId: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (data: any) => {
    await fetch("/api/budgets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, eventId }),
    });
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Create Budget</Button>

      <FormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Create Event Budget"
        onSubmit={handleSubmit}
        size="lg"
      >
        <div>
          <label htmlFor="budgetName" className="ui:block ui:text-sm ui:font-medium ui:mb-1">
            Budget Name
          </label>
          <Input
            type="text"
            id="budgetName"
            name="name"
            placeholder="e.g., Summer Festival 2025 Budget"
            required
          />
        </div>

        <div className="ui:grid ui:grid-cols-2 ui:gap-4">
          <div>
            <label htmlFor="talentBudget" className="ui:block ui:text-sm ui:font-medium ui:mb-1">
              Talent Budget
            </label>
            <Input
              type="number"
              id="talentBudget"
              name="talentBudget"
              placeholder="0.00"
              step="0.01"
              required
            />
          </div>

          <div>
            <label htmlFor="productionBudget" className="ui:block ui:text-sm ui:font-medium ui:mb-1">
              Production Budget
            </label>
            <Input
              type="number"
              id="productionBudget"
              name="productionBudget"
              placeholder="0.00"
              step="0.01"
              required
            />
          </div>
        </div>

        <div className="ui:grid ui:grid-cols-2 ui:gap-4">
          <div>
            <label htmlFor="staffingBudget" className="ui:block ui:text-sm ui:font-medium ui:mb-1">
              Staffing Budget
            </label>
            <Input
              type="number"
              id="staffingBudget"
              name="staffingBudget"
              placeholder="0.00"
              step="0.01"
              required
            />
          </div>

          <div>
            <label htmlFor="venueBudget" className="ui:block ui:text-sm ui:font-medium ui:mb-1">
              Venue Budget
            </label>
            <Input
              type="number"
              id="venueBudget"
              name="venueBudget"
              placeholder="0.00"
              step="0.01"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="contingency" className="ui:block ui:text-sm ui:font-medium ui:mb-1">
            Contingency (%)
          </label>
          <Input
            type="number"
            id="contingency"
            name="contingency"
            placeholder="10"
            min="0"
            max="100"
          />
        </div>
      </FormModal>
    </>
  );
}
```

### 2. Generate Invoice

```tsx
"use client";
import { useState } from "react";
import { FormModal, Button, Input } from "@repo/ui";

export function GenerateInvoiceButton({ eventId }: { eventId: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (data: any) => {
    await fetch("/api/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, eventId }),
    });
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Generate Invoice</Button>

      <FormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Generate Invoice"
        onSubmit={handleSubmit}
        submitText="Generate"
        size="lg"
      >
        <div>
          <label htmlFor="clientName" className="ui:block ui:text-sm ui:font-medium ui:mb-1">
            Client Name
          </label>
          <Input
            type="text"
            id="clientName"
            name="clientName"
            placeholder="Company Name"
            required
          />
        </div>

        <div>
          <label htmlFor="clientEmail" className="ui:block ui:text-sm ui:font-medium ui:mb-1">
            Client Email
          </label>
          <Input
            type="email"
            id="clientEmail"
            name="clientEmail"
            placeholder="billing@company.com"
            required
          />
        </div>

        <div className="ui:grid ui:grid-cols-2 ui:gap-4">
          <div>
            <label htmlFor="invoiceNumber" className="ui:block ui:text-sm ui:font-medium ui:mb-1">
              Invoice Number
            </label>
            <Input
              type="text"
              id="invoiceNumber"
              name="invoiceNumber"
              placeholder="INV-001"
              required
            />
          </div>

          <div>
            <label htmlFor="dueDate" className="ui:block ui:text-sm ui:font-medium ui:mb-1">
              Due Date
            </label>
            <Input type="date" id="dueDate" name="dueDate" required />
          </div>
        </div>

        <div>
          <label htmlFor="amount" className="ui:block ui:text-sm ui:font-medium ui:mb-1">
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
          <label htmlFor="notes" className="ui:block ui:text-sm ui:font-medium ui:mb-1">
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            className="ui:w-full ui:px-3 ui:py-2 ui:border ui:border-gray-300 ui:rounded-md"
            placeholder="Payment terms, thank you note, etc."
          />
        </div>
      </FormModal>
    </>
  );
}
```

### 3. Record Expense

```tsx
"use client";
import { useState } from "react";
import { FormModal, Button, Input } from "@repo/ui";

export function RecordExpenseButton({ eventId }: { eventId: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (data: any) => {
    await fetch("/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, eventId }),
    });
  };

  return (
    <>
      <Button variant="outline" onClick={() => setIsOpen(true)}>
        Record Expense
      </Button>

      <FormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Record Expense"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="category" className="ui:block ui:text-sm ui:font-medium ui:mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            required
            className="ui:w-full ui:px-3 ui:py-2 ui:border ui:border-gray-300 ui:rounded-md"
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
          <label htmlFor="vendor" className="ui:block ui:text-sm ui:font-medium ui:mb-1">
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
            <label htmlFor="amount" className="ui:block ui:text-sm ui:font-medium ui:mb-1">
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
            <label htmlFor="date" className="ui:block ui:text-sm ui:font-medium ui:mb-1">
              Date
            </label>
            <Input type="date" id="date" name="date" required />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="ui:block ui:text-sm ui:font-medium ui:mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            className="ui:w-full ui:px-3 ui:py-2 ui:border ui:border-gray-300 ui:rounded-md"
            placeholder="Expense details..."
            required
          />
        </div>
      </FormModal>
    </>
  );
}
```

### 4. Delete Expense Confirmation

```tsx
"use client";
import { useConfirmDialog, Button } from "@repo/ui";

export function ExpenseRow({ expense }) {
  const { confirm, ConfirmDialog } = useConfirmDialog();

  const handleDelete = () => {
    confirm({
      title: "Delete Expense",
      message: `Are you sure you want to delete this ${expense.category} expense of $${expense.amount}?`,
      confirmText: "Delete",
      variant: "danger",
      onConfirm: async () => {
        await fetch(`/api/expenses/${expense.id}`, { method: "DELETE" });
      },
    });
  };

  return (
    <>
      <div className="expense-row">
        <span>{expense.vendor}</span>
        <span>${expense.amount}</span>
        <Button variant="ghost" onClick={handleDelete}>
          Delete
        </Button>
      </div>
      <ConfirmDialog />
    </>
  );
}
```

### 5. View Budget Breakdown

```tsx
"use client";
import { useState } from "react";
import { Modal, Button } from "@repo/ui";

export function ViewBudgetButton({ budget }) {
  const [isOpen, setIsOpen] = useState(false);

  const totalBudget =
    budget.talent + budget.production + budget.staffing + budget.venue;
  const totalSpent =
    budget.talentSpent +
    budget.productionSpent +
    budget.staffingSpent +
    budget.venueSpent;
  const remaining = totalBudget - totalSpent;

  return (
    <>
      <Button variant="outline" onClick={() => setIsOpen(true)}>
        View Breakdown
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Budget Breakdown"
        size="lg"
      >
        <div className="ui:space-y-6">
          <div className="ui:grid ui:grid-cols-3 ui:gap-4 ui:p-4 ui:bg-gray-50 ui:rounded-md">
            <div>
              <div className="ui:text-sm ui:text-gray-600">Total Budget</div>
              <div className="ui:text-2xl ui:font-bold">
                ${totalBudget.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="ui:text-sm ui:text-gray-600">Total Spent</div>
              <div className="ui:text-2xl ui:font-bold ui:text-red-600">
                ${totalSpent.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="ui:text-sm ui:text-gray-600">Remaining</div>
              <div className="ui:text-2xl ui:font-bold ui:text-green-600">
                ${remaining.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="ui:space-y-3">
            {[
              { name: "Talent", budget: budget.talent, spent: budget.talentSpent },
              { name: "Production", budget: budget.production, spent: budget.productionSpent },
              { name: "Staffing", budget: budget.staffing, spent: budget.staffingSpent },
              { name: "Venue", budget: budget.venue, spent: budget.venueSpent },
            ].map((category) => (
              <div key={category.name}>
                <div className="ui:flex ui:justify-between ui:mb-1">
                  <span className="ui:font-medium">{category.name}</span>
                  <span className="ui:text-sm ui:text-gray-600">
                    ${category.spent.toLocaleString()} / $
                    {category.budget.toLocaleString()}
                  </span>
                </div>
                <div className="ui:w-full ui:bg-gray-200 ui:rounded-full ui:h-2">
                  <div
                    className={`ui:h-2 ui:rounded-full ${
                      (category.spent / category.budget) * 100 > 90
                        ? "ui:bg-red-500"
                        : "ui:bg-green-500"
                    }`}
                    style={{
                      width: `${Math.min((category.spent / category.budget) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
}
```

### 6. Payment Tracking

```tsx
"use client";
import { useState } from "react";
import { Modal, Button } from "@repo/ui";

export function RecordPaymentButton({ invoiceId, amount }) {
  const [isOpen, setIsOpen] = useState(false);
  const [payment, setPayment] = useState({
    amount: amount,
    date: new Date().toISOString().split("T")[0],
    method: "bank-transfer",
  });

  const handleSubmit = async () => {
    await fetch(`/api/invoices/${invoiceId}/payments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payment),
    });
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Record Payment</Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Record Payment"
        footer={
          <div className="ui:flex ui:gap-3 ui:justify-end">
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Record
            </Button>
          </div>
        }
      >
        <div className="ui:space-y-4">
          <div>
            <label className="ui:block ui:text-sm ui:font-medium ui:mb-1">
              Payment Amount
            </label>
            <input
              type="number"
              value={payment.amount}
              onChange={(e) =>
                setPayment({ ...payment, amount: parseFloat(e.target.value) })
              }
              className="ui:w-full ui:px-3 ui:py-2 ui:border ui:border-gray-300 ui:rounded-md"
              step="0.01"
            />
          </div>

          <div>
            <label className="ui:block ui:text-sm ui:font-medium ui:mb-1">
              Payment Date
            </label>
            <input
              type="date"
              value={payment.date}
              onChange={(e) => setPayment({ ...payment, date: e.target.value })}
              className="ui:w-full ui:px-3 ui:py-2 ui:border ui:border-gray-300 ui:rounded-md"
            />
          </div>

          <div>
            <label className="ui:block ui:text-sm ui:font-medium ui:mb-1">
              Payment Method
            </label>
            <select
              value={payment.method}
              onChange={(e) => setPayment({ ...payment, method: e.target.value })}
              className="ui:w-full ui:px-3 ui:py-2 ui:border ui:border-gray-300 ui:rounded-md"
            >
              <option value="bank-transfer">Bank Transfer</option>
              <option value="check">Check</option>
              <option value="credit-card">Credit Card</option>
              <option value="cash">Cash</option>
            </select>
          </div>
        </div>
      </Modal>
    </>
  );
}
```

## Integration Checklist

- [ ] Create budget management modals
- [ ] Add invoice generation forms
- [ ] Implement expense recording
- [ ] Set up payment tracking
- [ ] Add budget breakdown views
- [ ] Include delete confirmations
- [ ] Test currency formatting
- [ ] Mobile responsiveness

## Best Practices

1. **Always format currency** with proper locale and decimals
2. **Validate financial inputs** - prevent negative values
3. **Show budget vs. actual** with visual indicators
4. **Confirm before deleting** expenses or invoices
5. **Track payment methods** for accounting
6. **Export capabilities** - consider adding PDF export
