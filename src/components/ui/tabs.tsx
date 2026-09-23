import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

export const Tabs = TabsPrimitive.Root;

export function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn(
        "inline-flex h-11 items-center gap-1 rounded-lg bg-elevated p-1 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]",
        className,
      )}
      {...props}
    />
  );
}

export function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "inline-flex h-9 items-center justify-center rounded-md px-3 text-sm text-muted transition-colors duration-150 data-[state=active]:bg-surface data-[state=active]:text-fg data-[state=active]:shadow-[0_0_0_1px_rgba(255,255,255,0.08)] hover:text-fg",
        className,
      )}
      {...props}
    />
  );
}

export const TabsContent = TabsPrimitive.Content;
