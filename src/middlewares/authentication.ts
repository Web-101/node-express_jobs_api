import { Request, Response, NextFunction } from "express";
import User from "../models/user_model";
import jwt from "jsonwebtoken";

export default function auth(
  req: any,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    req.user = decoded;

    User.findById(decoded.id).then((user) => {
      user ? next() : res.status(401).json({ message: "Unauthorized" });
    });

    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
}
