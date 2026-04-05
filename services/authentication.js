import jwt from "jsonwebtoken";

const SECRET = "mySuperSecretKey";

export function generateToken(user) {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            profilePicture: user.profilePicture,
            role: user.role
        },
        SECRET
    );
}

export function validateToken(token) {
    return jwt.verify(token, SECRET);
}