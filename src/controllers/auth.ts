import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../lib/prisma";
import { signJWT } from "../utils/jwt";

export const register = async (req: Request, res: Response) => {
	const { username, email, password } = req.body;

	try {
		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await prisma.user.create({
			data: {
				username,
				email,
				password: hashedPassword,
			},
		});

		return res.status(201).json({ message: "user created successfully" });
	} catch (error) {
		return res.status(500).json({ message: "Failed to create user" });
	}
};

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		const user = await prisma.user.findUnique({
			where: { email },
		});

		if (!user) return res.status(401).json({ message: "Invalid user" });

		const isPasswordMatch = await bcrypt.compare(password, user?.password!);

		if (!isPasswordMatch) return res.status(401).json({ message: "Invalid credential" });

		const { password: userPassword, ...userInfo } = user;

		const token = signJWT({ id: user.id }, { expiresIn: "15m" });

		return res.status(200).json({ ...userInfo, token });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Failed to login" });
	}
};
