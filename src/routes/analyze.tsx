import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { ExonMap } from "@/components/helix/exon-map";
import { FrameVerdict } from "@/components/helix/frame-verdict";
import { ProteinBar } from "@/components/helix/protein-bar";
import { SkipPanel } from "@/components/helix/skip-panel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHint, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  analyzeVariant,
  applySkip,
  domainImpact,
  findSkipStrategies,
  loadHistory,
  nmdStatus,
  PRESETS,
  saveAnalysis,
  THERAPIES,
  type StoredAnalysis,
} from "@/lib/helix";
import { useAnalysis } from "@/store/analysis";

export const Route = createFileRoute("/analyze")({ component: AnalyzePage });

function AnalyzePage() {
  const startExon = useAnalysis((s) => s.startExon);
  const endExon = useAnalysis((s) => s.endExon);
  const kind = useAnalysis((s) => s.kind);
  const skipPreview = useAnalysis((s) => s.skipPreview);
  const setRange = useAnalysis((s) => s.setRange);
  const setKind = useAnalysis((s) => s.setKind);
  const setSkipPreview = useAnalysis((s) => s.setSkipPreview);

  const [history, setHistory] = useState<StoredAnalysis[]>([]);

  const report = useMemo(
    () => analyzeVariant(startExon, endExon, kind),
    [startExon, endExon, kind],
  );
  const strategies = useMemo(
    () => findSkipStrategies(startExon, endExon, kind),
    [startExon, endExon, kind],
  );
  const rescued = applySkip(report, skipPreview);
  const nmd = nmdStatus(report);
  const domains = domainImpact(report.aaStart, report.aaEnd);
  const matchingTherapies = THERAPIES.filter((t) =>
    strategies.some((s) => s.skips.includes(t.skipExon) && s.approved.length > 0),
  );

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  function persist() {
    setHistory(
      saveAnalysis({
        start: startExon,
        end: endExon,
        kind,
        frame: report.frame,
        hgvs: report.hgvs,
      }),
    );
  }

  return (
    <AppShell>
      <header className="mb-6">
        <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
          Variant analyzer
        </p>
        <h1 className="font-display text-4xl tracking-tight">Frame, skip, consequence</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Whole-exon deletion and duplication on NM_004006.2. Three numbers decide the
          frame: start, end, and length mod 3.
        </p>
      </header>

      <div className="mb-6 grid gap-3 sm:grid-cols-4">
        <Field label="Start exon">
          <Input
            type="number"
            min={1}
            max={79}
            value={startExon}
            onChange={(e) => setRange(Number(e.target.value) || 1, endExon)}
          />
        </Field>
        <Field label="End exon">
          <Input
            type="number"
            min={1}
            max={79}
            value={endExon}
            onChange={(e) => setRange(startExon, Number(e.target.value) || 1)}
          />
        </Field>
        <Field label="Class">
          <div className="flex h-11 overflow-hidden rounded-md shadow-[0_0_0_1px_rgba(255,255,255,0.1)]">
            {(["deletion", "duplication"] as const).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setKind(k)}
                className={`flex-1 text-sm capitalize ${kind === k ? "bg-accent text-accent-fg" : "bg-elevated text-muted"}`}
              >
                {k}
              </button>
            ))}
          </div>
        </Field>
        <div className="flex items-end">
          <Button className="w-full" onClick={persist}>
            Keep in session
          </Button>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => {
              setKind(p.kind);
              setRange(p.start, p.end);
            }}
            className="h-8 rounded-full bg-surface px-3 font-mono text-[11px] text-muted shadow-[0_0_0_1px_rgba(255,255,255,0.06)] hover:text-fg"
            title={p.blurb}
          >
            {p.label}
          </button>
        ))}
      </div>

      <Card className="mb-6">
        <ExonMap />
      </Card>

      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <Card>
          <FrameVerdict report={skipPreview.length ? rescued : report} />
          <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Metric k="Nucleotides" v={report.nucleotides.toLocaleString()} />
            <Metric k="Remainder" v={String(report.remainder)} />
            <Metric k="aa span" v={`${report.aaStart}–${report.aaEnd}`} />
            <Metric k="aa removed" v={report.aaRemoved.toLocaleString()} />
          </dl>
          <div className="mt-6">
            <p className="mb-2 text-xs font-medium tracking-wide text-muted uppercase">
              Dystrophin
            </p>
            <ProteinBar aaStart={report.aaStart} aaEnd={report.aaEnd} />
          </div>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardTitle>Skip rescue</CardTitle>
            <CardHint className="mt-1 mb-3">
              Flanking and licensed AON targets first. Selecting a row overlays the skip
              on the map.
            </CardHint>
            <SkipPanel
              strategies={strategies}
              active={skipPreview}
              onPick={setSkipPreview}
            />
          </Card>
          <Card>
            <CardTitle>NMD</CardTitle>
            <div className="mt-2 flex items-center gap-2">
              <Badge tone={nmd.likely ? "frameshift" : "inframe"}>{nmd.label}</Badge>
            </div>
            <p className="mt-2 text-sm text-muted">{nmd.detail}</p>
          </Card>
          <Card>
            <CardTitle>Domains hit</CardTitle>
            <ul className="mt-3 space-y-2">
              {domains.map((d) => (
                <li key={d.id} className="text-sm">
                  <span className="text-fg">{d.name}</span>
                  <span className="block text-xs text-muted">{d.note}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      {matchingTherapies.length > 0 && (
        <Card className="mt-4">
          <CardTitle>Licensed skip chemistry</CardTitle>
          <CardHint className="mt-1 mb-3">
            Listed when this pattern is computationally amenable. Not a prescription.
          </CardHint>
          <ul className="grid gap-2 sm:grid-cols-2">
            {matchingTherapies.map((t) => (
              <li
                key={t.id}
                className="rounded-lg bg-elevated px-3 py-3 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-sm text-fg">{t.name}</span>
                  <span className="font-mono text-[11px] text-muted">{t.brand}</span>
                </div>
                <p className="mt-1 text-xs text-muted">
                  Skip {t.skipExon} · {t.agency} {t.year} · {t.modality}
                </p>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {history.length > 0 && (
        <Card className="mt-4">
          <CardTitle>Session log</CardTitle>
          <ul className="mt-3 divide-y divide-border">
            {history.map((h) => (
              <li key={h.id}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-3 py-2.5 text-left text-sm"
                  onClick={() => {
                    setKind(h.kind);
                    setRange(h.start, h.end);
                  }}
                >
                  <span className="font-mono text-xs text-muted">{h.hgvs}</span>
                  <Badge tone={h.frame === "in-frame" ? "inframe" : "frameshift"}>
                    {h.frame}
                  </Badge>
                </button>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </AppShell>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function Metric({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="text-[10px] tracking-wide text-muted uppercase">{k}</dt>
      <dd className="font-mono text-sm tabular-nums text-fg">{v}</dd>
    </div>
  );
}
