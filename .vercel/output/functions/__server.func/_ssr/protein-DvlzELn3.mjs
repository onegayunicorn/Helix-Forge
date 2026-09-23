import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as CardHint, d as analyzeVariant, i as Card, l as EXONS, n as Badge, o as CardTitle, s as DMD_REFERENCE, t as AppShell } from "./badge-BoacSrr2.mjs";
import { i as useAnalysis, n as ProteinBar, r as domainImpact, t as DOMAINS } from "./protein-bar-DfiG734B.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/protein-DvlzELn3.js
var import_jsx_runtime = require_jsx_runtime();
function ProteinPage() {
	const startExon = useAnalysis((s) => s.startExon);
	const endExon = useAnalysis((s) => s.endExon);
	const kind = useAnalysis((s) => s.kind);
	const report = analyzeVariant(startExon, endExon, kind);
	const hit = domainImpact(report.aaStart, report.aaEnd);
	const remaining = Math.max(0, DMD_REFERENCE.proteinLength - report.aaRemoved);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-mono text-[11px] tracking-[0.18em] text-muted uppercase",
					children: ["UniProt ", DMD_REFERENCE.uniprot]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl tracking-tight",
					children: "Dystrophin architecture"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-sm text-muted",
					children: "Four domains, 3,685 residues. The rod can absorb large in-frame losses; the actin-binding and cysteine-rich modules generally cannot."
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "mb-3",
					children: "Residue map"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProteinBar, {
					aaStart: report.aaStart,
					aaEnd: report.aaEnd
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 font-mono text-xs text-muted",
					children: [
						"Overlay is the current ",
						kind,
						" of exons ",
						report.startExon,
						report.endExon !== report.startExon ? `–${report.endExon}` : "",
						", residues",
						" ",
						report.aaStart,
						"–",
						report.aaEnd,
						". Predicted remaining length",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-fg tabular-nums",
							children: [remaining.toLocaleString(), " aa"]
						}),
						report.frame === "frameshift" ? " before NMD (often none)." : "."
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 md:grid-cols-2",
			children: DOMAINS.map((d) => {
				const impacted = hit.some((h) => h.id === d.id);
				const exons = EXONS.filter((e) => e.aaEnd >= d.start && e.aaStart <= d.end);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: d.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: impacted ? "frameshift" : d.family,
							children: impacted ? "Impacted" : d.short
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-xs text-muted",
						children: [
							"p.",
							d.start,
							"–",
							d.end,
							" · exons ",
							exons[0]?.n,
							"–",
							exons[exons.length - 1]?.n
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHint, {
						className: "mt-3",
						children: d.note
					})
				] }, d.id);
			})
		})
	] });
}
//#endregion
export { ProteinPage as component };
