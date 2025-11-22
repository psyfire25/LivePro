// packages/ui/src/index.ts

// Top-level components
export { Card } from "./components/ui/card";
export { Gradient } from "./components/ui/gradient";

// Shadcn-style UI components
export { Button } from "./components/ui/button";
export { Tile } from "./components/ui/tile";
export { Stepper } from "./components/ui/stepper";
export { Input } from "./components/ui/input";
export { SearchInput } from "./components/ui/search-input";
export type { SearchInputProps } from "./components/ui/search-input";
export { Modal } from "./components/ui/modal";
export type { ModalProps } from "./components/ui/modal";
// Add modal patterns exports
export { useConfirmDialog, FormModal, InfoModal, SelectionModal } from "./components/ui/modal-patterns";

// Add anything else you need here:
export { Tabs } from "./components/ui/tabs";
export { TabsContent } from "./components/ui/tabs";
export { TabsList } from "./components/ui/tabs";
export { TabsTrigger } from "./components/ui/tabs";
export { AdminShell } from "./components/ui/admin-shell";
export { AppShell } from "./components/ui/app-shell";

// Toast System
export { Toast } from "./components/ui/toast";
export type { ToastProps, ToastVariant } from "./components/ui/toast";
export { ToastContainer } from "./components/ui/toast-container";
export { ToastProvider, useToast } from "./components/ui/toast-context";

// Notification System
export { NotificationBell } from "./components/ui/notification-bell";
export type { NotificationBellProps } from "./components/ui/notification-bell";
export { NotificationItem } from "./components/ui/notification-item";
export type { Notification, NotificationItemProps } from "./components/ui/notification-item";
export { NotificationDropdown } from "./components/ui/notification-dropdown";
export type { NotificationDropdownProps } from "./components/ui/notification-dropdown";
export { NotificationList } from "./components/ui/notification-list";
export type { NotificationListProps } from "./components/ui/notification-list";