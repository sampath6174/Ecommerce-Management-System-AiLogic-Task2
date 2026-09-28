import jwt from "jsonwebtoken";

class TokenService {
    generateAccessToken(userId: number, role: string) {
        return jwt.sign(
            { userId, role },
            process.env.JWT_ACCESS_SECRET as string,
            { expiresIn: "15m" }
        );
    }

    generateRefreshToken(userId: number) {
        return jwt.sign(
            { userId },
            process.env.JWT_REFRESH_SECRET as string,
            { expiresIn: "7d" }
        );
    }
}

export default TokenService;