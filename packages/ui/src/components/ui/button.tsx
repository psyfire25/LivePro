import React, { type ButtonHTMLAttributes, type PropsWithChildren } from "react";

type Variant = "primary" | "outline" | "ghost";

export function Button({
  variant = "primary",
  className = "",
  asChild = false,
  children,
  ...props
}: PropsWithChildren<{
  variant?: Variant;
  asChild?: boolean;
}> & ButtonHTMLAttributes<HTMLButtonElement>) {
  const base = "ui:inline-flex ui:items-center ui:justify-center ui:rounded-md ui:text-sm ui:font-medium ui:transition-colors ui:focus-visible:ui:outline-none ui:focus-visible:ui:ring-2 ui:focus-visible:ui:ring-offset-2 ui:disabled:ui:opacity-50 ui:disabled:ui:pointer-events-none ui:h-9 ui:px-3";
  const styles =
    variant === "primary"
      ? "ui:bg-black ui:text-white hover:ui:bg-black/90"
      : variant === "outline"
        ? "ui:border ui:border-black/15 hover:ui:bg-black/5"
        : "hover:ui:bg-black/5";

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ className?: string }>;
    return React.cloneElement(child, {
      className: `${base} ${styles} ${className} ${child.props?.className ?? ""}`.trim(),
      ...props,
    });
  }

  return (
    <button className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </button>
  );
}
