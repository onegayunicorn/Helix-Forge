import { DOMAINS, domainImpact } from "@/lib/helix";
import { cn } from "@/lib/utils";

const TOTAL = 3685;

const FAMILY_CLASS: Record<string, string> = {
  actin: "bg-actin",
  rod: "bg-rod",
  cysteine: "bg-cysteine",
  cterm: "bg-cterm",
};

export function ProteinBar({
  aaStart,
  aaEnd,
}: {
  aaStart?: number;
  aaEnd?: number;
}) {
  const hit =
    aaStart != null && aaEnd != null ? domainImpact(aaStart, aaEnd) : [];
  return (
    <div className="space-y-3">
      <div className="relative h-10 overflow-hidden rounded-md bg-elevated shadow-[0_0_0_1px_rgba(255,255,255,0.07)]">
        {DOMAINS.map((d) => (
          <div
            key={d.id}
            className={cn("absolute top-0 h-full opacity-70", FAMILY_CLASS[d.family])}
            style={{
              left: `${((d.start - 1) / TOTAL) * 100}%`,
              width: `${((d.end - d.start + 1) / TOTAL) * 100}%`,
            }}
            title={`${d.name} ${d.start}–${d.end}`}
          />
        ))}
        {aaStart != null && aaEnd != null && (
          <div
            className="absolute top-0 h-full bg-bg/70 ring-1 ring-fg/80"
            style={{
              left: `${((Math.min(aaStart, aaEnd) - 1) / TOTAL) * 100}%`,
              width: `${((Math.abs(aaEnd - aaStart) + 1) / TOTAL) * 100}%`,
            }}
          />
        )}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted">
        {DOMAINS.map((d) => (
          <span key={d.id} className="flex items-center gap-1.5">
            <span className={cn("size-2 rounded-[2px]", FAMILY_CLASS[d.family])} />
            {d.short} {d.start}–{d.end}
            {hit.some((h) => h.id === d.id) && (
              <span className="text-frameshift">impacted</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
