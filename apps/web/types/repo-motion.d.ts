import type { ElementType, PropsWithChildren } from "react";

declare module "@repo/motion" {
  export type RevealVariant = "fade" | "fade-up" | "fade-down" | "scale";
  export interface RevealProps extends PropsWithChildren {
    as?: ElementType;
    variant?: RevealVariant;
    delay?: number;
    className?: string;
  }
  export function Reveal(props: RevealProps): JSX.Element;
}
