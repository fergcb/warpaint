export const typeDefs = `
  type Paint {
    id: String!,
    name: String!,
    range: String!,
    type: String!,
    metallic: Boolean!,
    hex: String!,
    rgb: [Int]!,
    hsl: [Int]!
    distance: Float, # Only if distance-based filter is used
  }

  type PaintsPage {
    items: [Paint]!
    page: Int!
    size: Int!
    first: Int!
    last: Int!
    itemCount: Int!
    totalCount: Int!
    pageCount: Int!
    hasNext: Boolean!
    hasPrev: Boolean!
  }
  
  input Colour {
    rgb: [Int]
    hsl: [Int]
    hex: String
  }

  input SimilarColour {
    maxDistance: Int!,
    target: Colour!,
  }

  enum SortOrder {
    asc
    desc
  }

  enum SortField {
    name
    range
    type
    metallic
    distance
    colour
  }

  input Sort {
    field: SortField!
    order: SortOrder!
  }

  type Query {

    paint (
      id: String!
    ): Paint

    paints (
      name: String,
      range: String,
      type: String,
      types: [String],
      metallic: Boolean,
      similarTo: SimilarColour,
      sortBy: [Sort],
      limit: Int = 100,
      offset: Int = 0
    ): [Paint]

    paintsPage (
      name: String,
      range: String,
      type: String,
      types: [String],
      metallic: Boolean,
      similarTo: SimilarColour,
      sortBy: [Sort],
      page: Int = 0,
      size: Int = 100,
    ): PaintsPage,

  }
`;
