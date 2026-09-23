import { cn } from "@/lib/utils";

export function HelixMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={cn("size-7", className)}
    >
      <path
        d="M10 4c6 4 6 20 0 24"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M22 4c-6 4-6 20 0 24"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M11.2 8.5h9.6M10.4 13h11.2M10.4 19h11.2M11.2 23.5h9.6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5 text-fg">
      <span className="flex size-9 items-center justify-center rounded-md bg-elevated text-accent shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
        <HelixMark className="size-5" />
      </span>
      <span className="leading-tight">
        <span className="block font-display text-[1.15rem] tracking-tight">Helix-Forge</span>
        {!compact && (
          <span className="block font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
            DMD locus v0.9
          </span>
        )}
      </span>
    </div>
  );
}
