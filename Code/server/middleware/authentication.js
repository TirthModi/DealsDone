import jwt from 'jsonwebtoken';
import { secretKey } from '../config/jwtConfig.js'

export const authenticateToken = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if(!authHeader) {
        return res.status(401).json({ message: "Missing Token!" });
    }
    let [bearer, token] = authHeader.split(" ");

    if(bearer !== "Bearer" || !token) {
        return res.status(401).json({ message: "Invalid token format!" });
    }

    jwt.verify(token, secretKey, (err, user) => {

        if (err) {
            return res.status(403).json({ message: "Invalid token!" });
        }

        req.user = user;
        next();
    });
}

// only seller
export const authenticateTokenSeller = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if(!authHeader) {
        return res.status(401).json({ message: "Missing Token!" });
    }
    let [bearer, token] = authHeader.split(" ");

    if(bearer !== "Bearer" || !token) {
        return res.status(401).json({ message: "Invalid token format!" });
    }

    jwt.verify(token, secretKey, (err, user) => {

        if (err || user.role !== "Seller") {
            return res.status(403).json({ message: "Invalid token!" });
        }

        req.user = user;
        next();
    });
}