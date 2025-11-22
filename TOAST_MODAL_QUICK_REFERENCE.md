# Toast and Modal Quick Reference

Complete guide for using toast notifications and modals across all LivePro applications.

## 🎯 Toast Notifications

### Basic Usage

```tsx
import { useToast } from "@repo/ui";

function MyComponent() {
  const toast = useToast();

  const handleSuccess = () => {
    toast.success("Item saved successfully!");
  };

  const handleError = () => {
    toast.error("Failed to save item", "Error");
  };

  return <button onClick={handleSuccess}>Save</button>;
}
```

### Toast API

The `useToast` hook provides four methods:

```tsx
const toast = useToast();

// Success notification (green)
toast.success(message, title?, duration?)

// Error notification (red)
toast.error(message, title?, duration?)

// Warning notification (yellow)
toast.warning(message, title?, duration?)

// Info notification (blue)
toast.info(message, title?, duration?)

// Dismiss specific toast
toast.dismiss(toastId)

// Dismiss all toasts
toast.dismissAll()
```

### Examples

```tsx
// Simple success
toast.success("Changes saved");

// Error with title
toast.error("Failed to connect to server", "Connection Error");

// Warning with custom duration (10 seconds)
toast.warning("Your session will expire soon", "Warning", 10000);

// Info notification
toast.info("New features available!");
```

---

## 🪟 Modals

### Available Modal Patterns

#### 1. Confirm Dialog

Best for destructive actions requiring confirmation:

```tsx
import { useConfirmDialog } from "@repo/ui";

function DeleteButton({ item }) {
  const { confirm, ConfirmDialog } = useConfirmDialog();

  const handleDelete = () => {
    confirm({
      title: "Delete Item",
      message: "Are you sure? This cannot be undone.",
      confirmText: "Delete",
      variant: "danger",
      onConfirm: async () => {
        await deleteItem(item.id);
        toast.success("Item deleted");
      },
    });
  };

  return (
    <>
      <button onClick={handleDelete}>Delete</button>
      <ConfirmDialog />
    </>
  );
}
```

#### 2. Form Modal

Best for creating or editing entities:

```tsx
import { FormModal } from "@repo/ui";
import { useState } from "react";

function CreateItemButton() {
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Create Item</button>
      
      <FormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Create New Item"
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          await createItem(formData);
          toast.success("Item created!");
          setIsOpen(false);
        }}
      >
        <input name="name" placeholder="Item name" required />
        <textarea name="description" placeholder="Description" />
      </FormModal>
    </>
  );
}
```

#### 3. Info Modal

Best for displaying information:

```tsx
import { InfoModal } from "@repo/ui";

function ViewDetailsButton({ item }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>View Details</button>
      
      <InfoModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={item.name}
      >
        <p>{item.description}</p>
        <p>Created: {item.createdAt}</p>
      </InfoModal>
    </>
  );
}
```

#### 4. Selection Modal

Best for choosing from a list:

```tsx
import { SelectionModal } from "@repo/ui";

function SelectUserButton({ users }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Assign User</button>
      
      <SelectionModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Select User"
        items={users}
        onSelect={(user) => {
          assignUser(user);
          setIsOpen(false);
        }}
        keyExtractor={(user) => user.id}
        renderItem={(user) => (
          <div>
            <div className="font-bold">{user.name}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
        )}
        searchable
      />
    </>
  );
}
```

#### 5. Custom Modal

For complete control:

```tsx
import { Modal, Button } from "@repo/ui";

function CustomModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open</button>
      
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Custom Modal"
        size="lg"
        footer={
          <div className="ui:flex ui:gap-2">
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        }
      >
        <p>Your custom content here</p>
      </Modal>
    </>
  );
}
```

### Modal Sizes

- `sm` - Small (max-width: 24rem)
- `md` - Medium (max-width: 28rem) - **default**
- `lg` - Large (max-width: 32rem)
- `xl` - Extra Large (max-width: 36rem)
- `full` - Full width with margin

---

## 💡 Common Patterns

### Toast + Modal Combo

```tsx
function SaveButton({ data }) {
  const { confirm, ConfirmDialog } = useConfirmDialog();
  const toast = useToast();

  const handleSave = () => {
    confirm({
      title: "Save Changes",
      message: "Are you sure you want to save?",
      onConfirm: async () => {
        try {
          await saveData(data);
          toast.success("Changes saved successfully!");
        } catch (error) {
          toast.error("Failed to save changes", "Error");
        }
      },
    });
  };

  return (
    <>
      <button onClick={handleSave}>Save</button>
      <ConfirmDialog />
    </>
  );
}
```

### Form Validation with Toast

```tsx
function CreateForm() {
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    if (!formData.get('name')) {
      toast.warning("Name is required", "Validation Error");
      return;
    }

    try {
      await createItem(formData);
      toast.success("Item created!");
    } catch (error) {
      toast.error(error.message, "Error");
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

---

## 📦 Available Imports

```tsx
// Toast System
import { 
  ToastProvider,    // Provider (already in layouts)
  useToast,         // Hook for showing toasts
  Toast,            // Component (used internally)
  ToastContainer    // Container (used internally)
} from "@repo/ui";

// Modal System
import {
  Modal,            // Base modal component
  useConfirmDialog, // Hook for confirmation dialogs
  FormModal,        // Modal for forms
  InfoModal,        // Modal for information
  SelectionModal    // Modal for selections
} from "@repo/ui";
```

---

## 🎨 Best Practices

### Toast Notifications

✅ **DO:**
- Use success for confirming actions
- Use error for failures
- Use warning for potential issues
- Keep messages concise and actionable
- Provide context in the title

❌ **DON'T:**
- Overuse toasts (avoid notification fatigue)
- Use toasts for critical errors (use error pages)
- Make messages too long
- Stack too many toasts at once

### Modals

✅ **DO:**
- Use appropriate patterns for your use case
- Always confirm destructive actions
- Keep modal content focused
- Test on mobile devices
- Handle loading states

❌ **DON'T:**
- Nest modals within modals
- Overload with too much content
- Disable backdrop click without good reason
- Forget keyboard support (ESC)
- Skip form validation

---

## 📚 Additional Resources

- [Modal Integration Guide](file:///Volumes/T7/CodeT7/Archive/LivePro/MODAL_INTEGRATION_GUIDE.md) - Comprehensive modal documentation
- [Notification Quick Reference](file:///Volumes/T7/CodeT7/Archive/LivePro/NOTIFICATION_QUICKREF.md) - Push notification system

---

## 🔍 Integrated Apps

All apps now have toast and modal support:

- ✅ **Production** - Event management, task assignment
- ✅ **Finance** - Budget creation, expense tracking
- ✅ **Staffing** - Crew management, shift assignment
- ✅ **Talent** - Artist management, booking creation
- ✅ **Web** - Portal and authentication
