import { ApolloServer } from "npm:@apollo/server@^4.1";
import { startStandaloneServer } from "npm:@apollo/server@4.1/standalone";

import { typeDefs } from "./graphql/schema.ts";
import { resolvers } from "./graphql/resolvers.ts";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// deno-lint-ignore no-explicit-any
const { url } = await startStandaloneServer(server as any, {
  listen: { port: 8000 },
});

console.log(`Server running on: ${url}`);
