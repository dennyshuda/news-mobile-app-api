import { NextFunction, Request, Response } from "express";
import { verifyJWT } from "../utils/jwt";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers.authorization?.split(" ")[1];

	if (!token) return res.status(401).json({ message: "Not Authenticated!" });

	const { decoded, expired } = verifyJWT(token);
	if (decoded) {
		res.locals.user = decoded;
		return next();
	}

	if (expired) {
		return res.status(401).json({ message: "Token is not valid!" });
	}

	return next();
};
