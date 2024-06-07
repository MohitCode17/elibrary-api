import express from "express";
import { handleLogin, handleRegister } from "../controllers/user.controller";

const router = express.Router();

// ROUTE: REGISTER USER
// PATH: /api/users/register

router.post("/register", handleRegister);

// ROUTE: LOGIN USER
// PATH: /api/users/login

router.post("/login", handleLogin);

export default router;
