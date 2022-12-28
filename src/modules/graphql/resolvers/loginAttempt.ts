import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import { CookieSerializeOptions } from "next/dist/server/web/spec-extension/cookies/types";
import { FieldResolver } from "nexus";
import nookies from "nookies";
import { Context } from "../../../types/Context";
import { createToken, verifyToken } from "../../utils/jwt";

export const loginAttempt: FieldResolver<"Mutation", "login"> = async (_, { credentials }, { prisma, res }) => {
    const user = await getExistingUser(credentials, prisma);
    const encodedToken = await createToken({ username: user.username }, { expiresIn: "1d" });

    nookies.set({ res }, "sid", encodedToken, {
        httpOnly: true,
        domain: process.env.SERVER_DOMAIN || undefined,
        maxAge: 60*60,
        sameSite: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
    } as CookieSerializeOptions);

    return {
        error: false,
        username: user.username,
    };
};

export const getUserFromCookie = async ({prisma, req}: Context) => {
    const decodedToken = await getPayloadFromCookie(req);
    const user = await prisma.user.findFirst({
        where: {
            username: decodedToken.username,
        },
    });

    if (!user) {
        throw new Error("No user found");
    }

    return user;
};

export const getUserIdFromCookie = async (ctx: Context) => {
    return (await getUserFromCookie(ctx)).id;
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

const getPayloadFromCookie = async (req: any) => {
    const cookies = nookies.get({ req });
    const token = cookies.sid || null;
    if (!token) {
        throw new Error("No token found");
    }
    const decodedToken = await verifyToken(token);
    return decodedToken;
};
