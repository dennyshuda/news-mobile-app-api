import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../lib/prisma";
import { signJWT, verifyJWT } from "../utils/jwt";

export const register = async (req: Request, res: Response) => {
	const { username, email, password } = req.body;

	if (username === "" || email === "" || password === "")
		return res.status(400).json({ status: false, statusCode: 400, message: "Check your data" });

	try {
		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await prisma.user.create({
			data: {
				username,
				email,
				password: hashedPassword,
			},
		});

		return res
			.status(201)
			.json({ status: true, statusCode: 201, message: "User created successfully" });
	} catch (error) {
		return res
			.status(500)
			.json({ status: false, statusCode: 500, message: "Failed to create user" });
	}
};

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		const user = await prisma.user.findUnique({
			where: { email },
		});
		if (!user)
			return res.status(500).json({ status: false, statuCode: 400, message: "User not found" });

		const isPasswordMatch = await bcrypt.compare(password, user?.password!);
		if (!isPasswordMatch)
			return res
				.status(400)
				.json({ status: false, statusCode: 400, message: "Password not match" });

		const { password: userPassword, ...userInfo } = user;
		const accessToken = signJWT({ ...userInfo }, { expiresIn: "2h" });
		const refreshToken = signJWT({ ...userInfo }, { expiresIn: "30d" });

		return res.status(200).json({
			status: true,
			statusCode: 200,
			message: "Success to login",
			...userInfo,
			data: { accessToken: accessToken, refreshToken: refreshToken },
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ status: false, statusCode: 500, message: "Failed to login" });
	}
};

export const refreshSession = async (req: Request, res: Response) => {
	const { refreshToken } = req.body;

	try {
		const { decoded }: any = verifyJWT(refreshToken);
		const user = await prisma.user.findUnique({ where: { email: decoded.email } });
		if (!user)
			return res.status(400).json({ status: false, statusCode: 400, message: "User not found" });

		const { password, ...userInfo } = user;
		const token = signJWT({ ...userInfo }, { expiresIn: "1d" });

		return res.status(200).json({
			status: true,
			statusCode: 200,
			message: "Success to generate access token",
			accessToken: token,
		});
	} catch (error) {
		return res
			.status(500)
			.json({ status: false, statusCode: 500, message: "Failed to generate access token" });
	}
};
