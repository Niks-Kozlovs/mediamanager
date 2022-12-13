import jwt from "jsonwebtoken";

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