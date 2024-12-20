import { User } from "../models/user.model"; // Modèle Sequelize
import jwt from "jsonwebtoken"; // Pour générer le JWT
import { Buffer } from "buffer"; // Pour décoder Base64
import { notFound } from "../error/NotFoundError";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key"; // Clé secrète pour signer le token

export class AuthenticationService {
    public async authenticate(
        username: string,
        password: string
    ): Promise<string> {
        console.log(username);
        const user = await User.findOne({ where: { username } });

        if (!user) {
            throw notFound("User");
        }

        // Décoder le mot de passe stocké en base de données
        const decodedPassword = Buffer.from(user.password, "base64").toString(
            "utf-8"
        );

        console.log(user.username);
        console.log(decodedPassword);
        // Vérifie si le mot de passe est correct
        if (password === decodedPassword) {
            // Si l'utilisateur est authentifié, on génère un JWT
            const token = jwt.sign(
                {
                    username: user.username,
                    scopes: {},
                },
                JWT_SECRET,
                { expiresIn: '24h' }
            );





            return token;
        } else {
            let error = new Error("Wrong password");
            (error as any).status = 403;
            throw error;
        }
    }



}

export const authService = new AuthenticationService();