const KEY = "helix-forge.analyses.v1";

export type StoredAnalysis = {
  id: string;
  at: number;
  start: number;
  end: number;
  kind: "deletion" | "duplication";
  frame: "in-frame" | "frameshift";
  hgvs: string;
};

export function loadHistory(): StoredAnalysis[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as StoredAnalysis[];
    return Array.isArray(parsed) ? parsed.slice(0, 24) : [];
  } catch {
    return [];
  }
}

export function saveAnalysis(entry: Omit<StoredAnalysis, "id" | "at">): StoredAnalysis[] {
  if (typeof window === "undefined") return [];
  const next: StoredAnalysis = {
    ...entry,
    id: `${Date.now()}-${entry.start}-${entry.end}`,
    at: Date.now(),
  };
  const prev = loadHistory().filter(
    (x) => !(x.start === entry.start && x.end === entry.end && x.kind === entry.kind),
  );
  const all = [next, ...prev].slice(0, 24);
  window.localStorage.setItem(KEY, JSON.stringify(all));
  return all;
}

export function clearHistory(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}
