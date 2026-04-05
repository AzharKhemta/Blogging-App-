import { validateToken } from "../services/authentication.js";

export function CheckAuthentication(cookiesName) {
    return function (req, res, next) {
        const TokenCookiesValue = req.cookies[cookiesName];

        console.log("Token:", TokenCookiesValue); 

        if (!TokenCookiesValue) {
            return next();
        }

        try {
            const userPayload = validateToken(TokenCookiesValue);
            console.log("User Payload:", userPayload); 
            req.user = userPayload;

        } catch (error) {
           console.log("JWT ERROR:", error.message);
        }

        return next();
    };
}