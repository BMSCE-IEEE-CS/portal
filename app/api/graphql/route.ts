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
  cors: {
    origin:
      process.env.NODE_ENV === "development"
        ? ["http://localhost:3000"]
        : ["https://portal.bmsceieeecs.in/", "https://www.bmsceieeecs.in/"],
  },
  fetchAPI: { Response, Request, Headers },
});

export async function GET(request: Request) {
  return yoga.fetch(request);
}

export async function POST(request: Request) {
  return yoga.fetch(request);
}
