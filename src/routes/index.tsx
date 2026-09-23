import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { ExonMap } from "@/components/helix/exon-map";
import { FrameVerdict } from "@/components/helix/frame-verdict";
import { ProteinBar } from "@/components/helix/protein-bar";
import { Disclaimer } from "@/components/helix/disclaimer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHint, CardTitle } from "@/components/ui/card";
import {
  analyzeVariant,
  DMD_REFERENCE,
  EXON_BY_N,
  PRESETS,
} from "@/lib/helix";
import { useAnalysis } from "@/store/analysis";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const startExon = useAnalysis((s) => s.startExon);
  const endExon = useAnalysis((s) => s.endExon);
  const kind = useAnalysis((s) => s.kind);
  const selectedExon = useAnalysis((s) => s.selectedExon);
  const setRange = useAnalysis((s) => s.setRange);
  const report = analyzeVariant(startExon, endExon, kind);
  const selected = selectedExon ? EXON_BY_N[selectedExon] : undefined;

  return (
    <AppShell>
      <section className="mb-8 grid gap-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
        <div>
          <p className="mb-2 font-mono text-[11px] tracking-[0.16em] text-muted">
            {DMD_REFERENCE.transcript} · {DMD_REFERENCE.locus}
          </p>
          <h1 className="font-display text-4xl tracking-tight text-fg sm:text-5xl">
            The dystrophin locus, as an instrument.
          </h1>
          <p className="mt-4 max-w-xl text-muted">
            Drag across the 79 coding exons of Dp427m. Helix-Forge scores reading frame,
            skip rescue, and domain impact against the Leiden NM_004006.2 map.
          </p>
        </div>
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
          <Stat k="Exons" v={String(DMD_REFERENCE.exons)} />
          <Stat k="CDS" v={`${DMD_REFERENCE.cdsLength.toLocaleString()} nt`} />
          <Stat k="Protein" v={`${DMD_REFERENCE.proteinLength.toLocaleString()} aa`} />
          <Stat k="Gene span" v={`${DMD_REFERENCE.geneSpanMb} Mb`} />
        </dl>
      </section>

      <Card className="mb-6">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <CardTitle>Locus map</CardTitle>
            <CardHint className="mt-1">
              Press and drag to set a deletion range. Hotspot 45–55 is marked.
            </CardHint>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {PRESETS.slice(0, 6).map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setRange(p.start, p.end)}
                className="h-8 rounded-full bg-elevated px-3 font-mono text-[11px] text-muted shadow-[0_0_0_1px_rgba(255,255,255,0.06)] hover:text-fg"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
        <ExonMap />
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardTitle className="mb-3">Selection</CardTitle>
          <FrameVerdict report={report} />
          <div className="mt-5">
            <Button asChild>
              <Link to="/analyze">
                Open in analyzer
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </Card>

        <Card>
          <CardTitle className="mb-1">Inspected exon</CardTitle>
          {selected ? (
            <div className="mt-3 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-display text-2xl">Exon {selected.n}</span>
                <Badge tone={selected.family}>{selected.family}</Badge>
                {selected.hotspot && <Badge tone="frameshift">Hotspot</Badge>}
                {selected.aonTarget && <Badge tone="accent">AON target</Badge>}
              </div>
              <p className="text-sm text-muted">{selected.role}</p>
              <dl className="grid grid-cols-2 gap-2 font-mono text-xs text-muted">
                <div>
                  Length
                  <div className="text-fg tabular-nums">{selected.length} nt</div>
                </div>
                <div>
                  Phase
                  <div className="text-fg tabular-nums">{selected.phase}</div>
                </div>
                <div>
                  CDS
                  <div className="text-fg tabular-nums">
                    c.{selected.cdsStart}–{selected.cdsEnd}
                  </div>
                </div>
                <div>
                  Protein
                  <div className="text-fg tabular-nums">
                    p.{selected.aaStart}–{selected.aaEnd}
                  </div>
                </div>
              </dl>
            </div>
          ) : (
            <CardHint className="mt-3">Tap an exon to inspect it.</CardHint>
          )}
          <div className="mt-5">
            <ProteinBar aaStart={report.aaStart} aaEnd={report.aaEnd} />
          </div>
        </Card>
      </div>
      <Disclaimer className="mt-8 text-[11px] text-faint" />
    </AppShell>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-lg bg-surface px-3 py-3 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
      <dt className="text-[10px] tracking-wide text-muted uppercase">{k}</dt>
      <dd className="font-mono text-sm tabular-nums text-fg">{v}</dd>
    </div>
  );
}
