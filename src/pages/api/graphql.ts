import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { server } from "../../lib/apolloServer";
import { prisma } from "../../lib/prisma";

export default startServerAndCreateNextHandler(server, {
  context: async (req, res) => ({req, res, prisma}),
})
