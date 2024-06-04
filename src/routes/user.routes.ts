import express from "express";
import { handleRegister } from "../controllers/user.controller";

const router = express.Router();

// ROUTE: REGISTER USER
// PATH: /api/users/register

router.post("/register", handleRegister);

export default router;
