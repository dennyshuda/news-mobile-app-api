import express from "express";
import { createPost, getPost, getPostById, searchPost } from "../controllers/post";
import { verifyToken } from "../middleware/verifyToken";

export const PostRouter = express.Router();

PostRouter.get("/", getPost);
PostRouter.get("/:id", getPostById);
PostRouter.post("/", createPost);
PostRouter.post("/search", searchPost);
