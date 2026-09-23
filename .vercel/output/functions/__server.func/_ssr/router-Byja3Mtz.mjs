import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as createRootRoute, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as CardHint, c as Disclaimer, d as analyzeVariant, h as remainderOf, i as Card, l as EXONS, m as deletedNucleotides, n as Badge, o as CardTitle, p as cn, r as Button, s as DMD_REFERENCE, t as AppShell, u as EXON_BY_N } from "./badge-BoacSrr2.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { a as Trigger, i as Root3, n as Portal, r as Provider, t as Content2 } from "../_libs/@radix-ui/react-tooltip+[...].mjs";
import { a as Bar, i as CartesianGrid, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-Byja3Mtz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var TooltipProvider = Provider;
var Tooltip$1 = Root3;
var TooltipTrigger = Trigger;
function TooltipContent({ className, sideOffset = 6, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		sideOffset,
		className: cn("z-50 max-w-xs rounded-md bg-elevated px-2.5 py-1.5 text-xs text-fg shadow-[0_0_0_1px_rgba(255,255,255,0.1)] origin-[var(--radix-tooltip-content-transform-origin)] animate-in fade-in-0 zoom-in-[0.98]", className),
		...props
	}) });
}
var styles_default = "/assets/styles-DYaRtzcS.css";
var APP_NAME = "Helix-Forge";
var Route$6 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Digital DMD gene workbench — reading-frame analysis, exon-skip simulation, and evidence concordance for dystrophin."
			},
			{
				name: "theme-color",
				content: "#08090c"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400&family=Instrument+Serif:ital@0;1&display=swap"
			}
		]
	}),
	component: RootDocument
});
function RootDocument() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider, {
				delayDuration: 200,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
var $$splitComponentImporter$2 = () => import("./routes-CejHFf-h.mjs");
var Route$5 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var AON_SKIP_TARGETS = [
	44,
	45,
	51,
	53
];
var APPROVED_BY_SKIP = {
	45: ["Casimersen (Amondys 45)"],
	51: ["Eteplirsen (Exondys 51)"],
	53: ["Golodirsen (Vyondys 53)", "Viltolarsen (Viltepso)"]
};
function uniqueSorted(nums) {
	return [...new Set(nums)].sort((a, b) => a - b);
}
function strategyFor(deleted, skips) {
	const skipClean = skips.filter((s) => s >= 1 && s <= 79 && !deleted.includes(s));
	if (skipClean.length !== skips.length) return null;
	const nt = uniqueSorted([...deleted, ...skipClean]).reduce((sum, n) => sum + (EXON_BY_N[n]?.length ?? 0), 0);
	const remainder = remainderOf(nt);
	const restored = remainder === 0;
	const start = deleted[0];
	const end = deleted[deleted.length - 1];
	const flanking = skipClean.every((s) => s === start - 1 || s === end + 1);
	const aon = skipClean.some((s) => AON_SKIP_TARGETS.includes(s));
	return {
		skips: skipClean,
		nucleotides: nt,
		remainder,
		restored,
		flanking,
		aon,
		approved: skipClean.flatMap((s) => APPROVED_BY_SKIP[s] ?? []),
		label: skipClean.length === 0 ? "No skip required" : skipClean.length === 1 ? `Skip exon ${skipClean[0]}` : `Skip exons ${skipClean.join(" + ")}`,
		reason: skipClean.length === 0 ? "Deletion already removes a multiple of 3 nucleotides." : flanking ? "Flanking exon skip restores a codon boundary at the new junction." : aon ? "Matches a licensed antisense-oligonucleotide skip target." : "Removes additional nucleotides so the remaining CDS length is divisible by 3."
	};
}
function findSkipStrategies(start, end, kind = "deletion") {
	if (kind === "duplication") {
		const report = analyzeVariant(start, end, kind);
		if (report.frame === "in-frame") return [{
			skips: [],
			nucleotides: report.nucleotides,
			remainder: 0,
			restored: true,
			flanking: false,
			aon: false,
			approved: [],
			label: "No skip required",
			reason: "In-frame duplication — skip modelling is not applied."
		}];
		return [];
	}
	const deleted = [];
	for (let n = Math.min(start, end); n <= Math.max(start, end); n++) deleted.push(n);
	const out = [];
	const seen = /* @__PURE__ */ new Set();
	const push = (s) => {
		if (!s || !s.restored) return;
		const key = s.skips.join(",");
		if (seen.has(key)) return;
		seen.add(key);
		out.push(s);
	};
	if (deletedNucleotides(start, end) % 3 === 0) {
		push(strategyFor(deleted, []));
		return out;
	}
	const s0 = deleted[0];
	const e0 = deleted[deleted.length - 1];
	const candidates = [];
	if (s0 > 1) candidates.push([s0 - 1]);
	if (e0 < 79) candidates.push([e0 + 1]);
	for (const t of AON_SKIP_TARGETS) candidates.push([t]);
	for (let n = 44; n <= 55; n++) candidates.push([n]);
	if (s0 > 1 && e0 < 79) candidates.push([s0 - 1, e0 + 1]);
	for (const skips of candidates) push(strategyFor(deleted, skips));
	out.sort((a, b) => {
		const score = (s) => (s.approved.length > 0 ? 8 : 0) + (s.aon ? 4 : 0) + (s.flanking ? 2 : 0) - s.skips.length;
		return score(b) - score(a) || a.skips.join().localeCompare(b.skips.join());
	});
	return out.slice(0, 6);
}
function applySkip(report, skips) {
	if (skips.length === 0) return report;
	const start = Math.min(report.startExon, ...skips);
	const end = Math.max(report.endExon, ...skips);
	return analyzeVariant(start, end, "deletion");
}
function synthesise(evidenceLines) {
	const variant = evidenceLines[0]?.variant ?? {
		symbol: "UNKNOWN",
		description: "no data",
		source: "none"
	};
	if (evidenceLines.length === 0) return {
		variant,
		grade: "INSUFFICIENT",
		evidenceLines,
		summary: "No evidence lines. Denominator is empty.",
		rulesFired: ["empty-set"]
	};
	const rulesFired = [];
	const collapsed = collapseEvidence(evidenceLines);
	if (collapsed.length < evidenceLines.length) rulesFired.push("collapse");
	if (collapsed.some((e) => e.isRefutation && e.isCurated)) {
		rulesFired.push("refutation-override");
		return {
			variant,
			grade: "DISPUTED",
			evidenceLines: collapsed,
			summary: "A curated refutation is present. Grade locked to DISPUTED.",
			rulesFired
		};
	}
	const curated = collapsed.filter((e) => e.isCurated && !e.isRefutation);
	const textMined = collapsed.filter((e) => e.isTextMined);
	if (textMined.length >= 10 && curated.length === 0) {
		rulesFired.push("text-mining-cap");
		return {
			variant,
			grade: "EMERGING",
			evidenceLines: collapsed,
			summary: "Ten or more text-mined lines and no curated support. Capped at EMERGING.",
			rulesFired
		};
	}
	if (curated.length >= 2) {
		rulesFired.push("two-curated");
		return {
			variant,
			grade: "SUPPORTED",
			evidenceLines: collapsed,
			summary: "Two or more independent curated sources agree.",
			rulesFired
		};
	}
	if (curated.length === 1 || textMined.length > 0) {
		rulesFired.push(curated.length === 1 ? "single-curated" : "text-mined-only");
		return {
			variant,
			grade: "EMERGING",
			evidenceLines: collapsed,
			summary: curated.length === 1 ? "A single curated source. Grade is EMERGING until independently replicated." : "Text-mined associations only.",
			rulesFired
		};
	}
	rulesFired.push("insufficient");
	return {
		variant,
		grade: "INSUFFICIENT",
		evidenceLines: collapsed,
		summary: "Evidence does not meet the EMERGING threshold.",
		rulesFired
	};
}
function collapseEvidence(lines) {
	const curated = lines.filter((l) => !l.isTextMined);
	const mined = lines.filter((l) => l.isTextMined);
	const byClaim = /* @__PURE__ */ new Map();
	for (const line of mined) {
		const key = `${line.variant.symbol}::${line.claim.toLowerCase()}`;
		const existing = byClaim.get(key);
		if (!existing || line.confidence > existing.confidence) byClaim.set(key, existing ? {
			...line,
			collapsedInto: existing.sourceDb
		} : line);
	}
	return [...curated, ...byClaim.values()];
}
var CONCORDANCE_RULES = [
	{
		id: "collapse",
		title: "Collapse",
		body: "Three databases indexing one paper collapse to a single evidence line."
	},
	{
		id: "skipped-source",
		title: "Skipped source",
		body: "A failed or excluded adapter reduces the denominator (6 → 4) instead of padding with nulls."
	},
	{
		id: "refutation-override",
		title: "Refutation override",
		body: "A curated refutation forces DISPUTED regardless of supporting count."
	},
	{
		id: "text-mining-cap",
		title: "Text-mining cap",
		body: "Ten or more text-mined lines, with no curated support, never grade above EMERGING."
	}
];
function lastExonJunctionCds() {
	const last = EXONS[EXONS.length - 1];
	return EXONS[EXONS.length - 2]?.cdsEnd ?? last?.cdsEnd ?? 11058;
}
function nmdCompetent(ptcCds) {
	const lastJ = lastExonJunctionCds();
	return ptcCds > 0 && ptcCds < lastJ - 50;
}
function predictedPtc(report) {
	if (report.frame !== "frameshift") return null;
	const first = report.exons[0];
	if (!first) return null;
	return Math.max(1, first.cdsStart);
}
function nmdStatus(report) {
	if (report.kind === "duplication") return {
		likely: false,
		ptc: null,
		label: "Not modelled",
		detail: "Duplication NMD depends on which copy is transcribed."
	};
	if (report.frame === "in-frame") return {
		likely: false,
		ptc: null,
		label: "NMD escape",
		detail: "In-frame transcript is expected to be translated (internally truncated)."
	};
	const ptc = predictedPtc(report);
	const likely = ptc != null && nmdCompetent(ptc) && report.endExon < 79;
	return {
		likely,
		ptc,
		label: likely ? "NMD-competent" : "NMD escape",
		detail: likely ? "Frameshift is upstream of the last exon junction. Transcript is likely degraded." : "Stop falls in the terminal region. A truncated protein may still be produced."
	};
}
var Route$4 = createFileRoute("/about")({ component: AboutPage });
var LAYERS = [
	{
		name: "Core domain",
		body: "Variant, evidence, concordance, provenance."
	},
	{
		name: "Analysis engine",
		body: "Reading frame, skip rescue, domains, NMD."
	},
	{
		name: "Contracts",
		body: "JSON schemas for evidence, adapter, concordance."
	},
	{
		name: "Adapters",
		body: "OMIM 300377, UniProt P11532, ClinVar, LabArchives."
	}
];
function AboutPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[11px] tracking-[0.18em] text-muted uppercase",
					children: "Helix-Forge 0.9"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl tracking-tight",
					children: "A laboratory knowledge bench"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-sm text-muted",
					children: "Vendor-neutral informatics for the dystrophin gene. This build is the research layer of the packaged Helix-Forge tree: frame arithmetic, skip modelling, and evidence grading — running entirely in the browser."
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 md:grid-cols-2",
			children: LAYERS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: l.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHint, {
				className: "mt-2",
				children: l.body
			})] }, l.name))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Reference" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-3 grid grid-cols-2 gap-3 font-mono text-xs sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ref, {
							k: "Transcript",
							v: DMD_REFERENCE.transcript
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ref, {
							k: "Protein",
							v: DMD_REFERENCE.protein
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ref, {
							k: "UniProt",
							v: DMD_REFERENCE.uniprot
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ref, {
							k: "OMIM",
							v: DMD_REFERENCE.omim
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ref, {
							k: "Locus",
							v: DMD_REFERENCE.locus
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ref, {
							k: "Inheritance",
							v: DMD_REFERENCE.inheritance
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted",
					children: "Exon lengths and CDS coordinates follow the Leiden Muscular Dystrophy pages for NM_004006.2 (A of ATG = c.1). The original zip used placeholder 150-nt blocks; this instrument replaces those with the canonical map so skip logic matches the licensed AON indications."
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Scope" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-3 space-y-2 text-sm text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "In scope: in-silico annotation, dashboards, published analyses." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Out of scope: wet-lab work, manufacturing, human studies." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Every grade is a prediction with an explicit rule trace." })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Disclaimer, { className: "mt-4 text-xs text-faint" })
			]
		})
	] });
}
function Ref({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
		className: "text-muted",
		children: k
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		className: "text-fg",
		children: v
	})] });
}
var $$splitComponentImporter$1 = () => import("./analyze-BrGZ60wp.mjs");
var Route$3 = createFileRoute("/analyze")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var Route$2 = createFileRoute("/concordance")({ component: ConcordancePage });
var VARIANT = {
	symbol: "DMD-del52",
	description: "NM_004006.2:c.7543_7660del",
	source: "sandbox"
};
var CATALOG = [
	{
		id: "lovd",
		sourceDb: "LOVD",
		claim: "pathogenic exon 52 deletion",
		confidence: .92,
		isCurated: true,
		isRefutation: false,
		isTextMined: false
	},
	{
		id: "clinvar",
		sourceDb: "ClinVar",
		claim: "pathogenic exon 52 deletion",
		confidence: .9,
		isCurated: true,
		isRefutation: false,
		isTextMined: false
	},
	{
		id: "omim",
		sourceDb: "OMIM",
		claim: "pathogenic exon 52 deletion",
		confidence: .88,
		isCurated: true,
		isRefutation: false,
		isTextMined: false
	},
	{
		id: "clingen",
		sourceDb: "ClinGen",
		claim: "benign interpretation (refutation)",
		confidence: .95,
		isCurated: true,
		isRefutation: true,
		isTextMined: false
	},
	{
		id: "disgenet",
		sourceDb: "DisGeNET",
		claim: "gene-disease association",
		confidence: .55,
		isCurated: false,
		isRefutation: false,
		isTextMined: true
	}
];
var GRADE_TONE = {
	SUPPORTED: "inframe",
	EMERGING: "accent",
	DISPUTED: "danger",
	CONFLICTED: "frameshift",
	INSUFFICIENT: "default"
};
function ConcordancePage() {
	const [on, setOn] = (0, import_react.useState)({
		lovd: true,
		clinvar: true,
		omim: false,
		clingen: false,
		disgenet: false
	});
	const [mined, setMined] = (0, import_react.useState)(0);
	const result = synthesise((0, import_react.useMemo)(() => {
		const selected = CATALOG.filter((c) => on[c.id]).map((c) => ({
			...c,
			variant: VARIANT
		}));
		for (let i = 0; i < mined; i++) selected.push({
			id: `tm-${i}`,
			variant: VARIANT,
			sourceDb: `TextMine-${i + 1}`,
			claim: "associated with DMD",
			confidence: .4,
			isCurated: false,
			isRefutation: false,
			isTextMined: true
		});
		return selected;
	}, [on, mined]));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "mb-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[11px] tracking-[0.18em] text-muted uppercase",
				children: "Evidence engine"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl tracking-tight",
				children: "Concordance"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-2xl text-sm text-muted",
				children: "Four rules grade a claim: collapse duplicate papers, shrink the denominator when a source is skipped, let curated refutation win, and cap text-mining at EMERGING."
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 lg:grid-cols-[1fr_0.9fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Sources" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHint, {
				className: "mt-1 mb-4",
				children: "Toggle adapters. Collapse is automatic."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: CATALOG.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setOn((s) => ({
						...s,
						[c.id]: !s[c.id]
					})),
					className: "flex w-full items-center justify-between rounded-lg bg-elevated px-3 py-3 text-left shadow-[0_0_0_1px_rgba(255,255,255,0.06)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-sm text-fg",
						children: c.sourceDb
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-xs text-muted",
						children: c.claim
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: on[c.id] ? "accent" : "default",
						children: on[c.id] ? "On" : "Off"
					})]
				}) }, c.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-center justify-between text-xs text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Text-mined lines" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono tabular-nums",
							children: mined
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "range",
						min: 0,
						max: 12,
						value: mined,
						onChange: (e) => setMined(Number(e.target.value)),
						className: "w-full accent-accent",
						"aria-label": "Text-mined evidence count"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "secondary",
							onClick: () => setMined(12),
							children: "Hit the cap"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => {
								setOn({
									lovd: false,
									clinvar: false,
									omim: false,
									clingen: false,
									disgenet: false
								});
								setMined(0);
							},
							children: "Clear"
						})]
					})
				]
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-wide text-muted uppercase",
					children: "Grade"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 font-display text-4xl tracking-tight",
					children: result.grade
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					className: "mt-3",
					tone: GRADE_TONE[result.grade],
					children: [
						result.evidenceLines.length,
						" line",
						result.evidenceLines.length === 1 ? "" : "s"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: result.summary
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 font-mono text-[11px] text-faint",
					children: ["Rules: ", result.rulesFired.join(" · ") || "none"]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "The four rules" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-3",
				children: CONCORDANCE_RULES.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-fg",
					children: r.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: r.body
				})] }, r.id))
			})] })]
		})]
	})] });
}
var Route$1 = createFileRoute("/lab")({ component: LabPage });
function LabPage() {
	const [logs, setLogs] = (0, import_react.useState)(null);
	const sim = (0, import_react.useMemo)(() => simulateDeletions(800), []);
	const nmd = (0, import_react.useMemo)(() => {
		const pts = [];
		for (let cds = 200; cds <= 11e3; cds += 400) pts.push({
			cds,
			nmd: nmdCompetent(cds) ? 1 : 0
		});
		return pts;
	}, []);
	function runAll() {
		setLogs(runExperiments());
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[11px] tracking-[0.18em] text-muted uppercase",
					children: "Sandbox"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl tracking-tight",
					children: "Lab"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-sm text-muted",
					children: "Replay the packaged experiments against the real NM_004006.2 exon lengths, then sample random deletions for frame drift."
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Experiment suite" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHint, {
					className: "mt-1",
					children: "del52 skip, del44 skip, and concordance grading — using Leiden lengths, not the placeholder 150-nt blocks."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: runAll,
					children: "Run experiments"
				})]
			}), logs && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 space-y-2",
				children: logs.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-wrap items-center justify-between gap-2 rounded-lg bg-elevated px-3 py-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-fg",
						children: l.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted",
							children: l.detail
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: l.ok ? "inframe" : "danger",
							children: l.ok ? "Pass" : "Fail"
						})]
					})]
				}, l.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Random deletion frames" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHint, {
					className: "mt-1 mb-4",
					children: [sim.total, " consecutive 1–6 exon deletions. Remainder 0 is in-frame."]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-56",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: sim.bars,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									stroke: "rgba(255,255,255,0.06)",
									vertical: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "label",
									stroke: "#8b8e96",
									fontSize: 11,
									tickLine: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									stroke: "#8b8e96",
									fontSize: 11,
									tickLine: false,
									axisLine: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
									background: "#181b22",
									border: "1px solid #262a33",
									borderRadius: 8,
									fontSize: 12
								} }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "count",
									fill: "#9fb4c8",
									radius: [
										4,
										4,
										0,
										0
									]
								})
							]
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 font-mono text-xs text-muted",
					children: [
						"In-frame ",
						sim.inFrame,
						" · frameshift ",
						sim.out,
						" · ratio",
						" ",
						sim.out ? (sim.inFrame / sim.out).toFixed(2) : "—"
					]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "NMD competence" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHint, {
					className: "mt-1 mb-4",
					children: "50-nt rule against the last exon junction. 1 = degraded, 0 = escape."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-56",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: nmd,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									stroke: "rgba(255,255,255,0.06)",
									vertical: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "cds",
									stroke: "#8b8e96",
									fontSize: 11,
									tickLine: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									stroke: "#8b8e96",
									fontSize: 11,
									tickLine: false,
									axisLine: false,
									domain: [0, 1]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
									background: "#181b22",
									border: "1px solid #262a33",
									borderRadius: 8,
									fontSize: 12
								} }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "nmd",
									fill: "#8aa58b",
									radius: [
										4,
										4,
										0,
										0
									]
								})
							]
						})
					})
				})
			] })]
		})
	] });
}
function runExperiments() {
	const logs = [];
	const d52 = analyzeVariant(52, 52);
	const s52 = findSkipStrategies(52, 52);
	const skip51 = s52.some((s) => s.skips.length === 1 && s.skips[0] === 51 && s.restored);
	const skip53 = s52.some((s) => s.skips.length === 1 && s.skips[0] === 53 && s.restored);
	logs.push({
		id: "001",
		name: "Experiment 001 — del52 skip",
		ok: d52.frame === "frameshift" && skip51 && skip53,
		detail: `del52 ${d52.frame}; skip 51 ${skip51 ? "yes" : "no"}; skip 53 ${skip53 ? "yes" : "no"}`
	});
	const d44 = analyzeVariant(44, 44);
	const s44 = findSkipStrategies(44, 44);
	const skip43 = s44.some((s) => s.skips[0] === 43 && s.restored);
	const skip45 = s44.some((s) => s.skips[0] === 45 && s.restored);
	logs.push({
		id: "002",
		name: "Experiment 002 — del44 skip",
		ok: d44.frame === "frameshift" && skip43 && skip45,
		detail: `del44 ${d44.frame}; skip 43 ${skip43 ? "yes" : "no"}; skip 45 ${skip45 ? "yes" : "no"}`
	});
	const inFrameCluster = analyzeVariant(45, 53);
	logs.push({
		id: "001b",
		name: "del45–53 in-frame cluster",
		ok: inFrameCluster.frame === "in-frame",
		detail: `${inFrameCluster.nucleotides} nt, remainder ${inFrameCluster.remainder}`
	});
	const v = {
		symbol: "DMD-c.123A>T",
		description: "test",
		source: "test"
	};
	const mk = (partial) => ({
		variant: v,
		claim: "pathogenic",
		confidence: .9,
		isCurated: false,
		isRefutation: false,
		isTextMined: false,
		...partial
	});
	const cases = [
		[
			"No evidence",
			[],
			"INSUFFICIENT"
		],
		[
			"Single curated",
			[mk({
				id: "a",
				sourceDb: "LOVD",
				isCurated: true
			})],
			"EMERGING"
		],
		[
			"Two curated",
			[mk({
				id: "a",
				sourceDb: "LOVD",
				isCurated: true
			}), mk({
				id: "b",
				sourceDb: "ClinVar",
				isCurated: true,
				claim: "pathogenic independent"
			})],
			"SUPPORTED"
		],
		[
			"Text-mining cap",
			Array.from({ length: 12 }, (_, i) => mk({
				id: `t${i}`,
				sourceDb: `TM${i}`,
				isTextMined: true,
				claim: `assoc ${i}`,
				confidence: .4
			})),
			"EMERGING"
		],
		[
			"Curated refutation",
			[mk({
				id: "a",
				sourceDb: "LOVD",
				isCurated: true
			}), mk({
				id: "r",
				sourceDb: "ClinGen",
				isCurated: true,
				isRefutation: true,
				claim: "benign"
			})],
			"DISPUTED"
		]
	];
	let passed = 0;
	for (const [name, ev, expected] of cases) {
		const got = synthesise(ev).grade;
		if (got === expected) passed += 1;
		logs.push({
			id: `003-${name}`,
			name: `Concordance — ${name}`,
			ok: got === expected,
			detail: `expected ${expected}, got ${got}`
		});
	}
	logs.push({
		id: "003-summary",
		name: "Experiment 003 — concordance suite",
		ok: passed === cases.length,
		detail: `${passed}/${cases.length} cases`
	});
	return logs;
}
function simulateDeletions(n) {
	let inFrame = 0;
	let out = 0;
	const rem = [
		0,
		0,
		0
	];
	let i = 0;
	for (let start = 1; start <= 79; start++) {
		for (let span = 0; span < 6; span++) {
			const end = Math.min(79, start + span);
			const r = analyzeVariant(start, end);
			rem[r.remainder] += 1;
			if (r.frame === "in-frame") inFrame += 1;
			else out += 1;
			i += 1;
			if (i >= n) break;
		}
		if (i >= n) break;
	}
	return {
		total: inFrame + out,
		inFrame,
		out,
		bars: [
			{
				label: "rem 0",
				count: rem[0]
			},
			{
				label: "rem 1",
				count: rem[1]
			},
			{
				label: "rem 2",
				count: rem[2]
			}
		]
	};
}
var $$splitComponentImporter = () => import("./protein-DvlzELn3.mjs");
var Route = createFileRoute("/protein")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$5.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$6
	}),
	AboutRoute: Route$4.update({
		id: "/about",
		path: "/about",
		getParentRoute: () => Route$6
	}),
	AnalyzeRoute: Route$3.update({
		id: "/analyze",
		path: "/analyze",
		getParentRoute: () => Route$6
	}),
	ConcordanceRoute: Route$2.update({
		id: "/concordance",
		path: "/concordance",
		getParentRoute: () => Route$6
	}),
	LabRoute: Route$1.update({
		id: "/lab",
		path: "/lab",
		getParentRoute: () => Route$6
	}),
	ProteinRoute: Route.update({
		id: "/protein",
		path: "/protein",
		getParentRoute: () => Route$6
	})
};
var routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { Tooltip$1 as a, findSkipStrategies as i, nmdStatus as n, TooltipContent as o, applySkip as r, TooltipTrigger as s, router_exports as t };
