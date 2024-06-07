import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const getPost = async (req: Request, res: Response) => {
	try {
		const post = await prisma.post.findMany({
			include: {
				user: {
					select: { id: true, email: true, role: true, username: true },
				},
			},
		});
		res
			.status(200)
			.json({ status: true, statusCode: 200, message: "successfully to get post", posts: post });
	} catch (error) {
		res
			.status(500)
			.json({ status: false, statusCode: 500, message: "Something wrong when get post" });
	}
};

export const getPostById = async (req: Request, res: Response) => {
	const id = req.params.id;

	try {
		const post = await prisma.post.findFirst({ where: { id: id }, include: { user: true } });
		res.status(200).json(post);
	} catch (error) {
		res.status(400).json({ message: "error" });
	}
};

export const createPost = async (req: Request, res: Response) => {
	console.log(req.body);

	try {
		const post = await prisma.post.create({ data: req.body });
		res.status(200).json(post);
	} catch (error) {
		res.status(400).json({ message: "error" });
	}
};
