/** @format */

type HighlightRange = {
  start: number;
  end: number;
};

type NodeLabel = {
  value: string;
  language: string;
  highlights?: HighlightRange[];
};
type NodeObj = {
  value: string;
  label?: NodeLabel[];
  direction: "outgoing" | "incoming";
};
type NodeModel = {
  id: string;
  datasetRegisterIds: string[];
  data: { [predicate: string]: NodeObj[] };
};

type SearchQueryResponseModel = NodeModel[];

const response: SearchQueryResponseModel = [
  {
    id: "https://data.razu.nl/id/object/nl-wbdrazu-k50907905-689-2387",
    datasetRegisterIds: [
      "http://data.bibliotheken.nl/id/dataset/dbnlt",
      "https://data.spinque.com/ld/data/vangoghworldwide/albertina/",
    ],
    data: {
      "http://purl.org/dc/terms/title": [
        {
          value: "...",
          label: [
            {
              value: "...",
              language: "nl",
              highlights: [{ start: 0, end: 3 }],
            },
            {
              value: "...",
              language: "en",
            },
          ],
          direction: "outgoing",
        },
        {
          value: "...",
          label: [
            {
              value: "...",
              language: "nl",
            },
          ],
          direction: "outgoing",
        },
      ],
    },
    // ...
  },
];
