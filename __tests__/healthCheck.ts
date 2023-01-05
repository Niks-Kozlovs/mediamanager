import { gql } from "@apollo/client";
import { server } from "../src/lib/apolloServer";

it("Runs a health check agains graphql schema", async () => {
  const result = await server.executeOperation({
    query: gql`
      query Query {
        ok
      }
    `,
  });

  expect(result).toBeTruthy();
  expect(result).toHaveProperty("data");
});
