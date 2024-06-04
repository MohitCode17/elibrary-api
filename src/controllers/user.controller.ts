import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import User from "../models/user.model";

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

    res.json({ id: newUser._id });
  } catch (error) {}
};
