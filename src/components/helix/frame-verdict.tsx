import type { FrameReport } from "@/lib/helix";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function FrameVerdict({ report, className }: { report: FrameReport; className?: string }) {
  const inFrame = report.frame === "in-frame";
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone={inFrame ? "inframe" : "frameshift"}>
          {inFrame ? "In-frame" : "Frameshift"}
        </Badge>
        <Badge tone={report.phenotype === "DMD-like" ? "danger" : report.phenotype === "BMD-like" ? "inframe" : "default"}>
          {report.phenotype}
        </Badge>
        {report.nmdLikely && <Badge tone="frameshift">NMD likely</Badge>}
      </div>
      <div>
        <p className="font-display text-3xl tracking-tight text-fg sm:text-4xl">
          {inFrame ? "Codon phase held" : "Reading frame broken"}
        </p>
        <p className="mt-2 max-w-xl text-sm text-muted">
          {report.kind === "deletion" ? "Deletion" : "Duplication"} of{" "}
          {report.startExon === report.endExon
            ? `exon ${report.startExon}`
            : `exons ${report.startExon}–${report.endExon}`}{" "}
          removes {report.nucleotides.toLocaleString()} nt
          {inFrame
            ? ", a multiple of 3. An internally truncated dystrophin can still be produced."
            : ` (remainder ${report.remainder}). Downstream sequence is out of phase and a premature stop is expected.`}
        </p>
      </div>
      <p className="font-mono text-xs text-faint break-all">{report.hgvs}</p>
    </div>
  );
}
