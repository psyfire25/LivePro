import * as React from "react";

type TabsContextValue = {
  value: string;
  setValue: (v: string) => void;
};

const TabsCtx = React.createContext<TabsContextValue | null>(null);

export function Tabs({ defaultValue, value, onValueChange, children, className = "" }: {
  defaultValue?: string;
  value?: string;
  onValueChange?: (v: string) => void;
  children: React.ReactNode;
  className?: string;
}) {
  const [internal, setInternal] = React.useState(defaultValue || "");
  const controlled = value !== undefined;
  const current = controlled ? value! : internal;
  const setValue = (v: string) => {
    if (!controlled) setInternal(v);
    onValueChange?.(v);
  };
  const ctx: TabsContextValue = { value: current, setValue };
  return <div className={`ui:w-full ${className}`}><TabsCtx.Provider value={ctx}>{children}</TabsCtx.Provider></div>;
}

export function TabsList({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`ui:inline-flex ui:h-9 ui:items-center ui:justify-start ui:gap-1 ui:rounded-md ui:border ui:border-black/10 ui:bg-white ui:p-1 ${className}`}>
      {children}
    </div>
  );
}

export function TabsTrigger({ value, children, className = "" }: { value: string; children: React.ReactNode; className?: string }) {
  const ctx = React.useContext(TabsCtx);
  if (!ctx) throw new Error("TabsTrigger must be used within Tabs");
  const active = ctx.value === value;
  return (
    <button
      type="button"
      onClick={() => ctx.setValue(value)}
      className={`ui:inline-flex ui:items-center ui:justify-center ui:rounded ui:px-3 ui:text-sm ui:h-7 ui:transition-colors ${
        active ? "ui:bg-black ui:text-white" : "hover:ui:bg-black/5"
      } ${className}`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className = "" }: { value: string; children: React.ReactNode; className?: string }) {
  const ctx = React.useContext(TabsCtx);
  if (!ctx) throw new Error("TabsContent must be used within Tabs");
  if (ctx.value !== value) return null;
  return <div className={className}>{children}</div>;
}

