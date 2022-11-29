import type { GetServerSidePropsContext, NextPage } from "next";
import { TestDocument, useTestQuery } from "../../generated/graphql";
import {
  addApolloState,
  initializeApollo,
} from "../lib/apolloClient";
import { prisma } from "../lib/prisma";

const Home: NextPage = () => {
  const { data } = useTestQuery({
    notifyOnNetworkStatusChange: true,
  });

  return (
      <div>{JSON.stringify(data?.test)}</div>
  );
};

export const getServerSideProps = async ({
  req,
}: GetServerSidePropsContext) => {
  const apolloClient = initializeApollo({ ctx: { req, prisma } });

  await apolloClient.query({ query: TestDocument });

  return addApolloState(apolloClient, {
    props: {},
  });
};

export default Home;
