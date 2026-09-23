import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHint, CardTitle } from "@/components/ui/card";
import {
  CONCORDANCE_RULES,
  synthesise,
  type Evidence,
  type EvidenceGrade,
  type VariantRef,
} from "@/lib/helix";

export const Route = createFileRoute("/concordance")({ component: ConcordancePage });

const VARIANT: VariantRef = {
  symbol: "DMD-del52",
  description: "NM_004006.2:c.7543_7660del",
  source: "sandbox",
};

const CATALOG: Omit<Evidence, "variant">[] = [
  {
    id: "lovd",
    sourceDb: "LOVD",
    claim: "pathogenic exon 52 deletion",
    confidence: 0.92,
    isCurated: true,
    isRefutation: false,
    isTextMined: false,
  },
  {
    id: "clinvar",
    sourceDb: "ClinVar",
    claim: "pathogenic exon 52 deletion",
    confidence: 0.9,
    isCurated: true,
    isRefutation: false,
    isTextMined: false,
  },
  {
    id: "omim",
    sourceDb: "OMIM",
    claim: "pathogenic exon 52 deletion",
    confidence: 0.88,
    isCurated: true,
    isRefutation: false,
    isTextMined: false,
  },
  {
    id: "clingen",
    sourceDb: "ClinGen",
    claim: "benign interpretation (refutation)",
    confidence: 0.95,
    isCurated: true,
    isRefutation: true,
    isTextMined: false,
  },
  {
    id: "disgenet",
    sourceDb: "DisGeNET",
    claim: "gene-disease association",
    confidence: 0.55,
    isCurated: false,
    isRefutation: false,
    isTextMined: true,
  },
];

const GRADE_TONE: Record<EvidenceGrade, "inframe" | "frameshift" | "danger" | "accent" | "default"> =
  {
    SUPPORTED: "inframe",
    EMERGING: "accent",
    DISPUTED: "danger",
    CONFLICTED: "frameshift",
    INSUFFICIENT: "default",
  };

export function ConcordancePage() {
  const [on, setOn] = useState<Record<string, boolean>>({
    lovd: true,
    clinvar: true,
    omim: false,
    clingen: false,
    disgenet: false,
  });
  const [mined, setMined] = useState(0);

  const lines = useMemo(() => {
    const selected: Evidence[] = CATALOG.filter((c) => on[c.id]).map((c) => ({
      ...c,
      variant: VARIANT,
    }));
    for (let i = 0; i < mined; i++) {
      selected.push({
        id: `tm-${i}`,
        variant: VARIANT,
        sourceDb: `TextMine-${i + 1}`,
        claim: "associated with DMD",
        confidence: 0.4,
        isCurated: false,
        isRefutation: false,
        isTextMined: true,
      });
    }
    return selected;
  }, [on, mined]);

  const result = synthesise(lines);

  return (
    <AppShell>
      <header className="mb-6">
        <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
          Evidence engine
        </p>
        <h1 className="font-display text-4xl tracking-tight">Concordance</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Four rules grade a claim: collapse duplicate papers, shrink the denominator when
          a source is skipped, let curated refutation win, and cap text-mining at EMERGING.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <Card>
          <CardTitle>Sources</CardTitle>
          <CardHint className="mt-1 mb-4">Toggle adapters. Collapse is automatic.</CardHint>
          <ul className="space-y-2">
            {CATALOG.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => setOn((s) => ({ ...s, [c.id]: !s[c.id] }))}
                  className="flex w-full items-center justify-between rounded-lg bg-elevated px-3 py-3 text-left shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
                >
                  <span>
                    <span className="block text-sm text-fg">{c.sourceDb}</span>
                    <span className="block text-xs text-muted">{c.claim}</span>
                  </span>
                  <Badge tone={on[c.id] ? "accent" : "default"}>
                    {on[c.id] ? "On" : "Off"}
                  </Badge>
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between text-xs text-muted">
              <span>Text-mined lines</span>
              <span className="font-mono tabular-nums">{mined}</span>
            </div>
            <input
              type="range"
              min={0}
              max={12}
              value={mined}
              onChange={(e) => setMined(Number(e.target.value))}
              className="w-full accent-accent"
              aria-label="Text-mined evidence count"
            />
            <div className="mt-3 flex gap-2">
              <Button size="sm" variant="secondary" onClick={() => setMined(12)}>
                Hit the cap
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setOn({
                    lovd: false,
                    clinvar: false,
                    omim: false,
                    clingen: false,
                    disgenet: false,
                  });
                  setMined(0);
                }}
              >
                Clear
              </Button>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <Card>
            <p className="text-xs tracking-wide text-muted uppercase">Grade</p>
            <p className="mt-2 font-display text-4xl tracking-tight">{result.grade}</p>
            <Badge className="mt-3" tone={GRADE_TONE[result.grade]}>
              {result.evidenceLines.length} line{result.evidenceLines.length === 1 ? "" : "s"}
            </Badge>
            <p className="mt-3 text-sm text-muted">{result.summary}</p>
            <p className="mt-3 font-mono text-[11px] text-faint">
              Rules: {result.rulesFired.join(" · ") || "none"}
            </p>
          </Card>
          <Card>
            <CardTitle>The four rules</CardTitle>
            <ul className="mt-3 space-y-3">
              {CONCORDANCE_RULES.map((r) => (
                <li key={r.id}>
                  <p className="text-sm text-fg">{r.title}</p>
                  <p className="text-xs text-muted">{r.body}</p>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
