import { NextFunction, Request, Response } from "express";

export const handleRegister = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body);
};
