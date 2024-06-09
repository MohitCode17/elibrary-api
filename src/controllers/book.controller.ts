import { NextFunction, Request, Response } from "express";
import cloudinary from "../config/cloudinary";
import path from "path";
import createHttpError from "http-errors";
import Book from "../models/book.model";
import fs from "fs";
import { AuthRequest } from "../middlewares/authenticate";

export const handleCreateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, genre } = req.body;
    const files = req.files as { [filedname: string]: Express.Multer.File[] };

    // 👉 UPLOAD TO COVER IMAGE FOR BOOK
    // mimetype  'application/jpeg' --> jpeg
    const coverImageMimeType = files.coverImage[0].mimetype.split("/").at(-1);
    const fileName = files.coverImage[0].filename;
    const filePath = path.resolve(
      __dirname,
      "../../public/data/uploads",
      fileName
    );

    let uploadResult;
    let bookFileUploadResult;

    try {
      // UPLOAD TO CLOUDINARY
      uploadResult = await cloudinary.uploader.upload(filePath, {
        filename_override: fileName,
        folder: "book-covers",
        format: coverImageMimeType,
      });

      // 👉 UPLOAD TO BOOK PDF
      const bookFileName = files.file[0].filename;
      const bookFilePath = path.resolve(
        __dirname,
        "../../public/data/uploads",
        bookFileName
      );

      // UPLOAD TO CLOUDINARY
      bookFileUploadResult = await cloudinary.uploader.upload(bookFilePath, {
        resource_type: "raw",
        filename_override: bookFileName,
        folder: "book-pdf",
        format: "pdf",
      });

      // DELETE TEMP FILE
      fs.unlink(filePath, (err) => {
        if (err) throw err;
      });

      fs.unlink(bookFilePath, (err) => {
        if (err) throw err;
      });
    } catch (error) {
      next(createHttpError(500, `Error uploading the files: ${error}`));
    }

    const _req = req as AuthRequest;

    // CREATE A NEW BOOK
    const newBook = await Book.create({
      title,
      author: _req.userId,
      coverImage: uploadResult?.secure_url,
      file: bookFileUploadResult?.secure_url,
      genre,
    });

    res.status(200).json({ id: newBook._id });
  } catch (error) {
    next(createHttpError(500, `Error creating a new book: ${error}`));
  }
};

export const handleGetAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
