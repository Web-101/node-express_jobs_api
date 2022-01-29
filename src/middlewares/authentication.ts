import type { Response, NextFunction } from "express";
import User from "../models/user_model";
import jwt from "jsonwebtoken";

export default function auth(req: any, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  try {
    const token = authHeader.split(" ")[1].trim();
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;

    req.user = decoded;

    User.findById(decoded.id)
      .then((user) => user && next())
      .catch((err) => res.status(500).json(err));

    return;
  } 
  
  catch (err) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
}
