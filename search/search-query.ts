/** @format */

import type { Selector } from "./search-query-types";

export type FilterModel = {
  predicates?: string[];
  objects?: string[];
};

export type SearchQueryModel = {
  query: string;
  datasetRegisterIds: string[];
  filters: FilterModel[];
  sorting: any;
  retrieve?: {
    selectors: Selector[];
  };
};

const query: SearchQueryModel = {
  query: "lepel*",
  datasetRegisterIds: [
    // Defined in Valeros config, optionally toggled/disabled by user through UI checkboxes
    "https://n2t.net/ark:/60537/bD64Hu", // GTM
    "https://data.spinque.com/ld/data/vangoghworldwide/albertina/",
    "http://data.bibliotheken.nl/id/dataset/dbnlt",
    // ...
  ],
  filters: [
    {
      predicates: [
        // Defined in Valeros config
        "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
        "https://www.ica.org/standards/RiC/ontology#hasRecordSetType",
        "https://schema.org/additionalType",
        "http://www.wikidata.org/entity/P31",
      ],
      objects: [
        // "Visual" types (selected by user through UI checkbox)
        "https://schema.org/CreativeWork",
        "https://schema.org/Drawing",
        "https://schema.org/ImageObject",
        "https://schema.org/Map",
        "https://schema.org/Photograph",
        "https://schema.org/VideoObject",

        // "People" types (selected by user through UI checkbox)
        "https://schema.org/Person",
        "https://data.cbg.nl/pico#PersonObservation",
        "http://xmlns.com/foaf/0.1/Agent",
        "http://www.nationaalarchief.nl/mdto#archiefvormer",

        // ...
      ],
    },
    {
      // When "objects" field is left out: node has to have at least one value for at least one of the predicates
      // In this case, we are only looking for nodes that have at least one value for at least one copyright-related predicate
      predicates: [
        "http://purl.org/dc/terms/rights",
        "http://purl.org/dc/terms/license",
        "http://creativecommons.org/ns#license",
        "https://schema.org/copyrightHolder",
        "https://schema.org/license",
      ],
    },
    {
      // When "predicates" field is left out: node has to refer to at least one of the objects
      // In this case, we are only looking for nodes that refer to Rembrandt van Rijn in any way
      objects: [
        // Rembrandt van Rijn
        "http://www.wikidata.org/entity/Q5598",
        "https://data.rkd.nl/artists/66219",
      ],
    },
  ],
  sorting: {
    // Basic predicate-based sorting
    // Does not yet take into account "boosting" preferences (e.g. for a "Relevance" sort, boosting all nodes that have image-related predicates)
    // Back-end should be aware of object types when sorting (e.g. sort by text, as date, as number, etc)
    predicates: [
      "http://purl.org/dc/terms/title",
      "http://www.w3.org/2000/01/rdf-schema#label",
      "https://schema.org/name",
      "http://www.w3.org/2004/02/skos/core#prefLabel",
    ],
    direction: "asc",
  },
  retrieve: {
    selectors: [
      {
        // Fetch some predicate values for the root hits
        // Flow: Node --identifier/type/...--> string
        scope: "roots",
        select: [
          {
            kind: "field",
            predicates: [
              "http://purl.org/dc/terms/identifier",
              "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
              "*",
            ],
          },
        ],
      },
      {
        // For every node returned (roots + expanded nodes), fetch labels
        // Flow: Node --label/title--> string
        scope: "all",
        select: [
          {
            kind: "field",
            predicates: [
              "http://www.w3.org/2000/01/rdf-schema#label",
              "http://purl.org/dc/terms/title",
            ],
            languages: ["nl", "en"],
          },
        ],
      },
      {
        // For every node returned (roots + expanded nodes), fetch labels using an extra hop through an intermediate node (e.g. for SKOS-XL, where label literals are stored in a separate node)
        // Flow: Node --prefLabel--> Label node --literalForm--> string
        scope: "all",
        select: [
          {
            kind: "expand",
            direction: "outgoing",
            steps: [
              {
                predicates: ["http://www.w3.org/2008/05/skos-xl#prefLabel"],
              },
            ],
            select: [
              {
                kind: "field",
                predicates: ["http://www.w3.org/2008/05/skos-xl#literalForm"],
                languages: ["nl", "en"],
              },
            ],
          },
        ],
      },
      {
        // For the root hits, make an extra hop to fetch creator/author information
        // Flow: Root node --creator/author--> Person node --givenName/familyName/...--> string
        scope: "roots",
        select: [
          {
            kind: "expand",
            direction: "outgoing",
            steps: [
              {
                predicates: [
                  "http://purl.org/dc/terms/creator",
                  "https://schema.org/author",
                ],
              },
            ],
            select: [
              {
                kind: "field",
                predicates: [
                  "https://schema.org/givenName",
                  "https://schema.org/familyName",
                  "https://schema.org/birthDate",
                  "https://schema.org/deathDate",
                ],
              },
            ],
          },
        ],
      },
      {
        // For the root hits, make two hops to fetch production location information
        // Flow: Root node --was_produced_by--> ProductionEvent node --took_place_at--> Place node --lat/long/address--> string
        scope: "roots",
        select: [
          {
            kind: "expand",
            direction: "outgoing",
            steps: [
              {
                predicates: [
                  "http://www.cidoc-crm.org/cidoc-crm/P108i_was_produced_by",
                ],
              },
              {
                predicates: [
                  "http://www.cidoc-crm.org/cidoc-crm/P7_took_place_at",
                ],
              },
            ],
            select: [
              {
                kind: "field",
                predicates: [
                  "http://www.w3.org/2003/01/geo/wgs84_pos#lat",
                  "http://www.w3.org/2003/01/geo/wgs84_pos#long",
                  "https://schema.org/address",
                ],
                languages: ["nl", "en"],
              },
            ],
          },
        ],
      },
      {
        // For the root hits, make two incoming hops to fetch information about the creator/author of the root node
        // Flow: Root node <--about/mentions-- Document node <--author/creator-- Person node --givenName/familyName/...--> string
        scope: "roots",
        select: [
          {
            kind: "expand",
            direction: "incoming",
            steps: [
              {
                predicates: [
                  "https://schema.org/about",
                  "https://schema.org/mentions",
                ],
              },
              {
                predicates: [
                  "https://schema.org/author",
                  "http://purl.org/dc/terms/creator",
                ],
              },
            ],
            includeIntermediate: true,
            select: [
              {
                kind: "field",
                predicates: [
                  "https://schema.org/givenName",
                  "https://schema.org/familyName",
                  "https://schema.org/birthDate",
                  "https://schema.org/deathDate",
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};
