export type Therapy = {
  id: string;
  name: string;
  brand: string;
  skipExon: number;
  year: number;
  agency: string;
  modality: string;
  note: string;
};

export const THERAPIES: Therapy[] = [
  {
    id: "eteplirsen",
    name: "Eteplirsen",
    brand: "Exondys 51",
    skipExon: 51,
    year: 2016,
    agency: "FDA",
    modality: "PMO AON",
    note: "Skip 51. Amenable deletions include 45–50, 47–50, 48–50, 49–50, 50 and 52.",
  },
  {
    id: "golodirsen",
    name: "Golodirsen",
    brand: "Vyondys 53",
    skipExon: 53,
    year: 2019,
    agency: "FDA",
    modality: "PMO AON",
    note: "Skip 53. Typical amenable patterns include 45–52, 48–52, 49–52, 50–52 and 52.",
  },
  {
    id: "viltolarsen",
    name: "Viltolarsen",
    brand: "Viltepso",
    skipExon: 53,
    year: 2020,
    agency: "FDA",
    modality: "PMO AON",
    note: "Independent skip-53 chemistry. Same frame logic as golodirsen.",
  },
  {
    id: "casimersen",
    name: "Casimersen",
    brand: "Amondys 45",
    skipExon: 45,
    year: 2021,
    agency: "FDA",
    modality: "PMO AON",
    note: "Skip 45. Restores frame for a subset of hotspot deletions flanking exon 45.",
  },
];

export const PRESETS = [
  {
    id: "del52",
    label: "del 52",
    start: 52,
    end: 52,
    kind: "deletion" as const,
    blurb: "Classic hotspot. Skip 51 or 53 restores frame.",
  },
  {
    id: "del44",
    label: "del 44",
    start: 44,
    end: 44,
    kind: "deletion" as const,
    blurb: "Skip 43 or 45 restores frame.",
  },
  {
    id: "del45-50",
    label: "del 45–50",
    start: 45,
    end: 50,
    kind: "deletion" as const,
    blurb: "Eteplirsen-amenable. Skip 51.",
  },
  {
    id: "del45-52",
    label: "del 45–52",
    start: 45,
    end: 52,
    kind: "deletion" as const,
    blurb: "Golodirsen / viltolarsen. Skip 53.",
  },
  {
    id: "del45-53",
    label: "del 45–53",
    start: 45,
    end: 53,
    kind: "deletion" as const,
    blurb: "In-frame BMD-like cluster. No skip required.",
  },
  {
    id: "del45-55",
    label: "del 45–55",
    start: 45,
    end: 55,
    kind: "deletion" as const,
    blurb: "Large in-frame rod deletion, often BMD.",
  },
  {
    id: "del51",
    label: "del 51",
    start: 51,
    end: 51,
    kind: "deletion" as const,
    blurb: "Out of frame. Neighbouring skips restore codon phase.",
  },
  {
    id: "del3-7",
    label: "del 3–7",
    start: 3,
    end: 7,
    kind: "deletion" as const,
    blurb: "N-terminal ABD involvement. Phenotype less predictable.",
  },
];
