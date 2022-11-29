import { hash } from "bcrypt";
import { FieldResolver } from "nexus";

export const createAccount: FieldResolver<
  "Mutation",
  "createAccount"
> = async (_, { credentials }, { prisma }) => {
  try {
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
        "Thanks for registering! Check your email to validate your account.",
      error: false,
    };
  } catch (err) {
    const message = err as string || "Invalid Input";
    return {
      message,
      error: true,
    };
  }
};
