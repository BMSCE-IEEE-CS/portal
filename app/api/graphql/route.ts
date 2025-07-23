import { createSchema, createYoga } from "graphql-yoga";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";

export const config = {
  api: {
    bodyParser: false,
  },
};

const yoga = createYoga<{ request: Request }>({
  schema: createSchema({ typeDefs, resolvers }),
  graphiql: process.env.NODE_ENV === "development",
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Response, Request, Headers },
});

export async function GET(request: Request) {
  return yoga.fetch(request);
}

export async function POST(request: Request) {
  return yoga.fetch(request);
}
