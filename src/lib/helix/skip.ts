import { EXON_BY_N } from "./exons";
import { analyzeVariant, deletedNucleotides, remainderOf, type FrameReport, type VariantKind } from "./frame";

export type SkipStrategy = {
  skips: number[];
  nucleotides: number;
  remainder: 0 | 1 | 2;
  restored: boolean;
  flanking: boolean;
  aon: boolean;
  approved: string[];
  label: string;
  reason: string;
};

export const AON_SKIP_TARGETS = [44, 45, 51, 53] as const;

const APPROVED_BY_SKIP: Record<number, string[]> = {
  45: ["Casimersen (Amondys 45)"],
  51: ["Eteplirsen (Exondys 51)"],
  53: ["Golodirsen (Vyondys 53)", "Viltolarsen (Viltepso)"],
};

function uniqueSorted(nums: number[]): number[] {
  return [...new Set(nums)].sort((a, b) => a - b);
}

function strategyFor(deleted: number[], skips: number[]): SkipStrategy | null {
  const skipClean = skips.filter((s) => s >= 1 && s <= 79 && !deleted.includes(s));
  if (skipClean.length !== skips.length) return null;
  const combined = uniqueSorted([...deleted, ...skipClean]);
  const nt = combined.reduce((sum, n) => sum + (EXON_BY_N[n]?.length ?? 0), 0);
  const remainder = remainderOf(nt);
  const restored = remainder === 0;
  const start = deleted[0]!;
  const end = deleted[deleted.length - 1]!;
  const flanking = skipClean.every((s) => s === start - 1 || s === end + 1);
  const aon = skipClean.some((s) => (AON_SKIP_TARGETS as readonly number[]).includes(s));
  const approved = skipClean.flatMap((s) => APPROVED_BY_SKIP[s] ?? []);
  const label =
    skipClean.length === 0
      ? "No skip required"
      : skipClean.length === 1
        ? `Skip exon ${skipClean[0]}`
        : `Skip exons ${skipClean.join(" + ")}`;
  const reason =
    skipClean.length === 0
      ? "Deletion already removes a multiple of 3 nucleotides."
      : flanking
        ? "Flanking exon skip restores a codon boundary at the new junction."
        : aon
          ? "Matches a licensed antisense-oligonucleotide skip target."
          : "Removes additional nucleotides so the remaining CDS length is divisible by 3.";
  return {
    skips: skipClean,
    nucleotides: nt,
    remainder,
    restored,
    flanking,
    aon,
    approved,
    label,
    reason,
  };
}

export function findSkipStrategies(start: number, end: number, kind: VariantKind = "deletion"): SkipStrategy[] {
  if (kind === "duplication") {
    const report = analyzeVariant(start, end, kind);
    if (report.frame === "in-frame") {
      return [
        {
          skips: [],
          nucleotides: report.nucleotides,
          remainder: 0,
          restored: true,
          flanking: false,
          aon: false,
          approved: [],
          label: "No skip required",
          reason: "In-frame duplication — skip modelling is not applied.",
        },
      ];
    }
    return [];
  }

  const deleted = [];
  for (let n = Math.min(start, end); n <= Math.max(start, end); n++) deleted.push(n);

  const out: SkipStrategy[] = [];
  const seen = new Set<string>();
  const push = (s: SkipStrategy | null) => {
    if (!s || !s.restored) return;
    const key = s.skips.join(",");
    if (seen.has(key)) return;
    seen.add(key);
    out.push(s);
  };

  const baseNt = deletedNucleotides(start, end);
  if (baseNt % 3 === 0) {
    push(strategyFor(deleted, []));
    return out;
  }

  const s0 = deleted[0]!;
  const e0 = deleted[deleted.length - 1]!;
  const candidates: number[][] = [];

  if (s0 > 1) candidates.push([s0 - 1]);
  if (e0 < 79) candidates.push([e0 + 1]);
  for (const t of AON_SKIP_TARGETS) candidates.push([t]);
  for (let n = 44; n <= 55; n++) candidates.push([n]);
  if (s0 > 1 && e0 < 79) candidates.push([s0 - 1, e0 + 1]);

  for (const skips of candidates) push(strategyFor(deleted, skips));

  out.sort((a, b) => {
    const score = (s: SkipStrategy) =>
      (s.approved.length > 0 ? 8 : 0) + (s.aon ? 4 : 0) + (s.flanking ? 2 : 0) - s.skips.length;
    return score(b) - score(a) || a.skips.join().localeCompare(b.skips.join());
  });

  return out.slice(0, 6);
}

export function applySkip(report: FrameReport, skips: number[]): FrameReport {
  if (skips.length === 0) return report;
  const start = Math.min(report.startExon, ...skips);
  const end = Math.max(report.endExon, ...skips);
  return analyzeVariant(start, end, "deletion");
}
