/** @format */

type SearchQueryModel = {
  query: string;
  datasetRegisterIds: string[];
  filters: FilterModel[];
  sorting: any;
};

type FilterModel = {
  predicates?: string[];
  objects?: string[];
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
};
