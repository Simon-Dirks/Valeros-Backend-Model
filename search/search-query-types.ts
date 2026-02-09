/** @format */

export type Direction = "outgoing" | "incoming";

export type NodeScope = "roots" | "all";

export type OrderedPredicates = Array<string | "*">;

export type FieldRequest = {
  kind: "field";
  predicates?: OrderedPredicates;
  languages?: string[];
  includeHighlights?: boolean;
};

export type ExpandRequest = {
  kind: "expand";
  direction: Direction;
  steps: Array<{
    predicates?: OrderedPredicates;
  }>;
  select?: Array<FieldRequest>;
  includeIntermediate?: boolean;
};

export type Selector = {
  scope: NodeScope;
  select: Array<FieldRequest | ExpandRequest>;
};
