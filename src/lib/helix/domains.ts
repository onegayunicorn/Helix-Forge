export type ProteinDomain = {
  id: string;
  name: string;
  short: string;
  start: number;
  end: number;
  family: "actin" | "rod" | "cysteine" | "cterm";
  note: string;
};

export const DOMAINS: ProteinDomain[] = [
  {
    id: "abd",
    name: "Actin-binding",
    short: "ABD",
    start: 1,
    end: 246,
    family: "actin",
    note: "CH1/CH2 calponin-homology modules. Links dystrophin to F-actin.",
  },
  {
    id: "rod",
    name: "Spectrin-like rod",
    short: "Rod",
    start: 253,
    end: 3040,
    family: "rod",
    note: "24 spectrin repeats and four hinges. Mechanical spring of the DGC.",
  },
  {
    id: "cr",
    name: "Cysteine-rich",
    short: "CR",
    start: 3080,
    end: 3360,
    family: "cysteine",
    note: "WW, EF-hand and ZZ modules. Binds β-dystroglycan.",
  },
  {
    id: "ct",
    name: "C-terminal",
    short: "CT",
    start: 3361,
    end: 3685,
    family: "cterm",
    note: "Syntrophin and dystrobrevin binding. Scaffold for the DGC.",
  },
];

export function domainImpact(aaStart: number, aaEnd: number): ProteinDomain[] {
  const a = Math.min(aaStart, aaEnd);
  const b = Math.max(aaStart, aaEnd);
  return DOMAINS.filter((d) => a <= d.end && b >= d.start);
}

export function domainCoverage(aaStart: number, aaEnd: number, domain: ProteinDomain): number {
  const a = Math.max(aaStart, domain.start);
  const b = Math.min(aaEnd, domain.end);
  if (b < a) return 0;
  return (b - a + 1) / (domain.end - domain.start + 1);
}
