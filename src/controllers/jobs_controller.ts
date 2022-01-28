import { Request, Response } from "express";

// no param needed
export function getAllJobs(req: Request, res: Response): void {
  res.send("get all");
}

export function createJob(req: Request, res: Response): void {
  res.send("create new");
}

// id needed
export function getJob(req: Request, res: Response): void {
  res.send("get job");
}

export function updateJob(req: Request, res: Response): void {
  res.send("update job");
}

export function deleteJob(req: Request, res: Response): void {
  res.send("delete job");
}
