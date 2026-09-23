export const EVIDENCE_GRADES = [
  "SUPPORTED",
  "EMERGING",
  "DISPUTED",
  "CONFLICTED",
  "INSUFFICIENT",
] as const;

export type EvidenceGrade = (typeof EVIDENCE_GRADES)[number];

export type VariantRef = {
  symbol: string;
  description: string;
  source: string;
};

export type Evidence = {
  id: string;
  variant: VariantRef;
  sourceDb: string;
  claim: string;
  confidence: number;
  isCurated: boolean;
  isRefutation: boolean;
  isTextMined: boolean;
  collapsedInto?: string;
};

export type ConcordanceResult = {
  variant: VariantRef;
  grade: EvidenceGrade;
  evidenceLines: Evidence[];
  summary: string;
  rulesFired: string[];
};

export function synthesise(evidenceLines: Evidence[]): ConcordanceResult {
  const variant = evidenceLines[0]?.variant ?? {
    symbol: "UNKNOWN",
    description: "no data",
    source: "none",
  };

  if (evidenceLines.length === 0) {
    return {
      variant,
      grade: "INSUFFICIENT",
      evidenceLines,
      summary: "No evidence lines. Denominator is empty.",
      rulesFired: ["empty-set"],
    };
  }

  const rulesFired: string[] = [];
  const collapsed = collapseEvidence(evidenceLines);
  if (collapsed.length < evidenceLines.length) {
    rulesFired.push("collapse");
  }

  if (collapsed.some((e) => e.isRefutation && e.isCurated)) {
    rulesFired.push("refutation-override");
    return {
      variant,
      grade: "DISPUTED",
      evidenceLines: collapsed,
      summary: "A curated refutation is present. Grade locked to DISPUTED.",
      rulesFired,
    };
  }

  const curated = collapsed.filter((e) => e.isCurated && !e.isRefutation);
  const textMined = collapsed.filter((e) => e.isTextMined);

  if (textMined.length >= 10 && curated.length === 0) {
    rulesFired.push("text-mining-cap");
    return {
      variant,
      grade: "EMERGING",
      evidenceLines: collapsed,
      summary: "Ten or more text-mined lines and no curated support. Capped at EMERGING.",
      rulesFired,
    };
  }

  if (curated.length >= 2) {
    rulesFired.push("two-curated");
    return {
      variant,
      grade: "SUPPORTED",
      evidenceLines: collapsed,
      summary: "Two or more independent curated sources agree.",
      rulesFired,
    };
  }

  if (curated.length === 1 || textMined.length > 0) {
    rulesFired.push(curated.length === 1 ? "single-curated" : "text-mined-only");
    return {
      variant,
      grade: "EMERGING",
      evidenceLines: collapsed,
      summary:
        curated.length === 1
          ? "A single curated source. Grade is EMERGING until independently replicated."
          : "Text-mined associations only.",
      rulesFired,
    };
  }

  rulesFired.push("insufficient");
  return {
    variant,
    grade: "INSUFFICIENT",
    evidenceLines: collapsed,
    summary: "Evidence does not meet the EMERGING threshold.",
    rulesFired,
  };
}

function collapseEvidence(lines: Evidence[]): Evidence[] {
  // Rule 1: text-mined copies of the same claim collapse. Distinct curated
  // databases remain independent even when they phrase the claim identically.
  const curated = lines.filter((l) => !l.isTextMined);
  const mined = lines.filter((l) => l.isTextMined);
  const byClaim = new Map<string, Evidence>();
  for (const line of mined) {
    const key = `${line.variant.symbol}::${line.claim.toLowerCase()}`;
    const existing = byClaim.get(key);
    if (!existing || line.confidence > existing.confidence) {
      byClaim.set(key, existing ? { ...line, collapsedInto: existing.sourceDb } : line);
    }
  }
  return [...curated, ...byClaim.values()];
}

export const CONCORDANCE_RULES = [
  {
    id: "collapse",
    title: "Collapse",
    body: "Three databases indexing one paper collapse to a single evidence line.",
  },
  {
    id: "skipped-source",
    title: "Skipped source",
    body: "A failed or excluded adapter reduces the denominator (6 → 4) instead of padding with nulls.",
  },
  {
    id: "refutation-override",
    title: "Refutation override",
    body: "A curated refutation forces DISPUTED regardless of supporting count.",
  },
  {
    id: "text-mining-cap",
    title: "Text-mining cap",
    body: "Ten or more text-mined lines, with no curated support, never grade above EMERGING.",
  },
] as const;
