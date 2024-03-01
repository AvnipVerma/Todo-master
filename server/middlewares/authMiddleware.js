import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';

export const verifyJwt =async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: "Unauthorized user" });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        if (!decode) return res.status(401).json({ message: "Invalid token" });
        // console.log("decode: ", decode);
        // const user = await User.findOne({ _id: decode.userId, email: decode.email });
        const user = await User.findOne({ _id: decode.userId });
        if (!user) {
            return res.status(401).json({ message: "Unauthorized user" });
        }
        req.user = user;
        // console.log("req.user: ", req.user)
        next();
    } catch (error) {
        // console.log("verifyJwt: ", error);
        res.status(401).json({ message: "Invalid token catch", error: error });
    }
};
