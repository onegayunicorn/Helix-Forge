import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardHint, CardTitle } from "@/components/ui/card";
import { DMD_REFERENCE } from "@/lib/helix";
import { Disclaimer } from "@/components/helix/disclaimer";

export const Route = createFileRoute("/about")({ component: AboutPage });

const LAYERS = [
  { name: "Core domain", body: "Variant, evidence, concordance, provenance." },
  { name: "Analysis engine", body: "Reading frame, skip rescue, domains, NMD." },
  { name: "Contracts", body: "JSON schemas for evidence, adapter, concordance." },
  { name: "Adapters", body: "OMIM 300377, UniProt P11532, ClinVar, LabArchives." },
];

export function AboutPage() {
  return (
    <AppShell>
      <header className="mb-6">
        <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
          Helix-Forge 0.9
        </p>
        <h1 className="font-display text-4xl tracking-tight">A laboratory knowledge bench</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Vendor-neutral informatics for the dystrophin gene. This build is the research
          layer of the packaged Helix-Forge tree: frame arithmetic, skip modelling, and
          evidence grading — running entirely in the browser.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {LAYERS.map((l) => (
          <Card key={l.name}>
            <CardTitle>{l.name}</CardTitle>
            <CardHint className="mt-2">{l.body}</CardHint>
          </Card>
        ))}
      </div>

      <Card className="mt-4">
        <CardTitle>Reference</CardTitle>
        <dl className="mt-3 grid grid-cols-2 gap-3 font-mono text-xs sm:grid-cols-3">
          <Ref k="Transcript" v={DMD_REFERENCE.transcript} />
          <Ref k="Protein" v={DMD_REFERENCE.protein} />
          <Ref k="UniProt" v={DMD_REFERENCE.uniprot} />
          <Ref k="OMIM" v={DMD_REFERENCE.omim} />
          <Ref k="Locus" v={DMD_REFERENCE.locus} />
          <Ref k="Inheritance" v={DMD_REFERENCE.inheritance} />
        </dl>
        <p className="mt-4 text-sm text-muted">
          Exon lengths and CDS coordinates follow the Leiden Muscular Dystrophy pages for
          NM_004006.2 (A of ATG = c.1). The original zip used placeholder 150-nt blocks;
          this instrument replaces those with the canonical map so skip logic matches the
          licensed AON indications.
        </p>
      </Card>

      <Card className="mt-4">
        <CardTitle>Scope</CardTitle>
        <ul className="mt-3 space-y-2 text-sm text-muted">
          <li>In scope: in-silico annotation, dashboards, published analyses.</li>
          <li>Out of scope: wet-lab work, manufacturing, human studies.</li>
          <li>Every grade is a prediction with an explicit rule trace.</li>
        </ul>
        <Disclaimer className="mt-4 text-xs text-faint" />
      </Card>
    </AppShell>
  );
}

function Ref({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="text-muted">{k}</dt>
      <dd className="text-fg">{v}</dd>
    </div>
  );
}
