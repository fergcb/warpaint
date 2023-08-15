export const typeDefs = `
  type Paint {
    name: String!,
    range: String!,
    type: String!,
    metallic: Boolean!,
    hex: String!,
    rgb: [Int]!,
    hsl: [Int]!
    distance: Float, # Only if distance-based filter is used
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

  enum Sort {
    asc
    desc
  }

  input OrderBy {
    name: Sort
    range: Sort
    type: Sort
    metallic: Sort
    distance: Sort
  }

  type Query {

    paints(
      name: String,
      range: String,
      type: String,
      metallic: Boolean,
      similarTo: SimilarColour,
      page: Int = 0,
      size: Int = 100,
      orderBy: OrderBy,
    ): [Paint],

    paint(
      name: String!
    ): Paint

  }
`;
