import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const getUserById = async (req: Request, res: Response) => {
	try {
		const user = await prisma.user.findUnique({
			where: { id: req.params.id },
			include: { posts: true },
		});
		if (!user)
			return res.status(500).json({ status: false, statusCode: 500, message: "User is not found" });
		return res.status(200).json({ status: true, statusCode: 200, message: "User is found", user });
	} catch (error) {
		return res.status(500).json({ status: false, statusCode: 500, message: "Error" });
	}
};
