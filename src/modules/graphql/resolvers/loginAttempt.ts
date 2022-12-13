import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import { CookieSerializeOptions } from "next/dist/server/web/types";
import { FieldResolver } from "nexus";
import nookies from "nookies";
import { createToken } from "../../utils/jwt";

export const loginAttempt: FieldResolver<"Mutation", "login"> = async (_, { credentials }, { prisma, res }) => {
    try {
        const user = await getExistingUser(credentials, prisma);
        const encodedToken = await createToken({ username: user.username }, { expiresIn: "1d" });

        nookies.set({ res }, "sid", encodedToken, {
            httpOnly: true,
            domain: process.env.SERVER_DOMAIN || undefined,
            maxAge: 60*5,
            sameSite: true,
            secure: process.env.NODE_ENV === "production",
        } as CookieSerializeOptions);

        return {
            error: false,
            username: user.username,
        };
    } catch (error) {
        const errMsg = (error as Error).message || "Login failed.";
        return {
            error: true,
            message: errMsg,
        };
    }
};

const getExistingUser = async (
    credentials: {
        email: string;
        password: string;
    },
    prisma: PrismaClient
) => {
    const user = await prisma.user.findFirst({
        where: {
            email: credentials.email,
        },
        select: {
            username: true,
            passhash: true,
        }
    });

    if (!user) {
        throw new Error("Login failed. Please try again");
    }

    const passwordsMatch = await compare(credentials.password, user.passhash);

    if (!passwordsMatch) {
        throw new Error("Login failed. Please try again");
    }

    return user;
};

