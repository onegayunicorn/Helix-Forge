import type { SkipStrategy } from "@/lib/helix";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function SkipPanel({
  strategies,
  active,
  onPick,
}: {
  strategies: SkipStrategy[];
  active: number[];
  onPick: (skips: number[]) => void;
}) {
  if (strategies.length === 0) {
    return (
      <p className="text-sm text-muted">
        No single- or dual-exon skip within the hotspot restores frame for this pattern.
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {strategies.map((s) => {
        const key = s.skips.join("-") || "none";
        const selected =
          s.skips.length === active.length && s.skips.every((n, i) => n === active[i]);
        return (
          <li key={key}>
            <button
              type="button"
              onClick={() => onPick(s.skips)}
              className={cn(
                "flex w-full flex-col gap-1 rounded-lg bg-elevated px-3 py-3 text-left shadow-[0_0_0_1px_rgba(255,255,255,0.06)] transition-[box-shadow,background-color] duration-150",
                selected && "shadow-[0_0_0_1px_rgba(159,180,200,0.7)]",
              )}
            >
              <span className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-fg">{s.label}</span>
                {s.aon && <Badge tone="accent">AON</Badge>}
                {s.flanking && <Badge>Flank</Badge>}
                {s.approved.map((a) => (
                  <Badge key={a} tone="inframe">
                    {a}
                  </Badge>
                ))}
              </span>
              <span className="text-xs text-muted">{s.reason}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
