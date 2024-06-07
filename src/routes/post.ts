import express from "express";
import { createPost, getPost, getPostById } from "../controllers/post";
import { verifyToken } from "../middleware/verifyToken";

export const PostRouter = express.Router();

PostRouter.get("/", verifyToken, getPost);
PostRouter.get("/:id", getPostById);
PostRouter.post("/", createPost);
