import { ApolloServer } from "@apollo/server";
import { schema } from "../modules/graphql/schema";
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';


const server = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginLandingPageLocalDefault()],
  introspection: true,
});

export { server };
