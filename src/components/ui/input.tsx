import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-md bg-elevated px-3 text-sm text-fg shadow-[0_0_0_1px_rgba(255,255,255,0.1)] outline-none transition-[box-shadow] duration-150 placeholder:text-faint focus-visible:shadow-[0_0_0_2px_rgba(159,180,200,0.45)] disabled:opacity-50",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
