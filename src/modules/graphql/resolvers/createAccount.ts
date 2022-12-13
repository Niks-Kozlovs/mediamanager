import { hash } from "bcrypt";
import { FieldResolver } from "nexus";

export const createAccount: FieldResolver<
  "Mutation",
  "createAccount"
> = async (_, { credentials }, { prisma }) => {
  const existingUser = await prisma.user.findUnique({ where: { email: credentials.email } });

  if (existingUser !== null) {
    throw new Error("User with this email already exists!");
  }

  const hashedPassword = await hash(credentials.password, 7);

  await prisma.user.create({
    data: {
      username: credentials.username,
      email: credentials.email,
      passhash: hashedPassword,
    }
  });

  return {
    message:
      "Thanks for registering!",
  };
};
