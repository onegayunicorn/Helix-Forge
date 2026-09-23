import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as CardHint, d as analyzeVariant, i as Card, n as Badge, o as CardTitle, p as cn, r as Button, t as AppShell } from "./badge-BoacSrr2.mjs";
import { i as useAnalysis, n as ProteinBar, r as domainImpact } from "./protein-bar-DfiG734B.mjs";
import { i as findSkipStrategies, n as nmdStatus, r as applySkip } from "./router-Byja3Mtz.mjs";
import { i as THERAPIES, n as FrameVerdict, r as PRESETS, t as ExonMap } from "./frame-verdict--9Hm0bIV.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/analyze-BrGZ60wp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KEY = "helix-forge.analyses.v1";
function loadHistory() {
	if (typeof window === "undefined") return [];
	try {
		const raw = window.localStorage.getItem(KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed.slice(0, 24) : [];
	} catch {
		return [];
	}
}
function saveAnalysis(entry) {
	if (typeof window === "undefined") return [];
	const all = [{
		...entry,
		id: `${Date.now()}-${entry.start}-${entry.end}`,
		at: Date.now()
	}, ...loadHistory().filter((x) => !(x.start === entry.start && x.end === entry.end && x.kind === entry.kind))].slice(0, 24);
	window.localStorage.setItem(KEY, JSON.stringify(all));
	return all;
}
function SkipPanel({ strategies, active, onPick }) {
	if (strategies.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "No single- or dual-exon skip within the hotspot restores frame for this pattern."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "space-y-2",
		children: strategies.map((s) => {
			const key = s.skips.join("-") || "none";
			const selected = s.skips.length === active.length && s.skips.every((n, i) => n === active[i]);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onPick(s.skips),
				className: cn("flex w-full flex-col gap-1 rounded-lg bg-elevated px-3 py-3 text-left shadow-[0_0_0_1px_rgba(255,255,255,0.06)] transition-[box-shadow,background-color] duration-150", selected && "shadow-[0_0_0_1px_rgba(159,180,200,0.7)]"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-medium text-fg",
							children: s.label
						}),
						s.aon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "accent",
							children: "AON"
						}),
						s.flanking && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "Flank" }),
						s.approved.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "inframe",
							children: a
						}, a))
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted",
					children: s.reason
				})]
			}) }, key);
		})
	});
}
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
	type,
	ref,
	className: cn("flex h-11 w-full rounded-md bg-elevated px-3 text-sm text-fg shadow-[0_0_0_1px_rgba(255,255,255,0.1)] outline-none transition-[box-shadow] duration-150 placeholder:text-faint focus-visible:shadow-[0_0_0_2px_rgba(159,180,200,0.45)] disabled:opacity-50", className),
	...props
}));
Input.displayName = "Input";
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		className: cn("text-xs font-medium uppercase tracking-wide text-muted", className),
		...props
	});
}
function AnalyzePage() {
	const startExon = useAnalysis((s) => s.startExon);
	const endExon = useAnalysis((s) => s.endExon);
	const kind = useAnalysis((s) => s.kind);
	const skipPreview = useAnalysis((s) => s.skipPreview);
	const setRange = useAnalysis((s) => s.setRange);
	const setKind = useAnalysis((s) => s.setKind);
	const setSkipPreview = useAnalysis((s) => s.setSkipPreview);
	const [history, setHistory] = (0, import_react.useState)([]);
	const report = (0, import_react.useMemo)(() => analyzeVariant(startExon, endExon, kind), [
		startExon,
		endExon,
		kind
	]);
	const strategies = (0, import_react.useMemo)(() => findSkipStrategies(startExon, endExon, kind), [
		startExon,
		endExon,
		kind
	]);
	const rescued = applySkip(report, skipPreview);
	const nmd = nmdStatus(report);
	const domains = domainImpact(report.aaStart, report.aaEnd);
	const matchingTherapies = THERAPIES.filter((t) => strategies.some((s) => s.skips.includes(t.skipExon) && s.approved.length > 0));
	(0, import_react.useEffect)(() => {
		setHistory(loadHistory());
	}, []);
	function persist() {
		setHistory(saveAnalysis({
			start: startExon,
			end: endExon,
			kind,
			frame: report.frame,
			hgvs: report.hgvs
		}));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[11px] tracking-[0.18em] text-muted uppercase",
					children: "Variant analyzer"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl tracking-tight",
					children: "Frame, skip, consequence"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-sm text-muted",
					children: "Whole-exon deletion and duplication on NM_004006.2. Three numbers decide the frame: start, end, and length mod 3."
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 grid gap-3 sm:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Start exon",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						min: 1,
						max: 79,
						value: startExon,
						onChange: (e) => setRange(Number(e.target.value) || 1, endExon)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "End exon",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						min: 1,
						max: 79,
						value: endExon,
						onChange: (e) => setRange(startExon, Number(e.target.value) || 1)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Class",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-11 overflow-hidden rounded-md shadow-[0_0_0_1px_rgba(255,255,255,0.1)]",
						children: ["deletion", "duplication"].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setKind(k),
							className: `flex-1 text-sm capitalize ${kind === k ? "bg-accent text-accent-fg" : "bg-elevated text-muted"}`,
							children: k
						}, k))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "w-full",
						onClick: persist,
						children: "Keep in session"
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 flex flex-wrap gap-1.5",
			children: PRESETS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => {
					setKind(p.kind);
					setRange(p.start, p.end);
				},
				className: "h-8 rounded-full bg-surface px-3 font-mono text-[11px] text-muted shadow-[0_0_0_1px_rgba(255,255,255,0.06)] hover:text-fg",
				title: p.blurb,
				children: p.label
			}, p.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "mb-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExonMap, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-[1.15fr_0.85fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FrameVerdict, { report: skipPreview.length ? rescued : report }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
							k: "Nucleotides",
							v: report.nucleotides.toLocaleString()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
							k: "Remainder",
							v: String(report.remainder)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
							k: "aa span",
							v: `${report.aaStart}–${report.aaEnd}`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
							k: "aa removed",
							v: report.aaRemoved.toLocaleString()
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-xs font-medium tracking-wide text-muted uppercase",
						children: "Dystrophin"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProteinBar, {
						aaStart: report.aaStart,
						aaEnd: report.aaEnd
					})]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Skip rescue" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHint, {
							className: "mt-1 mb-3",
							children: "Flanking and licensed AON targets first. Selecting a row overlays the skip on the map."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipPanel, {
							strategies,
							active: skipPreview,
							onPick: setSkipPreview
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "NMD" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex items-center gap-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: nmd.likely ? "frameshift" : "inframe",
								children: nmd.label
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: nmd.detail
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Domains hit" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-2",
						children: domains.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-fg",
								children: d.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-xs text-muted",
								children: d.note
							})]
						}, d.id))
					})] })
				]
			})]
		}),
		matchingTherapies.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Licensed skip chemistry" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHint, {
					className: "mt-1 mb-3",
					children: "Listed when this pattern is computationally amenable. Not a prescription."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-2 sm:grid-cols-2",
					children: matchingTherapies.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-lg bg-elevated px-3 py-3 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-fg",
								children: t.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[11px] text-muted",
								children: t.brand
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-muted",
							children: [
								"Skip ",
								t.skipExon,
								" · ",
								t.agency,
								" ",
								t.year,
								" · ",
								t.modality
							]
						})]
					}, t.id))
				})
			]
		}),
		history.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Session log" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 divide-y divide-border",
				children: history.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "flex w-full items-center justify-between gap-3 py-2.5 text-left text-sm",
					onClick: () => {
						setKind(h.kind);
						setRange(h.start, h.end);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-xs text-muted",
						children: h.hgvs
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: h.frame === "in-frame" ? "inframe" : "frameshift",
						children: h.frame
					})]
				}) }, h.id))
			})]
		})
	] });
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), children]
	});
}
function Metric({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
		className: "text-[10px] tracking-wide text-muted uppercase",
		children: k
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		className: "font-mono text-sm tabular-nums text-fg",
		children: v
	})] });
}
//#endregion
export { AnalyzePage as component };
