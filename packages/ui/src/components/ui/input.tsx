import * as React from "react";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`ui:inline-flex ui:h-9 ui:w-full ui:rounded-md ui:border ui:border-black/15 ui:bg-white ui:px-3 ui:py-2 ui:text-sm ui:placeholder:ui:text-black/40 ui:focus-visible:ui:outline-none ui:focus-visible:ui:ring-2 ui:focus-visible:ui:ring-black/20 ${className}`}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

