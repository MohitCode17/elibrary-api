import express from "express";
import { handleCreateBook } from "../controllers/book.controller";

const router = express.Router();

// ROUTE: CREATE BOOK
// PATH: /api/books

router.post("/", handleCreateBook);

export default router;
