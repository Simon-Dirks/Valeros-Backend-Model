/** @format */

import type { SearchQueryResponseModel } from "./search-response-types";

const searchResponse: SearchQueryResponseModel = {
  roots: ["https://data.rkd.nl/artworks/312467"],
  nodes: {
    // NODE 1: The Night Watch
    "https://rkd.nl/images/3063": {
      id: "https://rkd.nl/images/3063",
      datasetRegisterIds: [
        "https://data.spinque.com/ld/data/vangoghworldwide/rkd/",
      ],
      data: {
        "http://purl.org/dc/terms/title": {
          objects: [],
          values: [
            {
              value: "De Nachtwacht",
              language: "nl",
            },
            {
              value: "The Night Watch",
              language: "en",
            },
          ],
        },
        "http://www.w3.org/2000/01/rdf-schema#label": {
          objects: [],
          values: [
            {
              value: "De Nachtwacht",
              language: "nl",
            },
          ],
        },
        "http://purl.org/dc/terms/creator": {
          objects: [
            {
              id: "https://data.rkd.nl/artists/66219",
              direction: "outgoing",
            },
          ],
        },
        "http://purl.org/dc/terms/identifier": {
          objects: [],
          values: [
            {
              value: "312467",
            },
          ],
        },
      },
    },
    // NODE 2: Rembrandt van Rijn
    "https://data.rkd.nl/artists/66219": {
      id: "https://data.rkd.nl/artists/66219",
      datasetRegisterIds: [
        "https://data.spinque.com/ld/data/vangoghworldwide/rkd/",
      ],
      data: {
        "https://schema.org/givenName": {
          objects: [],
          values: [
            {
              value: "Rembrandt",
              language: "en",
            },
          ],
        },
        "https://schema.org/familyName": {
          objects: [],
          values: [
            {
              value: "van Rijn",
              language: "en",
            },
          ],
        },
        "https://schema.org/birthDate": {
          objects: [],
          values: [
            {
              value: "1606-07-15",
            },
          ],
        },
        "https://schema.org/deathDate": {
          objects: [],
          values: [
            {
              value: "1669-10-04",
            },
          ],
        },
        "http://www.w3.org/2000/01/rdf-schema#label": {
          objects: [],
          values: [
            {
              value: "Rembrandt van Rijn",
              language: "en",
            },
          ],
        },
      },
    },
  },
};

export default searchResponse;
