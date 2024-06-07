import { NextFunction, Request, Response } from "express";
import cloudinary from "../config/cloudinary";
import path from "path";
import createHttpError from "http-errors";

export const handleCreateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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

    // UPLOAD TO CLOUDINARY
    const uploadResult = await cloudinary.uploader.upload(filePath, {
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
    const bookFileUploadResult = await cloudinary.uploader.upload(
      bookFilePath,
      {
        resource_type: "raw",
        filename_override: bookFileName,
        folder: "book-pdf",
        format: "pdf",
      }
    );

    console.log("Book file result", bookFileUploadResult);
    res.send({});
  } catch (error) {
    next(createHttpError(500, `Error creating a new book: ${error}`));
  }
};
