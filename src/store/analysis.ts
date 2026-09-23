import { create } from "zustand";
import { persist } from "zustand/middleware";
import { clampExon, type VariantKind } from "@/lib/helix";

type AnalysisState = {
  startExon: number;
  endExon: number;
  kind: VariantKind;
  selectedExon: number | null;
  skipPreview: number[];
  setRange: (start: number, end: number) => void;
  setKind: (kind: VariantKind) => void;
  setSelectedExon: (n: number | null) => void;
  setSkipPreview: (skips: number[]) => void;
};

export const useAnalysis = create<AnalysisState>()(
  persist(
    (set) => ({
      startExon: 52,
      endExon: 52,
      kind: "deletion",
      selectedExon: 52,
      skipPreview: [],
      setRange: (start, end) => {
        const a = clampExon(Math.min(start, end));
        const b = clampExon(Math.max(start, end));
        set({ startExon: a, endExon: b, selectedExon: a, skipPreview: [] });
      },
      setKind: (kind) => set({ kind, skipPreview: [] }),
      setSelectedExon: (n) => set({ selectedExon: n }),
      setSkipPreview: (skipPreview) => set({ skipPreview }),
    }),
    {
      name: "helix-forge.range.v1",
      partialize: (s) => ({
        startExon: s.startExon,
        endExon: s.endExon,
        kind: s.kind,
      }),
    },
  ),
);
