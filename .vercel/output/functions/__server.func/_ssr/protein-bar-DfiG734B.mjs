import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { f as clampExon, p as cn } from "./badge-BoacSrr2.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/protein-bar-DfiG734B.js
var import_jsx_runtime = require_jsx_runtime();
var DOMAINS = [
	{
		id: "abd",
		name: "Actin-binding",
		short: "ABD",
		start: 1,
		end: 246,
		family: "actin",
		note: "CH1/CH2 calponin-homology modules. Links dystrophin to F-actin."
	},
	{
		id: "rod",
		name: "Spectrin-like rod",
		short: "Rod",
		start: 253,
		end: 3040,
		family: "rod",
		note: "24 spectrin repeats and four hinges. Mechanical spring of the DGC."
	},
	{
		id: "cr",
		name: "Cysteine-rich",
		short: "CR",
		start: 3080,
		end: 3360,
		family: "cysteine",
		note: "WW, EF-hand and ZZ modules. Binds β-dystroglycan."
	},
	{
		id: "ct",
		name: "C-terminal",
		short: "CT",
		start: 3361,
		end: 3685,
		family: "cterm",
		note: "Syntrophin and dystrobrevin binding. Scaffold for the DGC."
	}
];
function domainImpact(aaStart, aaEnd) {
	const a = Math.min(aaStart, aaEnd);
	const b = Math.max(aaStart, aaEnd);
	return DOMAINS.filter((d) => a <= d.end && b >= d.start);
}
var useAnalysis = create()(persist((set) => ({
	startExon: 52,
	endExon: 52,
	kind: "deletion",
	selectedExon: 52,
	skipPreview: [],
	setRange: (start, end) => {
		const a = clampExon(Math.min(start, end));
		set({
			startExon: a,
			endExon: clampExon(Math.max(start, end)),
			selectedExon: a,
			skipPreview: []
		});
	},
	setKind: (kind) => set({
		kind,
		skipPreview: []
	}),
	setSelectedExon: (n) => set({ selectedExon: n }),
	setSkipPreview: (skipPreview) => set({ skipPreview })
}), {
	name: "helix-forge.range.v1",
	partialize: (s) => ({
		startExon: s.startExon,
		endExon: s.endExon,
		kind: s.kind
	})
}));
var TOTAL = 3685;
var FAMILY_CLASS = {
	actin: "bg-actin",
	rod: "bg-rod",
	cysteine: "bg-cysteine",
	cterm: "bg-cterm"
};
function ProteinBar({ aaStart, aaEnd }) {
	const hit = aaStart != null && aaEnd != null ? domainImpact(aaStart, aaEnd) : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative h-10 overflow-hidden rounded-md bg-elevated shadow-[0_0_0_1px_rgba(255,255,255,0.07)]",
			children: [DOMAINS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("absolute top-0 h-full opacity-70", FAMILY_CLASS[d.family]),
				style: {
					left: `${(d.start - 1) / TOTAL * 100}%`,
					width: `${(d.end - d.start + 1) / TOTAL * 100}%`
				},
				title: `${d.name} ${d.start}–${d.end}`
			}, d.id)), aaStart != null && aaEnd != null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute top-0 h-full bg-bg/70 ring-1 ring-fg/80",
				style: {
					left: `${(Math.min(aaStart, aaEnd) - 1) / TOTAL * 100}%`,
					width: `${(Math.abs(aaEnd - aaStart) + 1) / TOTAL * 100}%`
				}
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted",
			children: DOMAINS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center gap-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-2 rounded-[2px]", FAMILY_CLASS[d.family]) }),
					d.short,
					" ",
					d.start,
					"–",
					d.end,
					hit.some((h) => h.id === d.id) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-frameshift",
						children: "impacted"
					})
				]
			}, d.id))
		})]
	});
}
//#endregion
export { useAnalysis as i, ProteinBar as n, domainImpact as r, DOMAINS as t };
