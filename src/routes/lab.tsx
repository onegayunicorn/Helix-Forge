import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHint, CardTitle } from "@/components/ui/card";
import {
  analyzeVariant,
  findSkipStrategies,
  nmdCompetent,
  synthesise,
  type Evidence,
  type VariantRef,
} from "@/lib/helix";

export const Route = createFileRoute("/lab")({ component: LabPage });

type RunLog = { id: string; name: string; ok: boolean; detail: string };

export function LabPage() {
  const [logs, setLogs] = useState<RunLog[] | null>(null);
  const sim = useMemo(() => simulateDeletions(800), []);
  const nmd = useMemo(() => {
    const pts = [];
    for (let cds = 200; cds <= 11000; cds += 400) {
      pts.push({
        cds,
        nmd: nmdCompetent(cds) ? 1 : 0,
      });
    }
    return pts;
  }, []);

  function runAll() {
    setLogs(runExperiments());
  }

  return (
    <AppShell>
      <header className="mb-6">
        <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
          Sandbox
        </p>
        <h1 className="font-display text-4xl tracking-tight">Lab</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Replay the packaged experiments against the real NM_004006.2 exon lengths, then
          sample random deletions for frame drift.
        </p>
      </header>

      <Card className="mb-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <CardTitle>Experiment suite</CardTitle>
            <CardHint className="mt-1">
              del52 skip, del44 skip, and concordance grading — using Leiden lengths, not
              the placeholder 150-nt blocks.
            </CardHint>
          </div>
          <Button onClick={runAll}>Run experiments</Button>
        </div>
        {logs && (
          <ul className="mt-4 space-y-2">
            {logs.map((l) => (
              <li
                key={l.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-elevated px-3 py-2.5"
              >
                <span className="text-sm text-fg">{l.name}</span>
                <span className="flex items-center gap-2">
                  <span className="text-xs text-muted">{l.detail}</span>
                  <Badge tone={l.ok ? "inframe" : "danger"}>{l.ok ? "Pass" : "Fail"}</Badge>
                </span>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardTitle>Random deletion frames</CardTitle>
          <CardHint className="mt-1 mb-4">
            {sim.total} consecutive 1–6 exon deletions. Remainder 0 is in-frame.
          </CardHint>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sim.bars}>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="label" stroke="#8b8e96" fontSize={11} tickLine={false} />
                <YAxis stroke="#8b8e96" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "#181b22",
                    border: "1px solid #262a33",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="count" fill="#9fb4c8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-3 font-mono text-xs text-muted">
            In-frame {sim.inFrame} · frameshift {sim.out} · ratio{" "}
            {sim.out ? (sim.inFrame / sim.out).toFixed(2) : "—"}
          </p>
        </Card>
        <Card>
          <CardTitle>NMD competence</CardTitle>
          <CardHint className="mt-1 mb-4">
            50-nt rule against the last exon junction. 1 = degraded, 0 = escape.
          </CardHint>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={nmd}>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="cds" stroke="#8b8e96" fontSize={11} tickLine={false} />
                <YAxis
                  stroke="#8b8e96"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 1]}
                />
                <Tooltip
                  contentStyle={{
                    background: "#181b22",
                    border: "1px solid #262a33",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="nmd" fill="#8aa58b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}

function runExperiments(): RunLog[] {
  const logs: RunLog[] = [];

  const d52 = analyzeVariant(52, 52);
  const s52 = findSkipStrategies(52, 52);
  const skip51 = s52.some((s) => s.skips.length === 1 && s.skips[0] === 51 && s.restored);
  const skip53 = s52.some((s) => s.skips.length === 1 && s.skips[0] === 53 && s.restored);
  logs.push({
    id: "001",
    name: "Experiment 001 — del52 skip",
    ok: d52.frame === "frameshift" && skip51 && skip53,
    detail: `del52 ${d52.frame}; skip 51 ${skip51 ? "yes" : "no"}; skip 53 ${skip53 ? "yes" : "no"}`,
  });

  const d44 = analyzeVariant(44, 44);
  const s44 = findSkipStrategies(44, 44);
  const skip43 = s44.some((s) => s.skips[0] === 43 && s.restored);
  const skip45 = s44.some((s) => s.skips[0] === 45 && s.restored);
  logs.push({
    id: "002",
    name: "Experiment 002 — del44 skip",
    ok: d44.frame === "frameshift" && skip43 && skip45,
    detail: `del44 ${d44.frame}; skip 43 ${skip43 ? "yes" : "no"}; skip 45 ${skip45 ? "yes" : "no"}`,
  });

  const inFrameCluster = analyzeVariant(45, 53);
  logs.push({
    id: "001b",
    name: "del45–53 in-frame cluster",
    ok: inFrameCluster.frame === "in-frame",
    detail: `${inFrameCluster.nucleotides} nt, remainder ${inFrameCluster.remainder}`,
  });

  const v: VariantRef = { symbol: "DMD-c.123A>T", description: "test", source: "test" };
  const mk = (partial: Partial<Evidence> & Pick<Evidence, "id" | "sourceDb">): Evidence => ({
    variant: v,
    claim: "pathogenic",
    confidence: 0.9,
    isCurated: false,
    isRefutation: false,
    isTextMined: false,
    ...partial,
  });
  const cases: [string, Evidence[], string][] = [
    ["No evidence", [], "INSUFFICIENT"],
    ["Single curated", [mk({ id: "a", sourceDb: "LOVD", isCurated: true })], "EMERGING"],
    [
      "Two curated",
      [
        mk({ id: "a", sourceDb: "LOVD", isCurated: true }),
        mk({ id: "b", sourceDb: "ClinVar", isCurated: true, claim: "pathogenic independent" }),
      ],
      "SUPPORTED",
    ],
    [
      "Text-mining cap",
      Array.from({ length: 12 }, (_, i) =>
        mk({ id: `t${i}`, sourceDb: `TM${i}`, isTextMined: true, claim: `assoc ${i}`, confidence: 0.4 }),
      ),
      "EMERGING",
    ],
    [
      "Curated refutation",
      [
        mk({ id: "a", sourceDb: "LOVD", isCurated: true }),
        mk({
          id: "r",
          sourceDb: "ClinGen",
          isCurated: true,
          isRefutation: true,
          claim: "benign",
        }),
      ],
      "DISPUTED",
    ],
  ];
  let passed = 0;
  for (const [name, ev, expected] of cases) {
    const got = synthesise(ev).grade;
    if (got === expected) passed += 1;
    logs.push({
      id: `003-${name}`,
      name: `Concordance — ${name}`,
      ok: got === expected,
      detail: `expected ${expected}, got ${got}`,
    });
  }
  logs.push({
    id: "003-summary",
    name: "Experiment 003 — concordance suite",
    ok: passed === cases.length,
    detail: `${passed}/${cases.length} cases`,
  });

  return logs;
}

function simulateDeletions(n: number) {
  let inFrame = 0;
  let out = 0;
  const rem = [0, 0, 0];
  // Deterministic walk through consecutive windows rather than Math.random (SSR-safe).
  let i = 0;
  for (let start = 1; start <= 79; start++) {
    for (let span = 0; span < 6; span++) {
      const end = Math.min(79, start + span);
      const r = analyzeVariant(start, end);
      rem[r.remainder] += 1;
      if (r.frame === "in-frame") inFrame += 1;
      else out += 1;
      i += 1;
      if (i >= n) break;
    }
    if (i >= n) break;
  }
  return {
    total: inFrame + out,
    inFrame,
    out,
    bars: [
      { label: "rem 0", count: rem[0] },
      { label: "rem 1", count: rem[1] },
      { label: "rem 2", count: rem[2] },
    ],
  };
}
