import { EXONS, EXON_BY_N, exonsInRange, type Exon } from "./exons";

export type FrameKind = "in-frame" | "frameshift";
export type PhenotypeLean = "BMD-like" | "DMD-like" | "uncertain";

export type VariantKind = "deletion" | "duplication";

export type FrameReport = {
  kind: VariantKind;
  startExon: number;
  endExon: number;
  exons: Exon[];
  nucleotides: number;
  remainder: 0 | 1 | 2;
  frame: FrameKind;
  phenotype: PhenotypeLean;
  hgvs: string;
  aaStart: number;
  aaEnd: number;
  aaRemoved: number;
  nmdLikely: boolean;
};

export function readingFrameFromCdsPosition(cdsPos: number): 0 | 1 | 2 {
  const r = ((cdsPos - 1) % 3) as 0 | 1 | 2;
  return r < 0 ? ((r + 3) as 0 | 1 | 2) : r;
}

export function clampExon(n: number): number {
  return Math.max(1, Math.min(79, Math.round(n)));
}

export function normalizeRange(a: number, b: number): { start: number; end: number } {
  const start = clampExon(Math.min(a, b));
  const end = clampExon(Math.max(a, b));
  return { start, end };
}

export function deletedNucleotides(start: number, end: number): number {
  const { start: s, end: e } = normalizeRange(start, end);
  return exonsInRange(s, e).reduce((sum, x) => sum + x.length, 0);
}

export function isInFrame(start: number, end: number): boolean {
  return deletedNucleotides(start, end) % 3 === 0;
}

export function remainderOf(nt: number): 0 | 1 | 2 {
  return (nt % 3) as 0 | 1 | 2;
}

function hgvsFor(kind: VariantKind, start: number, end: number): string {
  const first = EXON_BY_N[start];
  const last = EXON_BY_N[end];
  if (!first || !last) return "NM_004006.2:c.?";
  const span =
    start === end
      ? `c.${first.cdsStart}_${first.cdsEnd}`
      : `c.${first.cdsStart}_${last.cdsEnd}`;
  const op = kind === "deletion" ? "del" : "dup";
  const exonLabel = start === end ? `exon ${start}` : `exons ${start}–${end}`;
  return `NM_004006.2:${span}${op} (${exonLabel})`;
}

export function phenotypeLean(frame: FrameKind, start: number, end: number): PhenotypeLean {
  // Critical domains: ABD (1–8) and cysteine-rich / C-term (63–79) are poorly tolerated even in-frame.
  const hitsCritical =
    (start <= 8 && end >= 1) || (start <= 79 && end >= 63);
  if (frame === "in-frame" && !hitsCritical) return "BMD-like";
  if (frame === "in-frame" && hitsCritical) return "uncertain";
  return "DMD-like";
}

export function analyzeVariant(
  startExon: number,
  endExon: number,
  kind: VariantKind = "deletion",
): FrameReport {
  const { start, end } = normalizeRange(startExon, endExon);
  const exons = exonsInRange(start, end);
  const nucleotides = exons.reduce((s, x) => s + x.length, 0);
  const remainder = remainderOf(nucleotides);
  const frame: FrameKind = remainder === 0 ? "in-frame" : "frameshift";
  const aaStart = exons[0]?.aaStart ?? 1;
  const aaEnd = exons[exons.length - 1]?.aaEnd ?? 3685;
  const aaRemoved = Math.max(0, aaEnd - aaStart + 1);
  // NMD: frameshifting deletions that do not reach the last exon typically trigger NMD.
  const nmdLikely = kind === "deletion" && frame === "frameshift" && end < 79;

  return {
    kind,
    startExon: start,
    endExon: end,
    exons,
    nucleotides,
    remainder,
    frame,
    phenotype: phenotypeLean(frame, start, end),
    hgvs: hgvsFor(kind, start, end),
    aaStart,
    aaEnd,
    aaRemoved,
    nmdLikely,
  };
}

export function junctionPhases(start: number, end: number): { upstream: 0 | 1 | 2 | null; downstream: 0 | 1 | 2 | null } {
  const { start: s, end: e } = normalizeRange(start, end);
  const up = s > 1 ? EXON_BY_N[s - 1] : undefined;
  const down = e < 79 ? EXON_BY_N[e + 1] : undefined;
  return {
    upstream: up ? ((up.cdsEnd % 3) as 0 | 1 | 2) : null,
    downstream: down ? down.phase : null,
  };
}

export function cdsCovered(): number {
  return EXONS.reduce((s, x) => s + x.length, 0);
}
