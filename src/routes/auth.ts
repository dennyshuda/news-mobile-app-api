import express from "express";
import { register } from "../controllers/auth";

export const AuthRouter = express.Router();

AuthRouter.post("/register", register);
