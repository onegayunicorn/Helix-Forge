export function Disclaimer({ className }: { className?: string }) {
  return (
    <p className={className ?? "text-[11px] leading-relaxed text-faint"}>
      Research informatics only. Outputs are predictions with provenance, not diagnoses
      or treatment decisions.
    </p>
  );
}
