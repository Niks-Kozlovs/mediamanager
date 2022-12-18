import { ApolloServer } from "@apollo/server";
import { schema } from "../modules/graphql/schema";

const server = new ApolloServer({
  schema,
});

export { server };
