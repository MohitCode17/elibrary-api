import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
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

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
    });

    // ISSUE ACCESSTOKEN
    const token = jwt.sign({ sub: newUser._id }, config.jwtSecret as string, {
      expiresIn: "7d",
    });

    res.status(201).json({ id: newUser._id, token });
  } catch (error) {
    return next(createHttpError(500, "Error while register user !!"));
  }
};

export const handleLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    // VALIDATION
    if (!email || !password)
      return next(createHttpError(400, "All fields are required !!"));

    // CHECK IF USER HAS ACCOUNT OR NOT
    const user = await User.findOne({ email });

    if (!user) return next(createHttpError(404, "User not found"));

    // COMPARE PASSWORD
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return next(createHttpError(400, "Invalid credentials !!"));

    // ISSUE ACCESSTOKEN
    const token = jwt.sign({ sub: user._id }, config.jwtSecret as string, {
      expiresIn: "7d",
    });

    res.status(200).json({ id: user._id, token });
  } catch (error) {
    return next(createHttpError(500, "Error while login a user !!"));
  }
};
