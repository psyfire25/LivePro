# Modal Component

A universal, prop-driven modal component that can be easily used anywhere in your application.

## Features

- ✅ **Fully Prop-Driven** - Control everything through props
- ✅ **Flexible Sizes** - 5 size variants (sm, md, lg, xl, full)
- ✅ **Animations** - Smooth fade and slide animations
- ✅ **Accessibility** - Proper ARIA attributes and keyboard support
- ✅ **Scroll Management** - Prevents body scroll when modal is open
- ✅ **Customizable** - Optional header, footer, close button
- ✅ **Click Outside** - Configurable backdrop click behavior
- ✅ **ESC Key** - Configurable ESC key to close
- ✅ **Mobile Responsive** - Adapts to all screen sizes

## Basic Usage

```tsx
import { Modal, Button } from "@repo/ui";
import { useState } from "react";

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="My Modal"
      >
        <p>Modal content goes here</p>
      </Modal>
    </>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | **required** | Whether the modal is open |
| `onClose` | `() => void` | **required** | Callback when modal should close |
| `title` | `string` | `undefined` | Modal title displayed in header |
| `children` | `ReactNode` | **required** | Modal content |
| `footer` | `ReactNode` | `undefined` | Optional footer content (actions, buttons) |
| `size` | `"sm" \| "md" \| "lg" \| "xl" \| "full"` | `"md"` | Size variant |
| `closeOnBackdropClick` | `boolean` | `true` | Whether clicking outside closes the modal |
| `closeOnEsc` | `boolean` | `true` | Whether pressing ESC closes the modal |
| `className` | `string` | `""` | Custom className for the modal content |
| `showCloseButton` | `boolean` | `true` | Show close button in header |
| `centered` | `boolean` | `true` | Center content vertically |

## Examples

### Modal with Footer Actions

```tsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
  footer={
    <div className="ui:flex ui:gap-3 ui:justify-end">
      <Button variant="ghost" onClick={() => setIsOpen(false)}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleSave}>
        Save Changes
      </Button>
    </div>
  }
>
  <p>Are you sure you want to save these changes?</p>
</Modal>
```

### Different Sizes

```tsx
<Modal size="sm" isOpen={isOpen} onClose={onClose} title="Small">
  Small modal content
</Modal>

<Modal size="lg" isOpen={isOpen} onClose={onClose} title="Large">
  Large modal content
</Modal>

<Modal size="full" isOpen={isOpen} onClose={onClose} title="Full Width">
  Full width modal content
</Modal>
```

### Form in Modal

```tsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Contact Form"
  footer={
    <div className="ui:flex ui:gap-3 ui:justify-end">
      <Button variant="ghost" onClick={() => setIsOpen(false)}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  }
>
  <form className="ui:space-y-4">
    <div>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" />
    </div>
    <div>
      <label htmlFor="email">Email</label>
      <input type="email" id="email" />
    </div>
  </form>
</Modal>
```

### No Close Button (Forced Action)

```tsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Important Notice"
  showCloseButton={false}
  closeOnBackdropClick={false}
  closeOnEsc={false}
  footer={
    <Button variant="primary" onClick={() => setIsOpen(false)}>
      I Understand
    </Button>
  }
>
  <p>This modal requires you to click the button to close it.</p>
</Modal>
```

### Scrollable Content

The modal body automatically scrolls when content exceeds the viewport height:

```tsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Terms and Conditions"
>
  <div className="ui:space-y-4">
    {/* Long content */}
    <p>lots of text...</p>
    <p>lots of text...</p>
    {/* ... */}
  </div>
</Modal>
```

## Styling

The modal uses the `ui:` prefix for Tailwind classes, consistent with other components in the UI package. You can customize the appearance by:

1. **Adding custom className**: Pass a `className` prop to add custom styles to the modal content
2. **Customizing the theme**: The modal uses standard Tailwind colors that can be customized via your theme
3. **Overriding styles**: Use Tailwind's utility classes in your content

## Accessibility

The modal component follows accessibility best practices:

- Uses `role="dialog"` and `aria-modal="true"`
- Properly labels the modal with `aria-labelledby` when a title is provided
- Supports keyboard navigation (ESC to close)
- Prevents body scroll when open
- Focus management for close button

## Animation

The modal includes smooth animations:

- **Backdrop**: Fades in (0.2s)
- **Modal**: Slides up and fades in (0.3s)
- All animations use `ease-out` timing for natural motion

## See Also

- [Modal Examples](./modal.examples.tsx) - Complete working examples
- [Button Component](./button.tsx) - Often used with modals for actions
