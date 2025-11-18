# Universal Modal - Complete Integration Guide

This document provides a comprehensive overview of the modal system and how to integrate it across all LivePro apps.

## 📦 What Was Created

### Core Components

1. **[Modal Component](file:///Volumes/T7/CodeT7/Archive/LivePro/packages/ui/src/components/ui/modal.tsx)**
   - Universal, prop-driven modal
   - 5 size variants (sm, md, lg, xl, full)
   - Smooth animations
   - Keyboard support (ESC)
   - Backdrop click handling
   - Accessibility built-in

2. **[Modal Patterns](file:///Volumes/T7/CodeT7/Archive/LivePro/packages/ui/src/components/ui/modal-patterns.tsx)**
   - `useConfirmDialog` - Hook for confirmation dialogs
   - `FormModal` - Modal for forms
   - `InfoModal` - Modal for displaying information
   - `SelectionModal` - Modal for selecting from lists

### Documentation

3. **[Modal README](file:///Volumes/T7/CodeT7/Archive/LivePro/packages/ui/src/components/ui/modal.README.md)**
   - Complete API reference
   - Usage examples
   - Best practices

4. **[Usage Examples](file:///Volumes/T7/CodeT7/Archive/LivePro/packages/ui/src/components/ui/modal.examples.tsx)**
   - Working code examples
   - All patterns demonstrated

5. **[Interactive Demo](file:///Volumes/T7/CodeT7/Archive/LivePro/packages/ui/src/components/ui/modal.demo.html)**
   - Browser-based demo
   - Test all variants

### App-Specific Integration Guides

6. **[Production App](file:///Volumes/T7/CodeT7/Archive/LivePro/apps/production/MODAL_INTEGRATION.md)**
   - Event management modals
   - Stage configuration
   - Task assignment
   - Delete confirmations

7. **[Talent App](file:///Volumes/T7/CodeT7/Archive/LivePro/apps/talent/MODAL_INTEGRATION.md)**
   - Artist management
   - Booking creation
   - Rider viewing
   - Contract tracking

8. **[Staffing App](file:///Volumes/T7/CodeT7/Archive/LivePro/apps/staffing/MODAL_INTEGRATION.md)**
   - Crew management
   - Shift assignment
   - Schedule viewing
   - Availability tracking

9. **[Finance App](file:///Volumes/T7/CodeT7/Archive/LivePro/apps/finance/MODAL_INTEGRATION.md)**
   - Budget creation
   - Invoice generation
   - Expense recording
   - Payment tracking

10. **[Web App](file:///Volumes/T7/CodeT7/Archive/LivePro/apps/web/MODAL_INTEGRATION.md)**
    - Welcome modals
    - App selection
    - Help documentation
    - Quick actions

---

## 🚀 Quick Start

### Installation

The modal is already available in the `@repo/ui` package. No additional installation needed!

### Basic Import

```tsx
import { Modal, Button } from "@repo/ui";
```

### Pattern Imports

```tsx
import { 
  useConfirmDialog, 
  FormModal, 
  InfoModal, 
  SelectionModal 
} from "@repo/ui";
```

---

## 📚 Common Patterns

### 1. Confirmation Dialog (Delete, Cancel, etc.)

**Best for:** Destructive actions that need confirmation

```tsx
import { useConfirmDialog, Button } from "@repo/ui";

export function DeleteButton({ item }) {
  const { confirm, ConfirmDialog } = useConfirmDialog();

  const handleDelete = () => {
    confirm({
      title: "Delete Item",
      message: "Are you sure? This cannot be undone.",
      confirmText: "Delete",
      variant: "danger",
      onConfirm: async () => {
        await deleteItem(item.id);
      },
    });
  };

  return (
    <>
      <Button onClick={handleDelete}>Delete</Button>
      <ConfirmDialog />
    </>
  );
}
```

### 2. Create/Edit Forms

**Best for:** Creating or editing entities

```tsx
import { FormModal, Button } from "@repo/ui";

export function CreateItemButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Create</Button>
      
      <FormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Create Item"
        onSubmit={async (data) => {
          await createItem(data);
        }}
      >
        {/* Form fields here */}
      </FormModal>
    </>
  );
}
```

### 3. Information Display

**Best for:** Showing details, help text, or read-only content

```tsx
import { InfoModal, Button } from "@repo/ui";

export function ViewDetailsButton({ item }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Details</Button>
      
      <InfoModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={item.name}
      >
        {/* Details content here */}
      </InfoModal>
    </>
  );
}
```

### 4. Item Selection

**Best for:** Choosing from a list of items

```tsx
import { SelectionModal, Button } from "@repo/ui";

export function SelectButton({ items }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Select</Button>
      
      <SelectionModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Select Item"
        items={items}
        onSelect={(item) => handleSelect(item)}
        keyExtractor={(item) => item.id}
        renderItem={(item) => <div>{item.name}</div>}
        searchable
      />
    </>
  );
}
```

---

## 🎨 Styling

The modal uses the `ui:` prefix for Tailwind classes, consistent with the UI package.

### Custom Styling

```tsx
<Modal
  className="ui:custom-class"
  // ... other props
>
```

### Size Variants

- `sm` - Small (max-width: 24rem)
- `md` - Medium (max-width: 28rem) - **default**
- `lg` - Large (max-width: 32rem)
- `xl` - Extra Large (max-width: 36rem)
- `full` - Full width with margin

---

## ♿ Accessibility

The modal component includes:

- Proper ARIA attributes (`role="dialog"`, `aria-modal="true"`)
- Keyboard support (ESC to close)
- Focus management
- Screen reader support

---

## 📱 Mobile Responsiveness

All modals are mobile-responsive:

- Max height of 90vh prevents overflow
- Internal scrolling for long content
- Touch-friendly close buttons
- Proper spacing on small screens

---

## 🔧 Advanced Usage

### Custom Modal (without patterns)

```tsx
import { Modal, Button } from "@repo/ui";

<Modal
  isOpen={isOpen}
  onClose={onClose}
  title="Custom Modal"
  size="lg"
  closeOnBackdropClick={false}
  closeOnEsc={false}
  showCloseButton={false}
  footer={
    <div>Custom footer</div>
  }
>
  <div>Custom content</div>
</Modal>
```

### Nested Modals (Not Recommended)

While technically possible, avoid nesting modals. Instead:
- Close the first modal before opening the second
- Use a wizard/stepper pattern
- Consider a drawer component for secondary UI

---

## ✅ Integration Checklist

Use this checklist when integrating modals into an app:

### Planning
- [ ] Identify all places where modals are needed
- [ ] Choose the right pattern for each use case
- [ ] Plan the modal flow (what opens what)

### Development
- [ ] Import from `@repo/ui`
- [ ] Implement confirmation dialogs for destructive actions
- [ ] Convert forms to use FormModal
- [ ] Add selection modals where appropriate
- [ ] Test all modals with keyboard (ESC, Tab)

### Testing
- [ ] Test on mobile devices
- [ ] Test with screen readers
- [ ] Test backdrop click behavior
- [ ] Test ESC key behavior
- [ ] Test form validation
- [ ] Test loading states

### Polish
- [ ] Ensure consistent styling
- [ ] Add appropriate animations
- [ ] Provide clear error messages
- [ ] Test with real data
- [ ] Review accessibility

---

## 🎯 Best Practices

### DO ✅

1. **Use the right pattern** - Choose the appropriate pattern for your use case
2. **Confirm destructive actions** - Always use ConfirmDialog for deletes
3. **Handle loading states** - Show loading indicators during async operations
4. **Provide feedback** - Let users know when actions succeed or fail
5. **Mobile-first** - Test on mobile devices early
6. **Keep it simple** - Don't overcomplicate modal content

### DON'T ❌

1. **Nest modals** - Avoid opening modals from within modals
2. **Overload content** - Keep modal content focused
3. **Forget about mobile** - Always test responsiveness
4. **Ignore errors** - Handle and display errors properly
5. **Skip confirmation** - For destructive actions, always confirm
6. **Disable backdrop click** without good reason

---

## 🔄 Migration Guide

### Replacing Existing Modals

If you have existing modal implementations:

1. **Identify the pattern** - Is it a confirm, form, info, or selection modal?
2. **Import the pattern** - Get it from `@repo/ui`
3. **Replace the implementation** - Use the new pattern
4. **Test thoroughly** - Ensure behavior matches expectations
5. **Remove old code** - Clean up the old modal implementation

### Example Migration

**Before:**
```tsx
// Custom modal implementation
<div className="modal-backdrop" onClick={close}>
  <div className="modal-content">
    <h2>{title}</h2>
    <p>{message}</p>
    <button onClick={confirm}>OK</button>
  </div>
</div>
```

**After:**
```tsx
import { InfoModal } from "@repo/ui";

<InfoModal
  isOpen={isOpen}
  onClose={onClose}
  title={title}
>
  <p>{message}</p>
</InfoModal>
```

---

## 📊 Usage By App

| App | Primary Use Cases |
|-----|------------------|
| **Production** | Event creation, stage management, task assignment |
| **Talent** | Artist management, booking creation, rider viewing |
| **Staffing** | Crew management, shift assignment, schedule viewing |
| **Finance** | Budget creation, invoice generation, expense tracking |
| **Web** | Welcome modals, app selection, help documentation |

---

## 🆘 Troubleshooting

### Modal not showing

- Check `isOpen` prop is `true`
- Verify modal is not behind other elements (z-index)
- Check for JavaScript errors in console

### Modal not closing

- Verify `onClose` callback is wired up correctly
- Check `closeOnBackdropClick` and `closeOnEsc` props
- Ensure close button `onClick` calls `onClose`

### Form not submitting

- Check form has `id` that matches footer button's `form` attribute
- Verify `onSubmit` handler is async if needed
- Check for validation errors

### Styling issues

- Ensure Tailwind is processing the `ui:` prefix
- Check for conflicting CSS
- Verify className is being applied

---

## 📞 Support

For questions or issues:

1. Check the [Modal README](file:///Volumes/T7/CodeT7/Archive/LivePro/packages/ui/src/components/ui/modal.README.md)
2. Review the [usage examples](file:///Volumes/T7/CodeT7/Archive/LivePro/packages/ui/src/components/ui/modal.examples.tsx)
3. Check the app-specific integration guides
4. Open the [interactive demo](file:///Volumes/T7/CodeT7/Archive/LivePro/packages/ui/src/components/ui/modal.demo.html)

---

## 🎉 Next Steps

1. Review the integration guide for your specific app
2. Start with simple use cases (info modals, confirmations)
3. Gradually replace existing modal implementations
4. Test on mobile devices
5. Share feedback and improvements

Happy coding! 🚀
