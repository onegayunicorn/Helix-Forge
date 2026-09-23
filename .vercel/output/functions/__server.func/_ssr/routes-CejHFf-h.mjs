import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { u as ArrowRight } from "../_libs/lucide-react.mjs";
import { a as CardHint, c as Disclaimer, d as analyzeVariant, i as Card, n as Badge, o as CardTitle, r as Button, s as DMD_REFERENCE, t as AppShell, u as EXON_BY_N } from "./badge-BoacSrr2.mjs";
import { i as useAnalysis, n as ProteinBar } from "./protein-bar-DfiG734B.mjs";
import { n as FrameVerdict, r as PRESETS, t as ExonMap } from "./frame-verdict--9Hm0bIV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CejHFf-h.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const startExon = useAnalysis((s) => s.startExon);
	const endExon = useAnalysis((s) => s.endExon);
	const kind = useAnalysis((s) => s.kind);
	const selectedExon = useAnalysis((s) => s.selectedExon);
	const setRange = useAnalysis((s) => s.setRange);
	const report = analyzeVariant(startExon, endExon, kind);
	const selected = selectedExon ? EXON_BY_N[selectedExon] : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mb-8 grid gap-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-end",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mb-2 font-mono text-[11px] tracking-[0.18em] text-muted uppercase",
					children: [
						DMD_REFERENCE.transcript,
						" · ",
						DMD_REFERENCE.locus
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl tracking-tight text-fg sm:text-5xl",
					children: "The dystrophin locus, as an instrument."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-xl text-muted",
					children: "Drag across the 79 coding exons of Dp427m. Helix-Forge scores reading frame, skip rescue, and domain impact against the Leiden NM_004006.2 map."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Exons",
						v: String(DMD_REFERENCE.exons)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "CDS",
						v: `${DMD_REFERENCE.cdsLength.toLocaleString()} nt`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Protein",
						v: `${DMD_REFERENCE.proteinLength.toLocaleString()} aa`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Gene span",
						v: `${DMD_REFERENCE.geneSpanMb} Mb`
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Locus map" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHint, {
					className: "mt-1",
					children: "Press and drag to set a deletion range. Hotspot 45–55 is marked."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-1.5",
					children: PRESETS.slice(0, 6).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setRange(p.start, p.end),
						className: "h-8 rounded-full bg-elevated px-3 font-mono text-[11px] text-muted shadow-[0_0_0_1px_rgba(255,255,255,0.06)] hover:text-fg",
						children: p.label
					}, p.id))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExonMap, {})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "mb-3",
					children: "Selection"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FrameVerdict, { report }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/analyze",
							children: ["Open in analyzer", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
						})
					})
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "mb-1",
					children: "Inspected exon"
				}),
				selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-display text-2xl",
									children: ["Exon ", selected.n]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: selected.family,
									children: selected.family
								}),
								selected.hotspot && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: "frameshift",
									children: "Hotspot"
								}),
								selected.aonTarget && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: "accent",
									children: "AON target"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: selected.role
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "grid grid-cols-2 gap-2 font-mono text-xs text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Length", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-fg tabular-nums",
									children: [selected.length, " nt"]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Phase", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-fg tabular-nums",
									children: selected.phase
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["CDS", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-fg tabular-nums",
									children: [
										"c.",
										selected.cdsStart,
										"–",
										selected.cdsEnd
									]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Protein", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-fg tabular-nums",
									children: [
										"p.",
										selected.aaStart,
										"–",
										selected.aaEnd
									]
								})] })
							]
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHint, {
					className: "mt-3",
					children: "Tap an exon to inspect it."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProteinBar, {
						aaStart: report.aaStart,
						aaEnd: report.aaEnd
					})
				})
			] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Disclaimer, { className: "mt-8 text-[11px] text-faint" })
	] });
}
function Stat({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-surface px-3 py-3 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-[10px] tracking-wide text-muted uppercase",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "font-mono text-sm tabular-nums text-fg",
			children: v
		})]
	});
}
//#endregion
export { Home as component };
