import jwt, { JwtPayload } from "jsonwebtoken";

export const createToken = (payload: string | object | Buffer, options: jwt.SignOptions) => {
    return new Promise<string>((resolve, reject) => {
        jwt.sign(
            payload,
            process.env.JWT_SECRET as string,
            options,
            (err, token) => {
                if (err) {
                    console.error(err);
                    return reject("Could not create token.");
                }
                return resolve(token as string);
            }
        );
    });
}

export const verifyToken = (token: string) => {
    return new Promise<JwtPayload>((resolve, reject) => {
        jwt.verify(
            token,
            process.env.JWT_SECRET as string,
            (err, decoded) => {
                if (err) {
                    console.error(err);
                    return reject("Could not verify token.");
                }
                return resolve(decoded as JwtPayload);
            }
        );
    });
}