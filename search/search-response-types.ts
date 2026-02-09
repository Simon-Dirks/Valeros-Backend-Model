/** @format */

export type HighlightRange = {
  start: number;
  end: number;
};

export type FieldValue = {
  value: string;
  language?: string;
  highlights?: HighlightRange[];
};

export type NodeObj = {
  id: string;
  direction: "outgoing" | "incoming";
};

export type PredicateObj = {
  values?: FieldValue[];
  objects: NodeObj[];
};

export type NodeModel = {
  id: string;
  datasetRegisterIds: string[];
  data: { [predicate: string]: PredicateObj };
};

export type SearchQueryResponseModel = {
  roots: string[];
  nodes: Record<string, NodeModel>;
};
