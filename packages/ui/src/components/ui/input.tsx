import * as React from "react";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  // eslint-disable-next-line react/prop-types
  ({ className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`ui:inline-flex ui:h-9 ui:w-full ui:rounded-md ui:border ui:border-black/15 dark:ui:border-white/15 ui:bg-white dark:ui:bg-slate-900 ui:px-3 ui:py-2 ui:text-sm ui:text-black dark:ui:text-white ui:placeholder:ui:text-black/40 dark:ui:placeholder:ui:text-white/40 ui:focus-visible:ui:outline-none ui:focus-visible:ui:ring-2 ui:focus-visible:ui:ring-black/20 dark:ui:focus-visible:ui:ring-white/20 ${className}`}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

