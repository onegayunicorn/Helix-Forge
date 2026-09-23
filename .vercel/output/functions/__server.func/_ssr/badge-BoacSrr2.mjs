import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { d as useRouterState, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as Menu, c as FlaskConical, i as ScanSearch, l as Dna, o as Info, r as Spline, s as GitCompare, t as X } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { a as DialogPortal, g as Slot, i as DialogOverlay, n as DialogClose, o as DialogTitle, r as DialogContent, s as DialogTrigger, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badge-BoacSrr2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function HelixMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		fill: "none",
		"aria-hidden": "true",
		className: cn("size-7", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M10 4c6 4 6 20 0 24",
				stroke: "currentColor",
				strokeWidth: "1.6",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M22 4c-6 4-6 20 0 24",
				stroke: "currentColor",
				strokeWidth: "1.6",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M11.2 8.5h9.6M10.4 13h11.2M10.4 19h11.2M11.2 23.5h9.6",
				stroke: "currentColor",
				strokeWidth: "1.2",
				strokeLinecap: "round",
				opacity: "0.7"
			})
		]
	});
}
function Wordmark({ compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2.5 text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "flex size-9 items-center justify-center rounded-md bg-elevated text-accent shadow-[0_0_0_1px_rgba(255,255,255,0.08)]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HelixMark, { className: "size-5" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "leading-tight",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block font-display text-[1.15rem] tracking-tight",
				children: "Helix-Forge"
			}), !compact && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block font-mono text-[10px] tracking-[0.16em] text-muted uppercase",
				children: "DMD locus v0.9"
			})]
		})]
	});
}
function Disclaimer({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: className ?? "text-[11px] leading-relaxed text-faint",
		children: "Research informatics only. Outputs are predictions with provenance, not diagnoses or treatment decisions."
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[opacity,transform,background-color,color,box-shadow] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:opacity-90",
			secondary: "bg-elevated text-fg shadow-[0_0_0_1px_rgba(255,255,255,0.08)] hover:bg-elevated/80",
			ghost: "text-muted hover:bg-elevated hover:text-fg",
			outline: "bg-transparent text-fg shadow-[0_0_0_1px_rgba(255,255,255,0.12)] hover:bg-elevated",
			danger: "bg-danger/15 text-danger hover:bg-danger/25"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-xs",
			lg: "h-12 px-5",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var Sheet = Dialog;
var SheetTrigger = DialogTrigger;
function SheetContent({ className, children, side = "left", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-bg/70 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
		className: cn("fixed z-50 flex h-full w-[min(20rem,88vw)] flex-col bg-surface p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out", side === "left" ? "inset-y-0 left-0 data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left" : "inset-y-0 right-0 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right", className),
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
				className: "sr-only",
				children: "Menu"
			}),
			children,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
				className: "absolute top-3 right-3 rounded-md p-2 text-muted hover:bg-elevated hover:text-fg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sr-only",
					children: "Close"
				})]
			})
		]
	})] });
}
var NAV = [
	{
		to: "/",
		label: "Locus",
		icon: Dna
	},
	{
		to: "/analyze",
		label: "Analyzer",
		icon: ScanSearch
	},
	{
		to: "/protein",
		label: "Protein",
		icon: Spline
	},
	{
		to: "/concordance",
		label: "Concordance",
		icon: GitCompare
	},
	{
		to: "/lab",
		label: "Lab",
		icon: FlaskConical
	},
	{
		to: "/about",
		label: "About",
		icon: Info
	}
];
function AppShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#main",
				className: "sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-fg",
				children: "Skip to content"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, { compact: true })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "hidden items-center gap-1 md:flex",
							children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
								...item,
								active: pathname === item.to
							}, item.to))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
							open,
							onOpenChange: setOpen,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									className: "md:hidden",
									"aria-label": "Open menu",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mb-6",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
									className: "flex flex-col gap-1",
									children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: item.to,
										onClick: () => setOpen(false),
										className: cn("flex h-11 items-center gap-3 rounded-md px-3 text-sm text-muted hover:bg-elevated hover:text-fg", pathname === item.to && "bg-elevated text-fg"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-4" }), item.label]
									}, item.to))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-auto pt-8",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Disclaimer, {})
								})
							] })]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				id: "main",
				className: "mx-auto max-w-6xl px-4 py-6 pb-24 md:pb-10",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-5",
					children: NAV.slice(0, 5).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						className: cn("flex h-14 flex-col items-center justify-center gap-0.5 text-[10px] text-muted", pathname === item.to && "text-fg"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-4" }), item.label]
					}, item.to))
				})
			})
		]
	});
}
function NavLink({ to, label, icon: Icon, active }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: cn("inline-flex h-9 items-center gap-1.5 rounded-md px-3 text-sm text-muted transition-colors duration-150 hover:text-fg", active && "bg-elevated text-fg"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5" }), label]
	});
}
function Card({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("rounded-xl bg-surface p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.07)] sm:p-5", className),
		...props
	});
}
function CardTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: cn("font-display text-lg tracking-tight text-fg", className),
		...props
	});
}
function CardHint({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: cn("text-sm text-muted", className),
		...props
	});
}
var DMD_REFERENCE = {
	symbol: "DMD",
	transcript: "NM_004006.2",
	protein: "NP_003997.2",
	uniprot: "P11532",
	omim: "300377",
	locus: "Xp21.2-p21.1",
	exons: 79,
	geneSpanMb: 2.3,
	cdnaLength: 13992,
	cdsLength: 11058,
	proteinLength: 3685,
	inheritance: "X-linked recessive",
	blocksChecked: 6319,
	disagreements: 0
};
var EXONS = [
	{
		n: 1,
		length: 31,
		cdsStart: 1,
		cdsEnd: 31,
		phase: 0,
		aaStart: 1,
		aaEnd: 10,
		family: "actin",
		domain: "Actin-binding domain (N-terminus)",
		role: "Translation start · ATG · Dp427m exon 1",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 2,
		length: 62,
		cdsStart: 32,
		cdsEnd: 93,
		phase: 1,
		aaStart: 11,
		aaEnd: 31,
		family: "actin",
		domain: "Actin-binding domain (N-terminus)",
		role: "Actin-binding interface",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 3,
		length: 93,
		cdsStart: 94,
		cdsEnd: 186,
		phase: 0,
		aaStart: 32,
		aaEnd: 62,
		family: "actin",
		domain: "Actin-binding domain (N-terminus)",
		role: "Actin-binding domain (N-terminus)",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 4,
		length: 78,
		cdsStart: 187,
		cdsEnd: 264,
		phase: 0,
		aaStart: 63,
		aaEnd: 88,
		family: "actin",
		domain: "Actin-binding domain (N-terminus)",
		role: "Actin-binding domain (N-terminus)",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 5,
		length: 93,
		cdsStart: 265,
		cdsEnd: 357,
		phase: 0,
		aaStart: 89,
		aaEnd: 119,
		family: "actin",
		domain: "Actin-binding domain (N-terminus)",
		role: "Actin-binding domain (N-terminus)",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 6,
		length: 173,
		cdsStart: 358,
		cdsEnd: 530,
		phase: 0,
		aaStart: 120,
		aaEnd: 176,
		family: "actin",
		domain: "Actin-binding domain (N-terminus)",
		role: "Actin-binding domain (N-terminus)",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 7,
		length: 119,
		cdsStart: 531,
		cdsEnd: 649,
		phase: 2,
		aaStart: 177,
		aaEnd: 216,
		family: "actin",
		domain: "Actin-binding domain (N-terminus)",
		role: "Actin-binding domain (N-terminus)",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 8,
		length: 182,
		cdsStart: 650,
		cdsEnd: 831,
		phase: 1,
		aaStart: 217,
		aaEnd: 277,
		family: "actin",
		domain: "Actin-binding domain (N-terminus)",
		role: "ABD / hinge 1 boundary",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 9,
		length: 129,
		cdsStart: 832,
		cdsEnd: 960,
		phase: 0,
		aaStart: 278,
		aaEnd: 320,
		family: "rod",
		domain: "Hinge 1 / spectrin-like repeat 1",
		role: "Hinge 1 / spectrin-like repeat 1",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 10,
		length: 189,
		cdsStart: 961,
		cdsEnd: 1149,
		phase: 0,
		aaStart: 321,
		aaEnd: 383,
		family: "rod",
		domain: "Spectrin-like repeat 1",
		role: "Spectrin-like repeat 1",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 11,
		length: 182,
		cdsStart: 1150,
		cdsEnd: 1331,
		phase: 0,
		aaStart: 384,
		aaEnd: 443,
		family: "rod",
		domain: "Spectrin-like repeat 2",
		role: "Spectrin-like repeat 2",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 12,
		length: 151,
		cdsStart: 1332,
		cdsEnd: 1482,
		phase: 2,
		aaStart: 444,
		aaEnd: 494,
		family: "rod",
		domain: "Spectrin-like repeat 3",
		role: "Spectrin-like repeat 3",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 13,
		length: 120,
		cdsStart: 1483,
		cdsEnd: 1602,
		phase: 0,
		aaStart: 495,
		aaEnd: 534,
		family: "rod",
		domain: "Spectrin-like repeat 4",
		role: "Spectrin-like repeat 4",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 14,
		length: 102,
		cdsStart: 1603,
		cdsEnd: 1704,
		phase: 0,
		aaStart: 535,
		aaEnd: 568,
		family: "rod",
		domain: "Spectrin-like repeat 5",
		role: "Spectrin-like repeat 5",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 15,
		length: 108,
		cdsStart: 1705,
		cdsEnd: 1812,
		phase: 0,
		aaStart: 569,
		aaEnd: 604,
		family: "rod",
		domain: "Spectrin-like repeat 6",
		role: "Spectrin-like repeat 6",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 16,
		length: 180,
		cdsStart: 1813,
		cdsEnd: 1992,
		phase: 0,
		aaStart: 605,
		aaEnd: 664,
		family: "rod",
		domain: "Spectrin-like repeat 7",
		role: "Spectrin-like repeat 7",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 17,
		length: 176,
		cdsStart: 1993,
		cdsEnd: 2168,
		phase: 0,
		aaStart: 665,
		aaEnd: 722,
		family: "rod",
		domain: "Spectrin-like repeat 8",
		role: "Spectrin-like repeat 8",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 18,
		length: 124,
		cdsStart: 2169,
		cdsEnd: 2292,
		phase: 2,
		aaStart: 723,
		aaEnd: 764,
		family: "rod",
		domain: "Spectrin-like repeat 9",
		role: "Spectrin-like repeat 9",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 19,
		length: 88,
		cdsStart: 2293,
		cdsEnd: 2380,
		phase: 0,
		aaStart: 765,
		aaEnd: 793,
		family: "rod",
		domain: "Spectrin-like repeat 10",
		role: "Spectrin-like repeat 10",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 20,
		length: 242,
		cdsStart: 2381,
		cdsEnd: 2622,
		phase: 1,
		aaStart: 794,
		aaEnd: 874,
		family: "rod",
		domain: "Spectrin-like repeat 11",
		role: "Spectrin-like repeat 11",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 21,
		length: 181,
		cdsStart: 2623,
		cdsEnd: 2803,
		phase: 0,
		aaStart: 875,
		aaEnd: 934,
		family: "rod",
		domain: "Spectrin-like repeat 12",
		role: "Spectrin-like repeat 12",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 22,
		length: 146,
		cdsStart: 2804,
		cdsEnd: 2949,
		phase: 1,
		aaStart: 935,
		aaEnd: 983,
		family: "rod",
		domain: "Spectrin-like repeat 13",
		role: "Spectrin-like repeat 13",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 23,
		length: 213,
		cdsStart: 2950,
		cdsEnd: 3162,
		phase: 0,
		aaStart: 984,
		aaEnd: 1054,
		family: "rod",
		domain: "Spectrin-like repeat 14",
		role: "Spectrin-like repeat 14",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 24,
		length: 114,
		cdsStart: 3163,
		cdsEnd: 3276,
		phase: 0,
		aaStart: 1055,
		aaEnd: 1092,
		family: "rod",
		domain: "Spectrin-like repeat 15",
		role: "Spectrin-like repeat 15",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 25,
		length: 156,
		cdsStart: 3277,
		cdsEnd: 3432,
		phase: 0,
		aaStart: 1093,
		aaEnd: 1144,
		family: "rod",
		domain: "Spectrin-like repeat 16",
		role: "Spectrin-like repeat 16",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 26,
		length: 171,
		cdsStart: 3433,
		cdsEnd: 3603,
		phase: 0,
		aaStart: 1145,
		aaEnd: 1201,
		family: "rod",
		domain: "Spectrin-like repeat 17",
		role: "Spectrin-like repeat 17",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 27,
		length: 183,
		cdsStart: 3604,
		cdsEnd: 3786,
		phase: 0,
		aaStart: 1202,
		aaEnd: 1262,
		family: "rod",
		domain: "Spectrin-like repeat 18",
		role: "Spectrin-like repeat 18",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 28,
		length: 135,
		cdsStart: 3787,
		cdsEnd: 3921,
		phase: 0,
		aaStart: 1263,
		aaEnd: 1307,
		family: "rod",
		domain: "Spectrin-like repeat 19",
		role: "Spectrin-like repeat 19",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 29,
		length: 150,
		cdsStart: 3922,
		cdsEnd: 4071,
		phase: 0,
		aaStart: 1308,
		aaEnd: 1357,
		family: "rod",
		domain: "Spectrin-like repeat 20",
		role: "Spectrin-like repeat 20",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 30,
		length: 162,
		cdsStart: 4072,
		cdsEnd: 4233,
		phase: 0,
		aaStart: 1358,
		aaEnd: 1411,
		family: "rod",
		domain: "Central hinge / spectrin-like repeat",
		role: "Central hinge · rod flexibility",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 31,
		length: 111,
		cdsStart: 4234,
		cdsEnd: 4344,
		phase: 0,
		aaStart: 1412,
		aaEnd: 1448,
		family: "rod",
		domain: "Spectrin-like repeat 22",
		role: "Spectrin-like repeat 22",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 32,
		length: 174,
		cdsStart: 4345,
		cdsEnd: 4518,
		phase: 0,
		aaStart: 1449,
		aaEnd: 1506,
		family: "rod",
		domain: "Spectrin-like repeat 23",
		role: "Spectrin-like repeat 23",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 33,
		length: 156,
		cdsStart: 4519,
		cdsEnd: 4674,
		phase: 0,
		aaStart: 1507,
		aaEnd: 1558,
		family: "rod",
		domain: "Spectrin-like repeat 24",
		role: "Spectrin-like repeat 24",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 34,
		length: 171,
		cdsStart: 4675,
		cdsEnd: 4845,
		phase: 0,
		aaStart: 1559,
		aaEnd: 1615,
		family: "rod",
		domain: "Spectrin-like repeat 24",
		role: "Spectrin-like repeat 24",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 35,
		length: 180,
		cdsStart: 4846,
		cdsEnd: 5025,
		phase: 0,
		aaStart: 1616,
		aaEnd: 1675,
		family: "rod",
		domain: "Spectrin-like repeat 24",
		role: "Spectrin-like repeat 24",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 36,
		length: 129,
		cdsStart: 5026,
		cdsEnd: 5154,
		phase: 0,
		aaStart: 1676,
		aaEnd: 1718,
		family: "rod",
		domain: "Spectrin-like repeat 24",
		role: "Spectrin-like repeat 24",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 37,
		length: 171,
		cdsStart: 5155,
		cdsEnd: 5325,
		phase: 0,
		aaStart: 1719,
		aaEnd: 1775,
		family: "rod",
		domain: "Spectrin-like repeat 24",
		role: "Spectrin-like repeat 24",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 38,
		length: 123,
		cdsStart: 5326,
		cdsEnd: 5448,
		phase: 0,
		aaStart: 1776,
		aaEnd: 1816,
		family: "rod",
		domain: "Spectrin-like repeat 24",
		role: "Spectrin-like repeat 24",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 39,
		length: 138,
		cdsStart: 5449,
		cdsEnd: 5586,
		phase: 0,
		aaStart: 1817,
		aaEnd: 1862,
		family: "rod",
		domain: "Spectrin-like repeat 24",
		role: "Spectrin-like repeat 24",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 40,
		length: 153,
		cdsStart: 5587,
		cdsEnd: 5739,
		phase: 0,
		aaStart: 1863,
		aaEnd: 1913,
		family: "rod",
		domain: "Spectrin-like repeat 24",
		role: "Spectrin-like repeat 24",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 41,
		length: 183,
		cdsStart: 5740,
		cdsEnd: 5922,
		phase: 0,
		aaStart: 1914,
		aaEnd: 1974,
		family: "rod",
		domain: "Spectrin-like repeat 24",
		role: "Spectrin-like repeat 24",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 42,
		length: 195,
		cdsStart: 5923,
		cdsEnd: 6117,
		phase: 0,
		aaStart: 1975,
		aaEnd: 2039,
		family: "rod",
		domain: "Spectrin-like repeat 24",
		role: "Spectrin-like repeat 24",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 43,
		length: 173,
		cdsStart: 6118,
		cdsEnd: 6290,
		phase: 0,
		aaStart: 2040,
		aaEnd: 2096,
		family: "rod",
		domain: "Spectrin-like repeat 24",
		role: "Spectrin-like repeat 24",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 44,
		length: 148,
		cdsStart: 6291,
		cdsEnd: 6438,
		phase: 2,
		aaStart: 2097,
		aaEnd: 2146,
		family: "rod",
		domain: "Spectrin-like repeat 24",
		role: "Hotspot flank · skip-44 AON target",
		hotspot: false,
		aonTarget: true
	},
	{
		n: 45,
		length: 176,
		cdsStart: 6439,
		cdsEnd: 6614,
		phase: 0,
		aaStart: 2147,
		aaEnd: 2204,
		family: "rod",
		domain: "Spectrin-like repeat 24",
		role: "Deletion hotspot · skip-45 (casimersen)",
		hotspot: true,
		aonTarget: true
	},
	{
		n: 46,
		length: 148,
		cdsStart: 6615,
		cdsEnd: 6762,
		phase: 2,
		aaStart: 2205,
		aaEnd: 2254,
		family: "rod",
		domain: "Spectrin-like repeat 24",
		role: "Spectrin-like repeat 24",
		hotspot: true,
		aonTarget: false
	},
	{
		n: 47,
		length: 150,
		cdsStart: 6763,
		cdsEnd: 6912,
		phase: 0,
		aaStart: 2255,
		aaEnd: 2304,
		family: "rod",
		domain: "Spectrin-like repeat 24",
		role: "Spectrin-like repeat 24",
		hotspot: true,
		aonTarget: false
	},
	{
		n: 48,
		length: 186,
		cdsStart: 6913,
		cdsEnd: 7098,
		phase: 0,
		aaStart: 2305,
		aaEnd: 2366,
		family: "rod",
		domain: "Spectrin-like repeat 24",
		role: "Spectrin-like repeat 24",
		hotspot: true,
		aonTarget: false
	},
	{
		n: 49,
		length: 102,
		cdsStart: 7099,
		cdsEnd: 7200,
		phase: 0,
		aaStart: 2367,
		aaEnd: 2400,
		family: "rod",
		domain: "Spectrin-like repeat 24",
		role: "Spectrin-like repeat 24",
		hotspot: true,
		aonTarget: false
	},
	{
		n: 50,
		length: 109,
		cdsStart: 7201,
		cdsEnd: 7309,
		phase: 0,
		aaStart: 2401,
		aaEnd: 2436,
		family: "rod",
		domain: "Spectrin-like repeat 24",
		role: "Hotspot · common MLPA deletion edge",
		hotspot: true,
		aonTarget: false
	},
	{
		n: 51,
		length: 233,
		cdsStart: 7310,
		cdsEnd: 7542,
		phase: 1,
		aaStart: 2437,
		aaEnd: 2514,
		family: "rod",
		domain: "Spectrin-like repeat 24",
		role: "Skip-51 (eteplirsen) · high-yield AON target",
		hotspot: true,
		aonTarget: true
	},
	{
		n: 52,
		length: 118,
		cdsStart: 7543,
		cdsEnd: 7660,
		phase: 0,
		aaStart: 2515,
		aaEnd: 2553,
		family: "rod",
		domain: "Spectrin-like repeat 24",
		role: "Hotspot · frequently deleted exon",
		hotspot: true,
		aonTarget: false
	},
	{
		n: 53,
		length: 212,
		cdsStart: 7661,
		cdsEnd: 7872,
		phase: 1,
		aaStart: 2554,
		aaEnd: 2624,
		family: "rod",
		domain: "Spectrin-like repeat 24",
		role: "Skip-53 (golodirsen / viltolarsen)",
		hotspot: true,
		aonTarget: true
	},
	{
		n: 54,
		length: 155,
		cdsStart: 7873,
		cdsEnd: 8027,
		phase: 0,
		aaStart: 2625,
		aaEnd: 2675,
		family: "rod",
		domain: "Spectrin-like repeat 24",
		role: "Spectrin-like repeat 24",
		hotspot: true,
		aonTarget: false
	},
	{
		n: 55,
		length: 190,
		cdsStart: 8028,
		cdsEnd: 8217,
		phase: 2,
		aaStart: 2676,
		aaEnd: 2739,
		family: "rod",
		domain: "Spectrin-like repeat 24",
		role: "Hotspot distal edge · BMD in-frame cluster",
		hotspot: true,
		aonTarget: false
	},
	{
		n: 56,
		length: 173,
		cdsStart: 8218,
		cdsEnd: 8390,
		phase: 0,
		aaStart: 2740,
		aaEnd: 2796,
		family: "rod",
		domain: "Spectrin-like repeat 24",
		role: "Spectrin-like repeat 24",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 57,
		length: 157,
		cdsStart: 8391,
		cdsEnd: 8547,
		phase: 2,
		aaStart: 2797,
		aaEnd: 2849,
		family: "rod",
		domain: "Spectrin-like repeat 24",
		role: "Spectrin-like repeat 24",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 58,
		length: 121,
		cdsStart: 8548,
		cdsEnd: 8668,
		phase: 0,
		aaStart: 2850,
		aaEnd: 2889,
		family: "rod",
		domain: "Spectrin-like repeat 24",
		role: "Spectrin-like repeat 24",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 59,
		length: 269,
		cdsStart: 8669,
		cdsEnd: 8937,
		phase: 1,
		aaStart: 2890,
		aaEnd: 2979,
		family: "rod",
		domain: "Spectrin-like repeat 24",
		role: "Spectrin-like repeat 24",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 60,
		length: 147,
		cdsStart: 8938,
		cdsEnd: 9084,
		phase: 0,
		aaStart: 2980,
		aaEnd: 3028,
		family: "rod",
		domain: "Spectrin-like repeat 24",
		role: "Spectrin-like repeat 24",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 61,
		length: 79,
		cdsStart: 9085,
		cdsEnd: 9163,
		phase: 0,
		aaStart: 3029,
		aaEnd: 3054,
		family: "rod",
		domain: "Spectrin-like repeat 24",
		role: "Spectrin-like repeat 24",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 62,
		length: 61,
		cdsStart: 9164,
		cdsEnd: 9224,
		phase: 1,
		aaStart: 3055,
		aaEnd: 3074,
		family: "cysteine",
		domain: "Cysteine-rich / WW / ZZ membrane-anchor",
		role: "Cysteine-rich / WW / ZZ membrane-anchor",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 63,
		length: 62,
		cdsStart: 9225,
		cdsEnd: 9286,
		phase: 2,
		aaStart: 3075,
		aaEnd: 3095,
		family: "cysteine",
		domain: "Cysteine-rich / WW / ZZ membrane-anchor",
		role: "Cysteine-rich / WW / ZZ membrane-anchor",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 64,
		length: 75,
		cdsStart: 9287,
		cdsEnd: 9361,
		phase: 1,
		aaStart: 3096,
		aaEnd: 3120,
		family: "cysteine",
		domain: "Cysteine-rich / WW / ZZ membrane-anchor",
		role: "Cysteine-rich / WW / ZZ membrane-anchor",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 65,
		length: 202,
		cdsStart: 9362,
		cdsEnd: 9563,
		phase: 1,
		aaStart: 3121,
		aaEnd: 3187,
		family: "cysteine",
		domain: "Cysteine-rich / WW / ZZ membrane-anchor",
		role: "Cysteine-rich / WW / ZZ membrane-anchor",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 66,
		length: 86,
		cdsStart: 9564,
		cdsEnd: 9649,
		phase: 2,
		aaStart: 3188,
		aaEnd: 3216,
		family: "cysteine",
		domain: "Cysteine-rich / WW / ZZ membrane-anchor",
		role: "Cysteine-rich / WW / ZZ membrane-anchor",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 67,
		length: 158,
		cdsStart: 9650,
		cdsEnd: 9807,
		phase: 1,
		aaStart: 3217,
		aaEnd: 3269,
		family: "cysteine",
		domain: "Cysteine-rich / WW / ZZ membrane-anchor",
		role: "Cysteine-rich / WW / ZZ membrane-anchor",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 68,
		length: 167,
		cdsStart: 9808,
		cdsEnd: 9974,
		phase: 0,
		aaStart: 3270,
		aaEnd: 3324,
		family: "cysteine",
		domain: "Cysteine-rich / WW / ZZ membrane-anchor",
		role: "Cysteine-rich / WW / ZZ membrane-anchor",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 69,
		length: 112,
		cdsStart: 9975,
		cdsEnd: 10086,
		phase: 2,
		aaStart: 3325,
		aaEnd: 3362,
		family: "cysteine",
		domain: "Cysteine-rich / WW / ZZ membrane-anchor",
		role: "Cysteine-rich / WW / ZZ membrane-anchor",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 70,
		length: 137,
		cdsStart: 10087,
		cdsEnd: 10223,
		phase: 0,
		aaStart: 3363,
		aaEnd: 3407,
		family: "cysteine",
		domain: "Cysteine-rich / WW / ZZ membrane-anchor",
		role: "Cysteine-rich / WW / ZZ membrane-anchor",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 71,
		length: 39,
		cdsStart: 10224,
		cdsEnd: 10262,
		phase: 2,
		aaStart: 3408,
		aaEnd: 3420,
		family: "cterm",
		domain: "C-terminal / syntrophin-binding",
		role: "C-terminal / syntrophin-binding",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 72,
		length: 66,
		cdsStart: 10263,
		cdsEnd: 10328,
		phase: 2,
		aaStart: 3421,
		aaEnd: 3442,
		family: "cterm",
		domain: "C-terminal / syntrophin-binding",
		role: "C-terminal / syntrophin-binding",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 73,
		length: 66,
		cdsStart: 10329,
		cdsEnd: 10394,
		phase: 2,
		aaStart: 3443,
		aaEnd: 3464,
		family: "cterm",
		domain: "C-terminal / syntrophin-binding",
		role: "C-terminal / syntrophin-binding",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 74,
		length: 159,
		cdsStart: 10395,
		cdsEnd: 10553,
		phase: 2,
		aaStart: 3465,
		aaEnd: 3517,
		family: "cterm",
		domain: "C-terminal / syntrophin-binding",
		role: "C-terminal / syntrophin-binding",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 75,
		length: 244,
		cdsStart: 10554,
		cdsEnd: 10797,
		phase: 2,
		aaStart: 3518,
		aaEnd: 3599,
		family: "cterm",
		domain: "C-terminal / syntrophin-binding",
		role: "C-terminal / syntrophin-binding",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 76,
		length: 124,
		cdsStart: 10798,
		cdsEnd: 10921,
		phase: 0,
		aaStart: 3600,
		aaEnd: 3640,
		family: "cterm",
		domain: "C-terminal / syntrophin-binding",
		role: "C-terminal / syntrophin-binding",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 77,
		length: 93,
		cdsStart: 10922,
		cdsEnd: 11014,
		phase: 1,
		aaStart: 3641,
		aaEnd: 3671,
		family: "cterm",
		domain: "C-terminal / syntrophin-binding",
		role: "C-terminal / syntrophin-binding",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 78,
		length: 32,
		cdsStart: 11015,
		cdsEnd: 11046,
		phase: 1,
		aaStart: 3672,
		aaEnd: 3682,
		family: "cterm",
		domain: "C-terminal / syntrophin-binding",
		role: "C-terminal / syntrophin-binding",
		hotspot: false,
		aonTarget: false
	},
	{
		n: 79,
		length: 12,
		cdsStart: 11047,
		cdsEnd: 11058,
		phase: 0,
		aaStart: 3683,
		aaEnd: 3685,
		family: "cterm",
		domain: "C-terminal / syntrophin-binding",
		role: "Stop codon · 3' UTR begins after CDS",
		hotspot: false,
		aonTarget: false
	}
];
var EXON_BY_N = Object.fromEntries(EXONS.map((e) => [e.n, e]));
function exonsInRange(start, end) {
	const a = Math.min(start, end);
	const b = Math.max(start, end);
	return EXONS.filter((e) => e.n >= a && e.n <= b);
}
function clampExon(n) {
	return Math.max(1, Math.min(79, Math.round(n)));
}
function normalizeRange(a, b) {
	return {
		start: clampExon(Math.min(a, b)),
		end: clampExon(Math.max(a, b))
	};
}
function deletedNucleotides(start, end) {
	const { start: s, end: e } = normalizeRange(start, end);
	return exonsInRange(s, e).reduce((sum, x) => sum + x.length, 0);
}
function remainderOf(nt) {
	return nt % 3;
}
function hgvsFor(kind, start, end) {
	const first = EXON_BY_N[start];
	const last = EXON_BY_N[end];
	if (!first || !last) return "NM_004006.2:c.?";
	return `NM_004006.2:${start === end ? `c.${first.cdsStart}_${first.cdsEnd}` : `c.${first.cdsStart}_${last.cdsEnd}`}${kind === "deletion" ? "del" : "dup"} (${start === end ? `exon ${start}` : `exons ${start}–${end}`})`;
}
function phenotypeLean(frame, start, end) {
	const hitsCritical = start <= 8 && end >= 1 || start <= 79 && end >= 63;
	if (frame === "in-frame" && !hitsCritical) return "BMD-like";
	if (frame === "in-frame" && hitsCritical) return "uncertain";
	return "DMD-like";
}
function analyzeVariant(startExon, endExon, kind = "deletion") {
	const { start, end } = normalizeRange(startExon, endExon);
	const exons = exonsInRange(start, end);
	const nucleotides = exons.reduce((s, x) => s + x.length, 0);
	const remainder = remainderOf(nucleotides);
	const frame = remainder === 0 ? "in-frame" : "frameshift";
	const aaStart = exons[0]?.aaStart ?? 1;
	const aaEnd = exons[exons.length - 1]?.aaEnd ?? 3685;
	const aaRemoved = Math.max(0, aaEnd - aaStart + 1);
	const nmdLikely = kind === "deletion" && frame === "frameshift" && end < 79;
	return {
		kind,
		startExon: start,
		endExon: end,
		exons,
		nucleotides,
		remainder,
		frame,
		phenotype: phenotypeLean(frame, start, end),
		hgvs: hgvsFor(kind, start, end),
		aaStart,
		aaEnd,
		aaRemoved,
		nmdLikely
	};
}
var badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-wide uppercase", {
	variants: { tone: {
		default: "bg-elevated text-muted",
		accent: "bg-accent/15 text-accent",
		inframe: "bg-inframe/15 text-inframe",
		frameshift: "bg-frameshift/15 text-frameshift",
		danger: "bg-danger/15 text-danger",
		actin: "bg-actin/15 text-actin",
		rod: "bg-rod/15 text-rod",
		cysteine: "bg-cysteine/15 text-cysteine",
		cterm: "bg-cterm/15 text-cterm"
	} },
	defaultVariants: { tone: "default" }
});
function Badge({ className, tone, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ tone }), className),
		...props
	});
}
//#endregion
export { CardHint as a, Disclaimer as c, analyzeVariant as d, clampExon as f, remainderOf as h, Card as i, EXONS as l, deletedNucleotides as m, Badge as n, CardTitle as o, cn as p, Button as r, DMD_REFERENCE as s, AppShell as t, EXON_BY_N as u };
