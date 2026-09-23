import { EXONS } from "./exons";
import type { FrameReport } from "./frame";

/**
 * 50-nt rule: a premature termination codon more than ~50 nt upstream of the
 * last exon–exon junction typically triggers nonsense-mediated decay.
 */
export const LAST_EJC_NT = 50;

export function lastExonJunctionCds(): number {
  const last = EXONS[EXONS.length - 1];
  const prev = EXONS[EXONS.length - 2];
  return prev?.cdsEnd ?? last?.cdsEnd ?? 11058;
}

export function nmdCompetent(ptcCds: number): boolean {
  const lastJ = lastExonJunctionCds();
  return ptcCds > 0 && ptcCds < lastJ - LAST_EJC_NT;
}

export function predictedPtc(report: FrameReport): number | null {
  if (report.frame !== "frameshift") return null;
  // Approximate: frameshift at the 3' edge of the remaining upstream exon.
  const first = report.exons[0];
  if (!first) return null;
  return Math.max(1, first.cdsStart);
}

export function nmdStatus(report: FrameReport): {
  likely: boolean;
  ptc: number | null;
  label: string;
  detail: string;
} {
  if (report.kind === "duplication") {
    return {
      likely: false,
      ptc: null,
      label: "Not modelled",
      detail: "Duplication NMD depends on which copy is transcribed.",
    };
  }
  if (report.frame === "in-frame") {
    return {
      likely: false,
      ptc: null,
      label: "NMD escape",
      detail: "In-frame transcript is expected to be translated (internally truncated).",
    };
  }
  const ptc = predictedPtc(report);
  const likely = ptc != null && nmdCompetent(ptc) && report.endExon < 79;
  return {
    likely,
    ptc,
    label: likely ? "NMD-competent" : "NMD escape",
    detail: likely
      ? "Frameshift is upstream of the last exon junction. Transcript is likely degraded."
      : "Stop falls in the terminal region. A truncated protein may still be produced.",
  };
}

export function nmdCurve(sampleCount = 24): { cds: number; competent: boolean }[] {
  const last = 11058;
  const out = [];
  for (let i = 0; i < sampleCount; i++) {
    const cds = Math.round((i / (sampleCount - 1)) * last);
    out.push({ cds, competent: nmdCompetent(Math.max(1, cds)) });
  }
  return out;
}
