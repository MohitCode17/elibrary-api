import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

export const handleRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    // VALIDATION
    if (!name || !email || !password)
      return next(createHttpError(400, "All fields are required !!"));

    // CHECK IF USER EXISTS
    const user = await User.findOne({ email });

    if (user)
      return next(createHttpError(400, "User already exists with this email"));

    const newUser = await User.create({
      name,
      email,
      password,
    });

    // ISSUE ACCESSTOKEN
    const token = jwt.sign(
      { userId: newUser._id },
      config.jwtSecret as string,
      {
        expiresIn: "7d",
      }
    );

    res.status(201).json({ id: newUser._id, token });
  } catch (error) {
    return next(createHttpError(500, "Error while register user !!"));
  }
};
