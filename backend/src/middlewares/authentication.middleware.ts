import * as express from "express";
import * as jwt from "jsonwebtoken";



export function expressAuthentication(
    request: express.Request,
    securityName: string,
    scopes?: string[]
): Promise<any> {
    if (securityName === "jwt") {
        const token = request.body.token || request.query.token || request.headers['authorization']?.split(' ')[1];
        return new Promise((resolve, reject) => {
            if (!token) {
                reject("No token provided");
            }
            jwt.verify(
                token,
                "your_jwt_secret_key",
                function (err: any, decoded: any) {
                    if (err) {
                        reject(err);
                    }  else {
                        if (scopes !== undefined) {
                            const userScopes = decoded.scopes;

                            for (let scope of scopes) {
                                const [resource, action] = scope.split(":");
                                if (!userScopes[resource]?.includes(action)) {
                                    reject(new Error("JWT does not contain required permission for" + scope));
                                }
                            }
                        }
                        resolve(decoded);
                    }
                }
            );
        });
    } else {

        throw new Error("Only support JWT security");
    }
}