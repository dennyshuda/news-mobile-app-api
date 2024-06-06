import express from "express";
import { login, refreshSession, register } from "../controllers/auth";

export const AuthRouter = express.Router();

AuthRouter.post("/register", register);
AuthRouter.post("/login", login);
AuthRouter.post("/refresh", refreshSession);
