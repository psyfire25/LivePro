import type { HTMLAttributes } from "react";

export function Stepper({ steps, current, className = "" }: {
  steps: string[];
  current: number; // 1-based index
  className?: string;
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`lp-stepper ${className}`}>
      {steps.map((label, i) => (
        <>
          <div key={`item-${label}`} className={`lp-stepper-item ${current >= i+1 ? "is-active" : ""}`}>
            <span className="lp-stepper-dot" />
            <span className="ui:text-xs ui:opacity-80 ui:whitespace-nowrap">{label}</span>
          </div>
          {i < steps.length - 1 ? <span key={`sep-${i}`} className="lp-stepper-sep" /> : null}
        </>
      ))}
    </div>
  );
}

