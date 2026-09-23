import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { l as EXONS, n as Badge, p as cn } from "./badge-BoacSrr2.mjs";
import { i as useAnalysis } from "./protein-bar-DfiG734B.mjs";
import { a as Tooltip$1, o as TooltipContent, s as TooltipTrigger } from "./router-Byja3Mtz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/frame-verdict--9Hm0bIV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var THERAPIES = [
	{
		id: "eteplirsen",
		name: "Eteplirsen",
		brand: "Exondys 51",
		skipExon: 51,
		year: 2016,
		agency: "FDA",
		modality: "PMO AON",
		note: "Skip 51. Amenable deletions include 45–50, 47–50, 48–50, 49–50, 50 and 52."
	},
	{
		id: "golodirsen",
		name: "Golodirsen",
		brand: "Vyondys 53",
		skipExon: 53,
		year: 2019,
		agency: "FDA",
		modality: "PMO AON",
		note: "Skip 53. Typical amenable patterns include 45–52, 48–52, 49–52, 50–52 and 52."
	},
	{
		id: "viltolarsen",
		name: "Viltolarsen",
		brand: "Viltepso",
		skipExon: 53,
		year: 2020,
		agency: "FDA",
		modality: "PMO AON",
		note: "Independent skip-53 chemistry. Same frame logic as golodirsen."
	},
	{
		id: "casimersen",
		name: "Casimersen",
		brand: "Amondys 45",
		skipExon: 45,
		year: 2021,
		agency: "FDA",
		modality: "PMO AON",
		note: "Skip 45. Restores frame for a subset of hotspot deletions flanking exon 45."
	}
];
var PRESETS = [
	{
		id: "del52",
		label: "del 52",
		start: 52,
		end: 52,
		kind: "deletion",
		blurb: "Classic hotspot. Skip 51 or 53 restores frame."
	},
	{
		id: "del44",
		label: "del 44",
		start: 44,
		end: 44,
		kind: "deletion",
		blurb: "Skip 43 or 45 restores frame."
	},
	{
		id: "del45-50",
		label: "del 45–50",
		start: 45,
		end: 50,
		kind: "deletion",
		blurb: "Eteplirsen-amenable. Skip 51."
	},
	{
		id: "del45-52",
		label: "del 45–52",
		start: 45,
		end: 52,
		kind: "deletion",
		blurb: "Golodirsen / viltolarsen. Skip 53."
	},
	{
		id: "del45-53",
		label: "del 45–53",
		start: 45,
		end: 53,
		kind: "deletion",
		blurb: "In-frame BMD-like cluster. No skip required."
	},
	{
		id: "del45-55",
		label: "del 45–55",
		start: 45,
		end: 55,
		kind: "deletion",
		blurb: "Large in-frame rod deletion, often BMD."
	},
	{
		id: "del51",
		label: "del 51",
		start: 51,
		end: 51,
		kind: "deletion",
		blurb: "Out of frame. Neighbouring skips restore codon phase."
	},
	{
		id: "del3-7",
		label: "del 3–7",
		start: 3,
		end: 7,
		kind: "deletion",
		blurb: "N-terminal ABD involvement. Phenotype less predictable."
	}
];
var FAMILY_BG = {
	actin: "bg-actin/25 hover:bg-actin/40",
	rod: "bg-rod/20 hover:bg-rod/35",
	cysteine: "bg-cysteine/25 hover:bg-cysteine/40",
	cterm: "bg-cterm/25 hover:bg-cterm/40"
};
function ExonMap({ interactive = true }) {
	const startExon = useAnalysis((s) => s.startExon);
	const endExon = useAnalysis((s) => s.endExon);
	const skipPreview = useAnalysis((s) => s.skipPreview);
	const setRange = useAnalysis((s) => s.setRange);
	const setSelectedExon = useAnalysis((s) => s.setSelectedExon);
	const selectedExon = useAnalysis((s) => s.selectedExon);
	const drag = (0, import_react.useRef)({ origin: null });
	const lo = Math.min(startExon, endExon);
	const hi = Math.max(startExon, endExon);
	const skipSet = new Set(skipPreview);
	function onPointer(n, dragging) {
		if (!interactive) return;
		setSelectedExon(n);
		if (dragging && drag.current.origin != null) setRange(drag.current.origin, n);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "select-none",
		onPointerUp: () => {
			drag.current.origin = null;
		},
		onPointerLeave: () => {
			drag.current.origin = null;
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-8 gap-1 sm:grid-cols-12 md:grid-cols-[repeat(16,minmax(0,1fr))] lg:grid-cols-[repeat(20,minmax(0,1fr))]",
			children: EXONS.map((exon) => {
				const inRange = exon.n >= lo && exon.n <= hi;
				const isSkip = skipSet.has(exon.n);
				const isSelected = selectedExon === exon.n;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip$1, {
					delayDuration: 120,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": `Exon ${exon.n}, ${exon.length} nucleotides`,
							"aria-pressed": inRange,
							className: cn("relative flex h-10 min-h-11 flex-col items-center justify-center rounded-sm font-mono text-[10px] leading-none transition-[background-color,box-shadow,color] duration-150", FAMILY_BG[exon.family], inRange && "bg-accent text-accent-fg hover:bg-accent", isSkip && !inRange && "bg-inframe/30 text-fg ring-1 ring-inframe", isSelected && "shadow-[0_0_0_1px_rgba(236,236,232,0.55)]", exon.hotspot && !inRange && "after:absolute after:bottom-0.5 after:h-px after:w-3 after:bg-frameshift/80 after:content-['']", !interactive && "pointer-events-none"),
							onPointerDown: (e) => {
								if (!interactive) return;
								e.currentTarget.setPointerCapture?.(e.pointerId);
								drag.current.origin = exon.n;
								setRange(exon.n, exon.n);
								setSelectedExon(exon.n);
							},
							onPointerEnter: () => onPointer(exon.n, drag.current.origin != null),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums",
								children: exon.n
							})
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-0.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-medium",
								children: ["Exon ", exon.n]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-muted",
								children: [
									exon.length,
									" nt · phase ",
									exon.phase,
									" · c.",
									exon.cdsStart,
									"–",
									exon.cdsEnd
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-muted",
								children: exon.domain
							})
						]
					}) })]
				}, exon.n);
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-muted",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
					swatch: "bg-actin/50",
					label: "Actin-binding"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
					swatch: "bg-rod/50",
					label: "Rod"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
					swatch: "bg-cysteine/50",
					label: "Cysteine-rich"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
					swatch: "bg-cterm/50",
					label: "C-terminal"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
					swatch: "bg-accent",
					label: "Selected"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-3 bg-frameshift/80" }), "Hotspot 45–55"]
				})
			]
		})]
	});
}
function Legend({ swatch, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "flex items-center gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-2 rounded-[2px]", swatch) }), label]
	});
}
function FrameVerdict({ report, className }) {
	const inFrame = report.frame === "in-frame";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("space-y-3", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: inFrame ? "inframe" : "frameshift",
						children: inFrame ? "In-frame" : "Frameshift"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: report.phenotype === "DMD-like" ? "danger" : report.phenotype === "BMD-like" ? "inframe" : "default",
						children: report.phenotype
					}),
					report.nmdLikely && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: "frameshift",
						children: "NMD likely"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-3xl tracking-tight text-fg sm:text-4xl",
				children: inFrame ? "Codon phase held" : "Reading frame broken"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 max-w-xl text-sm text-muted",
				children: [
					report.kind === "deletion" ? "Deletion" : "Duplication",
					" of",
					" ",
					report.startExon === report.endExon ? `exon ${report.startExon}` : `exons ${report.startExon}–${report.endExon}`,
					" ",
					"removes ",
					report.nucleotides.toLocaleString(),
					" nt",
					inFrame ? ", a multiple of 3. An internally truncated dystrophin can still be produced." : ` (remainder ${report.remainder}). Downstream sequence is out of phase and a premature stop is expected.`
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs text-faint break-all",
				children: report.hgvs
			})
		]
	});
}
//#endregion
export { THERAPIES as i, FrameVerdict as n, PRESETS as r, ExonMap as t };
