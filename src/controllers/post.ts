import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const getPost = async (req: Request, res: Response) => {
	try {
		const post = await prisma.post.findMany({
			include: {
				user: {
					select: { id: true, email: true, role: true, username: true },
				},
				category: true,
			},
		});
		return res
			.status(200)
			.json({ status: true, statusCode: 200, message: "successfully to get post", posts: post });
	} catch (error) {
		return res
			.status(500)
			.json({ status: false, statusCode: 500, message: "Something wrong when get post" });
	}
};

export const getPostById = async (req: Request, res: Response) => {
	const id = req.params.id;

	try {
		const post = await prisma.post.findFirst({
			where: { id: id },
			include: { user: { select: { id: true, email: true, role: true, username: true } } },
		});
		return res.status(200).json({
			status: true,
			statusCode: 200,
			message: "successfully to get post by id",
			post: post,
		});
	} catch (error) {
		return res
			.status(500)
			.json({ status: false, statusCode: 500, message: "Something wrong when get post by id" });
	}
};

export const createPost = async (req: Request, res: Response) => {
	const { image, title, content, categoryId, userId } = req.body;

	try {
		const post = await prisma.post.create({
			data: {
				image: image,
				title: title,
				content: content,
				categoryId: categoryId,
				userId: userId,
			},
		});
		return res.status(200).json({
			status: true,
			statusCode: 200,
			message: "successfully create post",
			post: post,
		});
	} catch (error) {
		return res
			.status(500)
			.json({ status: false, statusCode: 500, message: "Something wrong when create post" });
	}
};
