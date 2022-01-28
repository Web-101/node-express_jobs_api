import { Request, Response } from "express";

export function register(req: Request, res: Response): void {
  res.send("register");
}

export function login(req: Request, res: Response): void {
  res.send("login");
}
