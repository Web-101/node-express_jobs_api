import { Request, Response } from "express";
import * as validator from "express-validator";
import User from "../models/user_model";

export function register(req: Request, res: Response): void {
  const errors = validator.validationResult(req);
  const query = validator.matchedData(req);

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
  } 
  
  else {
    User.create(query)
      .then((user) => res.status(201).json(user.generateToken()))
      .catch((err) => res.status(500).json(err));
  }
}

export function login(req: Request, res: Response): void {
  res.send("login");
}
