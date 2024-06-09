import express from "express";
import {
  handleCreateBook,
  handleDeleteBook,
  handleGetAllBooks,
  handleGetSingleBook,
} from "../controllers/book.controller";
import multer from "multer";
import path from "path";
import authenticate from "../middlewares/authenticate";

const router = express.Router();

// MULTER CONFIG
const upload = multer({
  dest: path.resolve(__dirname, "../../public/data/uploads"),
  limits: { fileSize: 1e7 }, // 10mb file size limit
});

// ROUTE: CREATE BOOK
// PATH: /api/books

router.post(
  "/",
  authenticate,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  handleCreateBook
);

// ROUTE: GET ALL BOOKS
// PATH: /api/books

router.get("/", handleGetAllBooks);

// ROUTE: GET SINGLE BOOK
// PATH: /api/books/:bookId
router.get("/:bookId", handleGetSingleBook);

// ROUTE: DELETE A BOOK
// PATH: /api/books/:bookId
router.delete("/:bookId", authenticate, handleDeleteBook);
export default router;
