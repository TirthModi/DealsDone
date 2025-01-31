import jwt from 'jsonwebtoken';
import { secretKey } from "./jwtConfig.js";

export const generateToken = (user) => {
    const payload = {
        _id: user._id,
        username: user.username,
        role: user.role
    }
    return jwt.sign(payload, secretKey, { expiresIn: '30d'});
}