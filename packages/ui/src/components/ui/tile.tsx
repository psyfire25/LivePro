import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

export function Tile({
  title,
  subtitle,
  selected,
  className = "",
  ...props
}: PropsWithChildren<{
  title: string;
  subtitle?: string;
  selected?: boolean;
}> & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`lp-card ui:text-left ui:p-4 ui:rounded-xl ui:border ui:transition-all ui:shadow-sm hover:ui:shadow hover:ui:-translate-y-0.5 ${
        selected ? "ui:ring-2 ui:ring-black/20" : ""
      } ${className}`}
      {...props}
    >
      <div className="ui:text-base ui:font-semibold ui:mb-1">{title}</div>
      {subtitle ? (
        <div className="ui:text-sm ui:opacity-70">{subtitle}</div>
      ) : null}
    </button>
  );
}
