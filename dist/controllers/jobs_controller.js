"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteJob = exports.updateJob = exports.getJob = exports.createJob = exports.getAllJobs = void 0;
const job_model_1 = __importDefault(require("../models/job_model"));
// no param needed
function getAllJobs(req, res) {
    job_model_1.default.find({ createdBy: req.user.id })
        .sort({ createdAt: -1 })
        .then((jobs) => res.status(200).json(jobs))
        .catch((err) => res.status(500).json(err));
}
exports.getAllJobs = getAllJobs;
function createJob(req, res) {
    req.body.createdBy = req.user.id;
    console.log(req.body);
    job_model_1.default.create(req.body)
        .then((job) => res.send(job))
        .catch((err) => res.status(500).json(err));
    return;
}
exports.createJob = createJob;
// id needed
function getJob(req, res) {
    const id = req.params.id;
    const userId = req.user.id;
    job_model_1.default.find({ _id: id, createdBy: userId })
        .then((job) => res.status(200).json(job))
        .catch((err) => res.status(500).json(err));
}
exports.getJob = getJob;
function updateJob(req, res) {
    const id = req.params.id;
    const userId = req.user.id;
    const options = { new: true, runValidators: true };
    job_model_1.default.findOneAndUpdate({ _id: id, createdBy: userId }, req.body, options)
        .then((job) => res.status(200).json(job))
        .catch((err) => res.status(500).json(err));
}
exports.updateJob = updateJob;
function deleteJob(req, res) {
    const id = req.params.id;
    const userId = req.user.id;
    job_model_1.default.findOneAndDelete({ _id: id, createdBy: userId })
        .then((job) => res.status(200).json({ message: "Job deleted" }))
        .catch((err) => res.status(500).json(err));
}
exports.deleteJob = deleteJob;
