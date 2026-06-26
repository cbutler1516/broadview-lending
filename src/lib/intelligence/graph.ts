import type { RelatedRefs } from "@/lib/content/types";
import { knowledgeArticles } from "@/lib/content/knowledge";
import { calculators } from "@/lib/content/calculators";
import { landingPages } from "@/lib/content/landing-pages";
import { decisionGuides } from "@/lib/content/decision-guides";
import { comparisons } from "@/lib/content/comparisons";
import { lifeEvents } from "@/lib/content/life-events";
import { locationPages } from "@/lib/content/locations";

/**
 * Knowledge graph. Indexes every content node and computes BOTH forward and
 * reverse connections so the platform never has a dead end: if A links to B,
 * B also surfaces A. Pure data — safe on server and client.
 */
export type GraphNodeKind =
  | "article"
  | "calculator"
  | "landing"
  | "guide"
  | "comparison"
  | "life-event"
  | "location";

type RefKey = keyof RelatedRefs;

const KIND_TO_REFKEY: Record<GraphNodeKind, RefKey> = {
  article: "articles",
  calculator: "calculators",
  landing: "landings",
  guide: "guides",
  comparison: "comparisons",
  "life-event": "lifeEvents",
  location: "locations",
};

type GraphNode = { kind: GraphNodeKind; id: string; refs: RelatedRefs };

const nodes: GraphNode[] = [
  ...knowledgeArticles.map((a) => ({
    kind: "article" as const,
    id: a.slug,
    refs: a.related,
  })),
  ...calculators.map((c) => ({
    kind: "calculator" as const,
    id: c.slug,
    refs: c.related,
  })),
  ...landingPages.map((p) => ({
    kind: "landing" as const,
    id: p.slug,
    refs: p.related,
  })),
  ...decisionGuides.map((g) => ({
    kind: "guide" as const,
    id: g.slug,
    refs: g.related,
  })),
  ...comparisons.map((c) => ({
    kind: "comparison" as const,
    id: c.slug,
    refs: c.related,
  })),
  ...lifeEvents.map((e) => ({
    kind: "life-event" as const,
    id: e.slug,
    refs: e.related,
  })),
  ...locationPages.map((l) => ({
    kind: "location" as const,
    id: l.slug,
    refs: l.related,
  })),
];

function emptyRefs(): Required<Omit<RelatedRefs, never>> {
  return {
    articles: [],
    calculators: [],
    landings: [],
    funnels: [],
    comparisons: [],
    guides: [],
    lifeEvents: [],
    locations: [],
  };
}

/** Merge any number of RelatedRefs into one (deduped). */
export function mergeRefs(...all: (RelatedRefs | undefined)[]): RelatedRefs {
  const acc = emptyRefs();
  for (const refs of all) {
    if (!refs) continue;
    (Object.keys(acc) as RefKey[]).forEach((key) => {
      const incoming = refs[key];
      if (incoming) acc[key]!.push(...incoming);
    });
  }
  (Object.keys(acc) as RefKey[]).forEach((key) => {
    acc[key] = Array.from(new Set(acc[key]));
  });
  return acc;
}

function reverseRefsFor(kind: GraphNodeKind, id: string): RelatedRefs {
  const refKey = KIND_TO_REFKEY[kind];
  const reverse = emptyRefs();
  for (const node of nodes) {
    const list = node.refs[refKey];
    if (list && list.includes(id)) {
      const nodeKey = KIND_TO_REFKEY[node.kind];
      reverse[nodeKey]!.push(node.id);
    }
  }
  return reverse;
}

function findNode(kind: GraphNodeKind, id: string): GraphNode | undefined {
  return nodes.find((n) => n.kind === kind && n.id === id);
}

/** Forward + reverse connections for a node. */
export function connectionsFor(kind: GraphNodeKind, id: string): RelatedRefs {
  const node = findNode(kind, id);
  return mergeRefs(node?.refs, reverseRefsFor(kind, id));
}

/** Identify a node from a pathname and return its merged connections. */
export function connectionsForPath(path: string): {
  node?: { kind: GraphNodeKind; id: string };
  refs: RelatedRefs;
} {
  const match = path.match(
    /^\/(learn|tools|buy|refinance|guides|compare|life|locations)\/([^/]+)/,
  );
  if (!match) return { refs: emptyRefs() };

  const [, segment, id] = match;
  const segmentToKind: Record<string, GraphNodeKind> = {
    learn: "article",
    tools: "calculator",
    buy: "landing",
    refinance: "landing",
    guides: "guide",
    compare: "comparison",
    life: "life-event",
    locations: "location",
  };
  const kind = segmentToKind[segment];
  if (!kind) return { refs: emptyRefs() };

  return { node: { kind, id }, refs: connectionsFor(kind, id) };
}
