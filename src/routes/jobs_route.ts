import express from "express";
import * as controller from "../controllers/jobs_controller";

const router = express.Router();

router
  .route("/")
  .get(controller.getAllJobs)
  .post(controller.createJob);

router
  .route("/:id")
  .get(controller.getJob)
  .patch(controller.updateJob)
  .delete(controller.deleteJob);
  
export default router;