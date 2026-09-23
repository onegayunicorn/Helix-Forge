import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/app-shell";
import { ProteinBar } from "@/components/helix/protein-bar";
import { Card, CardHint, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DOMAINS, DMD_REFERENCE, EXONS, analyzeVariant, domainImpact } from "@/lib/helix";
import { useAnalysis } from "@/store/analysis";

export const Route = createFileRoute("/protein")({ component: ProteinPage });

function ProteinPage() {
  const startExon = useAnalysis((s) => s.startExon);
  const endExon = useAnalysis((s) => s.endExon);
  const kind = useAnalysis((s) => s.kind);
  const report = analyzeVariant(startExon, endExon, kind);
  const hit = domainImpact(report.aaStart, report.aaEnd);
  const remaining = Math.max(0, DMD_REFERENCE.proteinLength - report.aaRemoved);

  return (
    <AppShell>
      <header className="mb-6">
        <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
          UniProt {DMD_REFERENCE.uniprot}
        </p>
        <h1 className="font-display text-4xl tracking-tight">Dystrophin architecture</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Four domains, 3,685 residues. The rod can absorb large in-frame losses; the
          actin-binding and cysteine-rich modules generally cannot.
        </p>
      </header>

      <Card className="mb-6">
        <CardTitle className="mb-3">Residue map</CardTitle>
        <ProteinBar aaStart={report.aaStart} aaEnd={report.aaEnd} />
        <p className="mt-4 font-mono text-xs text-muted">
          Overlay is the current {kind} of exons {report.startExon}
          {report.endExon !== report.startExon ? `–${report.endExon}` : ""}, residues{" "}
          {report.aaStart}–{report.aaEnd}. Predicted remaining length{" "}
          <span className="text-fg tabular-nums">{remaining.toLocaleString()} aa</span>
          {report.frame === "frameshift" ? " before NMD (often none)." : "."}
        </p>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {DOMAINS.map((d) => {
          const impacted = hit.some((h) => h.id === d.id);
          const exons = EXONS.filter((e) => e.aaEnd >= d.start && e.aaStart <= d.end);
          return (
            <Card key={d.id}>
              <div className="mb-2 flex items-center justify-between gap-2">
                <CardTitle>{d.name}</CardTitle>
                <Badge tone={impacted ? "frameshift" : d.family}>
                  {impacted ? "Impacted" : d.short}
                </Badge>
              </div>
              <p className="font-mono text-xs text-muted">
                p.{d.start}–{d.end} · exons {exons[0]?.n}–{exons[exons.length - 1]?.n}
              </p>
              <CardHint className="mt-3">{d.note}</CardHint>
            </Card>
          );
        })}
      </div>
    </AppShell>
  );
}
