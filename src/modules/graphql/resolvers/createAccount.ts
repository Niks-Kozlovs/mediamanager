import { FieldResolver } from "nexus";

export const createAccount: FieldResolver<
  "Mutation",
  "createAccount"
> = async (_, { credentials }) => {
  try {
    return {
      message:
        "Thanks for registering! Check your email to validate your account.",
      error: false,
    };
  } catch (err) {
    const message = "Invalid Input";
    return {
      message,
      error: true,
    };
  }
};
