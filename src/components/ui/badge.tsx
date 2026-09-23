import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-wide uppercase",
  {
    variants: {
      tone: {
        default: "bg-elevated text-muted",
        accent: "bg-accent/15 text-accent",
        inframe: "bg-inframe/15 text-inframe",
        frameshift: "bg-frameshift/15 text-frameshift",
        danger: "bg-danger/15 text-danger",
        actin: "bg-actin/15 text-actin",
        rod: "bg-rod/15 text-rod",
        cysteine: "bg-cysteine/15 text-cysteine",
        cterm: "bg-cterm/15 text-cterm",
      },
    },
    defaultVariants: { tone: "default" },
  },
);

export function Badge({
  className,
  tone,
  ...props
}: HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}
