import { Request, Response } from "express";
import * as validator from "express-validator";
import User from "../models/user_model";

async function loginWrapper(email: string, password: string, res: Response): Promise<void> {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = user.generateToken();

    res.status(200).json(token);
  }

  catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}

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
  const errors = validator.validationResult(req);
  const query = validator.matchedData(req);

  errors.isEmpty()
    ? loginWrapper(query.email, query.password, res)
    : res.status(422).json({ errors: errors.array() });
}
