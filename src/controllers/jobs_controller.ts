import { Request, Response } from "express";
import Job from "../models/job_model";

// no param needed
export function getAllJobs(req: any, res: Response): void {
  Job.find({ createdBy: req.user.id })
    .sort({ createdAt: -1 })
    .then((jobs) => res.status(200).json(jobs))
    .catch((err) => res.status(500).json(err));
}

export function createJob(req: any, res: Response): void {
  req.body.createdBy = req.user.id;

  console.log(req.body);

  Job.create(req.body)
    .then((job) => res.send(job))
    .catch((err) => res.status(500).json(err));

  return;
}

// id needed
export function getJob(req: any, res: Response): void {
  const id = req.params.id;
  const userId = req.user.id;

  Job.find({ _id: id, createdBy: userId })
    .then((job) => res.status(200).json(job))
    .catch((err) => res.status(500).json(err));
}

export function updateJob(req: any, res: Response): void {
  const id = req.params.id;
  const userId = req.user.id;
  const options = { new: true, runValidators: true };

  Job.findOneAndUpdate({ _id: id, createdBy: userId }, req.body, options)
    .then((job) => res.status(200).json(job))
    .catch((err) => res.status(500).json(err));
}

export function deleteJob(req: any, res: Response): void {
  const id = req.params.id;
  const userId = req.user.id;

  Job.findOneAndDelete({ _id: id, createdBy: userId })
    .then((job) => res.status(200).json({ message: "Job deleted" }))
    .catch((err) => res.status(500).json(err));
}
