import { EXONS, type Exon } from "@/lib/helix";
import { cn } from "@/lib/utils";
import { useAnalysis } from "@/store/analysis";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useRef } from "react";

const FAMILY_BG: Record<Exon["family"], string> = {
  actin: "bg-actin/25 hover:bg-actin/40",
  rod: "bg-rod/20 hover:bg-rod/35",
  cysteine: "bg-cysteine/25 hover:bg-cysteine/40",
  cterm: "bg-cterm/25 hover:bg-cterm/40",
};

export function ExonMap({
  interactive = true,
}: {
  interactive?: boolean;
  compact?: boolean;
}) {
  const startExon = useAnalysis((s) => s.startExon);
  const endExon = useAnalysis((s) => s.endExon);
  const skipPreview = useAnalysis((s) => s.skipPreview);
  const setRange = useAnalysis((s) => s.setRange);
  const setSelectedExon = useAnalysis((s) => s.setSelectedExon);
  const selectedExon = useAnalysis((s) => s.selectedExon);
  const drag = useRef<{ origin: number | null }>({ origin: null });

  const lo = Math.min(startExon, endExon);
  const hi = Math.max(startExon, endExon);
  const skipSet = new Set(skipPreview);

  function onPointer(n: number, dragging: boolean) {
    if (!interactive) return;
    setSelectedExon(n);
    if (dragging && drag.current.origin != null) {
      setRange(drag.current.origin, n);
    }
  }

  return (
    <div
      className="select-none"
      onPointerUp={() => {
        drag.current.origin = null;
      }}
      onPointerLeave={() => {
        drag.current.origin = null;
      }}
    >
      <div className="grid grid-cols-8 gap-1 sm:grid-cols-12 md:grid-cols-[repeat(16,minmax(0,1fr))] lg:grid-cols-[repeat(20,minmax(0,1fr))]">
        {EXONS.map((exon) => {
          const inRange = exon.n >= lo && exon.n <= hi;
          const isSkip = skipSet.has(exon.n);
          const isSelected = selectedExon === exon.n;
          return (
            <Tooltip key={exon.n} delayDuration={120}>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  aria-label={`Exon ${exon.n}, ${exon.length} nucleotides`}
                  aria-pressed={inRange}
                  className={cn(
                    "relative flex h-10 min-h-11 flex-col items-center justify-center rounded-sm font-mono text-[10px] leading-none transition-[background-color,box-shadow,color] duration-150",
                    FAMILY_BG[exon.family],
                    inRange && "bg-accent text-accent-fg hover:bg-accent",
                    isSkip && !inRange && "bg-inframe/30 text-fg ring-1 ring-inframe",
                    isSelected && "shadow-[0_0_0_1px_rgba(236,236,232,0.55)]",
                    exon.hotspot && !inRange && "after:absolute after:bottom-0.5 after:h-px after:w-3 after:bg-frameshift/80 after:content-['']",
                    !interactive && "pointer-events-none",
                  )}
                  onPointerDown={(e) => {
                    if (!interactive) return;
                    e.currentTarget.setPointerCapture?.(e.pointerId);
                    drag.current.origin = exon.n;
                    setRange(exon.n, exon.n);
                    setSelectedExon(exon.n);
                  }}
                  onPointerEnter={() => onPointer(exon.n, drag.current.origin != null)}
                >
                  <span className="tabular-nums">{exon.n}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <div className="space-y-0.5">
                  <div className="font-medium">Exon {exon.n}</div>
                  <div className="text-muted">
                    {exon.length} nt · phase {exon.phase} · c.{exon.cdsStart}–{exon.cdsEnd}
                  </div>
                  <div className="text-muted">{exon.domain}</div>
                </div>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-muted">
        <Legend swatch="bg-actin/50" label="Actin-binding" />
        <Legend swatch="bg-rod/50" label="Rod" />
        <Legend swatch="bg-cysteine/50" label="Cysteine-rich" />
        <Legend swatch="bg-cterm/50" label="C-terminal" />
        <Legend swatch="bg-accent" label="Selected" />
        <span className="flex items-center gap-1.5">
          <span className="h-px w-3 bg-frameshift/80" />
          Hotspot 45–55
        </span>
      </div>
    </div>
  );
}

function Legend({ swatch, label }: { swatch: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={cn("size-2 rounded-[2px]", swatch)} />
      {label}
    </span>
  );
}
