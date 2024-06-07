import express from "express";
import { getUserById } from "../controllers/user";

export const UserRouter = express.Router();

UserRouter.get("/:id", getUserById);
