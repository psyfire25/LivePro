import { useEffect, useRef, type PropsWithChildren } from "react";

type Variant = "fade" | "fade-up" | "fade-down" | "scale";

export function Reveal({
  as: Tag = "div",
  variant = "fade",
  delay = 0,
  className = "",
  children,
}: PropsWithChildren<{
  as?: any;
  variant?: Variant;
  delay?: number;
  className?: string;
}>) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("lp-inview");
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const base = "lp-reveal";
  const v =
    variant === "fade"
      ? "lp-fade"
      : variant === "fade-up"
      ? "lp-fade-up"
      : variant === "fade-down"
      ? "lp-fade-down"
      : "lp-scale";

  const style = delay ? { animationDelay: `${delay}ms` } : undefined;

  return (
    <Tag ref={ref as any} className={`${base} ${v} ${className}`} style={style}>
      {children}
    </Tag>
  );
}

